import NotificationsActionTypes from './notifications.types';

export const getNotifications = data => ({
  type: NotificationsActionTypes.GET_NOTIFICATIONS,
  payload: data
});

export const getNotificationsSuccess = data => ({
  type: NotificationsActionTypes.GET_NOTIFICATIONS_SUCCESS,
  payload: data
});

export const updateNotifications = data => ({
  type: NotificationsActionTypes.UPDATE_NOTIFICATIONS,
  payload: data
});