import React from 'react';
import { Link } from 'react-router-dom';

const UserComment = ({
  displayName,
  messageData,
  profileImage,
  email,
  createdAt,
}) => {
  return (
    <li className='comment user-comment'>
      <div className='info'>
        <Link to={'profile?user=' + email}>{displayName}</Link>
        <span>{createdAt}</span>
      </div>
      <div className='avatar'>
        <img width='35' src={profileImage} alt='' />
      </div>
      <p>{messageData}</p>
    </li>
  );
};

export default UserComment;
