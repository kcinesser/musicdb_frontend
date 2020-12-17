import axios from "axios";
import {
  GET_ARTISTS,
  DELETE_ARTIST,
  ADD_ARTIST,
  GET_ARTIST,
  ADD_SONG,
  CONTENT_LOADING,
  CONTENT_LOADED,
} from "./types";
import { tokenConfig } from "./auth";

// get artists
export const getArtists = () => (dispatch, getState) => {
  dispatch({ type: CONTENT_LOADING });

  axios
    .get("http://localhost:8000/api/artists/", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_ARTISTS,
        payload: res.data,
      });

      dispatch({
        type: CONTENT_LOADED,
      });
    })
    .catch((err) => console.log(err));
};

// delete artist
export const deleteArtist = (id) => (dispatch, getState) => {
  dispatch({ type: CONTENT_LOADING });

  axios
    .delete(`http://localhost:8000/api/artists/${id}/`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: DELETE_ARTIST,
        payload: id,
      });

      dispatch({
        type: CONTENT_LOADED,
      });
    })
    .catch((err) => console.log(err));
};

// add artist
export const addArtist = (artist) => (dispatch, getState) => {
  dispatch({ type: CONTENT_LOADING });

  axios
    .post("http://localhost:8000/api/artists/", artist, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: ADD_ARTIST,
        payload: res.data,
      });

      dispatch({
        type: CONTENT_LOADED,
      });
    })
    .catch((err) => console.log(err));
};

// get artist
export const getArtist = (id) => (dispatch, getState) => {
  dispatch({ type: CONTENT_LOADING });

  axios
    .get(`http://localhost:8000/api/artists/${id}/`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_ARTIST,
        payload: res.data,
      });

      dispatch({
        type: CONTENT_LOADED,
      });
    })
    .catch((err) => console.log(err));
};

// add song to artist
export const addSong = (song) => (dispatch, getState) => {
  dispatch({ type: CONTENT_LOADING });

  console.log(song);

  axios
    .post("http://localhost:8000/api/songs/", song, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: ADD_SONG,
        payload: res.data,
      });

      dispatch({
        type: CONTENT_LOADED,
      });
    })
    .catch((err) => console.log(err));
};
