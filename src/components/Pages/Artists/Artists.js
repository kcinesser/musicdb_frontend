import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getArtists, deleteArtist, addArtist } from "../../../actions/artists";

import styles from "./Artists.module.scss";
import { Link } from "react-router-dom";

import Sidetray from "../../Common/Sitetray/Sidetray";
import NewArtistForm from "./NewArtistForm/NewArtistForm";
import RangeSlider from "../../Common/RangeSlider/RangeSlider";

class Artists extends Component {
  static propTypes = {
    artists: PropTypes.array.isRequired,
    getArtists: PropTypes.func.isRequired,
    deleteArtist: PropTypes.func.isRequired,
    addArtist: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getArtists();
  }

  state = {
    order: "name",
    filter: "",
    sidetray: false,
    gridSize: 200,
  };

  artistsList = () => {
    return this.props.artists
      .sort((a, b) => {
        if (a[this.state.order] < b[this.state.order]) {
          return -1;
        }
        if (a[this.state.order] > b[this.state.order]) {
          return 1;
        }

        return 0;
      })
      .filter((artist) => {
        if (artist.name.toLowerCase().includes(this.state.filter)) {
          return true;
        } else {
          return false;
        }
      })
      .map((artist, index) => {
        return (
          <div
            key={artist.id}
            className={styles.artist__card}
            style={{ "--animation-order": index }}
          >
            <div
              className={styles.card__inner}
              style={{ backgroundImage: `url(${artist.image_url})` }}
            >
              <div className={styles.card__content}>
                <p>
                  <Link to={`/artist/${artist.id}`}>{artist.name}</Link>
                </p>
                <div className={styles.card__icon}>
                  <a
                    href={`https://open.spotify.com/artist/${artist.spotify_id}`}
                    target="_blank"
                  >
                    <i className="fab fa-spotify"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        );
      });
  };

  handleSort = (e) => {
    this.setState({ order: e.target.value });
  };

  handleFilter = (e) => {
    this.setState({ filter: e.target.value });
  };

  toggleTray = () => {
    this.setState({ sidetray: !this.state.sidetray });
  };

  handleGrid = (value) => {
    this.setState({ gridSize: value });
  };

  render() {
    let style = {
      gridTemplateColumns: `repeat(auto-fill, minmax(${this.state.gridSize}px, 1fr))`,
    };

    let size = this.state.gridSize < 180 ? "small" : "";

    return (
      <div className={styles.artists}>
        <h2>Artists</h2>
        <div className={styles.artists__controls}>
          <div className={styles.control}>
            <p>Sorted By: </p>
            <select value={this.state.order} onChange={this.handleSort}>
              <option value="name">Name</option>
              <option value="created_at">Date Added</option>
            </select>
          </div>
          <div className={styles.control}>
            <p>Filter: </p>
            <input type="text" onChange={this.handleFilter}></input>
          </div>
          <div className={styles.control}>
            <span>
              <i onClick={this.toggleTray} className="fas fa-plus"></i>
            </span>
          </div>
          <div className={styles.control}>
            <RangeSlider
              onRangeChange={this.handleGrid}
              min={120}
              max={310}
              initial={215}
            />
          </div>
        </div>
        <div
          className={`${styles.artists__container} ${styles[size]}`}
          id="artists__container"
          style={style}
        >
          {this.props.artists ? this.artistsList() : ""}
        </div>
        <Sidetray
          status={this.state.sidetray}
          component={NewArtistForm}
          toggle={this.toggleTray}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  artists: state.artists.artists,
});

export default connect(mapStateToProps, {
  getArtists,
  deleteArtist,
  addArtist,
})(Artists);
