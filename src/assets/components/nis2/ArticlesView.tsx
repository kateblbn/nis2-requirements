import { Tooltip } from "antd";
import { Nis2Requirements, Nis2ToMmSepAndBu } from "../maturity-model/Data";
import "./ArticlesView.css";
import TechniqueItem from "./TechniqueItem";
import Nis2MappingMm from "./Nis2MappingMm";
import {} from "./Nis2MappingMm.css";
import SelectPage from "./SelectPage";

type ArticlesViewProps = {
  bu: string;
  articles: Nis2Requirements[];
  onClick: () => void;
  isActive: boolean;
  id: string;
  nis2ToSepMmTable: [string, Nis2ToMmSepAndBu[]][];
};

export default function ArticlesView({
  bu,
  articles,
  onClick,
  isActive,
  id,
  nis2ToSepMmTable,
}: ArticlesViewProps) {
  console.log(nis2ToSepMmTable);

  const relatedTechniques = nis2ToSepMmTable
    ?.filter(
      (item) => item[1].map((x) => x._esa_nis2requirement_value === id) // _esa_nis2requirement_value === id
    )
    .flatMap((x) => x[1]);
  console.log(relatedTechniques.length);

  const handleTechniqueItemClick = (mmId: string) => {
    console.log("Technique Item Clicked:", mmId);
  };

  console.log(isActive);

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
        {/* <Nis2MappingMm nis2ToSepMmTable={nis2ToSepMmTable} />; */}
        <div className="description-wrapper">
          {isActive &&  (
            <p className="description">
              {articles.length < 2 ? (
                <>
                  <div key={id} className="subarticles">
                    {articles[0]?.esa_name}{" "}
                  </div>
                  <div className="technique-items-wrapper">
                    {relatedTechniques?.length == 0 ? (
                      <SelectPage/>
                    ) : (
                      relatedTechniques?.map((technique, index) => {
                        console.log(technique);

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
                <div className="subarticle21-wrapper">
                  {articles.map((article, index) => {
                    const slicedLiteral = article.esa_requirementid.slice(5);
                    const articleId = article.esa_nis2requirementid;

                    return (
                      <div className="subarticles-columns">
                        <Tooltip
                          key={articleId}
                          title={<div className="item">{article.esa_name}</div>}
                        >
                          <div className="subarticle21">
                            <div className="slicedLiteral">{slicedLiteral}</div>
                            <div key={index} className="item">
                              {article.esa_name}
                            </div>
                          </div>
                        </Tooltip>
                        <div className="technique-items-wrapper-forsubarticle21">
                          {relatedTechniques?.map((technique) => {
                            return (
                              <TechniqueItem
                                key={technique._esa_nis2requirement_value}
                                id={technique.mm.esa_controlid}
                                name={technique.mm?.esa_controlname}
                                count={technique.sep?.esa_score || 0}
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

// return (
//   <>
//     <div className="article-container">
//       <button className="main-button" onClick={onClick}>
//         <div className="wrapper">
//           <div className="box">
//             Article{" "}
//             <span className="number">{articles[0].esa_articlenumber}</span> :
//           </div>
//           <div className="name">{articles[0].esa_articlename}</div>
//         </div>
//       </button>
//       {/* <Nis2MappingMm nis2ToSepMmTable={nis2ToSepMmTable} />; */}

//       <div className="description-wrapper">
//         {isActive && (
//           <p className="description">
//             {articles.length < 2 ? (
//               <>
//                 <div key={id} className="subarticles">
//                   {articles[0]?.esa_name}{" "}
//                 </div>
//                 <div className="technique-items-wrapper">
//                   {relatedTechniques?.map((technique, index) => {
//                     console.log(technique.mm.esa_controlname.length);

//                     if (technique.mm.esa_controlname === 0) {
//                     console.log('yes');

//                     } else console.log('no');

//                     return (
//                       <TechniqueItem
//                         key={technique._esa_nis2requirement_value}
//                         id={technique.mm.esa_controlid}
//                         name={technique.mm?.esa_controlname}
//                         count={technique.sep?.esa_score}
//                         onClick={() =>
//                           handleTechniqueItemClick(
//                             technique._esa_nis2requirement_value
//                           )
//                         }
//                       />
//                     );
//                   })}
//                 </div>
//               </>
//             ) : (
//               <div className="subarticle21-wrapper">
//                 {articles.map((article, index) => {
//                   const slicedLiteral = article.esa_requirementid.slice(5);
//                   const articleId = article.esa_nis2requirementid;

//                   return (
//                     <div className="subarticles-columns">
//                       <Tooltip
//                         key={articleId}
//                         title={<div className="item">{article.esa_name}</div>}
//                       >
//                         <div className="subarticle21">
//                           <div className="slicedLiteral">{slicedLiteral}</div>
//                           <div key={index} className="item">
//                             {article.esa_name}
//                           </div>
//                         </div>
//                       </Tooltip>
//                       <div className="technique-items-wrapper-forsubarticle21">
//                         {relatedTechniques?.map((technique) => {
//                           return (
//                             <TechniqueItem
//                               key={technique._esa_nis2requirement_value}
//                               id={technique.mm.esa_controlid}
//                               name={technique.mm?.esa_controlname}
//                               count={technique.sep?.esa_score || 0}
//                               onClick={() =>
//                                 handleTechniqueItemClick(
//                                   technique._esa_nis2requirement_value
//                                 )
//                               }
//                             />
//                           );
//                         })}
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             )}
//           </p>
//         )}
//       </div>
//     </div>
//   </>
// );
