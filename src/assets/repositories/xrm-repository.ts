import {
  ChapterData,
  IsoControlApiModel,
  IsoStandart,
  MitreEnterpriseApiModel,
  NistControlApiModel,
  SepModel,
  TaGroupAndCategory,
} from "../components/Data";
import { IRepository } from "./repository-interface";
import { mapNestedKeys } from "../components/Data";

export default class XrmRepository implements IRepository {
  private webApi: Xrm.WebApi;

  constructor(xrm: Xrm.XrmStatic) {
    this.webApi = xrm.WebApi;
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
  } /*

      
<fetch>
	<entity name='esa_mmtoiso'>
		<filter>
			<condition attribute='esa_mmcontrolid' operator='eq'  value='269c235f-f8e2-ee11-904d-0022489ba240'  />
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


MITRE Techniques 


<fetch>
	<entity name='esa_mmtoiso'>
		<filter>
			<condition attribute='esa_mmcontrolid' operator='eq'  value='269c235f-f8e2-ee11-904d-0022489ba240'  />
		</filter>
		<attribute name="esa_isocontrolid" />
		<link-entity name='esa_isotonist' from='esa_isocontrolid' to='esa_isocontrolid' intersect='true'  link-type="inner">
			<link-entity name='esa_nisttomitre' from='esa_nistcontrolid' to='esa_nistcontrolid' intersect='true' >
				<link-entity name='esa_mitreenterprise' from='esa_mitreenterpriseid' to='esa_mitreid' alias="mitre"  intersect='true' >
					<attribute name="esa_mitreid" />
					<attribute name="esa_name" />
				</link-entity>
			</link-entity>
		</link-entity>
	</entity>
</fetch>
  */
  async getActorGroupAndCategory(): Promise<TaGroupAndCategory[]> {
    const fetchXml: string = `
    <fetch distinct="true">
      <entity name='esa_telenormaturitymodel'>
        <attribute name="esa_chapter" />
        <attribute name="esa_controlid" />
        <link-entity name='esa_mmtoiso' from='esa_mmcontrolid' to='esa_telenormaturitymodelid' intersect='true' link-type="inner">
          <link-entity name='esa_iso270012022' from='esa_iso270012022id' to='esa_isocontrolid' intersect='true' link-type="inner">
            <link-entity name='esa_isotonist' from='esa_isocontrolid' to='esa_iso270012022id' intersect='true' link-type="inner">
              <link-entity name='esa_nist80053' from='esa_nist80053id' to='esa_nistcontrolid' intersect='true' link-type="inner">
                <link-entity name='esa_nisttomitre' from='esa_nistcontrolid' to='esa_nist80053id' intersect='true' link-type="inner">
                  <link-entity name='esa_mitreenterprise' from='esa_mitreenterpriseid' to='esa_mitreid' intersect='true' link-type="inner">
                    <link-entity name='esa_threatactorttps' from='esa_mitreid' to='esa_mitreenterpriseid' intersect='true' link-type="inner">
                      <link-entity name='esa_threatactorgroup' from='esa_threatactorgroupid' to='esa_tagroup' alias="taGroup" link-type="inner">
                        <attribute name="esa_name" />
                        <attribute name="esa_othernames" /> 
                        <link-entity name="esa_threatactorcategory" from="esa_threatactorcategoryid" to="esa_threatactorcategory" alias="taCategory">
                          <attribute name="esa_name" />
                        </link-entity>
                      </link-entity>
                    </link-entity>
                  </link-entity>
                </link-entity>
              </link-entity>
            </link-entity>
          </link-entity>
        </link-entity>
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

  async getMaturityModel(): Promise<SepModel[]> {
    const fetchXml: string = `
    <fetch>
      <entity name='esa_sep'>
        <attribute name="esa_score" />
        <attribute name="esa_date" />
        <link-entity name="esa_telenormaturitymodel" from="esa_telenormaturitymodelid" to="esa_mmcontrol" alias="maturitymodel">
					<attribute name="esa_telenormaturitymodelid" />
          <attribute name="esa_chapter" />
          <attribute name="esa_controlid" />
          <attribute name="esa_controlname" />
        </link-entity>
        <link-entity name="businessunit" from="businessunitid" to="owningbusinessunit" alias="bu">
          <attribute name="name" />
        </link-entity>
      </entity>
    </fetch>
            `;
    const res: Xrm.RetrieveMultipleResult =
      await this.webApi.retrieveMultipleRecords(
        "esa_sep",
        `?fetchXml=${encodeURIComponent(fetchXml)}`
      );
    return res.entities.map((x) => mapNestedKeys(x, ["esa_date"]));
  }
}
