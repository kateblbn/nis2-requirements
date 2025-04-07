import { ReactNode } from "react";
import "./Header.css";
import InfoIconTooltip from "./InfoIconTooltip";

type HeaderProps = {
  title: string;
  //consider making optional
  children?: ReactNode;
  description?: string;
};

export default function Header(props: HeaderProps) {
  return (
    <div className="Header">
      <img src="images/telenorLogo.png" id="telenorLogo" />
      <div className="title">
        <h1>{props.title}</h1>
        {props.description !== undefined &&
          <InfoIconTooltip text={props.description} className="infoIcon"/>
        }
      </div>
      {props.children}
    </div>
  );
}
