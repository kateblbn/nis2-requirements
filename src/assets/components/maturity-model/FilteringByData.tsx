// unique period (year)

import { Nis2ToSepModel as Nis2ToSepModel } from "./Data";

export function getUniqueYears(maturityData: Nis2ToSepModel[]) {
  const uniquePeriod: number[] = maturityData.reduce((acc: number[], x) => {
    if (!acc.includes(x.sep.esa_date.getFullYear()))
      acc.push(x.sep.esa_date.getFullYear());
    return acc;
  }, []);
  // modified year
  return uniquePeriod;
}

//unique Actors

export function getUniqueBus(maturityData: Nis2ToSepModel[]): string[] {
  return maturityData.reduce((acc: string[], e) => {
    if (!acc.includes(e.bu.name)) acc.push(e.bu.name);
    return acc;
  }, []);
}
