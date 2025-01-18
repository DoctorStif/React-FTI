import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentUser } from '../../redux/user/user.selectors';

import {
  changeCoverPhoto,
  changeProfilePhoto,
} from '../../redux/settings/settings.actions';

import './profile-settings.styles.scss';

const ProfileSettings = ({
  currentUser,
  changeCoverPhoto,
  changeProfilePhoto,
}) => {
  const handleCoverPhoto = async (event) => {
    if (event.target.files[0]) {
      const image = event.target.files[0];
      changeCoverPhoto(currentUser, image);
    }
  };

  const handleProfilePhoto = async (event) => {
    if (event.target.files[0]) {
      const image = event.target.files[0];
      changeProfilePhoto(currentUser, image);
    }
  };

  return (
    <section className='sidebar-left'>
      <h2>Fotoğraf Ayarları</h2>
      <div className='form-wrapper'>
        <form className='join-form'>
          <input
            type='file'
            name='coverFile'
            id='coverFile'
            onChange={handleCoverPhoto}
          />
          <label htmlFor='coverFile' className='file-upload'>
            {/* Kapak Fotoğrafını Değiştir <ion-icon name='send'></ion-icon> */}
            <span>Kapak Fotoğrafı Seçin!</span>
          </label>
          <br />

          <input
            type='file'
            name='profileFile'
            id='profileFile'
            onChange={handleProfilePhoto}
          />
          <label htmlFor='profileFile' className='file-upload'>
            {/* Kapak Fotoğrafını Değiştir <ion-icon name='send'></ion-icon> */}
            <span>Profil Fotoğrafı Seçin!</span>
          </label>
        </form>
      </div>
    </section>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  changeCoverPhoto: (currentUser, image) =>
    dispatch(changeCoverPhoto({ currentUser, image })),
  changeProfilePhoto: (currentUser, image) =>
    dispatch(changeProfilePhoto({ currentUser, image })),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileSettings);
