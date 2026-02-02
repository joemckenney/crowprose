import { Link } from "react-router-dom";
import { CodeBlock } from "../../../components/code-block";
import { page, header, title, article, seriesTag, seriesLink } from "./db-cli.css";

const REPO = "https://github.com/joemckenney/website/blob/main";

export default function FlightPatternsDbCli() {
  return (
    <div className={page}>
      <header className={header}>
        <Link to="/blog/flight-patterns" className={seriesLink}><span className={seriesTag}>Flight Patterns</span></Link>
        <h1 className={title}>A Multi-Environment Database CLI</h1>
      </header>

      <article className={article}>
        <p>
          At <a href="https://www.dopt.com">Dopt</a>—a company I co-founded before joining Airtable—accessing our databases meant remembering different incantations for each environment. Local was <code>docker exec -it postgres psql</code>. Minikube required <code>kubectl port-forward</code>, then grabbing the password from a Kubernetes secret, then connecting. Production required the same dance but with a different kubeconfig. Three environments, three workflows, three sets of commands to forget—multiplied across every service with its own database.
        </p>
        <p>
          I wanted one command. A well-designed CLI hides complexity behind a simple interface—the environment is a flag, the database is discovered from context, everything else is handled.
        </p>

        <h2>The Interface</h2>
        <p>
          Here's what I built (<a href={`${REPO}/packages/@cli/db/bin/db.ts`}>db.ts</a>):
        </p>
        <CodeBlock language="bash">{`db shell               # psql to local docker
db shell --minikube    # psql to local kubernetes
db shell --prod        # psql to production (asks for confirmation)

db dump --prod         # dump production database
db dump --prod --schema-only  # just the schema`}</CodeBlock>
        <p>
          Same command, same mental model. The environment flag is the only thing that changes. Run it from anywhere in a database package directory and it figures out which database you mean.
        </p>

        <h2>No Build Step</h2>
        <p>
          The whole CLI is a <a href={`${REPO}/packages/@cli/db/bin/db.ts`}>single TypeScript file</a> with a shebang. No <code>tsc</code> watching. The <code>package.json</code> bin field points directly at the <code>.ts</code> file:
        </p>
        <CodeBlock language="json">{`{
  "bin": { "db": "bin/db.ts" }
}`}</CodeBlock>
        <p>
          I used Bun for the ergonomics—<code>Bun.spawn</code> makes subprocess management clean, <code>await Bun.file(path).json()</code> makes reading config trivial. The result: ~200 lines of readable TypeScript that runs instantly.
        </p>

        <h2>The Plumbing</h2>
        <p>
          The individual commands (<a href={`${REPO}/packages/@cli/db/src/commands/shell.ts`}>shell.ts</a>, <a href={`${REPO}/packages/@cli/db/src/commands/dump.ts`}>dump.ts</a>) are thin. The interesting part is the <a href={`${REPO}/packages/@cli/db/src/utils.ts`}>shared utilities</a> they all use.
        </p>
        <p>
          <strong>Port-forward lifecycle.</strong> For Kubernetes environments, every command needs to start a <code>kubectl port-forward</code>, hold it open while working, and clean it up on exit:
        </p>
        <CodeBlock language="typescript">{`let portForwardProcess: Subprocess | null = null;

export async function startPortForward(env: "minikube" | "prod", config: DbConfig) {
  portForwardProcess = Bun.spawn(
    ["kubectl", "port-forward", \`svc/\${service}\`, \`\${localPort}:5432\`],
    { stdout: "pipe", stderr: "pipe", env: { ...process.env, KUBECONFIG } }
  );
  await Bun.sleep(2000);
}

export function stopPortForward() {
  portForwardProcess?.kill();
  portForwardProcess = null;
}`}</CodeBlock>
        <p>
          <strong>Cleanup on Ctrl+C.</strong> Signal handling ensures the port-forward gets killed even if you interrupt mid-operation:
        </p>
        <CodeBlock language="typescript">{`export function setupCleanup() {
  process.on("SIGINT", () => {
    stopPortForward();
    process.exit(0);
  });
}`}</CodeBlock>
        <p>
          <strong>Production confirmation.</strong> Any command touching prod requires typing "yes":
        </p>
        <CodeBlock language="typescript">{`export async function confirmProdAccess(): Promise<boolean> {
  console.log("⚠️  WARNING: You are connected to PRODUCTION data!");
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    rl.question("Type 'yes' to continue: ", (answer) => {
      rl.close();
      resolve(answer.trim().toLowerCase() === "yes");
    });
  });
}`}</CodeBlock>
        <p>
          <strong>Reading secrets from Kubernetes.</strong> The password lives in different places per environment. Local dev uses an environment variable. Kubernetes environments store it in a secret:
        </p>
        <CodeBlock language="typescript">{`export async function getPassword(env: Environment, config: DbConfig) {
  if (env === "dev") return process.env.DB_PASSWORD || "devpassword";

  const proc = Bun.spawn(
    ["sh", "-c", \`kubectl get secret \${service} -o jsonpath='{.data.password}' | base64 -d\`],
    { stdout: "pipe" }
  );
  return (await new Response(proc.stdout).text()).trim();
}`}</CodeBlock>
        <p>
          The CLI handles kubeconfig switching, secret lookup, and base64 decoding. You just type <code>db shell --prod</code> and you're in.
        </p>

        <h2>Config Discovery</h2>
        <p>
          How does <code>db</code> know which database you're talking about? It <a href={`${REPO}/packages/@cli/db/src/config.ts`}>walks up the directory tree</a> looking for <code>db.config.json</code>:
        </p>
        <CodeBlock language="typescript">{`export async function loadConfig(): Promise<DbConfig> {
  let dir = process.cwd();
  while (dir !== "/") {
    const configPath = join(dir, "db.config.json");
    if (existsSync(configPath)) return await Bun.file(configPath).json();
    dir = join(dir, "..");
  }
  throw new Error("Could not find db.config.json");
}`}</CodeBlock>
        <p>
          This mirrors how eslint and prettier find their configs. The <a href={`${REPO}/services/@users/db/db.config.json`}>config file</a> lives next to the Prisma schema and migrations—everything about that database in one place:
        </p>
        <CodeBlock language="json">{`{
  "database": "users",
  "user": "users",
  "environments": {
    "dev": { "host": "localhost", "port": 5432 },
    "minikube": { "service": "user-postgres-postgresql", "localPort": 5440 },
    "prod": { "service": "user-postgres-postgresql", "localPort": 5440, "kubeconfig": "~/.kube/vultr-prod-config" }
  }
}`}</CodeBlock>

        <h2>What's Missing</h2>
        <p>
          This is a solo developer's tool, not production infrastructure. It doesn't handle:
        </p>
        <ul>
          <li><strong>Secret rotation</strong> — Reads the password fresh each time, but no rotation mechanism built in.</li>
          <li><strong>Team credential management</strong> — Everyone needs their own kubeconfig.</li>
          <li><strong>Connection pooling</strong> — Each invocation opens a new connection.</li>
          <li><strong>Audit logging</strong> — No record of who accessed what database, when.</li>
          <li><strong>Dump file hygiene</strong> — Nothing prevents you from committing <code>.sql</code> files with production data. The <code>dumps/</code> directory should probably be gitignored.</li>
          <li><strong>Better error messages</strong> — Wrong kubectl context gives a generic port-forward error rather than "you're pointing at the wrong cluster."</li>
        </ul>
        <p>
          For a personal project, these gaps don't matter. For a team, you'd want something more robust—or just use a managed database proxy.
        </p>

        <h2>Up Next</h2>
        <p>
          This is the first post in <strong>Flight Patterns</strong>, a series about the patterns and tradeoffs in my <a href="https://github.com/joemckenney/website">playground repo</a>. Next up: the three-tier SDK generation pattern—how services generate OpenAPI specs that feed into typed client libraries without circular dependencies.
        </p>
      </article>
    </div>
  );
}
