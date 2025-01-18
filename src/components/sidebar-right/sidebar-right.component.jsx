import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';

import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectFollowSuggestions } from '../../redux/follower/follower.selectors';

import {
  addFollower,
  removeFollower,
  getFollowSuggestions,
  getFollowings,
} from '../../redux/follower/follower.actions';

import './sidebar-right.styles.scss';

const SidebarRight = ({
  currentUser,
  followSuggestions,
  addFollower,
  removeFollower,
  getFollowSuggestions,
  getFollowings,
}) => {
  useEffect(() => {
    getFollowSuggestions(currentUser);
  }, [getFollowSuggestions, currentUser]);

  let followContainer = '';

  const handleButtonClick = async (currentUser, followerId) => {
    addFollower(currentUser, followerId);
    setTimeout(() => {
      getFollowings(currentUser);
    }, 1500);
  };

  delete followSuggestions[currentUser.id];

  if (followSuggestions != null && Object.keys(followSuggestions).length > 0) {
    let arr = [];
    let id = '';
    while (arr.length < 3) {
      let r = Math.floor(Math.random() * Object.keys(followSuggestions).length);
      if (arr.indexOf(r) === -1) arr.push(r);
    }

    followContainer = arr.map((index) => {
      id = Object.keys(followSuggestions)[index];
      return (
        <div key={id} className='sidebar-right--content'>
          <img src={followSuggestions[id].profileImage} alt='' />
          <div>
            <Link to={'profile?user=' + followSuggestions[id].email}>
              {followSuggestions[id].displayName}
            </Link>
            <button
              onClick={() =>
                handleButtonClick(
                  currentUser,
                  Object.keys(followSuggestions)[index]
                )
              }
            >
              <ion-icon name='person-add'></ion-icon>Takip et
            </button>
          </div>
        </div>
      );
    });
  }

  return (
    <section className='sidebar-right'>
      <h4>Takip Onerileri</h4>
      {followContainer}
    </section>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  followSuggestions: selectFollowSuggestions,
});

const mapDispatchToProps = (dispatch) => ({
  addFollower: (currentUser, followerId) =>
    dispatch(addFollower({ currentUser, followerId })),
  removeFollower: (currentUser, followerId) =>
    dispatch(removeFollower({ currentUser, followerId })),
  getFollowSuggestions: (currentUser) =>
    dispatch(getFollowSuggestions({ currentUser })),
  getFollowings: (currentUser) => dispatch(getFollowings({ currentUser })),
});

export default connect(mapStateToProps, mapDispatchToProps)(SidebarRight);
