import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  selectCurrentUser,
  selectUserProfile,
} from '../../redux/user/user.selectors';

import { getUserDataBySearchValue } from '../../redux/user/user.actions';

import './profile-sidebar-left.styles.scss';

const ProfilePageSidebarLeft = ({
  currentUser,
  userProfile,
  searchValue,
  getUserDataBySearchValue,
}) => {
  useEffect(() => {
    getUserDataBySearchValue(searchValue);
  }, [searchValue, getUserDataBySearchValue]);

  return (
    <section className='sidebar-left'>
      <div className='profile-img-container'>
        <img src={userProfile.profileImage} alt='' />
      </div>
      <h3>{userProfile.displayName}</h3>
      <p>{userProfile.email}</p>
      <div>
        <span></span>Turkey
      </div>
      <div>
        <span></span>
        <p>www.google.com</p>
      </div>
    </section>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  userProfile: selectUserProfile,
});

const mapDispatchToProps = (dispatch) => ({
  getUserDataBySearchValue: (searchValue) =>
    dispatch(getUserDataBySearchValue({ searchValue })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfilePageSidebarLeft);
