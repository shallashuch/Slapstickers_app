import React from "react";
import "../assets/scss/App.scss";
import logo from "../assets/stickers/slap.png";
import catSticker from "../assets/stickers/cat.png";
import creativitySticker from "../assets/stickers/creativity.png";
import pandaSticker from "../assets/stickers/panda-bear.png";
import videocallSticker from "../assets/stickers/video-calling.png";
import sunSticker from "../assets/stickers/sun.png";
import rocketSticker from "../assets/stickers/rocket.png";
import relaxSticker from "../assets/stickers/relax.png";
import exploreSticker from "../assets/stickers/explore.png";
import rainbowSticker from "../assets/stickers/rainbow.png";
import daisySticker from "../assets/stickers/daisy.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function Stickers(props) {
  const stickers = [
    logo,
    creativitySticker,
    catSticker,
    pandaSticker,
    videocallSticker,
    sunSticker,
    rocketSticker,
    relaxSticker,
    exploreSticker,
    rainbowSticker,
    daisySticker,
  ].map((url) => {
    const img = new Image();
    img.src = url;
    return { img, url };
  });

  return (
    <div className="Stickers">
      <div className="availableStickers-container">
        <div className="availableStickers">
          <button className="btn-remove" onClick={props.removeSticker}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
          {stickers.map((sticker, index) => (
            <button key={index} onClick={() => props.setSticker(sticker)}>
              <img src={sticker.url} alt={`Sticker ${index + 1}`} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Stickers;
