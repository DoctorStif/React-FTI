import { takeLatest, all, put, call } from 'redux-saga/effects';

import NotificationsActionTypes from './notifications.types';

import { getNotificationsSuccess } from './notifications.actions';

import {
  getNotifications,
  updateNotifications,
} from '../../firebase/firebase.utils';

export function* getUserNotifications({ payload: { currentUser } }) {
  try {
    const data = yield call(getNotifications, currentUser);
    yield put(getNotificationsSuccess(data));
  } catch (error) {
    console.log(error);
  }
}

export function* updateUserNotifications({
  payload: { currentUser },
}) {
  try {
    yield call(updateNotifications, currentUser);
  } catch (error) {
    console.log(error);
  }
}

export function* onGetUserNotificationsStart() {
  yield takeLatest(
    NotificationsActionTypes.GET_NOTIFICATIONS,
    getUserNotifications
  );
}

export function* onUpdateUserNotificationsStart() {
  yield takeLatest(
    NotificationsActionTypes.UPDATE_NOTIFICATIONS,
    updateUserNotifications
  );
}

export function* notificationsSagas() {
  yield all([
    call(onGetUserNotificationsStart),
    call(onUpdateUserNotificationsStart),
  ]);
}
