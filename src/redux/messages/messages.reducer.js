import MessagesActionTypes from './messages.types';

const INITIAL_STATE = {
  messages: null,
  messageWithEmail: null,
  messagesNotifications: null,
};

const messagesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MessagesActionTypes.GET_MESSAGES_SUCCESS:
      return {
        ...state,
        messages: action.payload,
      };
    case MessagesActionTypes.GET_MESSAGE_WITH_EMAIL_SUCCESS:
      return {
        ...state,
        messageWithEmail: action.payload,
      };
    case MessagesActionTypes.GET_MESSAGES_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        messagesNotifications: action.payload,
      };
    default:
      return state;
  }
};

export default messagesReducer;
