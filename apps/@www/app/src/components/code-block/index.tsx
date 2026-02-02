import { Highlight, themes } from "prism-react-renderer";
import { codeBlock, codeLine, codeLineNumber, codeLineContent } from "./index.css";

interface CodeBlockProps {
  children: string;
  language?: string;
  showLineNumbers?: boolean;
}

export function CodeBlock({ children, language = "typescript", showLineNumbers = false }: CodeBlockProps) {
  const code = children.trim();

  return (
    <Highlight theme={themes.nightOwl} code={code} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={`${className} ${codeBlock}`} style={style}>
          {tokens.map((line, i) => {
            const lineProps = getLineProps({ line, key: i });
            return (
              <div key={i} {...lineProps} className={codeLine}>
                {showLineNumbers && <span className={codeLineNumber}>{i + 1}</span>}
                <span className={codeLineContent}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </span>
              </div>
            );
          })}
        </pre>
      )}
    </Highlight>
  );
}
