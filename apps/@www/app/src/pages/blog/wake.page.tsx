import { page, header, headerContent, logo, title, article } from "./wake.css";

export default function BuildingWake() {
  return (
    <div className={page}>
      <header className={header}>
        <div className={headerContent}>
          <img src="/wake-logo.svg" alt="Wake" className={logo} />
          <h1 className={title}>Wake: Terminal History for Claude Code</h1>
        </div>
      </header>

      <article className={article}>
        <p>
          I built <a href="https://github.com/joemckenney/wake">wake</a>, a tool that records your terminal sessions so Claude Code can see what you've been doing. The idea is simple: instead of copy-pasting error messages or explaining "I tried X and Y but neither worked," your AI assistant just... knows.
        </p>

        <h2>The Problem</h2>
        <p>
          Claude Code can't see your terminal. It knows about commands it runs, but not the builds you kicked off, the errors you saw, the debugging you did. I wanted something that captured that context automatically.
        </p>

        <h2>The Design Decision: PTY vs Shell Hooks</h2>
        <p>
          The first real architecture question was how to capture terminal activity. Two approaches:
        </p>
        <p>
          <strong>Shell hooks only</strong> (the simple path): zsh and bash have <code>preexec</code>/<code>precmd</code> hooks that fire before and after each command. Easy to implement—just append to your <code>.zshrc</code>:
        </p>
        <pre><code>{`preexec() { log_command "$1" }
precmd() { log_exit_code $? }`}</code></pre>
        <p>
          The problem: you get what was typed and whether it succeeded, but not what happened. The shell doesn't see stdout/stderr—those flow directly from child processes to your terminal, bypassing the shell entirely.
        </p>
        <p>
          <strong>PTY wrapper</strong> (the complete path): Spawn the user's shell inside a pseudo-terminal. You sit in the middle, see every byte flowing in both directions, log it, pass it through. The user's experience is unchanged, but you capture everything.
        </p>
        <p>
          I went with the PTY approach. Knowing that <code>cargo test</code> failed is marginally useful. Knowing <em>which tests failed and why</em> is actually useful.
        </p>

        <h2>The Hybrid Architecture</h2>
        <p>
          Pure PTY capture has its own problem: you get a raw byte stream with no structure. Where does one command end and the next begin? You can pattern-match on prompts, but that's fragile across different shell configurations.
        </p>
        <p>
          The solution: use both. Shell hooks provide the framing (command start, command end, exit code), and the PTY provides the content (what actually got printed). The hooks communicate with the main wake process over a Unix socket:
        </p>
        <pre><code>{`┌─────────────────────────────────────────────────────────────────┐
│  wake shell                                                     │
│                                                                 │
│  PTY layer (captures all bytes, attributes to current command)  │
│                          ▲                                      │
│                          │ "command X started/ended"            │
│  Shell hooks ───────────────────────► Unix socket               │
│  (preexec/precmd)                                               │
└─────────────────────────────────────────────────────────────────┘`}</code></pre>
        <p>
          When <code>preexec</code> fires, wake knows a command is starting and begins buffering output. When <code>precmd</code> fires, wake closes out that command with its exit code and duration, writes everything to SQLite, and starts fresh.
        </p>

        <h2>Implementation Notes</h2>
        <p>
          I built this in Rust using <code>portable-pty</code> for cross-platform PTY handling. The crate abstracts the differences between Linux (<code>/dev/pts/*</code>) and macOS (<code>/dev/ttys*</code>), which was one less thing to worry about.
        </p>
        <p>
          The main loop is async (tokio), selecting on stdin, the PTY master fd, the Unix socket for hook messages, and signals. Signal handling matters more than I expected—you need to forward <code>SIGWINCH</code> (terminal resize) to the child, and handle <code>SIGINT</code>/<code>SIGTSTP</code> correctly so ctrl-c and ctrl-z work as expected.
        </p>
        <p>
          Output storage required some decisions. I keep two versions: the raw bytes (with ANSI escape codes for colors, cursor movement, etc.) and a stripped plaintext version for search and AI consumption. Commands with over 5MB of output get truncated by default—configurable if you really need more, but nobody needs their entire <code>npm install</code> log in their context window.
        </p>

        <h2>MCP Integration</h2>
        <p>
          The real payoff is the MCP server. Claude Code supports Model Context Protocol, which lets you expose tools that Claude can call. Wake's MCP server provides:
        </p>
        <ul>
          <li><code>get_recent_sessions</code> — list recent terminal sessions</li>
          <li><code>get_session_commands</code> — commands from a specific session</li>
          <li><code>search_commands</code> — search across all history</li>
        </ul>
        <p>
          Now when you ask Claude "why did my deploy fail?", it can pull the relevant terminal output directly instead of you having to explain.
        </p>

        <h2>Data Management</h2>
        <p>
          Terminal history grows. Left unchecked, you end up with a database full of ancient build logs that nobody will ever look at again. Wake handles this automatically—sessions older than 21 days get pruned on each <code>wake shell</code> start. If you need manual control:
        </p>
        <pre><code>{`wake prune --dry-run      # see what would be deleted
wake prune --older-than 7 # delete sessions older than 7 days`}</code></pre>
        <p>
          Both retention and output limits are configurable via <code>~/.wake/config.toml</code>:
        </p>
        <pre><code>{`[retention]
days = 21      # default

[output]
max_mb = 5     # default`}</code></pre>
        <p>
          Environment variables work too (<code>WAKE_RETENTION_DAYS</code>, <code>WAKE_MAX_OUTPUT_MB</code>) if you prefer that style.
        </p>

        <h2>What's Next</h2>
        <p>
          A few things I haven't built yet:
        </p>
        <p>
          <strong>Smarter retrieval</strong>: Right now the MCP tools return full command output, which burns through context fast. The better approach is tiered retrieval—return lightweight metadata first (command, exit code, output size, summary), let Claude decide what's relevant, then fetch full output for just those commands. Good summaries require an LLM, which means either API calls (cost, privacy concerns) or bundling local inference. I'm leaning toward shipping a small model via candle (Rust-native ML) that downloads on first use. Keeps it self-contained—install once, summarization just works.
        </p>
        <p>
          <strong>Editor integration</strong>: Terminal is only half the picture. File changes, what you had open, what you were looking at—all relevant context that's currently not captured. Filesystem watching via inotify/FSEvents is straightforward, but deciding what's signal versus noise is the hard part.
        </p>

        <h2>Try It</h2>
        <pre><code>{`curl -sSf https://raw.githubusercontent.com/joemckenney/wake/main/install.sh | sh
eval "$(wake init zsh)"
wake shell`}</code></pre>
        <p>
          Then add the MCP server to Claude Code:
        </p>
        <pre><code>{"claude mcp add --transport stdio --scope user wake-mcp -- wake-mcp"}</code></pre>
        <p>
          The code is at <a href="https://github.com/joemckenney/wake">github.com/joemckenney/wake</a>. It's early, rough around some edges, but it works. Feedback welcome.
        </p>
      </article>
    </div>
  );
}
