import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip } from "antd";
import "./InfoIconTooltip.css";
import { ReactNode } from "react";

type InfoIconTooltilProps = {
  text: React.ReactNode;
  className?: string;
};

export default function InfoIconTooltip({
  text,
  className,
}: InfoIconTooltilProps) {
  return (
    <div className="info-icon-tooltip">
      <Tooltip title={text} className={className ?? ""} overlayInnerStyle={{ width: 900 }}>
        <FontAwesomeIcon icon={faCircleInfo} />
      </Tooltip>
    </div>
  );
}
