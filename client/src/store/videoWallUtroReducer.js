const defaultState = {
  videoWallUtro: {
    fullName: "",
    imagePreview: "",
    isPlay: false,
  },
  images: {
    items: [
      {
        index: 0,
        fullName: "",
        imagePreview: "",
      },
    ],
    isPlay: false,
  },
};

const ADD_VIDEOWALL_UTRO = "ADD_VIDEOWALL_UTRO";
const REMOVE_VIDEOWALL_UTRO = "REMOVE_VIDEOWALL_UTRO";
const PLAY_ITEM_VIDEOWALL_UTRO = "PLAY_ITEM_VIDEOWALL_UTRO";
const EDIT_IMAGE_VIDEOWALL_UTRO = "EDIT_IMAGE_VIDEOWALL_UTRO";
const EDIT_VIDEO_UTRO = "EDIT_VIDEO";

export const videoWallUtroReducer = (state = defaultState, action) => {
  switch (action.type) {
    case EDIT_VIDEO_UTRO:
      return {
        ...state,
        videoWallUtro: {
          ...state.videoWallUtro,
          fullName: action.payload.fullName,
          imagePreview: action.payload.imagePreview,
        },
      };
    case ADD_VIDEOWALL_UTRO:
      return {
        ...state,
        images: {
          ...state.images,
          items: [...state.images.items, action.payload],
        },
      };
    case REMOVE_VIDEOWALL_UTRO:
      return {
        ...state,
        images: {
          ...state.images,
          items: state.images.items.filter((n) => n.index !== action.payload),
        },
      };
    // case PLAY_ITEM_VIDEOWALL:
    //   return {
    //     videoWallUtro: state.videoWallUtro.map((video) =>
    //       video.index === action.payload
    //         ? { ...video, isPlay: true }
    //         : { ...video, isPlay: false }
    //     ),
    //   };
    case EDIT_IMAGE_VIDEOWALL_UTRO:
      return {
        ...state,
        images: {
          ...state.images,
          items: state.images.items.map((video) =>
            video.index === action.payload.index
              ? { ...video, ...action.payload }
              : video
          ),
        },
      };
    default:
      return state;
  }
};

export const addVideoWallUtroAction = (payload) => ({
  type: ADD_VIDEOWALL_UTRO,
  payload,
});
export const removeVideoWallUtroAction = (payload) => ({
  type: REMOVE_VIDEOWALL_UTRO,
  payload,
});
export const playVideoWallUtroAction = (payload) => ({
  type: PLAY_ITEM_VIDEOWALL_UTRO,
  payload,
});
export const editImageVideowallUtroAction = (payload) => ({
  type: EDIT_IMAGE_VIDEOWALL_UTRO,
  payload,
});
export const editVideoUtroAction = (payload) => ({
  type: EDIT_VIDEO_UTRO,
  payload,
});
