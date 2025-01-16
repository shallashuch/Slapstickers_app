import React, { useState, useEffect } from "react";
import LastPhotoModal from "../components/modals/LastPhotoModal";
import Photocamera from "../components/Photocamera";
import Gallery from "../components/Gallery";
import "../assets/scss/App.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCameraRetro, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { SvgFilters } from "../constants/SvgFilters";
import { useWebcamCapture } from "../constants/useWebcamCapture";

function Homepage() {
  const [title, setTitle] = useState("");
  const [pictures, setPictures] = useState([]);
  const [sticker, setSticker] = useState();
  const [modalShow, setModalShow] = useState(false);
  const [latestPicture, setLatestPicture] = useState(null);
  const [showLatestModal, setShowLatestModal] = useState(false);
  const [isTitleVisible, setIsTitleVisible] = useState(false);
  const [visibleTexts, setVisibleTexts] = useState([false, false, false]);
  const [isRotating, setIsRotating] = useState(false);
  const [isPhotocameraVisible, setisPhotocameraVisible] = useState(false);

  const [
    handleVideoRef,
    handleCanvasRef,
    handleCapture,
    handleFilterBtnRef,
    removeSticker,
  ] = useWebcamCapture(
    sticker?.img,
    title,
    (newPicture) => {
      setLatestPicture(newPicture);
      setShowLatestModal(true);
      setTitle("");
    },
    setSticker,
    setLatestPicture
  );

  // Handles click event for the camera button.
  const handleCameraClick = () => {
    setisPhotocameraVisible(true);
  };

  //Handle initial animations
  useEffect(() => {
    const titleTimer = setTimeout(() => setIsTitleVisible(true), 100);

    const delays = [500, 1000, 1500];
    const textTimers = delays.map((delay, index) =>
      setTimeout(() => {
        setVisibleTexts((prev) => {
          const newState = [...prev];
          newState[index] = true;
          return newState;
        });
      }, delay)
    );

    setIsRotating(true);
    const photoTimer = setTimeout(() => setIsRotating(false), 1200);

    return () => {
      clearTimeout(photoTimer);
      clearTimeout(titleTimer);
      textTimers.forEach(clearTimeout);
    };
  }, []);

  // Save the photo and add it to the gallery
  const savePhoto = () => {
    if (latestPicture) {
      setPictures((prevPictures) => [
        ...prevPictures,
        { ...latestPicture, title },
      ]);
    }
    setShowLatestModal(false);
  };

  // Cancel the latest photo (don't save it)
  const cancelPhoto = () => {
    setLatestPicture(null);
    setShowLatestModal(false);
  };

  // Toggle modal to show pictures
  const toggleModal = () => {
    setModalShow(!modalShow);
  };

  return (
    <main>
      <div className="main-container">
        {!isPhotocameraVisible && (
          <div>
            <div className={`title ${isTitleVisible ? "visible" : ""}`}>
              <h1 className="text-title">
                Have you ever said something so dumb, you just wanted to
                slapyourself?
                <br /> Well now you can!
              </h1>
            </div>

            <div className="content-wrapper">
              <div className="photocamera-wrapper">
                <h2 className={`text ${visibleTexts[0] ? "visible" : ""}`}>
                  Click on the <span className="highlighted-text">camera</span>,
                </h2>
                <h2 className={`text ${visibleTexts[1] ? "visible" : ""}`}>
                  select your <span className="highlighted-text">sticker</span>
                </h2>
                <h2 className={`text ${visibleTexts[2] ? "visible" : ""}`}>
                  and try to
                  <span className="highlighted-text"> slap yourself</span>!!
                </h2>
              </div>

              <div className="camera-icon-wrapper">
                <FontAwesomeIcon
                  onClick={() => handleCameraClick(true)}
                  icon={faCameraRetro}
                  className={`camera-icon ${isRotating ? "rotate" : ""}`}
                />
              </div>
            </div>
          </div>
        )}

        {isPhotocameraVisible && (
          <div className="video-wrapper">
            <FontAwesomeIcon
              icon={faArrowLeft}
              onClick={() => setisPhotocameraVisible(false)}
              className="sticker-go-back"
            />
            <Photocamera
              handleVideoRef={handleVideoRef}
              handleCanvasRef={handleCanvasRef}
              handleCapture={handleCapture}
              handleFilterBtnRef={handleFilterBtnRef}
              removeSticker={removeSticker}
              sticker={sticker}
              setSticker={setSticker}
            />
            <SvgFilters />
          </div>
        )}

        <div className="gallery-wrapper">
          <Gallery
            pictures={pictures}
            modalShow={modalShow}
            toggleModal={toggleModal}
          />
        </div>

        <LastPhotoModal
          show={showLatestModal}
          onHide={cancelPhoto}
          latestPicture={latestPicture}
          savePhoto={savePhoto}
          cancelPhoto={cancelPhoto}
          title={title}
          setTitle={setTitle}
        />
      </div>
    </main>
  );
}

export default Homepage;
