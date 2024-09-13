import React, { useState, useEffect } from "react";
import "../assets/scss/App.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFolder,
  faDownload,
  faShare,
} from "@fortawesome/free-solid-svg-icons";
import { Modal } from "react-bootstrap";
import { ShareSocial } from "react-share-social";
import axios from "axios";

const style = {
  root: {
    backgroundColor: "#7c00fe",
    padding: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "unset",
  },
  copyContainer: {
    display: "none",
  },
};

function Gallery({ pictures, modalShow, toggleModal }) {
  const [animateClass, setAnimateClass] = useState("");
  const [selectedPictures, setSelectedPictures] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [shareModalIndex, setShareModalIndex] = useState(null);

  // Add animation when photo is captured
  useEffect(() => {
    if (pictures.length > 0) {
      setAnimateClass("vibrate");
      setTimeout(() => {
        setAnimateClass("");
      }, 500);
    }
  }, [pictures.length]);

  // download image
  const downloadImage = (imageSrc) => {
    const link = document.createElement("a");
    link.href = imageSrc;
    link.download = "Myslap.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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

  // upload img on cloudinary to have a public url
  const uploadImage = async (imageSrc) => {
    try {
      const formData = new FormData();
      formData.append("file", imageSrc);
      formData.append("upload_preset", "ml_default");
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dj9kg9lnj/image/upload",
        formData
      );
      return response.data.secure_url;
    } catch (error) {
      console.error("Error", error);
    }
  };

  useEffect(() => {
    const uploadAllImages = async () => {
      const urls = await Promise.all(
        pictures.map(async (pic) => {
          const url = await uploadImage(pic.dataUri);
          return url;
        })
      );
      const validUrls = urls.filter((url) => url !== null);
      setImageUrls(validUrls);
    };

    if (pictures.length > 0) {
      uploadAllImages();
    }
  }, [pictures]);

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
          <Modal.Title>
            📸 <span>Your Photo Gallery</span> 📸
          </Modal.Title>
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
                    className="share-btn"
                    onClick={() => setShareModalIndex(index)}
                  >
                    <FontAwesomeIcon className="share-icon" icon={faShare} />
                  </button>
                  <Modal
                    show={shareModalIndex === index}
                    onHide={() => setShareModalIndex(null)}
                    className="modal-share"
                    centered
                  >
                    <Modal.Header closeButton></Modal.Header>
                    <Modal.Body>
                      {imageUrls[index] && (
                        <ShareSocial
                          url={imageUrls[index]}
                          socialTypes={["whatsapp", "telegram", "twitter"]}
                          style={style}
                        />
                      )}
                    </Modal.Body>
                  </Modal>
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
