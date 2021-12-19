import { GET_GITHUB_USER_BASIC_INFO } from "./types";
import axios from "axios";
import { Dispatch } from "redux";

// Get Basic Info on User based on username
export const getBasicUserInfo = (username: string) => (dispatch: Dispatch) => {
  axios
    .get(`/user/${username}`)
    .then((payload) => {
      dispatch({ type: GET_GITHUB_USER_BASIC_INFO, payload });
    })
    .catch((reason) => {
      console.warn(reason);
      dispatch({ type: GET_GITHUB_USER_BASIC_INFO, payload: reason.response });
    });
};
