import React, { Component } from "react";

import styles from "./Rating.module.scss";

export default class Rating extends Component {
  constructor(props) {
    super(props);

    this.stars = this.stars.bind(this);
    this.rate = this.rate.bind(this);
    this.star_over = this.star_over.bind(this);
    this.star_out = this.star_out.bind(this);

    this.state = {
      rating: null,
      temp_rating: null,
    };
  }

  componentDidMount() {
    this.setState({
      rating: this.props.rating,
    });
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.rating !== prevProps.rating) {
      this.setState({
        rating: this.props.rating,
      });
    }
  }

  rate(rating) {
    this.setState({
      rating: rating,
      temp_rating: rating,
    });

    this.props.onRate(rating);
  }

  star_over(rating) {
    this.setState({
      temp_rating: this.state.rating,
      rating: rating,
    });
  }

  star_out() {
    this.setState({
      rating: this.state.temp_rating,
    });
  }

  stars() {
    let stars = [];

    for (let i = 1; i < 6; i++) {
      var classValue = "star_rating__star";
      var selectedClassValue = "";

      if (this.state.rating >= i && this.state.rating != null) {
        selectedClassValue = "is_selected";
      }

      if (this.props.editable) {
        stars.push(
          <label
            key={i}
            className={` ${styles[classValue]} ${styles[selectedClassValue]} `}
            onClick={() => this.rate(i)}
            onMouseOver={() => this.star_over(i)}
            onMouseOut={() => this.star_out()}
          >
            ★
          </label>
        );
      } else {
        stars.push(
          <label
            key={i}
            className={` ${styles[classValue]} ${styles[selectedClassValue]} `}
          >
            ★
          </label>
        );
      }
    }

    return stars;
  }

  render() {
    return <div className={styles.star_rating}>{this.stars()}</div>;
  }
}
