import React, { Component } from "react";
import { logout } from "../../../actions/auth";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import styles from "./Navbar.module.scss";

class Navbar extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
  };

  state = {
    profileToggle: false,
  };

  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logout();
  };

  toggleProfile = () => {
    this.setState({ profileToggle: !this.state.profileToggle });
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    return (
      <div className={styles.navbar}>
        <div className={styles.controls}>
          <BackButton />
          <ForwardButton />
        </div>
        <input type="text" placeholder="Search..."></input>
        <div className={styles.navbar__dropdown}>
          <div
            className={`${styles.link} ${
              this.state.profileToggle ? styles.active : ""
            }`}
            onClick={this.toggleProfile}
          >
            {user.username} <i className="fas fa-chevron-down"></i>
          </div>
          <div
            className={`${styles.dropdown} ${
              this.state.profileToggle ? styles.active : ""
            }`}
          >
            <ul>
              <li onClick={this.onLogoutClick}>Logout</li>
              <li onClick={this.onLogoutClick}>Account</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export const BackButton = () => {
  let history = useHistory();
  return (
    <i className="fas fa-chevron-left" onClick={() => history.goBack()}></i>
  );
};

export const ForwardButton = () => {
  let history = useHistory();
  return (
    <i className="fas fa-chevron-right" onClick={() => history.goForward()}></i>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
