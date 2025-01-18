import React from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './App.css';

import { selectCurrentUser } from './redux/user/user.selectors';
import { checkUserSession } from './redux/user/user.actions';

import { getFollowers, getFollowings } from './redux/follower/follower.actions';

import IndexPage from './pages/indexpage/indexpage.component';
import HomePage from './pages/homepage/homepage.component';
import NotificationsPage from './pages/notificationspage/notificationspage.component';
import ProfilePage from './pages/profilepage/profilepage.component';
import MessagesPage from './pages/messagespage/messagespage.component';
import SettingsPage from './pages/settingspage/settingspage.component';
import WorldPage from './pages/worldpage/worldpage.component';
import IndexHeader from './components/header/index-header.component';
import Header from './components/header/header.component';

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const {
      checkUserSession,
      getFollowers,
      getFollowings,
      currentUser
    } = this.props;
    checkUserSession();

    if (currentUser) {
      getFollowings(currentUser);
      getFollowers(currentUser);
    }
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    const { location } = this.props;
    return (
      <div>
        {location.pathname === '/' ? <IndexHeader /> : <Header />}
        <Switch>
          <Route
            exact
            path='/'
            render={() =>
              this.props.currentUser ? <Redirect to='/home' /> : <IndexPage />
            }
          />
          <Route
            path='/home'
            render={() =>
              this.props.currentUser ? <HomePage /> : <Redirect to='/' />
            }
          />
          <Route path='/notifications' component={NotificationsPage} />
          <Route path='/profile' component={ProfilePage} />
          <Route path='/messages' component={MessagesPage} />
          <Route path='/settings' component={SettingsPage} />
          <Route path='/world' component={WorldPage} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  getFollowers: currentUser => dispatch(getFollowers({ currentUser })),
  getFollowings: currentUser => dispatch(getFollowings({ currentUser })),
  checkUserSession: () => dispatch(checkUserSession())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
