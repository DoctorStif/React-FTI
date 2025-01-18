import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentUser } from '../../redux/user/user.selectors';

import './user-information.styles.scss';

const UserInformation = ({ currentUser }) => (
  <div className='user-information'>
    <ul>
      <li>
        <Link to='world' className='user-information-search'>
          <i className='im im-hashtag'></i>&nbsp;&nbsp;&nbsp;Keşfet
        </Link>
      </li>
      <li>
        <Link
          to={'profile?user=' + currentUser.email}
          className='user-information-profile'
        >
          <i className='im im-user-circle'></i>&nbsp;&nbsp;&nbsp;Profil
        </Link>
      </li>
      <li>
        <Link to='#' className='user-information-tweet'>
          <i className='im im-twitter'></i>&nbsp;&nbsp;&nbsp;Tweetle
        </Link>
      </li>
    </ul>
  </div>
);
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(UserInformation);
