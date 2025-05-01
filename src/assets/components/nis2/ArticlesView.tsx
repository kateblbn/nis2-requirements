import { Tooltip } from "antd";
import { Nis2Requirements, Nis2ToSepModel } from "../maturity-model/Data";
import "./ArticlesView.css";
import TechniqueItem from "./TechniqueItem";
import Nis2MappingMm from "./Nis2MappingMm";
import {} from "./Nis2MappingMm.css";
import SelectPage from "./SelectPage";
import ControlItem from "../maturity-model/ControlItem";

type ArticlesViewProps = {
  requirementGuids: string[];
  selectedArticleNumber: number;
  nis2ToSepMmTable: Nis2ToSepModel[];
  allNis2Requirements: Nis2Requirements[];
  onMaturityClick: (value: Nis2ToSepModel[]) => void;
};

export default function ArticlesView({
  requirementGuids,
  selectedArticleNumber,
  nis2ToSepMmTable,
  allNis2Requirements,
  onMaturityClick,
}: ArticlesViewProps) {
  console.log(allNis2Requirements);

  const groupedByRequirement = Map.groupBy(
    nis2ToSepMmTable,
    (x) => x._esa_nis2requirement_value
  );
  console.log(groupedByRequirement);

  // const sortedByInstances = mmEntries.sort((a, b) => {
  //   const [, aOccurences] = a;
  //   const [, bOccurences] = b;
  //   return bOccurences.length - aOccurences.length;
  // });

  const handleTechniqueItemClick = (mmId: string) => {
    console.log("Technique Item Clicked:", mmId);
  };

  if (requirementGuids.length < 2) {
    const maturityScores = groupedByRequirement.get(requirementGuids[0]);

    const requirement = allNis2Requirements.find(
      (x) => x.esa_nis2requirementid === requirementGuids[0]
    )!.esa_name;
    console.log(maturityScores);

    return (
      <>
        <div className="article-container">
          <div className="description-wrapper">
            <p className="description">
              <>
                <div className="subarticles">{requirement} </div>
                <Nis2MappingMm />
                <div className="technique-items-wrapper">
                  {maturityScores == undefined ? (
                    <SelectPage />
                  ) : (
                    maturityScores?.map((technique, index) => {
                      console.log(technique._esa_nis2requirement_value);

                      return (
                        <ControlItem
                          key={technique._esa_nis2requirement_value}
                          sepItems={[technique]}
                          onClick={onMaturityClick}
                        />
                      );
                    })
                  )}
                </div>
              </>
            </p>
          </div>
        </div>
      </>
    );
  } else {
    return (
      //ARTICLE 21
      <div className="subarticle21-wrapper">
        <Nis2MappingMm />
        <div className="subarticle-21-columns-wrapper">
          {requirementGuids.map((requirementGuid, index) => {
            const seps = groupedByRequirement.get(requirementGuid)!;
            const uniqueSeps = Array.from(
              new Map(seps.map((sep) => [sep.mm.esa_controlid, sep])).values()
            );
            const requirement = allNis2Requirements.find(
              (x) => x.esa_nis2requirementid === requirementGuid
            )!.esa_name;
            const requirementLiteral = allNis2Requirements
              .find((x) => x.esa_nis2requirementid === requirementGuid)!
              .esa_requirementid.slice(5);

            return (
              <div className="subarticles-columns">
                <Tooltip title={<div className="item">{requirement}</div>}>
                  <div className="subarticle21">
                    <div className="slicedLiteral">{requirementLiteral}</div>
                    <div className="item">{requirement}</div>
                  </div>
                </Tooltip>
                <div className="technique-items-wrapper-forsubarticle21">
                  {uniqueSeps.map((technique) => {
                    console.log(technique._esa_nis2requirement_value);

                    return (
                      <ControlItem
                        key={technique._esa_nis2requirement_value}
                        sepItems={[technique]}
                        onClick={onMaturityClick}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
