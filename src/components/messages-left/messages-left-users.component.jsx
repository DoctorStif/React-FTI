import React, { useState } from 'react';
import { connect } from 'react-redux';

import {
  getMessages,
  getMessageWithEmail,
  updateMessagesViewed,
} from '../../redux/messages/messages.actions';

const MessagesLeftUsers = ({
  currentUser,
  displayName,
  profileImage,
  email,
  viewed,
  createdAt,
  getMessages,
  getMessageWithEmail,
  updateMessagesViewed,
}) => {
  const [viewedMessages, setViewedMessages] = useState(viewed);
  const handleButtonClick = async () => {
    getMessages(currentUser, email);
    getMessageWithEmail(email);
    if (viewedMessages === false) {
      updateMessagesViewed(currentUser, email);
      setViewedMessages(true);
    }
  };

  return (
    // <section className='messages-sidebar-left--users'>
    <div
      className={
        viewedMessages === false
          ? 'messages-sidebar-left--users'
          : 'messages-sidebar-left--users viewed'
      }
      onClick={handleButtonClick}
    >
      <div className='avatar'>
        <img width='35' src={profileImage} alt='' />
      </div>
      <div className='info'>
        <div>{displayName}</div>
        <span>{createdAt}</span>
      </div>
    </div>
    // </section>
  );
};

const mapDispatchToProps = (dispatch) => ({
  getMessages: (currentUser, email) =>
    dispatch(getMessages({ currentUser, email })),
  getMessageWithEmail: (email) => dispatch(getMessageWithEmail({ email })),
  updateMessagesViewed: (currentUser, email) =>
    dispatch(updateMessagesViewed({ currentUser, email })),
});

export default connect(null, mapDispatchToProps)(MessagesLeftUsers);
