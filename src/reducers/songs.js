import {
  GET_SONGS,
  GET_SONG,
  DELETE_SONG,
  UPDATE_SONG,
  CLEAR_SONGS,
} from "../actions/types.js";

const initialState = {
  songs: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_SONGS:
      return {
        ...state,
        songs: action.payload,
      };
    case GET_SONG:
      return {
        ...state,
        song: action.payload,
      };
    case DELETE_SONG:
      return {
        ...state,
        songs: state.songs.filter((song) => song.id !== action.payload),
      };
    case UPDATE_SONG:
      return {
        ...state,
        song: action.payload,
      };
    case CLEAR_SONGS:
      return {
        ...state,
        songs: [],
        song: {},
      };
    default:
      return state;
  }
}
