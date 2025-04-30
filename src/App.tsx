import { useEffect, useState } from "react";
import "./App.css";
import { TestRepository } from "./assets/repositories/test-repository";
import XrmRepository from "./assets/repositories/xrm-repository";
import {
  ChapterData,
  Nis2Requirements,
  SepModel,
} from "./assets/components/maturity-model/Data";
import ControlMatrix from "./assets/components/maturity-model/ControlMatrix";
import Header from "./assets/components/maturity-model/Header";
import FilterBar from "./assets/components/maturity-model/FilterBu";
import { getUniqueBus } from "./assets/components/maturity-model/FilteringByData";
import ModalData from "./assets/components/maturity-model/popup/ModalData";
import { FilteredDataByPeriodYear, FinalDataGroupedByChapters } from "./utils";
import { Button, Spin, Switch } from "antd";
import Nis2ViewMatrix from "./assets/components/nis2/Nis2ViewMatrix";
import { Nis2ToMmSepAndBu } from "./assets/components/maturity-model/Data";

function App() {
  const [maturityScores, setMaturityScores] = useState<SepModel[]>();
  const [mmChapters, setMmChapters] = useState<ChapterData[]>();
  const [nis2Requirements, setNis2Requirements] =
    useState<Nis2Requirements[]>();
  const [nis2ToSepTable, setNis2ToSepTable] = useState<Nis2ToMmSepAndBu[]>();
  const [selectedView, setSelectedView] = useState<"Nis2" | "MM">("Nis2");
  const [selectedBu, setSelectedBu] = useState<string | undefined>(undefined);
  const [selectedSepModel, setSelectedSepModel] = useState<
    SepModel | undefined
  >();

  const onViewToggle = (checked: boolean) => {
    setSelectedView(checked ? "Nis2" : "MM");
  };

  let repo = import.meta.env.DEV
    ? new TestRepository()
    : new XrmRepository(window.parent.Xrm);

  useEffect(() => {
    repo.getMaturityModel().then((x) => {
      setMaturityScores(x);
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
    });
    repo
      .getChapterData()
      .then((x) => setMmChapters(x))
      .catch((err) => console.error(err));
    repo
      .getNis2Requirements()
      .then((x) => setNis2Requirements(x))
      .catch((err) => console.error(err));
    repo
      .getNis2ToSepTable()
      .then((x) => setNis2ToSepTable(x))
      .catch((err) => console.error(err));
  }, []);

  //add spinner !!!!!!
  if (
    !maturityScores ||
    !mmChapters ||
    !selectedBu ||
    !nis2Requirements ||
    !nis2ToSepTable
  ) {
    return <Spin fullscreen size="large" />;
  }
  //group by BU
  const maturityScoresByBu = Map.groupBy(maturityScores, (item) => {
    return item.bu.name;
  });

  const nis2ToSepByBu = Map.groupBy(nis2ToSepTable!, (item) => {
    return item.bu.name;
  });

  console.log(nis2ToSepByBu);

  //filtering data by Period
  let filteredMaturityScores = maturityScoresByBu.get(selectedBu) ?? [];

  console.log(filteredMaturityScores);

  let filteredNis2ToSep = nis2ToSepByBu.get(selectedBu) ?? [];
  console.log(filteredNis2ToSep);

  //get max year in data in filteredData
  const maturityScoresYears = filteredMaturityScores.map((x) =>
    x.esa_date.getFullYear()
  );
  const latestMaturityScoresYear = Math.max(...maturityScoresYears);

  // filter by max year
  filteredMaturityScores = filteredMaturityScores.filter(
    (x) => x.esa_date.getFullYear() === latestMaturityScoresYear
  );
  console.log(filteredMaturityScores);

  filteredNis2ToSep = filteredNis2ToSep.filter(x => {
    // if it’s already a Date, great; if it’s a string, wrap it in new Date(...)
    const d = x.sep.esa_date instanceof Date
      ? x.sep.esa_date
      : new Date(x.sep.esa_date as any);
  
    return d.getFullYear() === latestMaturityScoresYear;
  });
  console.log(filteredNis2ToSep);

  //change bu with year by default
  function handleBuChange(value: string): void {
    setSelectedBu(value);
  }

  //SEP esa sepID!!!!
  //modal popup

  let modal = null;
  if (selectedSepModel) {
    modal = (
      <ModalData
        repository={repo}
        onClose={() => setSelectedSepModel(undefined)}
        sepModel={selectedSepModel}
      />
    );
  }

  const getSelectText = () => {
    return (
      <div>
        Select an article to expand the list of Telenor Maturity model constrols
      </div>
    );
  };

  console.log(filteredNis2ToSep);

  //minimise app.tsx use with functions!
  return (
    <>
      <Header title="NIS2" description="description">
        <div />
        <FilterBar
          buOptions={getUniqueBus(maturityScores)}
          onBuChange={handleBuChange}
          selectedBu={selectedBu}
        />
        <div className="toggle-wrapper">
          <div>Maturity Model</div>
          <Switch
            className="main-switch"
            checked={selectedView === "Nis2"}
            onChange={onViewToggle}
          />
          <div>NIS2</div>

          {/* <Button onClick={() => setSwitchControls(1)}>NIS2 view</Button>
          <Button onClick={() => setSwitchControls(2)}>
            Maturity Model view
          </Button> */}
          <Button type="text" onClick={() => setSelectedView("Nis2")}>
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
      <div style={{ width: "95%", margin: "0 auto", height: "100vh" }}>
        {selectedView === "Nis2" && (
          <Nis2ViewMatrix
            nis2Requirements={nis2Requirements}
            nis2ToSepMmTable={filteredNis2ToSep}
          />
        )}
        {selectedView === "MM" && (
          <ControlMatrix
            chapters={mmChapters}
            modelWithControls={filteredMaturityScores}
            onMaturityClick={setSelectedSepModel}
          />
        )}
      </div>
      {modal}
    </>
  );
}

export default App;
