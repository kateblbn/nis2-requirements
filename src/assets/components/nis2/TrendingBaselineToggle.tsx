import { Switch } from "antd";
import React from "react";
// import { MonthRange } from "./MonthRangeSlider";
import "./TrendingBaselineToggle.css";
// import InfoIconTooltip from "./InfoIconTooltip";

type SwitchToggleProps = {
  setIsTrendingView: (value: boolean) => void;
  isTrendingView: boolean;
};

export default function TrendingBaselineToggle({
  setIsTrendingView,
  isTrendingView,
}: SwitchToggleProps) {
  const trendingTooltip = "Based on known events";
  const baselineTooltip =
    "Unique combinations of threat actors and their techniques";
  function onToggleChange(isTrending: boolean) {
    if (!isTrending)
    setIsTrendingView(isTrending);
  }

  return (
    <div className="trending-baseline-toggle">
      {/* <InfoIconTooltip text={baselineTooltip} /> */}
      <h4>Baseline</h4>
      <Switch onChange={onToggleChange} value={isTrendingView} />
      <h4>Trending</h4>
      {/* <InfoIconTooltip text={trendingTooltip} tooltipPlacement="bottomLeft" /> */}
    </div>
  );
}
