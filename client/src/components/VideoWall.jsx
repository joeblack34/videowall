import React,{useEffect} from "react";
import { ListImage } from "./ListImage";
import { Video } from "./Video";
import api from "../api/allproject";
import "./VideoWall.css";

export const VideoWall = () => {
  useEffect(() => {
    window.addEventListener("beforeunload", alertUser);
    window.addEventListener("unload", handleTabClosing);
    return () => {
      window.removeEventListener("beforeunload", alertUser);
      window.removeEventListener("unload", handleTabClosing);
    };
  });

  const handleTabClosing = () => {
    onClearClick();
  };

  const alertUser = (event) => {
    event.preventDefault();
    event.returnValue = "";
    onClearClick();
  };
  const onClearClick = () => {
    api.post("/clear");
  };

  return (
    <div className="container">
      <h1 className="text-center mb-4">Видеостена Вести</h1>
      <div className="mt-3">
        <button onClick={() => onClearClick()}>Очистить плату</button>
      </div>
      <div className="mt-3">
        <h2>1.Выберите видео для перехода с видео на картинку</h2>
        <div className="mt-3">
          <Video index={0} />
        </div>
      </div>
      <div className="mt-5">
        <h2>2.Выберите картинки</h2>
        <ListImage />
      </div>
      <div className="mt-5">
        <h2>3.Выберите видео для перехода с картинки на видео</h2>
        <div className="mt-3">
          <Video index={1} />
        </div>
      </div>
    </div>
  );
};
