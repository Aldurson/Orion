import {
  ModalHeader,
  ModalBody,
  ModalTitle,
  ModalFooter,
  Button,
} from "react-bootstrap";

export const CustomHead = ({ station }) => {
  return (
    <ModalHeader>
      <ModalTitle>
        {typeof station.title_modal === "function"
          ? station.title_modal()
          : station.title_modal}{" "}
      </ModalTitle>
    </ModalHeader>
  );
};
export const CustomBody = ({ station }) => {
  function bookBody() {
    return (
      <p>
        {typeof station.body_modal != "function"
          ? station.body_modal
          : station.body_modal()}
      </p>
    );
  }

  return <ModalBody>{station.body_modal()}</ModalBody>;
};
export const CustomFoot = ({ closeModal }) => {
  return (
    <ModalFooter>
      <Button variant="outline-danger" onClick={closeModal}>
        Close
      </Button>
    </ModalFooter>
  );
};
