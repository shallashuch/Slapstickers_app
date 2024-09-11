import React from "react";
import "../assets/scss/App.scss";
import { faXmark, faUser } from "@fortawesome/free-solid-svg-icons";
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

  return (
    <div className="Photocamera">
      <div className="photocamera-container">
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
      <Stickers
        sticker={sticker}
        setSticker={setSticker}
        removeSticker={removeSticker}
      />
    </div>
  );
}

export default Photocamera;
