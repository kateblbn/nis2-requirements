import { useEffect, useState } from "react";
import "./App.css";
import { TestRepository } from "./assets/repositories/test-repository";
import XrmRepository from "./assets/repositories/xrm-repository";
import {
  ChapterData,
  Nis2Model,
  SepModel,
  TaGroupAndCategory,
} from "./assets/components/maturity-model/Data";
import ControlMatrix from "./assets/components/maturity-model/ControlMatrix";
import Header from "./assets/components/maturity-model/Header";
import FilterBar from "./assets/components/maturity-model/FilterBu";
import { getUniqueBus } from "./assets/components/maturity-model/FilteringByData";
import ModalData from "./assets/components/maturity-model/popup/ModalData";
import { FilteredDataByPeriodYear, FinalDataGroupedByChapters } from "./utils";
import { Button } from "antd";
import Nis2ViewMatrix from "./assets/components/nis2/Nis2ViewMatrix";

function App() {
  const [maturityModelData, setMaturityModelData] = useState<SepModel[]>();
  const [chapters, setChapters] = useState<ChapterData[]>();
  const [taGroupAndCategory, setTaGroupAndCategory] =
    useState<TaGroupAndCategory[]>();
  const [nis2Requirements, setNis2Requirements] = useState<Nis2Model[]>();

  const [switchControls, setSwitchControls] = useState<number>(1);

  const [selectedBu, setSelectedBu] = useState<string | undefined>(undefined);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedActors, setSelectedActors] = useState<string[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<number | undefined>(
    undefined
  );
  const [selectedSepModel, setSelectedSepModel] = useState<
    SepModel | undefined
  >();
  console.log(nis2Requirements);

  let repo = import.meta.env.DEV
    ? new TestRepository()
    : new XrmRepository(window.parent.Xrm);

  useEffect(() => {
    repo.getMaturityModel().then((x) => {
      setMaturityModelData(x);
      const groupedByBu = Map.groupBy(x, (item) => {
        return item.bu.name;
      });

      const bus = Array.from(groupedByBu.keys());

      if (bus.length == 0) {
        return "No data";
      } else if (bus.length == 1) {
        setSelectedBu(bus[0]);
      } else {
        setSelectedBu(bus[0]); //change later!!
      }

      setSelectedPeriod(getLatestYear(bus[0], groupedByBu));
    });
    repo.getChapterData().then((x) => setChapters(x));
    repo.getActorGroupAndCategory().then((x) => setTaGroupAndCategory(x));
    repo.getNis2Requirements().then((x) => setNis2Requirements(x));
  }, []);

  // console.log(selectedPeriod);
  if (
    !maturityModelData ||
    !chapters ||
    !taGroupAndCategory ||
    !selectedBu ||
    !selectedPeriod
  ) {
    return "Loading Data";
  }
  //group by BU
  const groupedByBu = Map.groupBy(maturityModelData, (item) => {
    return item.bu.name;
  });

  //filtering data by Period
  const filteredData = groupedByBu.get(selectedBu) ?? [];
  // console.log(filteredByPeriod);
  const filteredByPeriod = FilteredDataByPeriodYear(
    filteredData,
    selectedPeriod
  );

  let actorCategoryData = taGroupAndCategory;

  if (!actorCategoryData) {
    return [];
  }

  //showing ta actor  values
  if (selectedCategories.length !== 0) {
    actorCategoryData = actorCategoryData.filter((x) =>
      selectedCategories.includes(x.taCategory.esa_name)
    );
  }

  if (selectedActors.length !== 0) {
    actorCategoryData = actorCategoryData.filter((x) => {
      return selectedActors.some((y) => y === x.taGroup.esa_name);
    });
  }

  let finalData = filteredByPeriod;
  if (selectedCategories.length > 0 || selectedActors.length > 0) {
    finalData = filteredByPeriod.filter((x) => {
      const matchedData = actorCategoryData.some(
        (y) => y.esa_controlid == x.maturitymodel.esa_controlid
      );

      return matchedData;
    });
  }

  const groupedByChapters = FinalDataGroupedByChapters(finalData);

  //change bu with year by default
  function handleBuChange(value: string): void {
    setSelectedBu(value);
    setSelectedPeriod(getLatestYear(value, groupedByBu));
  }
  function getLatestYear(
    buName: string,
    dataGroupedByBU: Map<string, SepModel[]>
  ): number {
    const allYearsForBu = dataGroupedByBU
      .get(buName)!
      .map((x) => x.esa_date.getFullYear());
    return Math.max(...allYearsForBu);
  }

  //SEP esa sepID!!!!
  //modal popup
  let modal = null;
  if (selectedSepModel) {
    if (finalData) {
      modal = (
        <ModalData
          repository={repo}
          onClose={() => setSelectedSepModel(undefined)}
          sepModel={selectedSepModel}
        />
      );
    }
  }
  const getSelectText = () => {
    return (
      <div>
        Select an article to expand the list of Telenor Maturity model constrols
      </div>
    );
  };

  //minimise app.tsx use with functions!
  return (
    <>
      <Header title="NIS2" description="description">
        <div />
        <FilterBar
          buOptions={getUniqueBus(maturityModelData)}
          onBuChange={handleBuChange}
          selectedBu={selectedBu}
        />
        <div>
          <Button onClick={() => setSwitchControls(1)}>NIS2 view</Button>
          <Button onClick={() => setSwitchControls(2)}>
            Maturity Model view
          </Button>
          <Button type="text" onClick={() => setSwitchControls(3)}>
            <svg
              style={{ width: "20px", fill: "white" }}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M125.7 160l50.3 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L48 224c-17.7 0-32-14.3-32-32L16 64c0-17.7 14.3-32 32-32s32 14.3 32 32l0 51.2L97.6 97.6c87.5-87.5 229.3-87.5 316.8 0s87.5 229.3 0 316.8s-229.3 87.5-316.8 0c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0c62.5 62.5 163.8 62.5 226.3 0s62.5-163.8 0-226.3s-163.8-62.5-226.3 0L125.7 160z" />
            </svg>
          </Button>
        </div>
      </Header>
      {switchControls === 2 && (
        <ControlMatrix
          chapters={chapters}
          modelWithControls={groupedByChapters}
          onMaturityClick={setSelectedSepModel}
        />
      )}
      {switchControls === 3 && getSelectText()}
      {switchControls === 1 && <Nis2ViewMatrix nis2model={nis2Requirements} />}
      {modal}
    </>
  );
}

export default App;
