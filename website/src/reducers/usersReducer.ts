import { GET_GITHUB_USER_BASIC_INFO } from "../actions/types";

interface State {
  userBasicInfo: any;
}

const initialState: State = {
  userBasicInfo: {},
};

export default function usersReducer(state = initialState, action: any): State {
  switch (action.type) {
    case GET_GITHUB_USER_BASIC_INFO:
      return {
        ...state,
        userBasicInfo: action.payload,
      };
    default:
      return state;
  }
}
