import React from 'react';
import { Link } from 'react-router-dom';

const FollowUser = ({ viewed, displayName, email,createdAt, profileImage }) => (
  <div
    className={
      viewed === false
        ? 'follow-user--notification'
        : 'follow-user--notification viewed'
    }
  >
    <img alt='' src={profileImage} />
    <Link to={'profile?user=' + email}>{displayName}</Link>
    <p>&nbsp; seni takip etti.</p>
    <i>{createdAt}</i>
  </div>
);

export default FollowUser;
