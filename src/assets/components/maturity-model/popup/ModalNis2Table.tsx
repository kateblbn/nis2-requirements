import React from "react";
import { IsoStandart, Nis2Requirements, Nis2ToSepModel } from "../Data";
import { Table } from "antd";
import { getISOChapters } from "./helpers";
type ModalNis2TableProps = {
  nis2Requirements: Nis2Requirements[];
  nis2SepModels: Nis2ToSepModel[];
};

export default function ModalNis2Table({
  nis2Requirements,
  nis2SepModels,
}: ModalNis2TableProps) {
  const relevantRequirements = nis2SepModels.map((sepModel) => {
    return nis2Requirements.find(
      (req) => req.esa_nis2requirementid === sepModel._esa_nis2requirement_value
    )!;
  });

  const uniqueRelevantRequirements = Array.from(
    new Map(
      relevantRequirements.map((requirements) => [
        requirements.esa_nis2requirementid,
        requirements,
      ])
    ).values()
  );

  return (
    <div className="column">
      <Table
        title={() => (
          <>
            <h3>NIS2 Requirements</h3> <hr />
          </>
        )}
        columns={[
          {
            key: "esa_requirementid",
            dataIndex: "esa_requirementid",
            title: "ID",
            width: 90,
          },
          {
            key: "esa_articlename",
            dataIndex: "esa_articlename",
            width: 120,
            title: "Article",
          },
          {
            key: "esa_name",
            title: "Description",
            dataIndex: "esa_name",
            width: 300,
          },
        ]}
        dataSource={uniqueRelevantRequirements?.map((x) => ({
          ...x,
          key: x.esa_nis2requirementid,
        }))}
        size="small"
      />
    </div>
  );
}
