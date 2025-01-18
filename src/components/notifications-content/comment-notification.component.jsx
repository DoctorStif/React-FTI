import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';

import { selectUserPosts } from '../../redux/post/post.selectors';

const CommentUser = ({
  userPosts,
  viewed,
  displayName,
  email,
  profileImage,
  postId,
  createdAt,
  currentUserProfileImage,
}) => {
  let commentContentContainer = '';

  if (userPosts != null && Object.keys(userPosts).length > 0) {
    commentContentContainer = (
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
        <p>&nbsp;gönderine yorum yaptı.</p>
        <i>{createdAt}</i>
      </div>
      {commentContentContainer}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  userPosts: selectUserPosts,
});

export default connect(mapStateToProps)(CommentUser);
