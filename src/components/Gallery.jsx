import React, { useState, useEffect } from "react";
import "../assets/scss/App.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder, faDownload } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "react-bootstrap";

function Gallery({ pictures, modalShow, toggleModal, downloadImage }) {
  // Classname to apply animation
  const [animateClass, setAnimateClass] = useState("");

  const [selectedPictures, setSelectedPictures] = useState([]);

  // Add animation when photo is captured
  useEffect(() => {
    if (pictures.length > 0) {
      setAnimateClass("vibrate");
      setTimeout(() => {
        setAnimateClass("");
      }, 500);
    }
  }, [pictures.length]);

  // Toggle picture selection
  const toggleSelection = (index) => {
    setSelectedPictures((prevSelected) => {
      if (prevSelected.includes(index)) {
        return prevSelected.filter((i) => i !== index);
      } else {
        return [...prevSelected, index];
      }
    });
  };

  // Download selected images
  const downloadSelected = () => {
    selectedPictures.forEach((index) => {
      downloadImage(pictures[index].dataUri);
    });
  };

  return (
    <div className="Gallery">
      <div className="photo-container" onClick={() => toggleModal(true)}>
        <FontAwesomeIcon
          icon={faFolder}
          className={`folder-icon ${animateClass}`}
        />
        <div className="numberOfPhoto">{pictures.length}</div>
      </div>

      <Modal
        key={pictures.length}
        className="modal-photo"
        show={modalShow}
        onHide={() => toggleModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>📸 Your Photo Gallery 📸</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {pictures.length > 0 ? (
            <>
              {pictures.map((pic, index) => (
                <div className="Picture" key={index}>
                  <input
                    type="checkbox"
                    checked={selectedPictures.includes(index)}
                    onChange={() => toggleSelection(index)}
                  />
                  <img
                    src={pic.dataUri}
                    alt={`Captured moment ${index + 1}`}
                    className="photo-captured"
                  />
                  <h3>{pic.title || ""}</h3>
                  <button
                    className="download-btn"
                    onClick={() => downloadImage(pic.dataUri)}
                  >
                    <FontAwesomeIcon
                      className="download-icon"
                      icon={faDownload}
                    />
                  </button>
                </div>
              ))}

              {selectedPictures.length > 0 && (
                <button
                  className="download-selected-btn"
                  onClick={downloadSelected}
                >
                  {selectedPictures.length}
                  <FontAwesomeIcon
                    className="download-icon"
                    icon={faDownload}
                  />
                </button>
              )}
            </>
          ) : (
            <div className="no-photo">
              <p>You still haven't saved a photo</p>
              <p>Go take one now!!</p>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Gallery;
