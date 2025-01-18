import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import { signUpStart } from '../../redux/user/user.actions';

import './indexpage.styles.scss';

class IndexPage extends React.Component {
  constructor() {
    super();

    this.state = {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
  }

  handleSubmit = async event => {
    event.preventDefault();
    const { signUpStart } = this.props;
    const { displayName, email, password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      alert("passwords don't match");
      return;
    }

    signUpStart({ displayName, email, password });
  };

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    const { displayName, email, password, confirmPassword } = this.state;
    return (
      <Fragment>
        <main>
          <section className='welcome'>
            <div className='text-wrapper'>
              <h1>Twitter'a Hoşgeldiniz</h1>
              <p>
                Arkadaşlarınızla iletişim kurabilir — onlarla birlikte
                paylaşımlar yapabilir ve dünyanın geri kalanında neler olup
                bittiğini anlık olarak öğrenebilirsiniz.
              </p>
            </div>
            <div className='form-wrapper'>
              <form className='join-form' onSubmit={this.handleSubmit}>
                <label htmlFor='displayName'>Ad-Soyad</label>
                <input
                  type='text'
                  name='displayName'
                  value={displayName}
                  onChange={this.handleChange}
                  required
                />
                <label htmlFor='email'>E-posta Adresiniz</label>
                <input
                  type='email'
                  name='email'
                  value={email}
                  onChange={this.handleChange}
                  required
                />
                <label htmlFor='password'>Şifreniz</label>
                <input
                  type='password'
                  name='password'
                  value={password}
                  onChange={this.handleChange}
                  required
                />
                <label htmlFor='confirmPassword'>Şifre Tekrarı</label>
                <input
                  type='password'
                  name='confirmPassword'
                  value={confirmPassword}
                  onChange={this.handleChange}
                />
                <button type='submit'>
                  <ion-icon name='send'></ion-icon> Kayıt Ol
                </button>
              </form>
            </div>
          </section>
        </main>
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  signUpStart: userCredentials => dispatch(signUpStart(userCredentials))
});

export default connect(null, mapDispatchToProps)(IndexPage);
