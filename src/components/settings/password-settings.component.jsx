import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentUser } from '../../redux/user/user.selectors';

import { changePassword } from '../../redux/settings/settings.actions';

import './password-settings.styles.scss';

const PasswordSettings = ({ currentUser, changePassword }) => {
  const handleSubmit = async event => {
    event.preventDefault();

    changePassword(currentUser);
  };

  return (
    <section className='sidebar-left'>
      <h2>Şifre Değiştir</h2>
      <div className='form-wrapper'>
        <form className='join-form' onSubmit={handleSubmit}>
          <button type='submit'>
            <ion-icon name='send'></ion-icon> Şifre Güncelleme E-postası Gönder
          </button>
        </form>
      </div>
    </section>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  changePassword: (currentUser, newPassword) =>
    dispatch(changePassword({ currentUser, newPassword }))
});

export default connect(mapStateToProps, mapDispatchToProps)(PasswordSettings);
