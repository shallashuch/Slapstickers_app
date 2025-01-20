import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import Photocamera from "../../components/Photocamera";
import { SvgFilters } from "../../constants/SvgFilters";
import { useWebcamCapture } from "../../constants/useWebcamCapture";

function PhotocameraModal(props) {
  const [sticker, setSticker] = useState();

  const [
    handleVideoRef,
    handleCanvasRef,
    handleCapture,
    handleFilterBtnRef,
    removeSticker,
  ] = useWebcamCapture(
    sticker?.img,
    props.title,
    (newPicture) => {
      props.setLatestPicture(newPicture);
      props.setShowLatestModal(true);
      props.setTitle("");
    },
    setSticker,
    props.setLatestPicture
  );

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      centered
      className="photo-camera-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>SLACK YOURSELF!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Photocamera
          handleVideoRef={handleVideoRef}
          handleCanvasRef={handleCanvasRef}
          handleCapture={handleCapture}
          handleFilterBtnRef={handleFilterBtnRef}
          removeSticker={removeSticker}
          sticker={sticker}
          setSticker={setSticker}
        />
      </Modal.Body>
      <SvgFilters />
    </Modal>
  );
}

export default PhotocameraModal;
