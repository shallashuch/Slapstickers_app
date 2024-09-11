import React, { useState } from "react";
import { useWebcamCapture } from "../constants/useWebcamCapture";
import { SvgFilters } from "../constants/SvgFilters";
import Gallery from "../components/Gallery";
import Photocamera from "../components/Photocamera";
import LastPhotoModal from "../components/modals/LastPhotoModal";
import "../assets/scss/App.scss";

// import { ZoomMtg } from "@zoom/meetingsdk";

// import { ShareSocial } from "react-share-social";

function Homepage() {
  const [sticker, setSticker] = useState();
  const [title, setTitle] = useState("");
  const [pictures, setPictures] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [latestPicture, setLatestPicture] = useState(null);
  const [showLatestModal, setShowLatestModal] = useState(false);

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

  // Save the photo and add it to the gallery
  // const savePhoto = () => {
  //   setPictures((prevPictures) =>
  //     Array.isArray(prevPictures)
  //       ? [...prevPictures, latestPicture]
  //       : [latestPicture]
  //   );
  //   setShowLatestModal(false);
  // };
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

  // toggle modal to show pictures
  const toggleModal = () => {
    setModalShow(!modalShow);
  };

  // download image
  const downloadImage = (imageSrc) => {
    const link = document.createElement("a");
    link.href = imageSrc;
    link.download = "Myslap.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main>
      <h1>Slap yourself..</h1>
      <Photocamera
        handleVideoRef={handleVideoRef}
        handleCanvasRef={handleCanvasRef}
        handleCapture={handleCapture}
        handleFilterBtnRef={handleFilterBtnRef}
        removeSticker={removeSticker}
        sticker={sticker}
        setSticker={setSticker}
      />

      <LastPhotoModal
        show={showLatestModal}
        onHide={cancelPhoto}
        latestPicture={latestPicture}
        savePhoto={savePhoto}
        cancelPhoto={cancelPhoto}
        title={title}
        setTitle={setTitle}
      />
      <Gallery
        pictures={pictures}
        modalShow={modalShow}
        toggleModal={toggleModal}
        downloadImage={downloadImage}
        // title={title}
        // setTitle={setTitle}
      />
      <SvgFilters />
    </main>
  );
}

export default Homepage;
