import React from 'react';

import SidebarLeft from '../../components/sidebar-left/sidebar-left.component';
import SidebarRight from '../../components/sidebar-right/sidebar-right.component';
import NotificationsContent from '../../components/notifications-content/content-container.component';

import './notificationspage.styles.scss';

const NotificationsPage = () => (
  <main>
    <SidebarLeft />
    <NotificationsContent />
    <SidebarRight />
  </main>
);

export default NotificationsPage;
