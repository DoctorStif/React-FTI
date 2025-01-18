import { all, call, takeLatest, put } from 'redux-saga/effects';

import MessagesActionTypes from './messages.types';
import {
  getMessagesSuccess,
  getMessageWithEmailSuccess,
  getMessagesNotificationsSuccess,
} from './messages.actions';

import {
  addMessage,
  getMessages,
  updateMessagesViewed,
  getMessagesNotifications,
} from '../../firebase/firebase.utils';

export function* addUserMessage(data) {
  console.log(data);
  try {
    const { currentUser, email, messageData } = data.payload;
    yield call(addMessage, currentUser, email, messageData);
  } catch (error) {
    console.log(error);
  }
}

export function* getUserMessagesFromDB({ payload: { currentUser, email } }) {
  try {
    const data = yield call(getMessages, currentUser, email);
    yield put(getMessagesSuccess(data));
  } catch (error) {
    console.log(error);
  }
}

export function* getMessageWithEmail({ payload: { email } }) {
  try {
    yield put(getMessageWithEmailSuccess(email));
  } catch (error) {
    console.log(error);
  }
}

export function* getMessagesNotificationsFromDB({ payload: { currentUser } }) {
  try {
    const data = yield call(getMessagesNotifications, currentUser);
    yield put(getMessagesNotificationsSuccess(data));
  } catch (error) {
    console.log(error);
  }
}

export function* updateUserMessagesViewedFromDB({
  payload: { currentUser, email },
}) {
  try {
    yield call(updateMessagesViewed, currentUser, email);
  } catch (error) {
    console.log(error);
  }
}

export function* onAddUserMessageStart() {
  yield takeLatest(MessagesActionTypes.ADD_MESSAGE, addUserMessage);
}

export function* onGetUserMessagesStart() {
  yield takeLatest(MessagesActionTypes.GET_MESSAGES, getUserMessagesFromDB);
}

export function* onGetMessageWithEmailStart() {
  yield takeLatest(
    MessagesActionTypes.GET_MESSAGE_WITH_EMAIL,
    getMessageWithEmail
  );
}

export function* onGetMessagesNotificationsStart() {
  yield takeLatest(
    MessagesActionTypes.GET_MESSAGES_NOTIFICATIONS,
    getMessagesNotificationsFromDB
  );
}

export function* onUpdateUserMessagesViewedStart() {
  yield takeLatest(
    MessagesActionTypes.UPDATE_MESSAGES_VIEWED,
    updateUserMessagesViewedFromDB
  );
}

export function* messagesSagas() {
  yield all([
    call(onAddUserMessageStart),
    call(onGetUserMessagesStart),
    call(onGetMessageWithEmailStart),
    call(onGetMessagesNotificationsStart),
    call(onUpdateUserMessagesViewedStart),
  ]);
}
