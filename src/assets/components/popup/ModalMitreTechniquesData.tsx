import React from "react";
import { IsoStandart, MitreEnterprise, NistControl } from "../Data";
import { Table } from "antd";
import { getISOChapters, getMitreChapter, getMitreTechniques, getNistSubChapter } from "./helpers";
type ModalNistDataProps = {
    mitreTechniques: MitreEnterprise[] | undefined;
};
export default function ModalMitreTechniquesData({ mitreTechniques }: ModalNistDataProps) {
  const uniqueMitreTechniques = (mitreTechniques ?? []).reduce<MitreEnterprise[]>(
    (acc, control) => {
      if (!acc.some((x) => x.esa_mitreid === control.esa_mitreid))
        acc.push(control);
      return acc;
    },
    []
  );

  uniqueMitreTechniques?.sort(
      (a, b) =>
        getMitreChapter(a.esa_mitreid) - getMitreChapter(b.esa_mitreid)
    );
  
  return (
    <div className="column">
      <Table
        title={() => (
          <>
            <h3>MITRE ATT&CK Techniques</h3> <hr />
          </>
        )}
        columns={[
          {
            key: "controlId",
            dataIndex: "esa_mitreid",
            width: 120,
          },
          {
            key: "controlName",
            dataIndex: "esa_name",
            width: 300,
          },
        ]}
        dataSource={uniqueMitreTechniques?.map((x) => ({
          ...x,
          key: x.esa_mitreid,
        }))}
        size="small"
      />
    </div>
  );
}
