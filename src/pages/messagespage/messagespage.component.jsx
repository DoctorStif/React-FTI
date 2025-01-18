import React from 'react';

import MessagesLeft from '../../components/messages-left/messages-left.component';
import MessagesRight from '../../components/messages-right/messages-right.component';

import './messagespage.styles.scss';

const MessagesPage = () => (
  <main>
    <MessagesLeft />
    <MessagesRight />
  </main>
);

export default MessagesPage;
