import ChapterItem from "./ChapterItem";
import "./ControlMatrix.css";
import ControlItem from "./ControlItem";
import MainHeaderInMatrix from "../MainHeaderInMatrix";
import { FinalDataGroupedByChapters } from "../../../utils";
import { ChapterData, Nis2ToSepModel } from "./Data";

interface ControlMatrixProps {
  chapters: ChapterData[];
  modelWithControls: Nis2ToSepModel[];
  onMaturityClick: (value: Nis2ToSepModel[]) => void;
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
  const groupedMmByChapters = FinalDataGroupedByChapters(modelWithControls);

  return (
    <>
      <MainHeaderInMatrix title="NIS2 Mapping to Telenor Maturity Model" />
      <div className="matrix-container">
        {/* <div className="matrix-header"> */}
        {uniqueChapters.map((chapter, index) => {
          const chapterKey = chapter.esaUpdatedChapters;
          // console.log(chapterKey);

          const controlItems = groupedMmByChapters.get(chapterKey) ?? [];
          const isSpecialChapter = index === 14 || index === 15;
          const groupedByControlId = Map.groupBy(
            controlItems,
            (item) => item.mm.esa_controlid
          );
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
                {Array.from(groupedByControlId.keys())
                  .sort()
                  .map((controlId) => {
                    const controlItems = groupedByControlId.get(controlId)!;
                    return (
                      <ControlItem
                        key={controlId}
                        sepItems={controlItems}
                        onClick={onMaturityClick}
                      />
                    );
                  })}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
