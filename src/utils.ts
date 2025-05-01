import { Nis2ToSepModel } from "./assets/components/maturity-model/Data";

export function FinalDataGroupedByChapters(finalData: Nis2ToSepModel[]) {
  return finalData.reduce((acc: Map<string, Nis2ToSepModel[]>, control) => {
    const yearDate = new Date(control.sep.esa_date).getFullYear();
    // console.log(yearDate);
    const updatedControl = {
      ...control,
      control_date: yearDate,
      maturitymodel: {
        ...control.mm,
        esa_chapter: control.mm.esa_chapter.replace(/^\d+\.\s/, ""),
      },
    };

    const key = updatedControl.maturitymodel.esa_chapter;
    if (acc.has(key)) acc.get(key)!.push(updatedControl);
    else acc.set(key, [updatedControl]);
    // }
    return acc;
  }, new Map<string, Nis2ToSepModel[]>());
}
