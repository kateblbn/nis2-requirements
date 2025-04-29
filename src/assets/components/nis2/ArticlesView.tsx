import { Tooltip } from "antd";
import { Nis2Requirements, Nis2ToMmSepAndBu } from "../maturity-model/Data";
import "./ArticlesView.css";
import TechniqueItem from "./TechniqueItem";
import Nis2MappingMm from "./Nis2MappingMm";
import {} from "./Nis2MappingMm.css";
import SelectPage from "./SelectPage";

type ArticlesViewProps = {
  requirementGuids: string[];
  selectedArticleNumber: number;
  nis2ToSepMmTable: Nis2ToMmSepAndBu[];
  allNis2Requirements: Nis2Requirements[];
};

export default function ArticlesView({
  requirementGuids,
  selectedArticleNumber,
  nis2ToSepMmTable,
  allNis2Requirements,
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
          <Nis2MappingMm  />
                <div className="technique-items-wrapper">
                  {maturityScores == undefined ? (
                    <SelectPage />
                  ) : (
                    maturityScores?.map((technique, index) => {
                      console.log(technique._esa_nis2requirement_value);

                      return (
                        <TechniqueItem
                          key={technique._esa_nis2requirement_value}
                          id={technique.mm.esa_controlid}
                          name={technique.mm?.esa_controlname}
                          count={technique.sep?.esa_score}
                          onClick={() =>
                            handleTechniqueItemClick(
                              technique._esa_nis2requirement_value
                            )
                          }
                        />
                      );
                    })
                  ) 

                  }
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
        <Nis2MappingMm  />
        <div className="subarticle-21-columns-wrapper">
        {requirementGuids.map((requirementGuid, index) => {
          const seps = groupedByRequirement.get(requirementGuid);

          const requirement = allNis2Requirements.find(
            (x) => x.esa_nis2requirementid === requirementGuid
          )!.esa_name;
          const requirementLiteral = allNis2Requirements.find(
            (x) => x.esa_nis2requirementid === requirementGuid
          )!.esa_requirementid.slice(5);
          
          return (
            <div className="subarticles-columns">
              <Tooltip title={<div className="item">{requirement}</div>}>
                <div className="subarticle21">
                  <div className="slicedLiteral">{requirementLiteral}</div>
                  <div className="item">{requirement}</div>
                </div>
              </Tooltip>
              <div className="technique-items-wrapper-forsubarticle21">
                {seps!.map((technique) => {
                  console.log(technique._esa_nis2requirement_value);

                  return (
                    <TechniqueItem
                      key={technique._esa_nis2requirement_value}
                      id={technique.mm.esa_controlid}
                      name={technique.mm?.esa_controlname}
                      count={technique.sep?.esa_score}
                      onClick={() =>
                        handleTechniqueItemClick(
                          technique._esa_nis2requirement_value
                        )
                      }
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
