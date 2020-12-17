import axios from "axios";
import {
  GET_SONGS,
  GET_SONG,
  DELETE_SONG,
  UPDATE_SONG,
  CONTENT_LOADED,
  CONTENT_LOADING,
} from "./types";
import { tokenConfig } from "./auth";

// get songs
export const getSongs = () => (dispatch, getState) => {
  dispatch({ type: CONTENT_LOADING });

  axios
    .get("http://localhost:8000/api/songs/", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_SONGS,
        payload: res.data,
      });

      dispatch({
        type: CONTENT_LOADED,
      });
    })
    .then(() => {})
    .catch((err) => console.log(err));
};

// get song
export const getSong = (id) => (dispatch, getState) => {
  dispatch({ type: CONTENT_LOADING });
  axios
    .get(`http://localhost:8000/api/songs/${id}`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_SONG,
        payload: res.data,
      });

      dispatch({
        type: CONTENT_LOADED,
      });
    })
    .catch((err) => console.log(err));
};

//delete song
export const deleteSong = (id) => (dipatch, getState) => {
  axios
    .delete(`http://localhost:8000/api/songs/${id}/`, tokenConfig(getState))
    .then((res) => {
      dipatch({
        type: DELETE_SONG,
        payload: id,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// edit song
export const editSong = (id, song) => (dispatch, getState) => {
  dispatch({ type: CONTENT_LOADING });
  axios
    .patch(
      `http://localhost:8000/api/songs/${id}/`,
      song,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: UPDATE_SONG,
        payload: res.data,
      });

      dispatch({
        type: CONTENT_LOADED,
      });
    })
    .catch((err) => console.log(err));
};
