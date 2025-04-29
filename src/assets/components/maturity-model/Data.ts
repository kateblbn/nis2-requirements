export type Nis2ToMmSepAndBu = {
  "@odata.etag": 'W/"12526594"';
  esa_nis2toisoid: string;
  _esa_nis2requirement_value: string;
  bu: {
    name: string;
  };
  mm: {
    esa_controlname: string;
    esa_controlid: string;
    esa_chapter: string;
  };
  sep: {
    esa_score: number;
    esa_mmcontrol: string;
    esa_date: Date;
  };
};

export type Nis2Requirements = {
  "@odata.etag": string;
  esa_articlename: string;
  esa_articlenumber: number;
  esa_name: string;
  esa_requirementid: string;
  esa_nis2requirementid: string;
};

export type SepModel = {
  "@odata.etag": string;
  esa_sepid: string;
  esa_date: Date;
  esa_score: number;
  maturitymodel: {
    esa_chapter: string;
    esa_controlid: string;
    esa_telenormaturitymodelid: string;
    esa_controlname: string;
  };
  bu: {
    name: string;
  };
};
export type ChapterData = {
  "@odata.etag": 'W/"12526594"';
  esa_chapter: string;
};
export type TaGroupAndCategory = {
  "@odata.etag": 'W/"12526594"';
  esa_controlid: string;
  esa_telenormaturitymodelid: string;
  esa_chapter: string;
  taGroup: {
    esa_name: string;
    esa_othernames: string;
    category: {
      esa_name: string;
    };
  };
  taCategory: {
    esa_name: string;
  };
};
export type IsoStandart = {
  "@odata.etag": 'W/"12519673"';
  esa_isocontrolid_value: string;
  esa_mmtoisoid: string;
  esa_iso270012022id: string;
  esa_controlid: string;
  esa_controlname: string;
};
export type IsoControlApiModel = {
  isoControl: IsoStandart;
};

export type NistControl = {
  "@odata.etag": string;
  esa_nist80053id: string;
  esa_controlid: string;
  esa_controlname: string;
};

export type NistControlApiModel = {
  nistControls: NistControl;
};
export type MitreEnterprise = {
  "@odata.etag": string;
  esa_mmtoisoid: string;
  esa_mitreid: string;
  esa_name: string;
};

export type MitreEnterpriseApiModel = {
  mitreTechniques: MitreEnterprise;
};

export function mapNestedKeys<T extends Record<string, any>>(
  obj: Record<string, any>,
  dateKeys?: string[]
): T {
  const result: any = {};

  for (const key in obj) {
    const value = obj[key];
    const parts = key.split(".");
    let current: any = result;

    for (let i = 0; i < parts.length - 1; i++) {
      if (!current[parts[i]]) {
        current[parts[i]] = {}; // Create nested object if missing
      }
      current = current[parts[i]];
    }

    const lastKey = parts[parts.length - 1];

    // If the corresponding type in typeRef is Date, convert value to Date
    if (dateKeys && dateKeys.includes(lastKey)) {
      current[lastKey] = new Date(value);
    } else {
      current[lastKey] = value;
    }
  }

  return result;
}
