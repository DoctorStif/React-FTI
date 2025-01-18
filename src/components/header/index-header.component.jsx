import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  googleSignInStart,
  emailSignInStart
} from '../../redux/user/user.actions';

import './index-header.styles.scss';

class IndexHeader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };
  }

  handleSubmit = async event => {
    event.preventDefault();
    const { emailSignInStart } = this.props;
    const { email, password } = this.state;

    emailSignInStart(email, password);
  };

  handleChange = event => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { googleSignInStart } = this.props;
    return (
      <Fragment>
        <div>
          <img
            className='home-background'
            src='https://firebasestorage.googleapis.com/v0/b/react-fti.appspot.com/o/default%2Fbackground.jpg?alt=media&token=30db8dab-3e8f-4f53-aa82-e996063f83cb'
            alt='homeBackground'
          />
        </div>
        <header>
          <nav className='index-nav'>
            <div className='index-nav-left'>
              <span className='logo'>
                <ion-icon name='logo-twitter'></ion-icon>ProjectFTI
              </span>
              <ul>
                <li>
                  <span></span>
                  <Link to='index.html'>Anasayfa</Link>
                </li>
                <li>
                  <Link to='about.html'>Hakkında</Link>
                </li>
              </ul>
            </div>
            <div className='index-nav-right'>
              <form className='login-form' onSubmit={this.handleSubmit}>
                <input
                  type='email'
                  name='email'
                  placeholder='E-posta'
                  value={this.state.email}
                  onChange={this.handleChange}
                  required
                />
                <input
                  type='password'
                  name='password'
                  placeholder='Şifre'
                  value={this.state.password}
                  onChange={this.handleChange}
                  required
                />
                <button type='submit'>
                  <ion-icon name='key'></ion-icon> Giriş Yap
                </button>
                <button
                  type='button'
                  onClick={googleSignInStart}
                  className='google-sign-in-button'
                >
                  <ion-icon name='key'></ion-icon> Giriş Yap
                </button>
              </form>
            </div>
          </nav>
        </header>
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) =>
    dispatch(emailSignInStart({ email, password }))
});

export default connect(null, mapDispatchToProps)(IndexHeader);
