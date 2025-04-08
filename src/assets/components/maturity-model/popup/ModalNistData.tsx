import React from "react";
import { IsoStandart, NistControl } from "../Data";
import { Table } from "antd";
import { getISOChapters, getNistSubChapter } from "./helpers";
type ModalNistDataProps = {
    nistControls: NistControl[] | undefined;
};
export default function ModalNistData({ nistControls }: ModalNistDataProps) {
  nistControls?.sort(
    (a, b) => {
        const firstNistChapter = a.esa_controlid.substring(0, 2);
        const secondtNistChapter = b.esa_controlid.substring(0, 2)
        if(firstNistChapter.localeCompare(secondtNistChapter) === 0) {
          return  (getNistSubChapter(a.esa_controlid) - getNistSubChapter(b.esa_controlid) )
        } else {
            return firstNistChapter.localeCompare(secondtNistChapter)
        }
    }
  );
  // console.log(nistControls);
  
  const uniqueNistControls = (nistControls ?? []).reduce<NistControl[]>(
    (acc, control) => {
      if (!acc.some((x) => x.esa_controlid === control.esa_controlid))
        acc.push(control);
      return acc;
    },
    []
  );

  return (
    <div className="column">
      <Table
        title={() => (
          <>
            <h3>NIST 800-53 Controls</h3> <hr />
          </>
        )}
        columns={[
          {
            key: "controlId",
            dataIndex: "esa_controlid",
            width: 120,
          },
          {
            key: "controlName",
            dataIndex: "esa_controlname",
            width: 300,
          },
        ]}
        dataSource={uniqueNistControls?.map((x) => ({
          ...x,
          key: x.esa_controlid,
        }))}
        size="small"
      />
    </div>
  );
}
