import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import moment from 'moment';

import { selectCurrentUser } from '../../redux/user/user.selectors';
import {
  selectMessageWithEmail,
  selectMessagesNotifications,
} from '../../redux/messages/messages.selectors';

import {
  getMessages,
  getMessageWithEmail,
} from '../../redux/messages/messages.actions';

import MessagesLeftUsers from './messages-left-users.component';

import './messages-left.styles.scss';

const MessagesLeft = ({
  currentUser,
  getMessages,
  messagesNotifications,
  getMessageWithEmail,
}) => {
  const [email, setEmail] = useState('');

  const handleButtonClick = async () => {
    getMessages(currentUser, email);
    getMessageWithEmail(email);
  };

  let messageLeftContainer = '';
  if (
    messagesNotifications != null &&
    Object.keys(messagesNotifications).length > 0
  ) {
    messageLeftContainer = Object.keys(messagesNotifications).map(
      (notificationsId) => {
        const a = moment(
          messagesNotifications[notificationsId].createdAt.toDate()
        ).format();
        const m = moment(a, 'YYYY-MM-DD, h:mm:ss a').fromNow();
        if (
          messagesNotifications[notificationsId].viewed === false &&
          messagesNotifications[notificationsId].lastMessageTo.displayName ===
            currentUser.displayName
        ) {
          return (
            <MessagesLeftUsers
              key={notificationsId}
              currentUser={currentUser}
              displayName={
                messagesNotifications[notificationsId].lastMessageFrom
                  .displayName
              }
              profileImage={
                messagesNotifications[notificationsId].lastMessageFrom
                  .profileImage
              }
              email={
                messagesNotifications[notificationsId].lastMessageFrom.email
              }
              viewed={false}
              createdAt={m}
            />
          );
        } else if (
          messagesNotifications[notificationsId].viewed === true &&
          messagesNotifications[notificationsId].lastMessageTo.displayName ===
            currentUser.displayName
        ) {
          return (
            <MessagesLeftUsers
              key={notificationsId}
              currentUser={currentUser}
              displayName={
                messagesNotifications[notificationsId].lastMessageFrom.displayName
              }
              profileImage={
                messagesNotifications[notificationsId].lastMessageFrom
                  .profileImage
              }
              email={messagesNotifications[notificationsId].lastMessageFrom.email}
              viewed={true}
              createdAt={m}
            />
          );
        } else {
          return (
            <MessagesLeftUsers
              key={notificationsId}
              currentUser={currentUser}
              displayName={
                messagesNotifications[notificationsId].lastMessageTo.displayName
              }
              profileImage={
                messagesNotifications[notificationsId].lastMessageTo
                  .profileImage
              }
              email={messagesNotifications[notificationsId].lastMessageTo.email}
              viewed={true}
              createdAt={m}
            />
          );
        }
      }
    );
  }

  return (
    <section className='messages-sidebar-left'>
      <div className='wrap'>
        <div className='search'>
          <input
            type='text'
            className='searchTerm'
            placeholder='What are you looking for?'
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={handleButtonClick} className='searchButton'>
            <ion-icon name='search'></ion-icon>
          </button>
        </div>
      </div>
      {messageLeftContainer}
    </section>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  messageWithEmail: selectMessageWithEmail,
  messagesNotifications: selectMessagesNotifications,
});

const mapDispatchToProps = (dispatch) => ({
  getMessages: (currentUser, email) =>
    dispatch(getMessages({ currentUser, email })),
  getMessageWithEmail: (email) => dispatch(getMessageWithEmail({ email })),
});

export default connect(mapStateToProps, mapDispatchToProps)(MessagesLeft);
