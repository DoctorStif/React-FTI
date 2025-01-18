import PostActionTypes from './post.types';

const INITIAL_STATE = {
  userPosts: null,
  followingsPosts: null,
  postsByHashtag: null,
  postComments: null,
  mostUsedHashtags: null,
};

const postReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PostActionTypes.GET_USER_POSTS_SUCCESS:
      return {
        ...state,
        userPosts: action.payload,
      };
    case PostActionTypes.GET_FOLLOWING_USER_POSTS_SUCCESS:
      return {
        ...state,
        followingsPosts: action.payload,
      };
    case PostActionTypes.GET_POSTS_BY_HASHTAG_SUCCESS:
      return {
        ...state,
        postsByHashtag: action.payload,
      };
    case PostActionTypes.GET_COMMENTS_SUCCESS:
      return {
        ...state,
        postComments: action.payload,
      };
    case PostActionTypes.GET_MOST_USED_HASHTAGS_SUCCESS:
      return {
        ...state,
        mostUsedHashtags: action.payload,
      };
    default:
      return state;
  }
};

export default postReducer;
