import React, { Component } from "react";

import styles from "./RangeSlider.module.scss";

export default class RangeSlider extends Component {
  state = {
    value: this.props.initial,
  };

  handleSlider = (e) => {
    this.setState({ value: e.target.value });
    this.props.onRangeChange(e.target.value);
  };

  render() {
    return (
      <div className={styles.slidecontainer}>
        <i className="fas fa-th"></i>

        <input
          type="range"
          min={this.props.min}
          max={this.props.max}
          value={this.state.value}
          className={styles.slider}
          onChange={this.handleSlider}
        />
      </div>
    );
  }
}
