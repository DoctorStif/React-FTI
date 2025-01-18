import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import moment from 'moment';

import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectNotifications } from '../../redux/notifications/notifications.selectors';

import {
  getNotifications,
  updateNotifications,
} from '../../redux/notifications/notifications.actions';
import { getUserPosts } from '../../redux/post/post.actions';

import FollowUser from './follow-notification.component';
import CommentUser from './comment-notification.component';
import HeartUser from './heart-notification.component';
import RetweetUser from './retweet-notification.component';

import './content.styles.scss';

const Content = ({
  currentUser,
  notifications,
  getNotifications,
  updateNotifications,
  getUserPosts,
}) => {
  useEffect(() => {
    getUserPosts(currentUser.email, currentUser);
    getNotifications(currentUser);
    updateNotifications(currentUser);
  }, [currentUser, getNotifications, getUserPosts]);
  let notificationsContainer = '';

  if (notifications != null && Object.keys(notifications).length > 0) {
    notificationsContainer = Object.keys(notifications).map((notification) => {
      const a = moment(notifications[notification].createdAt.toDate()).format();
      const m = moment(a, 'YYYY-MM-DD, h:mm:ss a').fromNow();
      if (notifications[notification].type === 'follow') {
        return (
          <FollowUser
            key={notification}
            viewed={notifications[notification].viewed}
            displayName={notifications[notification].followedBy.displayName}
            email={notifications[notification].followedBy.email}
            profileImage={notifications[notification].followedBy.profileImage}
            createdAt={m}
          />
        );
      } else if (notifications[notification].type === 'like') {
        return (
          <HeartUser
            key={notification}
            viewed={notifications[notification].viewed}
            displayName={notifications[notification].likedBy.displayName}
            email={notifications[notification].likedBy.email}
            profileImage={notifications[notification].likedBy.profileImage}
            postId={notifications[notification].postId}
            currentUserProfileImage={currentUser.profileImage}
            createdAt={m}
          />
        );
      } else if (notifications[notification].type === 'retweet') {
        return (
          <RetweetUser
            key={notification}
            viewed={notifications[notification].viewed}
            displayName={notifications[notification].retweetedBy.displayName}
            email={notifications[notification].retweetedBy.email}
            profileImage={notifications[notification].retweetedBy.profileImage}
            postId={notifications[notification].postId}
            currentUserProfileImage={currentUser.profileImage}
            createdAt={m}
          />
        );
      } else if (notifications[notification].type === 'comment') {
        return (
          <CommentUser
            key={notification}
            viewed={notifications[notification].viewed}
            displayName={notifications[notification].commentedBy.displayName}
            email={notifications[notification].commentedBy.email}
            profileImage={notifications[notification].commentedBy.profileImage}
            postId={notifications[notification].postId}
            currentUserProfileImage={currentUser.profileImage}
            createdAt={m}
          />
        );
      }
    });
  }

  return (
    <section className='notification-content'>
      <div className='notification-content-tweet'>{notificationsContainer}</div>
    </section>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  notifications: selectNotifications,
});

const mapDispatchToProps = (dispatch) => ({
  getNotifications: (currentUser) =>
    dispatch(getNotifications({ currentUser })),
  getUserPosts: (searchValue, currentUser) =>
    dispatch(getUserPosts({ searchValue, currentUser })),
  updateNotifications: (currentUser) =>
    dispatch(updateNotifications({ currentUser })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Content);
