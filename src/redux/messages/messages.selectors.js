import { createSelector } from 'reselect';

const selectMessage = (state) => state.message;

export const selectMessages = createSelector(
  [selectMessage],
  (message) => message.messages
);

export const selectMessageWithEmail = createSelector(
  [selectMessage],
  (message) => message.messageWithEmail
);

export const selectMessagesNotifications = createSelector(
  [selectMessage],
  (message) => message.messagesNotifications
);
