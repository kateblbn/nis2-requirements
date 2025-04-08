import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip } from "antd";
import "./InfoIconTooltip.css";

type InfoIconTooltilProps = {
  text: string;
  className?: string;
};

export default function InfoIconTooltip({
  text,
  className,
}: InfoIconTooltilProps) {
  return (
    <div  className="info-icon-tooltip " >
      <Tooltip title={text} className={className ?? ""}>
        <FontAwesomeIcon icon={faCircleInfo} />
      </Tooltip>
    </div>
  );
}
