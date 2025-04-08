import {
  ChapterData,
  IsoControlApiModel,
  MitreEnterpriseApiModel,
  Nis2Model,
  NistControlApiModel,
  SepModel,
  TaGroupAndCategory,
} from "../components/Data";

export interface IRepository {
  getMaturityModel(): Promise<SepModel[]>;
}
export interface IRepository {
  getChapterData(): Promise<ChapterData[]>;
}
export interface IRepository {
  getActorGroupAndCategory(): Promise<TaGroupAndCategory[]>;
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
  getNis2Requirements(): Promise<Nis2Model[]>;
}

