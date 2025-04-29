import { SepModel, TaGroupAndCategory } from "./Data";

export function getUniqueCategories(
  actorCategoryData: TaGroupAndCategory[]
): string[] {
  return actorCategoryData.reduce((acc: string[], category) => {
    if (!acc.includes(category.taCategory.esa_name))
      acc.push(category.taCategory.esa_name);
    return acc;
  }, []);
}

// unique period (year)

export function getUniqueYears(maturityData: SepModel[]) {
  const uniquePeriod: number[] = maturityData.reduce((acc: number[], x) => {
    if (!acc.includes(x.esa_date.getFullYear()))
      acc.push(x.esa_date.getFullYear());
    return acc;
  }, []);
  // modified year
  return uniquePeriod;
}

//unique Actors


export function getUniqueBus(maturityData: SepModel[]): string[] {
  return maturityData.reduce((acc: string[], e) => {
    if (!acc.includes(e.bu.name)) acc.push(e.bu.name);
    return acc;
  }, []);
}
