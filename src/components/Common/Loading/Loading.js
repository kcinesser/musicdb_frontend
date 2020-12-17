import React, { Component } from "react";

import styles from "./Loading.module.scss";

export default class Loading extends Component {
  render() {
    return (
      <div className={styles.loading__icon}>
        <i className="fas fa-spinner"></i>
      </div>
    );
  }
}
