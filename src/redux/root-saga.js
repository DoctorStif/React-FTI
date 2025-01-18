import { all, call } from 'redux-saga/effects';

// import { shopSagas } from './shop/shop.sagas';
import { userSagas } from './user/user.sagas';
import { followerSagas } from './follower/follower.sagas';
import { postSagas } from './post/post.sagas';
import { messagesSagas } from './messages/messages.sagas';
import { settingsSagas } from './settings/settings.sagas';
import { notificationsSagas } from './notifications/notifications.sagas';

export default function* rootSaga() {
  yield all([
    call(userSagas),
    call(followerSagas),
    call(postSagas),
    call(messagesSagas),
    call(settingsSagas),
    call(notificationsSagas)
  ]);
}
