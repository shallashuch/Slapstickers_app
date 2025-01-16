import React, { useState, useEffect } from "react";
import "../assets/scss/App.scss";
import {
  faXmark,
  faUser,
  faFaceSmileWink,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
import FilterButton from "./partials/FilterButton";
import Stickers from "./Stickers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Photocamera(props) {
  const {
    handleVideoRef,
    handleCanvasRef,
    handleCapture,
    handleFilterBtnRef,
    sticker,
    setSticker,
    removeSticker,
  } = props;

  const [showStickers, setShowStickers] = useState(false);
  const [animateIcon, setAnimateIcon] = useState(false);

  //Handle stickers visibility
  const handleStickerIconClick = () => {
    setShowStickers(!showStickers);
  };

  // Animate the sticker icon
  useEffect(() => {
    if (!showStickers) {
      const interval = setInterval(() => {
        setAnimateIcon(true);
        setTimeout(() => setAnimateIcon(false), 2000);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [showStickers]);

  return (
    <div className="Photocamera">
      <div className="sticker-container">
        {!showStickers && (
          <>
            <p className={`sticker-title ${!showStickers ? "slide-in" : ""}`}>
              Select your sticker here
            </p>
            <FontAwesomeIcon
              icon={faFaceSmileWink}
              onClick={handleStickerIconClick}
              className={`sticker-icon ${animateIcon ? "jump-animation" : ""}`}
            />
          </>
        )}

        {showStickers && (
          <FontAwesomeIcon
            icon={faArrowLeft}
            onClick={handleStickerIconClick}
            className="sticker-icon"
          />
        )}

        <div
          className={`stickers-wrapper ${
            showStickers ? "slide-in-sticker" : ""
          }`}
        >
          {showStickers && (
            <Stickers
              sticker={sticker}
              setSticker={setSticker}
              removeSticker={removeSticker}
            />
          )}
        </div>
      </div>

      <div className="photocamera-container">
        <div className="video-container">
          <video ref={handleVideoRef} />
          <canvas ref={handleCanvasRef} width={2} height={2} />
          <div className="btn-filters-container">
            <FilterButton
              onClick={handleFilterBtnRef("grayscale(100%)")}
              filterStyle="grayscale(100%)"
              icon={faUser}
              id="grayscale"
            />
            <FilterButton
              onClick={handleFilterBtnRef("sepia(100%)")}
              filterStyle="sepia(100%)"
              icon={faUser}
            />
            <FilterButton
              onClick={handleFilterBtnRef("url(#gold-sunset)")}
              filterStyle="url(#gold-sunset)"
              icon={faUser}
            />
            <FilterButton
              onClick={handleFilterBtnRef("url(#warm-x-rays)")}
              filterStyle="url(#warm-x-rays)"
              icon={faUser}
            />
            <FilterButton
              onClick={handleFilterBtnRef("url(#sea)")}
              filterStyle="url(#sea)"
              icon={faUser}
            />
            <FilterButton
              onClick={handleFilterBtnRef("url(#cherry-icecream)")}
              filterStyle="url(#cherry-icecream)"
              icon={faUser}
            />
            <FilterButton
              onClick={handleFilterBtnRef("sepia(0%)")}
              filterStyle="sepia(0%)"
              icon={faXmark}
            />
          </div>

          <div className="btn-makePhoto-container">
            <div className="makePhoto-item-container">
              <FontAwesomeIcon
                icon={faCircle}
                onClick={handleCapture}
                className="makePhoto-item"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Photocamera;
