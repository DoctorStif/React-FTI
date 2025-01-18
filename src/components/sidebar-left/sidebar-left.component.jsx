import React from 'react';

import UserInformation from '../user-information/user-information.component';
import TweetsWorldWide from '../tweets-worldwide/tweets-worldwide.component';

import './sidebar-left.styles.scss';

const SidebarLeft = () => {
  return (
    <section className='sidebar-left'>
      <UserInformation />
      <TweetsWorldWide />
    </section>
  );
};

export default SidebarLeft;
