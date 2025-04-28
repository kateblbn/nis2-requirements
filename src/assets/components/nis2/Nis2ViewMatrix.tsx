import ArticlesView from "./ArticlesView";
import MainHeaderInMatrix from "../MainHeaderInMatrix";
import { Nis2Requirements, Nis2ToMmSepAndBu } from "../maturity-model/Data";
import { useState } from "react";
import "./Nis2ViewMatrix.css";
import SelectPage from "./SelectPage";

type Nis2ViewMatrixProps = {
  bu: string;
  nis2model: Nis2Requirements[] | undefined;
  nis2ToSepMmTable: Nis2ToMmSepAndBu[] | undefined;
};
export default function Nis2ViewMatrix({
  bu,
  nis2model,
  nis2ToSepMmTable,
}: Nis2ViewMatrixProps) {
  const [activeArticle, setActiveArticle] = useState<string | null>(null);

  // continue working with key and table which related to the articles.
  const groupedArticles: Record<string, Nis2Requirements[]> = nis2model?.reduce(
    (acc: any, article) => {
      const key: any = article.esa_articlename;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(article);
      return acc;
    },
    {}
  );
  console.log(groupedArticles);

  const groupedId: Record<string, Nis2ToMmSepAndBu[]> =
    nis2ToSepMmTable?.reduce((acc: any, article) => {
      const key: any = article._esa_nis2requirement_value;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(article);
      return acc;
    }, {});
  console.log(groupedId);

  const handleActiveArticle = (article: string) => {
    setActiveArticle((item) => (item === article ? null : article));
  };
  return (
    <>
      <MainHeaderInMatrix title="NIS2 Directive Chapter IV: CyberSecurity Risk-Management Measures And Reporting Obligations" />
      <div className="nis2-matrix-container">
        {groupedArticles &&
          Object.keys(groupedArticles).map((article) => {
            const articles = groupedArticles[article];
            console.log(articles);

            const requirementIds = Array.from(
              new Set(articles.map((x) => x.esa_nis2requirementid))
            );
            console.log(requirementIds);

            const mmEntries = Object.entries(groupedId).filter(([mmId]) =>
              requirementIds.includes(mmId)
            );
            console.log(mmEntries);

            // const sortedByInstances = mmEntries.sort((a, b) => {
            //   const [, aOccurences] = a;
            //   const [, bOccurences] = b;
            //   return bOccurences.length - aOccurences.length;
            // });
            console.log(activeArticle);
            return (
              <div key={article}>
                <ArticlesView
                  bu={bu}
                  id={articles[0].esa_nis2requirementid}
                  nis2ToSepMmTable={mmEntries}
                  isActive={activeArticle === article}
                  articles={groupedArticles[article]}
                  onClick={() => handleActiveArticle(article)}
                />
              </div>
            );
          })}
      </div>
    </>
  );
}
