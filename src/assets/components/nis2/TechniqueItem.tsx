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
      ? "subtechniques-event-nist yellow"
      : count > 2 && count <= 14
      ? "subtechniques-event-nist orange"
      : count >= 15
      ? "subtechniques-event-nist red"
      : "subtechniques-event-nist";

  return (
    <>
      <div className="tecnique-wrapper-nist" onClick={(e) => onClick(id)}>
        <Tooltip
          title={
            <div className="tooltip-fs ">
              <div className="subtechniques-name-nist">{name}</div>
            </div>
          }
          mouseEnterDelay={0.5}
        >
          <div className="subtechniques-name-nist">{name}</div>
        </Tooltip>
          <div className="subtechniques-id-nist">{id}</div>

        <span className={colors}>{count}</span>
      </div>
    </>
  );
};

export default TechniqueItem;
