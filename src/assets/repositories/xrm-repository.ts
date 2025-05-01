import {
  ChapterData,
  IsoControlApiModel,
  MitreEnterpriseApiModel,
  Nis2Requirements,
  Nis2ToSepModel,
  NistControlApiModel,
} from "../components/maturity-model/Data";
import { IRepository } from "./repository-interface";
import { mapNestedKeys } from "../components/maturity-model/Data";


export default class XrmRepository implements IRepository {
  private webApi: Xrm.WebApi;

  constructor(xrm: Xrm.XrmStatic) {
    this.webApi = xrm.WebApi;
  }
  async getNis2ToSepTable(): Promise<Nis2ToSepModel[]> {
    const fetchXml: string = `
      <fetch>
        <entity name='esa_nis2toiso'>
          <attribute name="esa_nis2requirement" />
          <link-entity name='esa_mmtoiso' from='esa_isocontrolid' to='esa_isocontrol' alias="iso"  intersect="true">
            <link-entity name='esa_sep' from='esa_mmcontrol' to='esa_mmcontrolid' alias="sep" >
              <attribute name="esa_name" />
              <attribute name="esa_date" />
              <attribute name="esa_score" />
              <attribute name="esa_mmcontrol" />
              <link-entity name='esa_telenormaturitymodel' from='esa_telenormaturitymodelid' to='esa_mmcontrol' alias="mm" >
                <attribute name="esa_controlname" />
                <attribute name="esa_controlid" />
                <attribute name="esa_chapter" />
              </link-entity>
              <link-entity name='businessunit' from='businessunitid' to='owningbusinessunit' alias='bu'>
                <attribute name="name" />
              </link-entity>
            </link-entity>
          </link-entity>
        </entity>
      </fetch>
      `;
    const res: Xrm.RetrieveMultipleResult =
      await this.webApi.retrieveMultipleRecords(
        "esa_nis2toiso",
        `?fetchXml=${encodeURIComponent(fetchXml)}`
      );

    return res.entities.map((x) => mapNestedKeys(x));
  }

  async getNis2Requirements(): Promise<Nis2Requirements[]> {
    const fetchXml: string = `
    <fetch>
      <entity name='esa_nis2requirement'>
        <attribute name="esa_articlename" />
        <attribute name="esa_articlenumber" />
        <attribute name="esa_name" />
        <attribute name="esa_requirementid" />
        <attribute name="esa_nis2requirementid" />
      </entity>
    </fetch>
    `;
    const res: Xrm.RetrieveMultipleResult =
      await this.webApi.retrieveMultipleRecords(
        "esa_nis2requirement",
        `?fetchXml=${encodeURIComponent(fetchXml)}`
      );
    return res.entities.map((x) => mapNestedKeys(x));
  }

  async getMitreTechniques(
    maturityGuid: string
  ): Promise<MitreEnterpriseApiModel[]> {
    const fetchXml: string = `

    <fetch>
    <entity name='esa_mmtoiso'>
      <filter>
        <condition attribute='esa_mmcontrolid' operator='eq'  value='${maturityGuid}'  />
      </filter>
      <attribute name="esa_isocontrolid" />
      <link-entity name='esa_isotonist' from='esa_isocontrolid' to='esa_isocontrolid' intersect='true'  link-type="inner">
        <link-entity name='esa_nisttomitre' from='esa_nistcontrolid' to='esa_nistcontrolid'>
          <link-entity name='esa_mitreenterprise' from='esa_mitreenterpriseid' to='esa_mitreid' alias="mitreTechniques"  >
            <attribute name="esa_mitreid" />
            <attribute name="esa_name" />
          </link-entity>
        </link-entity>
      </link-entity>
    </entity>
  </fetch>
      `;
    const res: Xrm.RetrieveMultipleResult =
      await this.webApi.retrieveMultipleRecords(
        "esa_mmtoiso",
        `?fetchXml=${encodeURIComponent(fetchXml)}`
      );
    return res.entities.map((x) => mapNestedKeys(x));
  }
//group by nis2 requirment guid and link.
  async getNistControls(maturityGuid: string): Promise<NistControlApiModel[]> {
    const fetchXml: string = `
    <fetch>
      <entity name='esa_mmtoiso'>
        <filter>
          <condition attribute='esa_mmcontrolid' operator='eq'  value="${maturityGuid}"  />
        </filter>
        <attribute name="esa_isocontrolid" />
        <link-entity name='esa_isotonist' from='esa_isocontrolid' to='esa_isocontrolid' intersect='true'  link-type="inner">
          <link-entity name='esa_nist80053' from='esa_nist80053id' to='esa_nistcontrolid' alias="nistControls"  intersect='true' >
            <attribute name="esa_nist80053id" />
            <attribute name="esa_controlid" />
            <attribute name="esa_controlname" />
          </link-entity>
        </link-entity>
      </entity>
    </fetch>
    `;
    console.log(fetchXml);

    const res: Xrm.RetrieveMultipleResult =
      await this.webApi.retrieveMultipleRecords(
        "esa_mmtoiso",
        `?fetchXml=${encodeURIComponent(fetchXml)}`
      );
    return res.entities.map((x) => mapNestedKeys(x));
  }

  async getIsoStandart(maturityGuid: string): Promise<IsoControlApiModel[]> {
    const fetchXml: string = `
    <fetch>
      <entity name='esa_mmtoiso'>
        <filter>
          <condition attribute='esa_mmcontrolid' operator='eq'  value='${maturityGuid}' />
        </filter>
        <attribute name="esa_isocontrolid" />
        <link-entity name='esa_iso270012022' from='esa_iso270012022id' to='esa_isocontrolid' alias="isoControl" link-type="inner">
          <attribute name="esa_iso270012022id" />
          <attribute name="esa_controlid" />
          <attribute name="esa_controlname" />
        </link-entity>
      </entity>
    </fetch>

    `;
    const res: Xrm.RetrieveMultipleResult =
      await this.webApi.retrieveMultipleRecords(
        "esa_mmtoiso",
        `?fetchXml=${encodeURIComponent(fetchXml)}`
      );
    return res.entities.map((x) => mapNestedKeys(x));
  }

  async getChapterData(): Promise<ChapterData[]> {
    const fetchXml: string = `
<fetch>
	<entity name='esa_telenormaturitymodel'>
		<attribute name="esa_chapter" />
	</entity>
</fetch>
    `;
    const res: Xrm.RetrieveMultipleResult =
      await this.webApi.retrieveMultipleRecords(
        "esa_telenormaturitymodel",
        `?fetchXml=${encodeURIComponent(fetchXml)}`
      );
    return res.entities.map((x) => mapNestedKeys(x));
  }
}
