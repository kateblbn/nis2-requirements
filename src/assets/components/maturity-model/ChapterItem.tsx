import React from "react";
import "./ChapterItem.css";
import { Tooltip } from "antd";

type controlHeaderItemProps = {
  number: number;
  chapter: string;
};
export default function ChapterItem({
  number,
  chapter,
}: controlHeaderItemProps) {
  const shortName =
    chapter == "System Acquisition, Development & Maintenance"
      ? "System Acquisition, Dev & Main"
      : chapter;
  const anotherColorOfNumber =
    number == 15 || number == 16
      ? "table-number another-color"
      : "table-number";
  return (
    <Tooltip 
      title={
        <div className="tooltip-1">
            <div className="table-name-1">{chapter}</div>
        </div>
      } mouseEnterDelay={0.5}
    >
      <div className="all-techniques-list">
        <div className="table-number-wrapper">
          <div className={anotherColorOfNumber}>{number}</div>
        </div>
        <div className="table-tactic-wrapper">
          <div className="table-name">{shortName}</div>
        </div>
      </div>
    </Tooltip>
  );
}
