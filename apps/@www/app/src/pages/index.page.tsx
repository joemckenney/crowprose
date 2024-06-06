import { Link } from "react-router-dom";

function App() {
	return (
		<>
			<div>
				<h1>crowprose</h1>
			</div>
			<div>
				<div>
					<Link to="/projects">Projects</Link>
				</div>
				<div>
					<Link to="/blog">Blog</Link>
				</div>
			</div>
		</>
	);
}

export default App;
