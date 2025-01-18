import React from 'react';

import TweetsWorldWideLeft from '../../components/tweets-worldwide/tweets-worldwide-left.component';
import TweetsWorldWide from '../../components/tweets-worldwide/tweets-worldwide-content.component';
import SidebarRight from '../../components/sidebar-right/sidebar-right.component';

import './worldpage.styles.scss';

const WorldPage = ({ location }) => {
  let anchor = location.search;
  let params = new URLSearchParams(anchor);
  let searchValue =
    params.get('hashtag') == null ? '' : params.get('hashtag').toString();
  return (
    <main>
      <TweetsWorldWideLeft searchValue={searchValue} />
      <TweetsWorldWide searchValue={searchValue} />
      <SidebarRight />
    </main>
  );
};

export default WorldPage;
