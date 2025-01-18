import { all, call, takeLatest, put } from 'redux-saga/effects';

import PostActionTypes from './post.types';
import {
  getUserPostsSuccess,
  getFollowingUserPostsSuccess,
  getCommentsSuccess,
  getPostsByHashtagSuccess,
  getMostUsedHashtagsSuccess,
} from './post.actions';

import {
  addPost,
  removePost,
  updatePost,
  getUserPosts,
  getFollowingUserPosts,
  getPostsByHashtag,
  getMostUsedHashtags,
  addComment,
  getComments,
  addRetweet,
  addLike,
  removeLike,
} from '../../firebase/firebase.utils';

export function* addUserPost(data) {
  try {
    const { currentUser, postData, mentioned, hashtags, image } = data.payload;
    yield call(addPost, currentUser, postData, mentioned, hashtags, image);
    getUserPostsFromDB(data);
  } catch (error) {
    console.log(error);
  }
}

export function* removeUserPost(data) {
  try {
    const { currentUser, postId } = data.payload;
    yield call(removePost, currentUser, postId);
    getUserPostsFromDB(data);
  } catch (error) {
    console.log(error);
  }
}

export function* updateUserPost(data) {
  try {
    const { currentUser, postId, postData } = data.payload;
    yield call(updatePost, currentUser, postId, postData);
    getUserPostsFromDB(data);
  } catch (error) {
    console.log(error);
  }
}

export function* getUserPostsFromDB({ payload: { searchValue, currentUser } }) {
  try {
    const data = yield call(getUserPosts, searchValue, currentUser);
    yield put(getUserPostsSuccess(data));
  } catch (error) {
    console.log(error);
  }
}

export function* getFollowingUserPostsFromDB({
  payload: { currentUser, followings },
}) {
  try {
    const data = yield call(getFollowingUserPosts, currentUser, followings);
    yield put(getFollowingUserPostsSuccess(data));
  } catch (error) {
    console.log(error);
  }
}

export function* getPostsByHashtagFromDB({ payload: { hashtag } }) {
  try {
    const data = yield call(getPostsByHashtag, hashtag);
    yield put(getPostsByHashtagSuccess(data));
  } catch (error) {
    console.log(error);
  }
}

export function* getMostUsedHashtagsFromDB({ payload: { count } }) {
  try {
    const data = yield call(getMostUsedHashtags, count);
    yield put(getMostUsedHashtagsSuccess(data));
  } catch (error) {
    console.log(error);
  }
}
//////////////////////////////////////////////////
export function* addPostComment(data) {
  try {
    const { currentUser, postId, postByEmail, commentData } = data.payload;
    yield call(addComment, currentUser, postId, postByEmail, commentData);
    getPostCommentsFromDB(data);
  } catch (error) {
    console.log(error);
  }
}

export function* getPostCommentsFromDB({
  payload: { currentUser, postId, postByEmail },
}) {
  try {
    const data = yield call(getComments, currentUser, postId, postByEmail);
    yield put(getCommentsSuccess(data));
  } catch (error) {
    console.log(error);
  }
}
//////////////////////////////////////////////////
export function* addUserRetweet(data) {
  try {
    const {
      currentUser,
      displayName,
      email,
      postData,
      postId,
      profileImage,
      retweet,
    } = data.payload;
    yield call(
      addRetweet,
      currentUser,
      displayName,
      email,
      postData,
      postId,
      profileImage,
      retweet
    );
  } catch (error) {
    console.log(error);
  }
}

//////////////////////////////////////////////////
export function* addUserLike({
  payload: { currentUser, postId, postByEmail },
}) {
  try {
    yield call(addLike, currentUser, postId, postByEmail);
  } catch (error) {
    console.log(error);
  }
}

export function* removeUserLike({
  payload: { currentUser, postId, postByEmail },
}) {
  try {
    yield call(removeLike, currentUser, postId, postByEmail);
  } catch (error) {
    console.log(error);
  }
}
////////////////////////////////////////////
export function* onAddPostStart() {
  yield takeLatest(PostActionTypes.ADD_POST, addUserPost);
}

export function* onRemovePostStart() {
  yield takeLatest(PostActionTypes.REMOVE_POST, removeUserPost);
}

export function* onUpdatePostStart() {
  yield takeLatest(PostActionTypes.UPDATE_POST, updateUserPost);
}

export function* onGetUserPostsStart() {
  yield takeLatest(PostActionTypes.GET_USER_POSTS, getUserPostsFromDB);
}

export function* onGetFollowingUserPostsStart() {
  yield takeLatest(
    PostActionTypes.GET_FOLLOWING_USER_POSTS,
    getFollowingUserPostsFromDB
  );
}

export function* onGetPostsByHashtagStart() {
  yield takeLatest(
    PostActionTypes.GET_POSTS_BY_HASHTAG,
    getPostsByHashtagFromDB
  );
}

export function* onGetMostUsedHashtagsStart() {
  yield takeLatest(
    PostActionTypes.GET_MOST_USED_HASHTAGS,
    getMostUsedHashtagsFromDB
  );
}

export function* onAddCommentStart() {
  yield takeLatest(PostActionTypes.ADD_COMMENT, addPostComment);
}

export function* onGetPostCommentsStart() {
  yield takeLatest(PostActionTypes.GET_COMMENTS, getPostCommentsFromDB);
}

export function* onAddRetweetStart() {
  yield takeLatest(PostActionTypes.ADD_RETWEET, addUserRetweet);
}

export function* onAddLikeStart() {
  yield takeLatest(PostActionTypes.ADD_LIKE, addUserLike);
}

export function* onRemoveLikeStart() {
  yield takeLatest(PostActionTypes.REMOVE_LIKE, removeUserLike);
}

export function* postSagas() {
  yield all([
    call(onAddPostStart),
    call(onRemovePostStart),
    call(onUpdatePostStart),
    call(onGetUserPostsStart),
    call(onGetFollowingUserPostsStart),
    call(onAddCommentStart),
    call(onGetPostCommentsStart),
    call(onAddRetweetStart),
    call(onAddLikeStart),
    call(onRemoveLikeStart),
    call(onGetPostsByHashtagStart),
    call(onGetMostUsedHashtagsStart),
  ]);
}
