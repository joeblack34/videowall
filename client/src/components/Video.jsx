import { useDispatch, useSelector } from "react-redux";
import api from "../api/allproject";
import "./ListImage.css";

import {
    playVideoWallAction,
    editVideoAction,
} from "../store/videoWallReducer";

import {
    editCurrentIndex,
} from "../store/currentIndexReducer";

export const Video = ({ index }) => {
    const dispatch = useDispatch();
    const videoWalls = useSelector((state) => state.videoWalls.videoWall);

    const handleChangeVideo = (e) => {
        if (e.target.files.length === 0) {
            return;
        }
        const video = {
            i: index,
            n: e.target.files[0].name,
            p: URL.createObjectURL(e.target.files[0]),
        };
        dispatch(editVideoAction(video));
    };

    const handlePlayVideo = async (i) => {
        //play StartVideo
        dispatch(playVideoWallAction(i));
        const videoName = videoWalls[i].fullName.split(".").slice(0, -1).join(".");
        await api.post("play_video", { ind: i, videoName: videoName });
        dispatch(editCurrentIndex(0))
    };
    return (
        <table className="mt-3">
            <tr key={index}>
                <td className="prew">
                    <video className="video" src={videoWalls[index].imagePreview} />
                </td>
                <td className="control">
                    <input
                        className="file"
                        type="file"
                        name="file"
                        onChange={(e) => handleChangeVideo(e)}
                    />{" "}
                    <span>Название файла:{videoWalls[index].fullName}</span>
                </td>
                <td className="play">
                    <button
                        className={`btn btn-outline-success fa fa-play ${videoWalls[index].isPlay ? "active" : ""
                            }`}
                        onClick={() => handlePlayVideo(index)}
                    ></button>
                </td>
            </tr>
        </table>
    );
};
