import NotificationsActionTypes from './notifications.types';

const INITIAL_STATE = {
  notifications: null
};

const notificationsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NotificationsActionTypes.GET_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        notifications: action.payload
      };
    default:
      return state;
  }
};

export default notificationsReducer;
