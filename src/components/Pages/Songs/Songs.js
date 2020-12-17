import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { getSongs, deleteSong } from "../../../actions/songs";

import Rating from "../../Common/Rating/Rating";

import styles from "./Songs.module.scss";

const status = {
  1: "Not Started",
  2: "In Progress",
  3: "Proficient",
};

class Songs extends Component {
  static propTypes = {
    songs: PropTypes.array.isRequired,
    getSongs: PropTypes.func.isRequired,
    deleteSong: PropTypes.func.isRequired,
  };

  state = {
    order: "title",
    filter: "",
    sidetray: false,
    editingSong: {},
    alertIndex: null,
  };

  componentDidMount() {
    this.props.getSongs();
  }

  showAlert = (index) => {
    this.setState({
      alertIndex: index,
    });
  };

  hideAlert = () => {
    this.setState({
      alertIndex: null,
    });
  };

  handleDelete = (id) => {
    this.props.deleteSong(id);

    this.setState({
      alertIndex: null,
    });
  };

  songList = () => {
    return this.props.songs
      .sort((a, b) => {
        if (a[this.state.order] < b[this.state.order]) {
          return -1;
        }
        if (a[this.state.order] > b[this.state.order]) {
          return 1;
        }

        return 0;
      })
      .filter((song) => {
        if (
          song.title.toLowerCase().includes(this.state.filter) ||
          song.artist_name.toLowerCase().includes(this.state.filter)
        ) {
          return true;
        } else {
          return false;
        }
      })
      .map((song, index) => {
        return (
          <div
            className={`${styles.song__item} ${
              this.state.alertIndex == index ? styles.alert : ""
            }`}
            key={song.id}
            style={{ "--animation-order": index }}
          >
            <div className={styles.song__inner}>
              <div className={styles.song__title}>
                <Link to={`/song/${song.id}/`}>{song.title}</Link>
                <p>{song.album}</p>
              </div>
              <div className={styles.song__artist}>
                <Link to={`/artist/${song.artist_id}/`}>
                  {song.artist_name}
                </Link>
              </div>
              <div className={styles.song__instrument}>
                <p>
                  {song.instrument == "Guitar" ? (
                    <i className="fas fa-guitar"></i>
                  ) : (
                    <i className={`${styles.icon} ${styles.icon__piano}`}></i>
                  )}
                </p>
              </div>
              <div className={styles.song__genre}>
                <p>{song.genre}</p>
              </div>
              <div className={styles.song__difficulty}>
                <Rating rating={song.difficulty} editable={false} />
              </div>
              <div className={styles.song__status}>
                <p>{status[song.status]}</p>
              </div>
              <div className={styles.song__tools}>
                {song.spotify_id ? <i className="fab fa-spotify"></i> : ""}
                {song.youtube_id ? <i className="fab fa-youtube"></i> : ""}
              </div>
            </div>
            <div className={styles.song__controls}>
              <i
                className="fas fa-trash"
                onClick={() => this.showAlert(index)}
              ></i>
            </div>
            <div className={styles.delete__confirm}>
              <i
                className="fas fa-check"
                onClick={() => this.handleDelete(song.id)}
              ></i>
              <i className="fas fa-times" onClick={this.hideAlert}></i>
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

  render() {
    return (
      <div className={styles.songs}>
        <h2>Songs</h2>
        <div className={styles.songs__controls}>
          <div className={styles.control}>
            <p>Sorted By: </p>
            <select value={this.state.order} onChange={this.handleSort}>
              <option value="title">Title</option>
              <option value="artist_name">Artist</option>
              <option value="album">Album</option>
              <option value="status">Status</option>
              <option value="created_at">Date Added</option>
            </select>
          </div>
          <div className={styles.control}>
            <p>Filter: </p>
            <input type="text" onChange={this.handleFilter}></input>
          </div>
        </div>
        <div className={styles.song__list}>
          {this.props.songs ? this.songList() : ""}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  songs: state.songs.songs,
});

export default connect(mapStateToProps, { getSongs, deleteSong })(Songs);
