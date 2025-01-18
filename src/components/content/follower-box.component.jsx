import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  addFollower,
  removeFollower,
  getFollowings,
} from '../../redux/follower/follower.actions';

import './follower-box.styles.scss';

const FollowerBox = ({
  currentUser,
  userId,
  displayName,
  email,
  coverImage,
  profileImage,
  following,
  addFollower,
  removeFollower,
  getFollowings,
}) => {
  const [follow, setFollow] = useState(following);

  let classNameContainer = follow ? 'unfollow-button' : 'follow-button';
  const handleButtonClick = async () => {
    setTimeout(() => {
      getFollowings(currentUser);
    }, 1500);
    classNameContainer = follow ? 'unfollow-button' : 'follow-button';
    follow
      ? removeFollower(currentUser, userId)
      : addFollower(currentUser, userId);
    setFollow(!follow);
  };

  return (
    <div className='wrapper-follow-box'>
      <div className='follow-box-background'>
        <img src={coverImage} alt='' />
      </div>
      <div className='follow-box-button-img'>
        <div className='follow-box-img'>
          <img src={profileImage} alt='' />
        </div>
        <button onClick={handleButtonClick} className={classNameContainer}>
          {follow ? (
            'Takipten Çık'
          ) : (
            <React.Fragment>
              <ion-icon name='person-add'></ion-icon>
              Takip Et
            </React.Fragment>
          )}
        </button>
      </div>
      <div className='follow-box-name-email'>
        <Link
          className='follow-box-name-email-link-bold'
          to={'profile?user=' + email}
        >
          {displayName}
        </Link>
        <label>{email}</label>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addFollower: (currentUser, followerId) =>
    dispatch(addFollower({ currentUser, followerId })),
  removeFollower: (currentUser, followerId) =>
    dispatch(removeFollower({ currentUser, followerId })),
  getFollowings: (currentUser) => dispatch(getFollowings({ currentUser })),
});

export default connect(null, mapDispatchToProps)(FollowerBox);
