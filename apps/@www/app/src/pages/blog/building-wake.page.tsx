import { page, header, headerContent, logo, title, article } from "./building-wake.css";

export default function BuildingWake() {
  return (
    <div className={page}>
      <header className={header}>
        <div className={headerContent}>
          <img src="/wake-logo.svg" alt="Wake" className={logo} />
          <h1 className={title}>Building Wake: A Terminal Recorder for the AI Coding Era</h1>
        </div>
      </header>

      <article className={article}>
        <p>
          I built <a href="https://github.com/joemckenney/wake">wake</a>, a tool that records your terminal sessions so Claude Code can see what you've been doing. The idea is simple: instead of copy-pasting error messages or explaining "I tried X and Y but neither worked," your AI assistant just... knows.
        </p>

        <h2>The Problem</h2>
        <p>
          Claude Code is stateless between sessions. Every time you start a conversation, you're back to square one—re-explaining your project, what you've tried, what broke. The workaround is maintaining a <code>CLAUDE.md</code> file with context, but that's manual and tedious. I wanted something that captured context automatically.
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
          Output storage required some decisions. I keep two versions: the raw bytes (with ANSI escape codes for colors, cursor movement, etc.) and a stripped plaintext version for search and AI consumption. Commands with over 1MB of output get truncated—nobody needs their entire <code>npm install</code> log in their context window.
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

        <h2>What's Missing</h2>
        <p>
          A few things I haven't built yet:
        </p>
        <p>
          <strong>Summarization</strong>: The database grows. Ideally, older sessions would get compressed into summaries—"yesterday Joe was debugging a Redis connection issue, tried X and Y, eventually fixed it by Z." This probably requires periodic LLM calls, which adds complexity around cost and where to run the model.
        </p>
        <p>
          <strong>Editor integration</strong>: Terminal is only half the picture. File changes, what you had open, what you were looking at—all relevant context that's currently not captured. Filesystem watching via inotify/FSEvents is straightforward, but deciding what's signal versus noise is the hard part.
        </p>
        <p>
          <strong>Browser history</strong>: When you're debugging, you're probably also googling error messages, reading docs, looking at Stack Overflow. That context matters. Chrome stores history in SQLite, so it's technically accessible, but there are privacy considerations to think through.
        </p>

        <h2>Try It</h2>
        <pre><code>{`curl -sSf https://raw.githubusercontent.com/joemckenney/wake/main/install.sh | sh
eval "$(wake init zsh)"
wake shell`}</code></pre>
        <p>
          Then add the MCP server to Claude Code:
        </p>
        <pre><code>{`claude mcp add --transport stdio --scope user wake-mcp -- wake-mcp`}</code></pre>
        <p>
          The code is at <a href="https://github.com/joemckenney/wake">github.com/joemckenney/wake</a>. It's early, rough around some edges, but it works. Feedback welcome.
        </p>
      </article>
    </div>
  );
}
