import React, { useState, useEffect } from "react";
import "../assets/scss/App.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder, faDownload } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "react-bootstrap";

function Gallery({ pictures, modalShow, toggleModal, downloadImage }) {
  // Classname to apply animation
  const [animateClass, setAnimateClass] = useState("");

  // Add animation when photo is captured
  useEffect(() => {
    if (pictures.length > 0) {
      setAnimateClass("vibrate");
      setTimeout(() => {
        setAnimateClass("");
      }, 500);
    }
  }, [pictures.length]);

  return (
    <div className="Gallery">
      <div className="photo-container" onClick={toggleModal}>
        <FontAwesomeIcon
          icon={faFolder}
          className={`folder-icon ${animateClass}`}
        />
        <div className="numberOfPhoto">{pictures.length}</div>
        <Modal
          key={pictures.length}
          className="modal-photo"
          show={modalShow}
          onHide={toggleModal}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>📸 Your Photo Gallery 📸</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {pictures.length > 0 ? (
              pictures.map((pic, index) => (
                <div className="Picture" key={index}>
                  <img
                    src={pic.dataUri}
                    alt={`Captured moment ${index + 1}`}
                    className="photo-captured"
                  />
                  <h3>{pic.title || `Picture ${index + 1}`}</h3>
                  <button
                    className="download-btn"
                    onClick={() => downloadImage(pic.dataUri)}
                  >
                    <FontAwesomeIcon
                      className="download-icon"
                      icon={faDownload}
                    />
                  </button>
                  {/* <button onClick={() => console.log(pic.dataUri)}>
                            Share
                          </button> */}
                  {/* <ShareSocial
                            className="shareSocial"
                            url={pic.dataUri}
                            style={styleSocial}
                            socialTypes={[
                              "facebook",
                              "whatsapp",
                              "telegram",
                              "twitter",
                            ]}
                          /> */}
                </div>
              ))
            ) : (
              <div className="no-photo">
                <p>You still haven't saved a photo</p>
                <p>Go take one now!!</p>
              </div>
            )}
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}

export default Gallery;
