import { createStore, combineReducers } from "redux";
import { videoWallReducer } from "./videoWallReducer";
import { currentIndexReducer } from "./currentIndexReducer";
import { videoWallUtroReducer } from "./videoWallUtroReducer";
import { composeWithDevTools } from "redux-devtools-extension";

const rootReducer = combineReducers({
  videoWalls: videoWallReducer,
  videoWallsUtro: videoWallUtroReducer,
  currentIndex: currentIndexReducer,
});

export const store = createStore(rootReducer, composeWithDevTools());
