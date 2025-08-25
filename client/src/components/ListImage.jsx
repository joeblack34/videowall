import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../api/allproject";
import "./ListImage.css";
import {
    addVideoWallAction,
    removeVideoWallAction,
    playVideoWallAction,
    selectVideoWallAction,
    // editIndexUpAction,
    editTextTopAction,
    editTextBottomAction,
} from "../store/videoWallReducer";
import { editCurrentIndex } from "../store/currentIndexReducer";

export const ListImage = () => {
    const dispatch = useDispatch();
    const videoWalls = useSelector((state) => state.videoWalls.videoWall);
    const images = videoWalls.filter((video) => video.index > 1);
    const curIndex = useSelector((state) => state.currentIndex.currentIndex);
    const [indexImage, setIndexImage] = useState(2);

    const addVideoWall = () => {
        setIndexImage(indexImage + 1);
        const el = {
            index: indexImage,
            fullName: "",
            imagePreview: "",
            textTop: "",
            textBottom: "",
            isPlay: false,
        };
        dispatch(addVideoWallAction(el));
    };

    const removeVideoWall = (index) => {
        dispatch(removeVideoWallAction(index));
    };

    const onPlayClick = async (index) => {
        dispatch(playVideoWallAction(index));
        const item = videoWalls.find((i) => i.index === index);
        // const item = videoWalls.find(i => i.index == index);
        const resp = await api.post("play_image", { item, curIndex });
        const indexResponse = await resp.data;
        console.log(indexResponse);
        dispatch(editCurrentIndex(index));
    };

    const changeFileVideoWall = async (e, i) => {
        if (e.target.files.length === 0) {
            return;
        }
        const file = {
            index: i,
            fullName: e.target.files[0].name,
            imagePreview: URL.createObjectURL(e.target.files[0]),
        };

        dispatch(selectVideoWallAction(file));
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

    const handlerTextTop = (e, index) => {
        const item = {
            index,
            textTop: e.target.value,
        };

        dispatch(editTextTopAction(item));
    };
    const handlerTextBottom = (e, index) => {
        const item = {
            index,
            textBottom: e.target.value,
        };
        dispatch(editTextBottomAction(item));
    };
    // const handleChangeIndexUp = (i) => {
    //   if (i !== 2) {
    //     const firstIndex = { firstIndex: i - 1, secondIndex: i };
    //     dispatch(editIndexUpAction(firstIndex));
    //   }
    // };
    // const handleChangeIndexDown = (index) => {
    //   if (index !== length - 1) {
    //     // dispatch(editIndexAction(index));
    //   }
    // };
    // console.log(videoWalls);
    return (
        <>
            <table className="mt-3">
                {images.map((item) => (
                    <tr key={item.index}>
                        {/* <td className="delete" width="40px">
              <button
                className="btn btn-outline-info"
                style={{ marginBottom: "10px" }}
                onClick={() => handleChangeIndexUp(item.index)}
              >
                <i class="fa fa-arrow-up" aria-hidden="true"></i>
              </button>
              <br />
              <button
                className="btn btn-outline-info"
                onClick={() => handleChangeIndexDown(item.index)}
              >
                <i class="fa fa-arrow-down" aria-hidden="true"></i>
              </button>
            </td> */}
                        <td className="delete" width="40px">
                            <button
                                className="btn btn-danger"
                                onDoubleClick={() => removeVideoWall(item.index)}
                            >
                                <i className="fa fa-times" aria-hidden="true"></i>
                            </button>
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
                                type="file"
                                name="file"
                                onInput={(e) => changeFileVideoWall(e, item.index)}
                            />{" "}
                            <span>Название файла:{item.fullName}</span>
                            <br />
                            <input
                                className="text"
                                type="text"
                                onChange={(e) => handlerTextTop(e, item.index)}
                                value={item.textTop}
                                name=""
                                id=""
                                maxLength="37"
                                placeholder="Введите текст (первая линия)"
                            />
                            <input
                                className="text"
                                type="text"
                                onChange={(e) => handlerTextBottom(e, item.index)}
                                value={item.textBottom}
                                name=""
                                id=""
                                maxLength="37"
                                placeholder="Введите текст (вторая линия)"
                            />
                        </td>
                        <td className="play">
                            <button
                                className={`btn btn-outline-success fa fa-play ${item.isPlay ? "active" : ""
                                    }`}
                                onClick={() => onPlayClick(item.index)}
                            ></button>
                        </td>
                    </tr>
                ))}
            </table>
            <div className="text-center mt-3">
                <button
                    className="btn btn-primary btn_add m-auto align-middle"
                    onClick={() => addVideoWall()}
                >
                    Добавить
                </button>
            </div>
        </>
    );
};
