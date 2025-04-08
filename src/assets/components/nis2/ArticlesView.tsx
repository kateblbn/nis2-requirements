import { Tooltip } from "antd";
import { Nis2Model } from "../maturity-model/Data";
import "./ArticlesView.css";

type ArticlesViewProps = {
  articles: Nis2Model[];
  onClick: () => void;
  isActive: boolean;
};
export default function ArticlesView({
  articles,
  onClick,
  isActive,
}: ArticlesViewProps) {
  console.log(articles);

  return (
    <>
      <div className="article-container">
        <button className="main-button" onClick={onClick}>
          <div className="wrapper">
            <div className="box">
              Article{" "}
              <span className="number">{articles[0].esa_articlenumber}</span> :
            </div>
            <div className="name">{articles[0].esa_articlename}</div>
          </div>
        </button>
        <div className="description-wrapper">
          {isActive && (
            <p className="description">
              {articles.length < 2 ? (
                // <div className="subarticles-wrapper">
                <div className="subarticles">{articles[0]?.esa_name}</div>
              ) : (
                // </div>

                <div className="subarticle21-wrapper">
                  {articles.map((article, index) => {
                    const slicedLiteral = article.esa_requirementid.slice(5);
                    console.log(slicedLiteral);

                    return (
                      <Tooltip
                        title={
                          <div key={index} className="item">
                            {article.esa_name}
                          </div>
                        }
                      >
                        <div className="subarticle21">
                          <div className="slicedLiteral">{slicedLiteral}</div>
                          <div key={index} className="item">
                            {article.esa_name}
                          </div>
                        </div>
                      </Tooltip>
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
