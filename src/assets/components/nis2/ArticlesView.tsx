import { Button } from "antd/es/radio";
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
            <p className="name">{articles[0].esa_articlename}</p>
          </div>
        </button>
        <div className="description-wrapper">
          {isActive && (
            <p className="description">
              {articles.map((x) => (
                <div>{x.esa_name}</div>
              ))}
            </p>
          )}
        </div>
      </div>
    </>
  );
}
