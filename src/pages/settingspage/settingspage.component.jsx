import React from 'react';

import PasswordSettings from '../../components/settings/password-settings.component';
import ProfileSettings from '../../components/settings/profile-settings.component';

import './settingspage.styles.scss';

const SettingsPage = () => (
  <React.Fragment>
    <main>
      <PasswordSettings />
      <ProfileSettings />
    </main>
  </React.Fragment>
);

export default SettingsPage;
