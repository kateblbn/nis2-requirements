import "./TechniqueItem.css";
import { Tooltip } from "antd";

type TechniqueItemProps = {
  id: string;
  name: string;
  count: number;
  onClick: (mmId: string) => void;
};

export const TechniqueItem = ({
  id,
  name,
  count,
  onClick,
}: TechniqueItemProps) => {
  const colors =
    count <= 2
      ? "subtechniques-event yellow"
      : count > 2 && count <= 14
      ? "subtechniques-event orange"
      : count >= 15
      ? "subtechniques-event red"
      : "subtechniques-event";

  return (
    <>
      <div className="tecnique-wrapper" onClick={(e) => onClick(id)}>
        <div className="subtechniques-id">{id}</div>
        <Tooltip
          title={
            <div className="tooltip-fs ">
              <div className="subtechniques-name">{name}</div>
            </div>
          }
          mouseEnterDelay={0.5}
        >
          <div className="subtechniques-name">{name}</div>
        </Tooltip>

        <span className={colors}>{count}</span>
      </div>
    </>
  );
};

export default TechniqueItem;
