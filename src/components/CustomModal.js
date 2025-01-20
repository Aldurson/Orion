import React from "react";
import { Modal } from "react-bootstrap";

import {
  CustomBody,
  CustomFoot,
  CustomHead,
} from "./modal/modalComponents/CustomMods.js";

export const CustomModal = ({ active, setActive, station }) => {
  function closeModal() {
    setActive(false);
  }

  return (
    <Modal
      show={active}
      onHide={closeModal}
      animation={true}
      size="xl"
      centered={true}
    >
      <CustomHead station={station} />
      <CustomBody station={station} />
      <CustomFoot closeModal={closeModal} />
    </Modal>
  );
};
