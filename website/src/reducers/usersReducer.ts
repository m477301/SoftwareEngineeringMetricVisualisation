import {
  GET_GITHUB_USER_BASIC_INFO,
  GET_ALL_USER_COMMITS,
} from "../actions/types";

interface State {
  userBasicInfo: any;
  userCommits: any;
}

const initialState: State = {
  userBasicInfo: [],
  userCommits: [],
};

export default function usersReducer(state = initialState, action: any): State {
  switch (action.type) {
    case GET_GITHUB_USER_BASIC_INFO:
      return {
        ...state,
        userBasicInfo: action.payload,
      };
    case GET_ALL_USER_COMMITS:
      return {
        ...state,
        userCommits: action.payload,
      };
    default:
      return state;
  }
}
