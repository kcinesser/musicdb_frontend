import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../../actions/auth';

import styles from './Login.module.scss';

export class Login extends Component {
  state = {
    username: '',
    password: '',
  };

  static propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.login(this.state.username, this.state.password);
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }
    const { username, password } = this.state;

    return (
      <div className={styles.login}>
        <div className={styles.login__header}>
          <h1>MusicDB</h1>
        </div>
        <div className={styles.login__form}>
          <h2>To continue, please login.</h2>
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
              <label>Password</label>
              <input
                type="password"
                name="password"
                onChange={this.onChange}
                value={password}
              />
            </div>

            <div>
              <button type="submit">
                Log In
              </button>
            </div>
            <p>
              Don't have an account?
            </p>
            <Link className={styles.btn} to="/register">Register</Link>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);