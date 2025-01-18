import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './user/user.reducer';
import followerReducer from './follower/follower.reducer';
import postReducer from './post/post.reducer';
import messagesReducer from './messages/messages.reducer';
import notificationsReducer from './notifications/notifications.reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user']
};

const rootReducer = combineReducers({
  user: userReducer,
  follower: followerReducer,
  post: postReducer,
  message: messagesReducer,
  notification: notificationsReducer
});

export default persistReducer(persistConfig, rootReducer);
