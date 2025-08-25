import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../api/allproject";

import "./VideoWallUtro.css";

import {
    addVideoWallUtroAction,
    removeVideoWallUtroAction,
    editImageVideowallUtroAction,
    editVideoUtroAction,
} from "../store/videoWallUtroReducer";

export const VideoWallUtro = () => {
    const dispatch = useDispatch();

    const videoWallsUtro = useSelector(
        (state) => state.videoWallsUtro.videoWallUtro
    );

    const imagesUtro = useSelector((state) => state.videoWallsUtro.images.items);

    const [indexCount, setIndexCount] = useState(1);
    const [btnPlay, setBtnPlay] = useState([
        { index: 0, isPlay: false },
        { index: 1, isPlay: false },
    ]);

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
    const onPlayBtn = (index) => {
        const newBtns = btnPlay.map((btn) =>
            btn.index === index ? { ...btn, isPlay: true } : { ...btn, isPlay: false }
        );
        setBtnPlay(newBtns);
    };
    const addVideoWall = () => {
        const el = {
            index: indexCount,
            fullName: "",
            imagePreview: "",
        };
        setIndexCount(indexCount + 1);
        dispatch(addVideoWallUtroAction(el));
    };
    const handleChangeVideo = (e) => {
        if (e.target.files.length === 0) {
            return;
        }
        const video = {
            fullName: e.target.files[0].name,
            imagePreview: URL.createObjectURL(e.target.files[0]),
        };
        dispatch(editVideoUtroAction(video));
    };

    const editImageVideowall = async (e, i) => {
        if (e.target.files.length === 0) {
            return;
        }
        const file = {
            index: i,
            fullName: e.target.files[0].name,
            imagePreview: URL.createObjectURL(e.target.files[0]),
        };

        dispatch(editImageVideowallUtroAction(file));
        const formData = new FormData();
        formData.append(
            "formFileImg",
            e.target.files[0],
            encodeURIComponent(e.target.files[0].name)
        );
        console.log(e.target.files[0].name);
        const resp = await api.post("upload-image", formData);
        const respData = await resp;
        if (resp.status !== 200) {
            throw new Error(respData.message);
        }
        console.log(respData, "change");
    };
    const handlePlayVideo = async () => {
        onPlayBtn(0);
        const videoName = videoWallsUtro.fullName.split(".").slice(0, -1).join(".");
        await api.post("play_video", { ind: 0, videoName: videoName });
    };
    const removeVideoWall = (index) => {
        dispatch(removeVideoWallUtroAction(index));
    };

    const handlePlayImages = async () => {
        onPlayBtn(1);
        const resp = await api.post("play_utro", { imagesUtro });
        const indexResponse = await resp.data;
        console.log(indexResponse);
    };

    return (
        <div className="container">
            <h1 className="text-center mb-4">Видеостена Вести Утро</h1>
            <div className="mt-3">
                <button onClick={onClearClick}>Очистить плату</button>
                <h2 className="mt-3">
                    1.Выберите видео для перехода с видео на картинку
                </h2>
                <table className="mt-3">
                    <tr>
                        <td className="prew">
                            <video className="video" src={videoWallsUtro.imagePreview} />
                        </td>
                        <td className="control">
                            <input
                                className="file"
                                type="file"
                                name="file"
                                onChange={(e) => handleChangeVideo(e)}
                            />{" "}
                            <span>Название файла:{videoWallsUtro.fullName}</span>
                        </td>
                        <td className="play">
                            <button
                                className={`btn btn-outline-success fa fa-play ${btnPlay[0].isPlay ? "active" : ""
                                    }`}
                                // className={`btn btn-outline-success fa fa-play
                                //
                                // }`}
                                onClick={() => handlePlayVideo()}
                            ></button>
                        </td>
                    </tr>
                </table>
                <hr />
                <h2>2.Добавьте изображения для стены</h2>
                <div className="overline">
                    <table className="mt-3">
                        {imagesUtro.map((item) => (
                            <tr>
                                <td className="delete" width="40px">
                                    <a
                                        className="btn btn-danger"
                                        onDoubleClick={() => removeVideoWall(item.index)}
                                    >
                                        <i className="fa fa-times" aria-hidden="true"></i>
                                    </a>
                                </td>
                                <td className="prew">
                                    <img
                                        className="image"
                                        src={item.imagePreview}
                                        id="myid"
                                        alt={item.fullName}
                                    />
                                </td>
                                <td className="control">
                                    <input
                                        className="file"
                                        id="fileName"
                                        type="file"
                                        onChange={(e) => {
                                            editImageVideowall(e, item.index);
                                        }}
                                    />
                                    <span>Название файла:{item.fullName}</span>
                                    <br />
                                </td>
                            </tr>
                        ))}
                    </table>
                    <table className="run">
                        <tr>
                            <td className="play">
                                <a
                                    className={`btn btn-outline-success fa fa-play ${btnPlay[1].isPlay ? "active" : ""
                                        }`}
                                    onClick={() => handlePlayImages()}
                                ></a>
                            </td>
                        </tr>
                    </table>
                </div>

                <div className="text-center mt-3">
                    <button
                        className="btn btn-primary btn_add m-auto align-middle"
                        onClick={addVideoWall}
                    >
                        Добавить
                    </button>
                    {/* <button className="btn btn-primary btn_add m-auto align-middle" @click="addRow">Добавить</button> */}
                </div>
            </div>
        </div>
    );
};
