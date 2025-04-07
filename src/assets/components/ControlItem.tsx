import React from "react";
import "./ControlItem.css";
import { SepModel } from "./Data";
import { Tooltip } from "antd";
type controlItemProps = {
  sepItem: SepModel;
  onClick: (item: SepModel) => void;
};
export default function ControlItem({ sepItem, onClick }: controlItemProps) {
  const countColors =
    Math.floor(sepItem.esa_score) == 5
      ? "count black"
      : Math.floor(sepItem.esa_score) == 4
      ? "count darkBlue"
      : Math.floor(sepItem.esa_score) == 3
      ? "count blue"
      : Math.floor(sepItem.esa_score) == 2
      ? "count lightblue"
      : Math.floor(sepItem.esa_score) == 1
      ? "count light"
      : "count color";
  // console.log(sepItem);

  return (
    <>
      <div className="tecnique-wrapper" onClick={(e) => onClick(sepItem)}>
        <div className="subtechniques-list">
          <div className="subtechniques-list-wrapper">
            <div className="subtechniques-list-box">
              <Tooltip
                title={
                  <div className="tooltip-fs ">
                    <div className="subtechniques-name">
                      {sepItem.maturitymodel.esa_controlname}
                    </div>
                  </div>
                }
                mouseEnterDelay={0.5}
              >
                <div className="subtechniques-name">
                  {sepItem.maturitymodel.esa_controlname}
                </div>
              </Tooltip>
              <div className="subtechniques-id">
                {sepItem.maturitymodel.esa_controlid}
              </div>
              <span className={countColors}>{sepItem.esa_score}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
