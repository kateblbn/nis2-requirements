import { Tooltip } from "antd";
import { Nis2Requirements, Nis2ToMmSepAndBu } from "../maturity-model/Data";
import "./ArticlesView.css";
import TechniqueItem from "./TechniqueItem";
import Nis2MappingMm from "./Nis2MappingMm";
import {} from "./Nis2MappingMm.css";
import SelectPage from "./SelectPage";

type ArticlesViewProps = {
  articles: Nis2Requirements[];
  onClick: () => void;
  isActive: boolean;
  id: string;
  nis2ToSepMmTable: [string, Nis2ToMmSepAndBu[]][];
};

export default function ArticlesView({
  articles,
  onClick,
  isActive,
  id,
  nis2ToSepMmTable,
}: ArticlesViewProps) {
  const relatedTechniques = nis2ToSepMmTable
    ?.filter(
      (item) => item[1].map((x) => x._esa_nis2requirement_value === id) // _esa_nis2requirement_value === id
    )
    .flatMap((x) => x[1]);
  console.log(articles);

  console.log(relatedTechniques);
  console.log(id);

  const reducedRelatedTechniques = relatedTechniques.reduce<Nis2ToMmSepAndBu[]>(
    (acc, current) => {
      const requirementValue = current.sep.esa_mmcontrol;

      // If the requirement value is not in the accumulator, add it
      if (!acc.some((item) => item.sep.esa_mmcontrol === requirementValue)) {
        acc.push(current);
      }

      return acc;
    },
    []
  );

  console.log(reducedRelatedTechniques);

  const handleTechniqueItemClick = (mmId: string) => {
    console.log("Technique Item Clicked:", mmId);
  };

  return (
    <>
      <div className="article-container">
        <button
          className="main-button"
          onClick={onClick}
          key={articles[0].esa_nis2requirementid}
        >
          <div className="wrapper">
            <div className="box">
              Article{" "}
              <span className="number">{articles[0].esa_articlenumber}</span> :
            </div>
            <div className="name">{articles[0].esa_articlename}</div>
          </div>
        </button>
        {/* <Nis2MappingMm nis2ToSepMmTable={nis2ToSepMmTable} />; */}
        <div className="description-wrapper">
          {isActive && (
            <p className="description">
              {articles.length < 2 ? (
                <>
                  <div key={id} className="subarticles">
                    {articles[0]?.esa_name}{" "}
                  </div>
                  <div className="technique-items-wrapper">
                    {reducedRelatedTechniques?.length == 0 ? (
                      <SelectPage />
                    ) : (
                      reducedRelatedTechniques?.map((technique, index) => {
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
                    )}
                  </div>
                </>
              ) : (
                //ARTICLE 21
                <div className="subarticle21-wrapper">
                  {articles.map((article, index) => {
                    const slicedLiteral = article.esa_requirementid.slice(5);

                    const articleId = article.esa_nis2requirementid;
                    console.log(article.esa_nis2requirementid);

                    return (
                      <div className="subarticles-columns">
                        <Tooltip
                          key={articleId}
                          title={<div className="item">{article.esa_name}</div>}
                        >
                          <div className="subarticle21" key={articleId}>
                            <div className="slicedLiteral">{slicedLiteral}</div>
                            <div className="item">
                              {article.esa_name}
                            </div>
                          </div>
                        </Tooltip>
                        <div className="technique-items-wrapper-forsubarticle21">
                          {reducedRelatedTechniques
                            ?.filter(
                              (x) => x._esa_nis2requirement_value === article.esa_nis2requirementid
                            )
                            .map((technique) => {
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
              )}
            </p>
          )}
        </div>
      </div>
    </>
  );
}
