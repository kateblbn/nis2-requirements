import './ArticleButton.css'

type ArticlesViewProps = {
  articleNumber: number;
  articleName: string;
  onClick: (articleNumber: number) => void;
};
export default function ArticleButton({
  articleNumber,
  articleName,
  onClick,
}: ArticlesViewProps) {
  return (
    <div className='button-wrapper'>
      <button className="main-button" onClick={() => onClick(articleNumber)}>
        <div className="wrapper">
          <div className="box">
            Article <span className="number">{articleName}</span> :
          </div>
          <div className="name">{articleNumber}</div>
        </div>
      </button>
    </div>
  );
}
