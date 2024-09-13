import React from "react";
import { Modal } from "react-bootstrap";
import GiveAName from "../GiveAName";

function CapturedPhotoModal(props) {
  return (
    <Modal
      show={props.show}
      onHide={props.cancelPhoto}
      centered
      className="last-photo-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          ✨ <span>Check yourselft out</span> ✨
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <GiveAName title={props.title} setTitle={props.setTitle} />
        <div className="modal-img">
          {props.latestPicture && (
            <img
              src={props.latestPicture.dataUri}
              alt="Latest Captured"
              className="photo-captured"
            />
          )}
        </div>
        <div className="modal-buttons">
          <button onClick={props.savePhoto} className="btn-save">
            Save
          </button>
          <button onClick={props.cancelPhoto} className="btn-cancel">
            Retake
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default CapturedPhotoModal;
