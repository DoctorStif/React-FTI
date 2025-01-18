import FollowerActionTypes from './follower.types';

export const addFollower = (data) => ({
  type: FollowerActionTypes.ADD_FOLLOWER,
  payload: data,
});

// export const addFollowerSuccess = data => ({
//   type: FollowerActionTypes.ADD_FOLLOWER_SUCCESS,
//   payload: data
// });

export const removeFollower = (data) => ({
  type: FollowerActionTypes.REMOVE_FOLLOWER,
  payload: data,
});

// export const removeFollowerSuccess = data => ({
//   type: FollowerActionTypes.REMOVE_FOLLOWER_SUCCESS,
//   payload: data
// });

export const getFollowers = (currentUser) => ({
  type: FollowerActionTypes.GET_FOLLOWERS,
  payload: currentUser,
});

export const getFollowersSuccess = (data) => ({
  type: FollowerActionTypes.GET_FOLLOWERS_SUCCESS,
  payload: data,
});

export const getFollowings = (currentUser) => ({
  type: FollowerActionTypes.GET_FOLLOWINGS,
  payload: currentUser,
});

export const getFollowingsSuccess = (data) => ({
  type: FollowerActionTypes.GET_FOLLOWINGS_SUCCESS,
  payload: data,
});

export const getFollowSuggestions = (currentUser) => ({
  type: FollowerActionTypes.GET_FOLLOW_SUGGESTIONS,
  payload: currentUser,
});

export const getFollowSuggestionsSuccess = (data) => ({
  type: FollowerActionTypes.GET_FOLLOW_SUGGESTIONS_SUCCESS,
  payload: data,
});
