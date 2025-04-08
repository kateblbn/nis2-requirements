import ArticlesView from "./ArticlesView";
import MainHeaderInMatrix from "../MainHeaderInMatrix";
import { Nis2Model } from "../maturity-model/Data";
import { useState } from "react";
import "./Nis2ViewMatrix.css";

type Nis2ViewMatrixProps = {
  nis2model: Nis2Model[] | undefined;
};
export default function Nis2ViewMatrix({ nis2model }: Nis2ViewMatrixProps) {
  const [activeArticle, setActiveArticle] = useState<string | null>(null);
  const groupedArticles = nis2model?.reduce((acc: any, article) => {
    const key: any = article.esa_articlename;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(article);
    return acc;
  }, {});
  console.log(groupedArticles);

  const handleActiveArticle = (article: string) => {
    setActiveArticle((item) => (item === article ? null : article));
  };
  return (
    <>
      <MainHeaderInMatrix title="NIS2 Directive Chapter IV: CyberSecurity Rist-Management Measures And Reporting Obligations" />
      <div className="nis2-matrix-container">
        {groupedArticles &&
          Object.keys(groupedArticles).map((article) => {
            return (
              <ArticlesView
                isActive={activeArticle === article}
                key={article}
                articles={groupedArticles[article]}
                onClick={() => handleActiveArticle(article)}
              />
            );
          })}
      </div>
    </>
  );
}
