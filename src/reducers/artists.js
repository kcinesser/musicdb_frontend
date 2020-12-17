import {
  GET_ARTISTS,
  DELETE_ARTIST,
  ADD_ARTIST,
  GET_ARTIST,
  ADD_SONG,
  CLEAR_ARTISTS,
} from "../actions/types.js";

const initialState = {
  artists: [],
  songs: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ARTISTS:
      return {
        ...state,
        artists: action.payload,
      };
    case DELETE_ARTIST:
      return {
        ...state,
        artists: state.artists.filter((artist) => artist.id !== action.payload),
        songs: state.songs.filter((song) => song.arist_id !== action.payload),
      };
    case ADD_ARTIST:
      return {
        ...state,
        artists: [...state.artists, action.payload],
      };
    case GET_ARTIST:
      return {
        ...state,
        artist: action.payload,
      };
    case CLEAR_ARTISTS:
      return {
        ...state,
        artists: [],
        artist: {},
      };
    case ADD_SONG:
      return {
        ...state,
        artist: {
          ...state.artist,
          songs: [...state.artist.songs, action.payload],
        },
      };
    default:
      return state;
  }
}
