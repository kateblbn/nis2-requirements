import { Modal, Table } from "antd";
import React, { useEffect, useState } from "react";
import {
  IsoControlApiModel,
  IsoStandart,
  MitreEnterprise,
  MitreEnterpriseApiModel,
  NistControl,
  SepModel,
} from "../Data";
import "./ModalData.css";
import { IRepository } from "../../../repositories/repository-interface";
import Termometer from "./Termometer";
import ModalIsoData from "./ModalIsoData";
import ModalNistData from "./ModalNistData";
import ModalMitreTechniquesData from "./ModalMitreTechniquesData";

type ModalDataProps = {
  repository: IRepository;
  onClose: () => void;
  sepModel: SepModel | undefined;
};
export default function ModalData({
  repository,
  onClose,
  sepModel,
}: ModalDataProps) {
  const [open, setOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isoControls, setIsoControls] = useState<IsoStandart[] | undefined>();
  const [nistControls, setNistControls] = useState<NistControl[] | undefined>();
  const [mitreTechniques, setMitreTechniques] = useState<
    MitreEnterprise[] | undefined
  >();

  useEffect(() => {
    if (!sepModel) {
      console.error("sepModel is undefined, stopping execution.");
      return;
    } else {
      OpenNewModal();
    }

    async function OpenNewModal() {
      setOpen(true);
      setIsLoading(true);

      const maturityGuid = sepModel?.maturitymodel.esa_telenormaturitymodelid;

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
  }, [sepModel]);

  const handleClose = () => {
    setOpen(false);
    onClose();
  };
  // console.log(mitreTechniques);

  let title =
    sepModel!.maturitymodel.esa_controlid +
    " " +
    sepModel!.maturitymodel.esa_controlname;

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
      <Termometer score={sepModel!.esa_score} />
      <ModalIsoData isoControls={isoControls} />
      <ModalNistData nistControls={nistControls} />
      <ModalMitreTechniquesData mitreTechniques={mitreTechniques} />
    </Modal>
  );
}
