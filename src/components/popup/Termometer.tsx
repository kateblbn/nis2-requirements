import React from "react";
import { SepModel } from "../Data";

type TermometerProps = {
  score: number;
};

export default function Termometer({
  score,
}: TermometerProps) {

    const circles: string[] = [];
    const lines: string[] = [];
    for (let i = 1; i <= 5; i++) {
      let line = `line step-not-started`;
      let circle = `circle step-not-started`;
      if (score >= i) {
        circle = `circle circle-score-${i}`;
        line = `line line-${i}`;
      } else if (score >= i - 0.5 && score < i) {
        line = `line line-${i}-5`;
      }
      circles.push(circle);
      lines.push(line);
    }

  return (
    <div>
              <div className="progress-bar-wrapper">
                <div className="progress-bar-container">
                  <div className="maturity-names">
                    <p>Performed</p>
                    <p>Planned</p>
                    <p>Managed</p>
                    <p>Measured</p>
                    <p>Tailored</p>
                  </div>
                  <div className="progress-bar">
                    {lines.map((lineClass, index) => (
                      <React.Fragment key={index}>
                        <div className={lineClass}></div>
                        <div className={circles[index]}>
                          <div className="number">{index + 1}</div>
                        </div>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            </div>
  )
}