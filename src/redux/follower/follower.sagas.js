import { all, call, takeLatest, put } from 'redux-saga/effects';

import FollowerActionTypes from './follower.types';
import {
  getFollowersSuccess,
  getFollowingsSuccess,
  getFollowSuggestionsSuccess
} from './follower.actions';

import {
  addUserFollowers,
  removeUserFollowers,
  getUserFollowers,
  getUserFollowings,
  getUserFollowSuggestions
} from '../../firebase/firebase.utils';

export function* addFollowerToUser(data) {
  try {
    const { currentUser, followerId } = data.payload;
    yield call(addUserFollowers, currentUser, followerId);
  } catch (error) {
    console.log(error);
  }
}

export function* removeFollowerFromUser(data) {
  try {
    const { currentUser, followerId } = data.payload;
    yield call(removeUserFollowers, currentUser, followerId);
  } catch (error) {
    console.log('follower add error');
  }
}

export function* getUserFollowersFromDB({ payload: { currentUser } }) {
  try {
    const data = yield call(getUserFollowers, currentUser);
    yield put(getFollowersSuccess(data));
  } catch (error) {
    console.log(error);
  }
}

export function* getUserFollowingsFromDB({ payload: { currentUser } }) {
  try {
    const data = yield call(getUserFollowings, currentUser);
    yield put(getFollowingsSuccess(data));
  } catch (error) {
    console.log(error);
  }
}

export function* getUserFollowSuggestionsFromDB({ payload: { currentUser } }) {
  try {
    const data = yield call(getUserFollowSuggestions, currentUser);
    yield put(getFollowSuggestionsSuccess(data));
  } catch (error) {
    console.log(error);
  }
}

export function* onAddFollowerStart() {
  yield takeLatest(FollowerActionTypes.ADD_FOLLOWER, addFollowerToUser);
}

export function* onRemoveFollowerStart() {
  yield takeLatest(FollowerActionTypes.REMOVE_FOLLOWER, removeFollowerFromUser);
}

export function* onGetFollowersStart() {
  yield takeLatest(FollowerActionTypes.GET_FOLLOWERS, getUserFollowersFromDB);
}

export function* onGetFollowingsStart() {
  yield takeLatest(FollowerActionTypes.GET_FOLLOWINGS, getUserFollowingsFromDB);
}

export function* onGetFollowSuggestionsStart() {
  yield takeLatest(
    FollowerActionTypes.GET_FOLLOW_SUGGESTIONS,
    getUserFollowSuggestionsFromDB
  );
}

export function* followerSagas() {
  yield all([
    call(onAddFollowerStart),
    call(onRemoveFollowerStart),
    call(onGetFollowersStart),
    call(onGetFollowingsStart),
    call(onGetFollowSuggestionsStart)
  ]);
}
