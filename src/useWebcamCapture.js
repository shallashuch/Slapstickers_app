import { useCallback, useEffect, useRef, useState } from "react";

export const useWebcamCapture = (stickerImg, title, setPictures) => {
  const [videoRef, setVideoRef] = useState();
  const [canvasRef, setCanvasRef] = useState();
  const [filter, setFilter] = useState();

  const onVideoRef = useCallback((node) => {
    setVideoRef(node);
  });

  const onCanvasRef = useCallback((node) => {
    setCanvasRef(node);
  });

  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (videoRef && canvasRef && !initialized) {
      navigator.mediaDevices
        .getUserMedia({
          video: {
            width: { min: 1024, ideal: 1280, max: 1920 },
            height: { min: 576, ideal: 720, max: 1080 },
          },
          audio: false,
        })
        .then(function (stream) {
          videoRef.srcObject = stream;
          videoRef.play();
        })
        .catch(function (err) {
          console.log("Couldn't start webcam: " + err);
        });

      const onCanPlay = function (ev) {
        const width = videoRef.videoWidth;
        const height = videoRef.videoHeight / (videoRef.videoWidth / width);

        videoRef.setAttribute("width", width);
        videoRef.setAttribute("height", height);
        canvasRef.setAttribute("width", width);
        canvasRef.setAttribute("height", height);
        videoRef.removeEventListener("canplay", onCanPlay, false);
      };

      videoRef.addEventListener("canplay", onCanPlay, false);
      setInitialized(true);
    } else if (!videoRef || !canvasRef) {
      setInitialized(false);
    }
  }, [videoRef, canvasRef, initialized]);

  const mousePos = useRef({ x: 0, y: 0 });

  const startRenderLoop = useCallback(() => {
    if (canvasRef && videoRef) {
      const renderFrame = () => {
        const ctx = canvasRef.getContext("2d");
        const width = canvasRef.getAttribute("width");
        const height = canvasRef.getAttribute("height");
        ctx.drawImage(videoRef, 0, 0, width, height);

        if (stickerImg) {
          const bb = canvasRef.getBoundingClientRect();
          const x = ((mousePos.current.x - bb.left) / bb.width) * width;
          const y = ((mousePos.current.y - bb.top) / bb.height) * height;
          ctx.drawImage(
            stickerImg,
            x - width * 0.2,
            y - width * 0.2,
            width * 0.4,
            width * 0.4
          );
        }
        requestAnimationFrame(renderFrame);
      };
      requestAnimationFrame(renderFrame);
    }
  }, [canvasRef, videoRef, stickerImg]);

  useEffect(() => {
    startRenderLoop();
  }, [startRenderLoop]);

  useEffect(() => {
    if (canvasRef) {
      const onMouseMove = (ev) => {
        mousePos.current = { x: ev.clientX, y: ev.clientY };
      };
      canvasRef.addEventListener("mousemove", onMouseMove);
      canvasRef.addEventListener("mousedown", onMouseMove);
      return () => {
        canvasRef.removeEventListener("mousemove", onMouseMove);
        canvasRef.removeEventListener("mousedown", onMouseMove);
      };
    }
  }, [canvasRef]);

  // to set filter to provided style
  const onFilterBtnRef = (style) => () => {
    setFilter(style);
  };

  // apply filter to canvas
  useEffect(() => {
    if (canvasRef && filter) {
      canvasRef.style.filter = filter;
    }
  }, [filter, canvasRef]);

  // I have created a temporary canvas element to set the filter
  //for it and be able to convert the temporary canvas to a
  //Data url to show the pictures with the filter applied
  const onCapture = useCallback(() => {
    if (canvasRef) {
      const ctx = canvasRef.getContext("2d");
      const width = canvasRef.width;
      const height = canvasRef.height;

      const tempCanvas = document.createElement("canvas");
      const tempCtx = tempCanvas.getContext("2d");
      tempCanvas.width = width;
      tempCanvas.height = height;

      tempCtx.filter = filter || "none";
      tempCtx.drawImage(canvasRef, 0, 0, width, height);

      const data = tempCanvas.toDataURL("image/png");
      setPictures((prevPictures) => [
        ...prevPictures,
        { dataUri: data, title },
      ]);
    }
  }, [canvasRef, title, setPictures, filter]);

  return [onVideoRef, onCanvasRef, onCapture, onFilterBtnRef];
};
