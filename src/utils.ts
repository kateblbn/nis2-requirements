import { SepModel, TaGroupAndCategory } from "./assets/components/maturity-model/Data";

export function FilteredDataByPeriodYear(
  filteredData: SepModel[],
  selectedPeriod: number
) {
  return filteredData?.filter((x) => {
    if (selectedPeriod !== 0) {
      let year = new Date(x.esa_date).getFullYear();
      return year == selectedPeriod;
    }
    return false;
  });
}

export function FinalDataGroupedByChapters(finalData: SepModel[]) {
  return finalData.reduce((acc: Map<string, SepModel[]>, control) => {
    const yearDate = new Date(control.esa_date).getFullYear();
    // console.log(yearDate);
    const updatedControl = {
      ...control,
      control_date: yearDate,
      maturitymodel: {
        ...control.maturitymodel,
        esa_chapter: control.maturitymodel.esa_chapter.replace(/^\d+\.\s/, ""),
      },
    };

    const key = updatedControl.maturitymodel.esa_chapter;
    if (acc.has(key)) acc.get(key)!.push(updatedControl);
    else acc.set(key, [updatedControl]);
    // }
    return acc;
  }, new Map<string, SepModel[]>());
}

