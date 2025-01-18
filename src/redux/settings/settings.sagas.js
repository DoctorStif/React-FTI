import { takeLatest, all, call } from 'redux-saga/effects';

import SettingsActionTypes from './settings.types';

import {
  changePassword,
  changeCoverPhoto,
  changeProfilePhoto
} from '../../firebase/firebase.utils';

export function* changeUserPassword(data) {
  try {
    const { currentUser } = data.payload;
    yield call(changePassword, currentUser);
  } catch (error) {
    console.log(error);
  }
}

export function* changeUserCoverPhoto(data) {
  try {
    const { currentUser, image } = data.payload;
    yield call(changeCoverPhoto, currentUser, image);
  } catch (error) {
    console.log(error);
  }
}

export function* changeUserProfilePhoto(data) {
  try {
    const { currentUser, image } = data.payload;
    yield call(changeProfilePhoto, currentUser, image);
  } catch (error) {
    console.log(error);
  }
}

export function* onChangePasswordStart() {
  yield takeLatest(SettingsActionTypes.CHANGE_PASSWORD, changeUserPassword);
}

export function* onChangeCoverPhotoStart() {
  yield takeLatest(
    SettingsActionTypes.CHANGE_COVER_PHOTO,
    changeUserCoverPhoto
  );
}

export function* onChangeProfilePhotoStart() {
  yield takeLatest(
    SettingsActionTypes.CHANGE_PROFILE_PHOTO,
    changeUserProfilePhoto
  );
}

export function* settingsSagas() {
  yield all([
    call(onChangePasswordStart),
    call(onChangeCoverPhotoStart),
    call(onChangeProfilePhotoStart)
  ]);
}
