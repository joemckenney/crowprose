import { tile, title, description } from "./index.css";

interface Props {
  title: string;
  description: string;
}

export function Tile(props: Props) {
  return (
    <div className={tile}>
      <div className={title}>{props.title}</div>
      <div className={description}>{props.description}</div>
    </div>
  );
}
