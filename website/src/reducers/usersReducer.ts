import {
  GET_GITHUB_USER_BASIC_INFO,
  GET_ALL_USER_COMMITS,
  GET_USER_MOST_FREQUENTLY_USED_LANGUAGES,
} from "../actions/types";

interface State {
  userBasicInfo: any;
  userCommits: any;
  userLanguagesUsed: any;
}

const initialState: State = {
  userBasicInfo: [],
  userCommits: [],
  userLanguagesUsed: [],
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
    case GET_USER_MOST_FREQUENTLY_USED_LANGUAGES:
      return {
        ...state,
        userLanguagesUsed: action.payload,
      };
    default:
      return state;
  }
}
