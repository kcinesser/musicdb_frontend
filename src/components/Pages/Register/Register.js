import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../../actions/auth';

import styles from './Register.module.scss';

class Register extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    password2: ''
  }

  static propTypes = {
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { username, email, password, password2 } = this.state;
    if (password !== password2) {
      console.log('Passwords do not match');
    } else {
      const newUser = {
        username,
        password,
        email,
      };
      this.props.register(newUser);
    }
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }
    const { username, email, password, password2 } = this.state;
    return (
      <div className={styles.register}>
        <div class={styles.register__header}>
          <h1>MusicDB</h1>
        </div>
        <div className={styles.register__content}>
          <div className={styles.register__form}>
            <h2>Register</h2>
            <form onSubmit={this.onSubmit}>
              <div>
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  onChange={this.onChange}
                  value={username}
                />
              </div>
              <div>
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  onChange={this.onChange}
                  value={email}
                />
              </div>
              <div>
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  onChange={this.onChange}
                  value={password}
                />
              </div>
              <div>
                <label>Confirm Password</label>
                <input
                  type="password"
                  name="password2"
                  onChange={this.onChange}
                  value={password2}
                />
              </div>
              <div>
                <button type="submit">
                  Register
                </button>
              </div>
              <p>
                Already have an account? 
              </p>
              <Link className={styles.btn} to="/login">Login</Link>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { register })(Register);
