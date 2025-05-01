import React from "react";
import "./ControlItem.css";
import { Tooltip } from "antd";
import { Nis2ToSepModel } from "./Data";
type controlItemProps = {
  sepItems: Nis2ToSepModel[];
  onClick: (item: Nis2ToSepModel[]) => void;
};
export default function ControlItem({ sepItems, onClick }: controlItemProps) {
  const firstSepItem = sepItems[0];
  const countColors =
    Math.floor(firstSepItem.sep.esa_score) == 5
      ? "count black"
      : Math.floor(firstSepItem.sep.esa_score) == 4
      ? "count darkBlue"
      : Math.floor(firstSepItem.sep.esa_score) == 3
      ? "count blue"
      : Math.floor(firstSepItem.sep.esa_score) == 2
      ? "count lightblue"
      : Math.floor(firstSepItem.sep.esa_score) == 1
      ? "count light"
      : "count color";
  // console.log(sepItem);

  return (
    <>
      <div className="tecnique-wrapper" onClick={(e) => onClick(sepItems)}>
        <div className="subtechniques-list">
          <div className="subtechniques-list-wrapper">
            <div className="subtechniques-list-box">
              <Tooltip
                title={
                  <div className="tooltip-fs ">
                    <div className="subtechniques-name">
                      {firstSepItem.mm.esa_controlname}
                    </div>
                  </div>
                }
                mouseEnterDelay={0.5}
              >
                <div className="subtechniques-name">
                  {firstSepItem.mm.esa_controlname}
                </div>
              </Tooltip>
              <div className="subtechniques-id">
                {firstSepItem.mm.esa_controlid}
              </div>
              <span className={countColors}>{firstSepItem.sep.esa_score}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
