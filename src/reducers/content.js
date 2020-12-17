import { CONTENT_LOADED, CONTENT_LOADING } from "../actions/types.js";

const initialState = {
  contentLoading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CONTENT_LOADING:
      return {
        ...state,
        contentLoading: true,
      };
    case CONTENT_LOADED:
      return {
        ...state,
        contentLoading: false,
      };
    default:
      return state;
  }
}
