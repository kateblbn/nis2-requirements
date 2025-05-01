import { Modal, Table } from "antd";
import React, { useEffect, useState } from "react";
import {
  IsoStandart,
  MitreEnterprise,
  Nis2Requirements,
  Nis2ToSepModel,
  NistControl,
} from "../Data";
import "./ModalData.css";
import { IRepository } from "../../../repositories/repository-interface";
import Termometer from "./Termometer";
import ModalIsoData from "./ModalIsoData";
import ModalNistData from "./ModalNistData";
import ModalMitreTechniquesData from "./ModalMitreTechniquesData";
import ModalNis2Table from "./ModalNis2Table";

type ModalDataProps = {
  repository: IRepository;
  onClose: () => void;
  nis2SepModels: Nis2ToSepModel[];
  nis2Requirements: Nis2Requirements[];
  showNis2Requirements: boolean;
};
export default function ModalData({
  repository,
  onClose,
  nis2SepModels,
  nis2Requirements,
  showNis2Requirements,
}: ModalDataProps) {
  const [open, setOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isoControls, setIsoControls] = useState<IsoStandart[] | undefined>();
  const [nistControls, setNistControls] = useState<NistControl[] | undefined>();
  const [mitreTechniques, setMitreTechniques] = useState<
    MitreEnterprise[] | undefined
  >();

  useEffect(() => {
    if (nis2SepModels.length == 0) {
      console.error("sepModel is undefined, stopping execution.");
      return;
    } else {
      OpenNewModal();
    }

    async function OpenNewModal() {
      setOpen(true);
      setIsLoading(true);

      const sepModel = nis2SepModels[0];
      const maturityGuid = sepModel!.sep.esa_mmcontrol;

      if (!maturityGuid) {
        console.error("Maturity GUID is missing or undefined");
        return;
      }

      const [isoControlsResponse, nistControlsResponse, maturityModelResponse] =
        await Promise.all([
          repository.getIsoStandart(maturityGuid),
          repository.getNistControls(maturityGuid),
          repository.getMitreTechniques(maturityGuid),
        ]);
      console.log(maturityModelResponse);

      setIsoControls(isoControlsResponse.map((x) => x.isoControl));
      setNistControls(nistControlsResponse.map((x) => x.nistControls));
      setMitreTechniques(maturityModelResponse.map((x) => x.mitreTechniques));

      setIsLoading(false);
    }
  }, [nis2SepModels]);

  const handleClose = () => {
    setOpen(false);
    onClose();
  };
  // console.log(mitreTechniques);

  const sepModel = nis2SepModels[0];
  let title = sepModel!.mm.esa_controlid + " " + sepModel!.mm.esa_controlname;

  // onclick has esa_telenormaturitymodelid
  return (
    <Modal
      className="popup"
      // title={title}
      open={open}
      footer={null}
      width={{
        xs: "90%",
        sm: "90%",
        md: "80%",
        lg: "80%",
        xl: "70%",
        xxl: "60%",
      }}
      onCancel={handleClose}
      loading={isLoading}
    >
      <div>
        <hr style={{ width: "90%" }} />
        <h2>{title}</h2>
        <hr style={{ width: "90%" }} />
      </div>
      <Termometer score={sepModel!.sep.esa_score} />
      {showNis2Requirements && (
        <ModalNis2Table
          nis2Requirements={nis2Requirements}
          nis2SepModels={nis2SepModels}
        />
      )}
      <ModalIsoData isoControls={isoControls} />
      <ModalNistData nistControls={nistControls} />
      <ModalMitreTechniquesData mitreTechniques={mitreTechniques} />
    </Modal>
  );
}
