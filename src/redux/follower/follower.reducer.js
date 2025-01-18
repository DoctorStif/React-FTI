import FollowerActionTypes from './follower.types';

const INITIAL_STATE = {
  followers: null,
  followings: null,
  followSuggestions: null,
};

const followerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FollowerActionTypes.GET_FOLLOWERS_SUCCESS:
      return {
        ...state,
        followers: action.payload,
      };
    case FollowerActionTypes.GET_FOLLOWINGS_SUCCESS:
      return {
        ...state,
        followings: action.payload,
      };
    case FollowerActionTypes.GET_FOLLOW_SUGGESTIONS_SUCCESS:
      return {
        ...state,
        followSuggestions: action.payload,
      };
    default:
      return state;
  }
};

export default followerReducer;
