import SettingsActionTypes from './settings.types';

export const changePassword = data => ({
  type: SettingsActionTypes.CHANGE_PASSWORD,
  payload: data
});

export const changeCoverPhoto = data => ({
  type: SettingsActionTypes.CHANGE_COVER_PHOTO,
  payload: data
});

export const changeProfilePhoto = data => ({
  type: SettingsActionTypes.CHANGE_PROFILE_PHOTO,
  payload: data
});
