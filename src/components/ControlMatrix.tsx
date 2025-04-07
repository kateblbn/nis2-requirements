import ChapterItem from "./ChapterItem";
import { SepModel, ChapterData } from "./Data";
import "./ControlMatrix.css";
import { group, log } from "node:console";
import ControlItem from "./ControlItem";

interface ControlMatrixProps {
  chapters: ChapterData[];
  modelWithControls: Map<string, SepModel[]>;
  onMaturityClick: (value: SepModel) => void;
}
export default function ControlMatrix({
  chapters,
  modelWithControls,
  onMaturityClick,
}: ControlMatrixProps) {
  const updatedChapters = chapters.map((e) => {
    const esaUpdatedChapters = e.esa_chapter.replace(/^\d+\.\s/, "");
    return {
      ...e,
      esaUpdatedChapters,
    };
  });
  // console.log(updatedChapters);
  const uniqueChapters = updatedChapters.reduce((acc: any[], item) => {
    if (!acc.some((e) => e.esaUpdatedChapters == item.esaUpdatedChapters))
      acc.push(item);
    return acc;
  }, []);
  // console.log(uniqueChapters);
  // console.log(modelWithControls);

  return (
    <div className="matrix-container">
      {/* <div className="matrix-header"> */}
      {uniqueChapters.map((chapter, index) => {
        const chapterKey = chapter.esaUpdatedChapters;
        // console.log(chapterKey);

        const controlItems = modelWithControls.get(chapterKey) ?? [];
        const isSpecialChapter = index === 14 || index === 15;

        // console.log(controlItems);
        return (
          <div key={chapter.esaUpdatedChapters} className="chapter-column">
            <div
              className={`header-techniques-wrapper ${
                isSpecialChapter ? "special-chapter" : "mapping-list"
              }`}
            >
              <ChapterItem
                chapter={chapter.esaUpdatedChapters}
                number={index + 1}
              />
            </div>
            <div className="control-item-wrapper">
              {controlItems.map((item) => {
                return (
                  <ControlItem
                    key={item.maturitymodel.esa_chapter}
                    sepItem={item}
                    onClick={onMaturityClick}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
    // </div>
  );
}
