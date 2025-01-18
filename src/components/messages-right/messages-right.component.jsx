import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import moment from 'moment';

import { selectCurrentUser } from '../../redux/user/user.selectors';
import {
  selectMessages,
  selectMessageWithEmail,
} from '../../redux/messages/messages.selectors';

import { getMessages, addMessage } from '../../redux/messages/messages.actions';

import UserComment from './user-comment.component';
import AuthorComment from './author-comment.component';

import './messages-right.styles.scss';

const MessagesRight = ({
  currentUser,
  messages,
  messageWithEmail,
  getMessages,
  addMessage,
}) => {
  const [messageData, setMessageData] = useState('');
  const [, setSnapshotState] = useState(0);

  useEffect(() => {
    if (messageWithEmail !== null) {
      getMessages(currentUser, messageWithEmail);
      const interval = setInterval(() => {
        setSnapshotState(Math.random());
      }, 500);
      return () => clearInterval(interval);
    }
  }, [messageWithEmail, currentUser, getMessages]);

  let messageContainer = '';
  if (
    messages != null &&
    messageWithEmail != null &&
    Object.keys(messages).length > 0
  ) {
    messageContainer = Object.keys(messages).map((messageId) => {
      const a = moment(messages[messageId].createdAt.toDate()).format();
      const m = moment(a, 'YYYY-MM-DD, h:mm:ss a').fromNow();
      if (messages[messageId].messageFrom.email === messageWithEmail) {
        return (
          <UserComment
            key={messageId}
            displayName={messages[messageId].messageFrom.displayName}
            profileImage={messages[messageId].messageFrom.profileImage}
            email={messages[messageId].messageFrom.email}
            messageData={messages[messageId].messageData}
            createdAt={m}
          />
        );
      } else {
        return (
          <AuthorComment
            key={messageId}
            displayName={messages[messageId].messageFrom.displayName}
            profileImage={messages[messageId].messageFrom.profileImage}
            email={messages[messageId].messageFrom.email}
            messageData={messages[messageId].messageData}
            createdAt={m}
          />
        );
      }
    });
  }

  const handleButtonClick = async () => {
    addMessage(currentUser, messageWithEmail, messageData);
    setMessageData('');
  };

  return (
    <section className='messages-sidebar-right'>
      <ul className='comment-section'>
        {messageContainer}
        <li className='write-new'>
          <textarea
            placeholder='Write your comment here'
            name='comment'
            onChange={(e) => setMessageData(e.target.value)}
            value={messageData}
          ></textarea>
          <div>
            <img width='35' src={currentUser.profileImage} alt='' />
            <button
              disabled={messageWithEmail === null}
              onClick={handleButtonClick}
            >
              Gonder
            </button>
          </div>
        </li>
      </ul>
    </section>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  messages: selectMessages,
  messageWithEmail: selectMessageWithEmail,
});

const mapDispatchToProps = (dispatch) => ({
  getMessages: (currentUser, email) =>
    dispatch(getMessages({ currentUser, email })),
  addMessage: (currentUser, email, messageData) =>
    dispatch(addMessage({ currentUser, email, messageData })),
});

export default connect(mapStateToProps, mapDispatchToProps)(MessagesRight);
