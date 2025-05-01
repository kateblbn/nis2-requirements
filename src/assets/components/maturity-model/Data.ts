export type Nis2ToSepModel = {
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
  esa_articlename: string;
  esa_articlenumber: number;
  esa_name: string;
  esa_requirementid: string;
  esa_nis2requirementid: string;
};

export type ChapterData = {
  esa_chapter: string;
};

export type IsoStandart = {
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
  esa_nist80053id: string;
  esa_controlid: string;
  esa_controlname: string;
};

export type NistControlApiModel = {
  nistControls: NistControl;
};
export type MitreEnterprise = {
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
