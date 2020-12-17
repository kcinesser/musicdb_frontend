import { combineReducers } from "redux";
import artists from "./artists";
import auth from "./auth";
import songs from "./songs";
import content from "./content";

export default combineReducers({
  artists,
  auth,
  songs,
  content,
});
