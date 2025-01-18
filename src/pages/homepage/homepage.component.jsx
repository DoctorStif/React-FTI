import React from 'react';

import SidebarLeft from '../../components/sidebar-left/sidebar-left.component';
import Content from '../../components/content/content.component';
import SidebarRight from '../../components/sidebar-right/sidebar-right.component';

import './homepage.styles.scss';

const HomePage = () => (
  <main>
    <SidebarLeft />
    <Content />
    <SidebarRight />
  </main>
);

export default HomePage;
