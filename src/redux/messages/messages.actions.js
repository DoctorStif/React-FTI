import MessagesActionTypes from './messages.types';

export const addMessage = (data) => ({
  type: MessagesActionTypes.ADD_MESSAGE,
  payload: data,
});

export const getMessages = (data) => ({
  type: MessagesActionTypes.GET_MESSAGES,
  payload: data,
});

export const getMessagesSuccess = (data) => ({
  type: MessagesActionTypes.GET_MESSAGES_SUCCESS,
  payload: data,
});

export const getMessageWithEmail = (data) => ({
  type: MessagesActionTypes.GET_MESSAGE_WITH_EMAIL,
  payload: data,
});

export const getMessageWithEmailSuccess = (data) => ({
  type: MessagesActionTypes.GET_MESSAGE_WITH_EMAIL_SUCCESS,
  payload: data,
});

export const getMessagesNotifications = (data) => ({
  type: MessagesActionTypes.GET_MESSAGES_NOTIFICATIONS,
  payload: data,
});

export const getMessagesNotificationsSuccess = (data) => ({
  type: MessagesActionTypes.GET_MESSAGES_NOTIFICATIONS_SUCCESS,
  payload: data,
});

export const updateMessagesViewed = (data) => ({
  type: MessagesActionTypes.UPDATE_MESSAGES_VIEWED,
  payload: data,
});