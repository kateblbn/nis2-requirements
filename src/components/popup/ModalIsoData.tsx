import React from "react";
import { IsoStandart } from "../Data";
import { Table } from "antd";
import { getISOChapters } from "./helpers";
type ModalIsoDataProps = {
  isoControls: IsoStandart[] | undefined;
};
export default function ModalIsoData({ isoControls }: ModalIsoDataProps) {
  const uniqueIsoControls = (isoControls ?? []).reduce<IsoStandart[]>(
    (acc, control) => {
      if (!acc.some((x) => x.esa_controlid === control.esa_controlid))
        acc.push(control);
      return acc;
    },
    []
  );
  uniqueIsoControls.sort(
    (a, b) =>
      getISOChapters(a.esa_controlname) - getISOChapters(b.esa_controlname)
  );
  return (
    <div className="column">
      <Table
        title={() => (
          <>
            <h3>ISO 27001 Controls</h3> <hr />
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
        dataSource={uniqueIsoControls?.map((x) => ({
          ...x,
          key: x.esa_controlid,
        }))}
        size="small"
      />
    </div>
  );
}
