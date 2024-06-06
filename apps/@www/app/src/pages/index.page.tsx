//import { Link } from "react-router-dom";
import { Tile } from "../components/tile";
import { brand, header, shortBio, section, sections } from "./index.css";

//<Link to="/projects">Projects</Link>
//<Link to="/blog">Blog</Link>

function App() {
  return (
    <>
      <div className={header}>
        <div className={brand}>
          <h3>CROWPROSE</h3>
        </div>
      </div>
      <div className={shortBio}>
        <h2>
          Hi, I'm Joe a.k.a. crowprose. I'm a software engineer, animal dad,
          husband, and lifelong athlete.
        </h2>
      </div>
      <div className={sections.container}>
        <div className={section.container}>
          <div className={section.heading}>PROJECTS</div>
          <div className={section.content}>
            <Tile
              title="pkg-tools"
              description="An opinionated TS package build toolchain w/ typed configuration."
            />
            <Tile
              title="userstate"
              description="A state machine implementation, used internal to Dopt."
            />
            <Tile
              title="please"
              description="A CLI for developing in monorepos, not building them."
            />
            <Tile
              title="dexl"
              description="Dopt's expression language, including a grammar, parser, and evaluator."
            />
            <Tile
              title="odopt"
              description="Open source artifacts from Dopt, the company I started in 2021."
            />
            <Tile
              title="mercator"
              description="A map implementation that allows for objects as keys without key equality constraints."
            />
          </div>
        </div>
        <div className={section.container}>
          <div className={section.heading}>POSTS</div>
          <div className={section.content}>
            <Tile
              title="Open sourcing code from a private monorepo"
              description="A how-to style blog post"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
