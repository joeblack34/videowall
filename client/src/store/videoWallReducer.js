const defaultState = {
  videoWall: [
    {
      index: 0,
      fullName: "",
      imagePreview: "",
      isPlay: false,
    },
    {
      index: 1,
      fullName: "",
      imagePreview: "",
      isPlay: false,
    },
  ],
};

const ADD_VIDEOWALL = "ADD_VIDEOWALL";
const REMOVE_VIDEOWALL = "REMOVE_VIDEOWALL";
const PLAY_ITEM_VIDEOWALL = "PLAY_ITEM_VIDEOWALL";
const SELECT_FILE_VIDEOWALL = "SELECT_FILE_VIDEOWALL";
const EDIT_VIDEO = "EDIT_VIDEO";
const EDIT_TEXT_TOP = "EDIT_TEXT_TOP";
const EDIT_TEXT_BOTTOM = "EDIT_TEXT_BOTTOM";

const EDIT_INDEX_UP = "EDIT_INDEX_UP";

export const videoWallReducer = (state = defaultState, action) => {
  switch (action.type) {
    case EDIT_VIDEO:
      return {
        videoWall: state.videoWall.map((video) =>
          video.index === action.payload.i
            ? {
                ...video,
                fullName: action.payload.n,
                imagePreview: action.payload.p,
              }
            : video
        ),
      };
    case ADD_VIDEOWALL:
      return { videoWall: [...state.videoWall, action.payload] };
    case REMOVE_VIDEOWALL:
      return {
        videoWall: state.videoWall.filter((n) => n.index !== action.payload),
      };
    case PLAY_ITEM_VIDEOWALL:
      return {
        videoWall: state.videoWall.map((video) =>
          video.index === action.payload
            ? { ...video, isPlay: true }
            : { ...video, isPlay: false }
        ),
      };
    case SELECT_FILE_VIDEOWALL:
      return {
        videoWall: state.videoWall.map((video) =>
          video.index === action.payload.index
            ? { ...video, ...action.payload }
            : video
        ),
      };
    case EDIT_TEXT_TOP:
      return {
        videoWall: state.videoWall.map((video) =>
          video.index === action.payload.index
            ? {
                ...video,
                textTop: action.payload.textTop,
              }
            : video
        ),
      };

    case EDIT_TEXT_BOTTOM:
      return {
        videoWall: state.videoWall.map((video) =>
          video.index === action.payload.index
            ? {
                ...video,
                textBottom: action.payload.textBottom,
              }
            : video
        ),
      };
    case EDIT_INDEX_UP:
      const results = state.videoWall.slice();
      const firstItem = state.videoWall[action.payload.firstIndex];
      results[action.payload.firstIndex] =
        state.videoWall[action.payload.secondIndex];
      results[action.payload.secondIndex] = firstItem;
      // const temp = state.videoWall[action.payload.index];
      console.log(results, "result");
      return {
        videoWall: results,
      };
    default:
      return state;
  }
};

export const addVideoWallAction = (payload) => ({
  type: ADD_VIDEOWALL,
  payload,
});
export const removeVideoWallAction = (payload) => ({
  type: REMOVE_VIDEOWALL,
  payload,
});
export const playVideoWallAction = (payload) => ({
  type: PLAY_ITEM_VIDEOWALL,
  payload,
});
export const selectVideoWallAction = (payload) => ({
  type: SELECT_FILE_VIDEOWALL,
  payload,
});
export const editVideoAction = (payload) => ({
  type: EDIT_VIDEO,
  payload,
});

export const editIndexUpAction = (payload) => ({
  type: EDIT_INDEX_UP,
  payload,
});

export const editTextTopAction = (payload) => ({
  type: EDIT_TEXT_TOP,
  payload,
});

export const editTextBottomAction = (payload) => ({
  type: EDIT_TEXT_BOTTOM,
  payload,
});
