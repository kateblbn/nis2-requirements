import {
  ChapterData,
  IsoControlApiModel,
  MitreEnterpriseApiModel,
  Nis2Requirements,
  Nis2ToSepModel,
  NistControlApiModel,
} from "../components/maturity-model/Data";

export interface IRepository {
  getChapterData(): Promise<ChapterData[]>;
}
export interface IRepository {
  getIsoStandart(maturityGuid: string): Promise<IsoControlApiModel[]>;
}
export interface IRepository {
  getNistControls(maturityGuid: string): Promise<NistControlApiModel[]>;
}
export interface IRepository {
  getMitreTechniques(maturityGuid: string): Promise<MitreEnterpriseApiModel[]>;
}
export interface IRepository {
  getNis2Requirements(): Promise<Nis2Requirements[]>;
}
export interface IRepository {
  getNis2ToSepTable(): Promise<Nis2ToSepModel[]>;
}
