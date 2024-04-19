import React, { useEffect, useState } from "react";
import { Link, Switch, Route, Redirect } from "react-router-dom";
import { Modal } from "react-bootstrap";
// import { ZoomMtg } from "@zoom/meetingsdk";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faUser,
  faFolder,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";
import { useWebcamCapture } from "./useWebcamCapture";
// import { ShareSocial } from "react-share-social";

import logo from "./stickers/slap.png";
import catSticker from "./stickers/cat.png";
import creativitySticker from "./stickers/creativity.png";
import pandaSticker from "./stickers/panda-bear.png";
import videocallSticker from "./stickers/video-calling.png";
import sunSticker from "./stickers/sun.png";
import "./scss/App.scss";

const stickers = [
  logo,
  creativitySticker,
  catSticker,
  pandaSticker,
  videocallSticker,
  sunSticker,
].map((url) => {
  const img = new Image();
  img.src = url;
  return { img, url };
});

function App() {
  // currently active sticker
  const [sticker, setSticker] = useState();
  // title for the picture that will be captured
  const [title, setTitle] = useState("SLAPPE!");
  // array of captured picture
  const [pictures, setPictures] = useState([]);
  // visibility control of the modal displaying all captured pictures
  const [modalShow, setModalShow] = useState(false);
  // Classname to apply animation
  const [animateClass, setAnimateClass] = useState("");

  // webcam behavior hook
  const [
    handleVideoRef, // callback function to set ref for invisible video element
    handleCanvasRef, // callback function to set ref for main canvas element
    handleCapture, // callback function to trigger taking the picture
    handleFilterBtnRef, //callback function to apply CSS filter to canvas
  ] = useWebcamCapture(sticker?.img, title, setPictures);

  // download image
  const downloadImage = (imageSrc) => {
    const link = document.createElement("a");
    link.href = imageSrc;
    link.download = "Myslap.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // remove sticker selected
  const handleRemoveSticker = () => {
    setSticker(null);
  };

  //  toggle modal to show pictures
  const toggleModal = () => {
    setModalShow(!modalShow);
  };

  // add animation when photo are captured
  useEffect(() => {
    if (pictures.length > 0) {
      setAnimateClass("vibrate");
      setTimeout(() => {
        setAnimateClass("");
      }, 500);
    }
  }, [pictures.length]);

  //Tried to implement share features on social media. I found ShareSocial as
  // a UI component but the generated URL is not sharable and I think I should have saved
  // the photo in the backend. When I clicked on a social button, the sharing didn't work

  // const styleSocial = {
  //   root: {
  //     background: "white",
  //     borderRadius: 3,
  //     border: 0,
  //     boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  //     color: "white",
  //   },
  //   copyContainer: {
  //     border: "1px solid blue",
  //     background: "rgb(0,0,0,0.7)",
  //     display: "none",
  //   },
  //   title: {
  //     color: "aquamarine",
  //     fontStyle: "italic",
  //   },
  // };

  //I was trying to integrate the app with Zoom, but it would have taken me
  // much more time. I was looking at the documentation on Zoom Developer
  //to see how to do it.

  // loads WebAssembly assets
  // ZoomMtg.preLoadWasm();
  // ZoomMtg.prepareWebSDK();

  // function startMeeting(
  //   signature,
  //   meetingNumber,
  //   userName,
  //   passWord,
  //   leaveUrl
  // ) {
  //   ZoomMtg.init({
  //     leaveUrl: leaveUrl,
  //     isSupportAV: true,
  //     success: (success) => {
  //       console.log(success);

  //       ZoomMtg.join({
  //         signature: signature,
  //         meetingNumber: meetingNumber,
  //         userName: userName,
  //         apiKey: "mjnQIH53RbGZQFV3I06EQg",
  //         userEmail: "elettra96@gmail.com",
  //         passWord: passWord,
  //         success: (success) => {
  //           console.log(success);
  //         },
  //         error: (error) => {
  //           console.log(error);
  //         },
  //       });
  //     },
  //     error: (error) => {
  //       console.log(error);
  //     },
  //   });
  // }

  return (
    <div className="App">
      <header className="Header">
        <h1>SlapSticker</h1>
        <p>
          Have you ever said something so dumb, you just wanted to slap
          yourself? Well now you can!
        </p>

        {/* NAVBAR */}
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/readme">ReadMe</Link>
            </li>
          </ul>
        </nav>
      </header>
      <Switch>
        /** * Main app route */
        <Route path="/" exact>
          <main>
            <div className="colOne">
              {/* STEP 1 */}
              <section className="GalleryName">
                <p>
                  <span>Step 1:</span> Give it a name
                </p>
                <input
                  type="text"
                  value={title}
                  placeholder="SLAPPE!"
                  onChange={(ev) => setTitle(ev.target.value)}
                />
              </section>
              {/* STEP 2 */}
              <section className="Stickers">
                <span>Step 2:</span> Select your sticker...
                <div className="availableStickers-container">
                  <div className="availableStickers">
                    {stickers.map((sticker, index) => (
                      <button key={index} onClick={() => setSticker(sticker)}>
                        <img src={sticker.url} alt={`Sticker ${index + 1}`} />
                      </button>
                    ))}
                    <button
                      className="btn-remove"
                      onClick={handleRemoveSticker}
                    >
                      <FontAwesomeIcon icon={faXmark} />
                    </button>
                  </div>
                </div>
              </section>
              <section className="Gallery">
                <span>Step 4:</span> Cherish this moment forever
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
                      <Modal.Title>Your Photo Gallery</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      {pictures.map((pic, index) => (
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
                      ))}
                    </Modal.Body>
                  </Modal>
                </div>
              </section>
            </div>
            <div className="colTwo">
              {/* STEP 3 */}
              <section className="Main">
                <p>
                  <span>Step 3:</span> Slap your self!
                </p>
                <video ref={handleVideoRef} />
                <canvas
                  ref={handleCanvasRef}
                  width={2}
                  height={2}
                  onClick={handleCapture}
                />
                {/* FILTER BUTTONS */}
                <div className="btn-filters-container">
                  <button
                    className="btn-filters"
                    id="grayscale"
                    onClick={handleFilterBtnRef("grayscale(100%)")}
                    style={{ filter: "grayscale(100%)" }}
                  >
                    <FontAwesomeIcon icon={faUser} />
                  </button>
                  <button
                    className="btn-filters"
                    onClick={handleFilterBtnRef("sepia(100%)")}
                    style={{ filter: "sepia(100%)" }}
                  >
                    <FontAwesomeIcon icon={faUser} />
                  </button>
                  <button
                    className="btn-filters"
                    onClick={handleFilterBtnRef("url(#gold-sunset)")}
                    style={{ filter: "url(#gold-sunset)" }}
                  >
                    <FontAwesomeIcon icon={faUser} />
                  </button>
                  <button
                    className="btn-filters"
                    onClick={handleFilterBtnRef("url(#warm-x-rays)")}
                    style={{ filter: "url(#warm-x-rays)" }}
                  >
                    <FontAwesomeIcon icon={faUser} />
                  </button>
                  <button
                    className="btn-filters"
                    onClick={handleFilterBtnRef("url(#sea)")}
                    style={{ filter: "url(#sea)" }}
                  >
                    <FontAwesomeIcon icon={faUser} />
                  </button>
                  <button
                    className="btn-filters"
                    onClick={handleFilterBtnRef("url(#cherry-icecream)")}
                    style={{ filter: "url(#cherry-icecream)" }}
                  >
                    <FontAwesomeIcon icon={faUser} />
                  </button>
                  <button
                    className="btn-filters"
                    onClick={handleFilterBtnRef("sepia(0%)")}
                    style={{ filter: "sepia(0%)" }}
                  >
                    <FontAwesomeIcon icon={faXmark} />
                  </button>
                </div>
              </section>
            </div>

            {/* SVG */}

            <svg
              xmlns="http://www.w3.org/2000/svg"
              style={{
                height: 0,
                width: 0,
                position: "absolute",
                visibility: "hidden",
              }}
            >
              <defs>
                <filter
                  id="sea"
                  x="-10%"
                  y="-10%"
                  width="120%"
                  height="120%"
                  filterUnits="objectBoundingBox"
                  primitiveUnits="userSpaceOnUse"
                  colorInterpolationFilters="linearRGB"
                >
                  <feColorMatrix
                    type="matrix"
                    values="1 0 0 0 0
                                                 1 0 0 0 0
                                                 1 0 0 0 0
                                                 0 0 0 1 0"
                    in="SourceGraphic"
                    result="colormatrix"
                  />
                  <feComponentTransfer
                    in="colormatrix"
                    result="componentTransfer"
                  >
                    <feFuncR type="table" tableValues="0.02 0.13 0.8" />
                    <feFuncG type="table" tableValues="0.02 0.47 0.97" />
                    <feFuncB type="table" tableValues="0.26 0.52 0.48" />
                    <feFuncA type="table" tableValues="0 1" />
                  </feComponentTransfer>
                  <feBlend
                    mode="normal"
                    in="componentTransfer"
                    in2="SourceGraphic"
                    result="blend"
                  />
                </filter>
              </defs>
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              style={{
                height: 0,
                width: 0,
                position: "absolute",
                visibility: "hidden",
              }}
            >
              <defs>
                <filter
                  id="warm-x-rays"
                  x="-10%"
                  y="-10%"
                  width="120%"
                  height="120%"
                  filterUnits="objectBoundingBox"
                  primitiveUnits="userSpaceOnUse"
                  colorInterpolationFilters="linearRGB"
                >
                  <feColorMatrix
                    type="matrix"
                    values="1 0 0 0 0
                                                 1 0 0 0 0
                                                 1 0 0 0 0
                                                 0 0 0 1 0"
                    in="SourceGraphic"
                    result="colormatrix"
                  />
                  <feComponentTransfer
                    in="colormatrix"
                    result="componentTransfer"
                  >
                    <feFuncR type="table" tableValues="0.98 0.75 0.51" />
                    <feFuncG type="table" tableValues="1 0.45 0.11" />
                    <feFuncB type="table" tableValues="0.91 0.39 0.29" />
                    <feFuncA type="table" tableValues="0 1" />
                  </feComponentTransfer>
                  <feBlend
                    mode="normal"
                    in="componentTransfer"
                    in2="SourceGraphic"
                    result="blend"
                  />
                </filter>
              </defs>
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              style={{
                height: 0,
                width: 0,
                position: "absolute",
                visibility: "hidden",
              }}
            >
              <defs>
                <filter
                  id="gold-sunset"
                  x="-10%"
                  y="-10%"
                  width="120%"
                  height="120%"
                  filterUnits="objectBoundingBox"
                  primitiveUnits="userSpaceOnUse"
                  colorInterpolationFilters="linearRGB"
                >
                  <feColorMatrix
                    type="matrix"
                    values="1 0 0 0 0
                                                 1 0 0 0 0
                                                 1 0 0 0 0
                                                 0 0 0 1 0"
                    in="SourceGraphic"
                    result="colormatrix"
                  />
                  <feComponentTransfer
                    in="colormatrix"
                    result="componentTransfer"
                  >
                    <feFuncR type="table" tableValues="0.27 0.86 1" />
                    <feFuncG type="table" tableValues="0.01 0.31 0.95" />
                    <feFuncB type="table" tableValues="0.02 0.02 0.02" />
                    <feFuncA type="table" tableValues="0 1" />
                  </feComponentTransfer>
                  <feBlend
                    mode="normal"
                    in="componentTransfer"
                    in2="SourceGraphic"
                    result="blend"
                  />
                </filter>
              </defs>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              style={{
                height: 0,
                width: 0,
                position: "absolute",
                visibility: "hidden",
              }}
            >
              <defs>
                <filter
                  id="cherry-icecream"
                  x="-10%"
                  y="-10%"
                  width="120%"
                  height="120%"
                  filterUnits="objectBoundingBox"
                  primitiveUnits="userSpaceOnUse"
                  colorInterpolationFilters="linearRGB"
                >
                  <feColorMatrix
                    type="matrix"
                    values="1 0 0 0 0
                                                 1 0 0 0 0
                                                 1 0 0 0 0
                                                 0 0 0 1 0"
                    in="SourceGraphic"
                    result="colormatrix"
                  />
                  <feComponentTransfer
                    in="colormatrix"
                    result="componentTransfer"
                  >
                    <feFuncR type="table" tableValues="0.84 1" />
                    <feFuncG type="table" tableValues="0.05 0.94" />
                    <feFuncB type="table" tableValues="0.37 0.61" />
                    <feFuncA type="table" tableValues="0 1" />
                  </feComponentTransfer>
                  <feBlend
                    mode="normal"
                    in="componentTransfer"
                    in2="SourceGraphic"
                    result="blend"
                  />
                </filter>
              </defs>
            </svg>
          </main>
        </Route>
        /** * Readme route */
        <Route path="/readme">
          <main>
            <h2>Devtest Readme</h2>
            <p>
              Hello candidate, Welcome to our little dev test. The goal of this
              exercise, is to asses your general skill level, and give us
              something to talk about at our next appointment.
            </p>
            <section>
              <h3>What this app should do</h3>
              <p>
                SlapSticker is an app that lets users to slap stickers on their
                face, using their webcam. Functionality wise the app works, but
                the ui needs some love. We'd like for you to extend this
                prototype to make it look and feel it bit better.
              </p>
              <p>These are the basic requirements:</p>
              <ul>
                <li>User can pick a sticker</li>
                <li>User can give the captured image a title</li>
                <li>User can place the sticker over the webcam image</li>
                <li>User can capture the webcam image with sticker</li>
              </ul>
            </section>
            <section>
              <h3>What we want you to do</h3>
              <p>
                Off course we didn't expect you to build a full fledged app in
                such a short time frame. That's why the basic requirements are
                already implemented.
              </p>
              <p>
                However, we would like for you to show off your strengths as a
                developer by improving the app.
              </p>
              <p>Some ideas (no need to do all):</p>
              <ul>
                <li>Make it look really nice</li>
                <li>Let users pick from multiple (custom) stickers</li>
                <li>Improve the workflow and ux</li>
                <li>Show multiple captured images in a gallery</li>
                <li>Let users download or share the captured pics</li>
                <li>Add super cool effects to webcam feed</li>
                <li>Organize, document and test the code</li>
                <li>Integrate with zoom, teams, meet...</li>
              </ul>
            </section>
            <section>
              <h3> quickstart</h3>
              <ul>
                <li>You can clone this repo to get started </li>
                <li>run `$ npm install` to install deps</li>
                <li>run `$ npm run start` to start dev environment</li>
                <li>push it to github or gitlab to share it with us. </li>
              </ul>
            </section>
            <section>
              <p>
                P.s. We've already added some libraries to make your life easier
                (Create React App, Jss, React Router), but feel free to add
                more.
              </p>
            </section>
          </main>
        </Route>
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default App;
