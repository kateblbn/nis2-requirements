import ArticlesView from "./ArticlesView";
import MainHeaderInMatrix from "../MainHeaderInMatrix";
import {
  Nis2Requirements as Nis2Requirement,
  Nis2ToSepModel,
} from "../maturity-model/Data";
import { useState } from "react";
import "./Nis2ViewMatrix.css";
import "./SelectPage.css";
import ArticleButton from "./ArticleButtons";

type Nis2ViewMatrixProps = {
  nis2Requirements: Nis2Requirement[];
  nis2ToSepMmTable: Nis2ToSepModel[];
  onMaturityClick: (value: Nis2ToSepModel[]) => void;
  activeArticleNumber: number | null;
  setActiveArticleNumber: React.Dispatch<React.SetStateAction<number | null>>
};
export default function Nis2ViewMatrix({
  nis2Requirements,
  nis2ToSepMmTable,
  onMaturityClick,
  activeArticleNumber,
  setActiveArticleNumber
}: Nis2ViewMatrixProps) {
  console.log(nis2Requirements);
  console.log(nis2ToSepMmTable);

  // continue working with key and table which related to the articles.
  const groupedByArticleNumber = Map.groupBy(
    nis2Requirements,
    (x) => x.esa_articlenumber
  );
  console.log(groupedByArticleNumber);
  const activeNis2Guids = activeArticleNumber
    ? nis2Requirements
        .filter((x) => x.esa_requirementid.startsWith(activeArticleNumber + ""))
        .map((y) => y.esa_nis2requirementid)
    : [];

    console.log(activeNis2Guids);
    
  const activeNis2Seps = nis2ToSepMmTable.filter((x) =>
    activeNis2Guids.includes(x._esa_nis2requirement_value)
  );

  Map.groupBy(nis2ToSepMmTable, (x) => x._esa_nis2requirement_value);

  console.log(nis2Requirements);
  console.log(activeArticleNumber);

  const handleActiveArticle = (article: number) => {
    setActiveArticleNumber((item) => (item === article ? null : article));
  };
  return (
    <>
      <MainHeaderInMatrix title="NIS2 Directive Chapter IV: CyberSecurity Risk-Management Measures And Reporting Obligations" />
      <div className="nis2-matrix-container">
        <div className="buttons">
          {groupedByArticleNumber &&
            Array.from(groupedByArticleNumber.keys()).map((articleNumber) => {
              const articles = groupedByArticleNumber.get(articleNumber);
              console.log(articles);
              const articleKeys = articles!.map((x) => x.esa_nis2requirementid);
              console.log(articleKeys);

              return (
                <ArticleButton
                  articleName={articles![0].esa_articlename}
                  articleNumber={articleNumber}
                  onClick={handleActiveArticle}
                />
              );
            })}
        </div>
        {activeArticleNumber === null && (
          <div className="no-data-wrapper selecting">
            <div className="no-data">
              Select an Article to expand the list of <br /> Telenor Maturity
              model constrols
            </div>
          </div>
        )}

        {activeArticleNumber && (
          <div className="article-view">
            <ArticlesView
              key={activeNis2Guids[0]}
              allNis2Requirements={nis2Requirements}
              selectedArticleNumber={activeArticleNumber}
              nis2ToSepMmTable={activeNis2Seps}
              requirementGuids={activeNis2Guids}
              onMaturityClick={onMaturityClick}
            />
          </div>
        )}
      </div>
    </>
  );
}
