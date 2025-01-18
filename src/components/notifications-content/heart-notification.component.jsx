import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';

import { selectUserPosts } from '../../redux/post/post.selectors';

const HeartUser = ({
  userPosts,
  viewed,
  displayName,
  email,
  profileImage,
  postId,
  createdAt,
  currentUserProfileImage,
}) => {
  let heartContentContainer = '';

  if (userPosts != null && Object.keys(userPosts).length > 0) {
    heartContentContainer = (
      <div className='heart-content--notification'>
        {userPosts[postId] != null ? (
          <React.Fragment>
            <div>
              <img alt='' src={currentUserProfileImage}></img>
              <div>
                <Link to={'profile?user=' + userPosts[postId].email}>
                  {userPosts[postId].displayName}&nbsp;
                </Link>
                <p> {userPosts[postId].email}</p>
              </div>
            </div>
            <div>
              <p>{userPosts[postId].postData}</p>
            </div>
          </React.Fragment>
        ) : (
          'Silindi!'
        )}
      </div>
    );
  }

  return (
    <div
      className={
        viewed === false
          ? 'heart-user--notification'
          : 'heart-user--notification viewed'
      }
    >
      <div>
        <img alt='' src={profileImage}></img>
        <Link to={'profile?user=' + email}>{displayName}</Link>
        <p>&nbsp;gönderini beğendi.</p>
        <i>{createdAt}</i>
      </div>
      {heartContentContainer}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  userPosts: selectUserPosts,
});

export default connect(mapStateToProps)(HeartUser);
