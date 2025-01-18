import React from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectNotifications } from '../../redux/notifications/notifications.selectors';
import { selectMessagesNotifications } from '../../redux/messages/messages.selectors';

import { signOutStart } from '../../redux/user/user.actions';

import './header.styles.scss';

const Header = ({
  currentUser,
  signOutStart,
  notifications,
  messagesNotifications,
}) => {
  let history = useHistory();
  const handleButtonClick = async () => {
    history.push('/home');
    signOutStart();
  };

  let classesForMessagesNotifications = '';
  if (
    messagesNotifications !== null &&
    Object.keys(messagesNotifications).length > 0
  ) {
    classesForMessagesNotifications = Object.keys(messagesNotifications).map(
      (notificationsId) => {
        if (
          messagesNotifications[notificationsId].viewed === false &&
          messagesNotifications[notificationsId].lastMessageTo.displayName ===
            currentUser.displayName
        ) {
          return 'im im-mail notifications-color';
        }
      }
    );
  }

  let classesForNotifications = '';
  if (notifications !== null && Object.keys(notifications).length > 0) {
    classesForNotifications = Object.keys(notifications).map(
      (notificationsId) => {
        if (notifications[notificationsId].viewed === false) {
          return 'im im-bell notifications-color';
        }
      }
    );
  }

  return (
    <header>
      <nav>
        <div className='nav-left'>
          <ul>
            <li>
              <Link to='home'>
                <i className='im im-home'></i>&nbsp;Anasayfa
              </Link>
            </li>
            <li>
              <Link to='notifications'>
                <i
                  className={
                    classesForNotifications.includes(
                      'im im-bell notifications-color'
                    )
                      ? 'im im-bell notifications-color'
                      : 'im im-bell'
                  }
                ></i>
                &nbsp;Bildirimler
              </Link>
            </li>
            <li>
              <Link to='messages'>
                <i
                  className={
                    classesForMessagesNotifications.includes(
                      'im im-mail notifications-color'
                    )
                      ? 'im im-mail notifications-color'
                      : 'im im-mail'
                  }
                ></i>
                &nbsp;<span> Mesajlar</span>
              </Link>
            </li>
          </ul>
        </div>
        <div className='nav-right'>
          <input type='search' placeholder='Ara' />
          {currentUser ? (
            <span onClick={handleButtonClick}>
              <i className='im im-gear'></i>
            </span>
          ) : (
            <Redirect to='/' />
          )}
        </div>
      </nav>
    </header>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  messagesNotifications: selectMessagesNotifications,
  notifications: selectNotifications,
});

const mapDispatchToProps = (dispatch) => ({
  signOutStart: () => dispatch(signOutStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
