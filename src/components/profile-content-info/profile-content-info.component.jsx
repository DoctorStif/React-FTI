import React from 'react';

import './profile-content-info.styles.scss';

const ProfileContentInfo = ({
  tweetsCount,
  followingsCount,
  followersCount,
  mediaCount,
  contentInfoCallback,
}) => {
  return (
    <div className='content-info'>
      <ul>
        <li>
          <label
            onClick={() => {
              contentInfoCallback('Tweets');
            }}
          >
            Tweetler
          </label>
          <span>{tweetsCount}</span>
        </li>
        <li>
          <label
            onClick={() => {
              contentInfoCallback('Followers');
            }}
          >
            Takipçiler
          </label>
          <span>{followersCount}</span>
        </li>
        <li>
          <label
            onClick={() => {
              contentInfoCallback('Followings');
            }}
          >
            Takip Edilenler
          </label>
          <span>{followingsCount}</span>
        </li>
        <li>
          <label
            onClick={() => {
              contentInfoCallback('Media');
            }}
          >
            Medya
          </label>
          <span>{mediaCount}</span>
        </li>
      </ul>
    </div>
  );
};

export default ProfileContentInfo;
