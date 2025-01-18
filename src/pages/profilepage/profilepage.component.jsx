import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectUserProfile } from '../../redux/user/user.selectors';

import Content from '../../components/content/content.component';
import SidebarRight from '../../components/sidebar-right/sidebar-right.component';
import ProfileSidebarLeft from '../../components/profile-sidebar-left/profile-sidebar-left.component';

import './profilepage.styles.scss';

const ProfilePage = ({ location, userProfile }) => {
  let anchor = location.search;
  let params = new URLSearchParams(anchor);
  let searchValue =
    params.get('user') == null ? '' : params.get('user').toString();
  return (
    <React.Fragment>
      <img className='img-cover' src={userProfile.coverImage} alt='' />
      <main>
        <ProfileSidebarLeft searchValue={searchValue} />
        <Content ProfilePage searchValue={searchValue} />
        <SidebarRight />
      </main>
    </React.Fragment>
  );
};

const mapStateToProps = createStructuredSelector({
  userProfile: selectUserProfile,
});

export default connect(mapStateToProps)(ProfilePage);
