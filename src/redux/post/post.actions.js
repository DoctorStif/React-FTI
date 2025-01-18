import PostActionTypes from './post.types';

export const addPost = (data) => ({
  type: PostActionTypes.ADD_POST,
  payload: data,
});

export const removePost = (data) => ({
  type: PostActionTypes.REMOVE_POST,
  payload: data,
});

export const updatePost = (data) => ({
  type: PostActionTypes.UPDATE_POST,
  payload: data,
});

export const getUserPosts = (data) => ({
  type: PostActionTypes.GET_USER_POSTS,
  payload: data,
});

export const getUserPostsSuccess = (data) => ({
  type: PostActionTypes.GET_USER_POSTS_SUCCESS,
  payload: data,
});

export const getFollowingUserPosts = (data) => ({
  type: PostActionTypes.GET_FOLLOWING_USER_POSTS,
  payload: data,
});

export const getFollowingUserPostsSuccess = (data) => ({
  type: PostActionTypes.GET_FOLLOWING_USER_POSTS_SUCCESS,
  payload: data,
});

export const getPostsByHashtag = (data) => ({
  type: PostActionTypes.GET_POSTS_BY_HASHTAG,
  payload: data,
});

export const getPostsByHashtagSuccess = (data) => ({
  type: PostActionTypes.GET_POSTS_BY_HASHTAG_SUCCESS,
  payload: data,
});

export const getMostUsedHashtags = (data) => ({
  type: PostActionTypes.GET_MOST_USED_HASHTAGS,
  payload: data,
});

export const getMostUsedHashtagsSuccess = (data) => ({
  type: PostActionTypes.GET_MOST_USED_HASHTAGS_SUCCESS,
  payload: data,
});

export const addComment = (data) => ({
  type: PostActionTypes.ADD_COMMENT,
  payload: data,
});

export const getComments = (data) => ({
  type: PostActionTypes.GET_COMMENTS,
  payload: data,
});

export const getCommentsSuccess = (data) => ({
  type: PostActionTypes.GET_COMMENTS_SUCCESS,
  payload: data,
});

export const addRetweet = (data) => ({
  type: PostActionTypes.ADD_RETWEET,
  payload: data,
});

export const getRetweets = (data) => ({
  type: PostActionTypes.GET_RETWEETS,
  payload: data,
});

export const addLike = (data) => ({
  type: PostActionTypes.ADD_LIKE,
  payload: data,
});

export const removeLike = (data) => ({
  type: PostActionTypes.REMOVE_LIKE,
  payload: data,
});
