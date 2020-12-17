import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import axios from "axios";
import { addSong } from "../../../../actions/artists";

import styles from "./NewSongForm.module.scss";

class NewSongForm extends Component {
  state = {
    spotify_songs: {},
    search_value: "",
  };

  static propTypes = {
    addSong: PropTypes.func.isRequired,
  };

  handleForm = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // handleSubmit = (e) => {
  //   e.preventDefault();
  //   const { name, spotify_id, image_url } = this.state;
  //   const artist = { name, spotify_id, image_url };
  //   this.props.addArtist(artist);
  //   this.setState({
  //     name: '',
  //     imague_url: '',
  //     spotify_id: '',
  //   });
  // }

  handleSpotifySearch = (e) => {
    let value = e.target.value;

    this.setState({ search_value: value });

    value = this.props.data.name + " " + value;

    if (value.length > 0) {
      axios
        .post("http://localhost:5000/api/spotify/songs", { value: value })
        .then((res) => {
          this.setState({ spotify_songs: res.data.tracks });
        });
    } else {
      this.setState({ spotify_songs: {} });
    }
  };

  handleAddSpotify = (song) => {
    this.props.addSong(song);
    this.setState({ spotify_songs: {}, search_value: "" });
    this.props.toggle();
  };

  searchResults = () => {
    return this.state.spotify_songs.items.map((song, index) => {
      let image = song.album.images[0];
      image ? (image = image.url) : (image = "");

      let newSong = {
        title: song.name,
        album: song.album.name,
        spotify_id: song.id,
        artist_id: this.props.data.id,
      };

      return (
        <div
          key={index}
          className={styles.result}
          onClick={() => this.handleAddSpotify(newSong)}
        >
          <div
            className={styles.result__image}
            style={{ backgroundImage: `url(${image})` }}
          ></div>
          <div className={styles.result__name}>
            <p>{song.name}</p>
          </div>
          <div className={styles.result__overlay}>
            <i className="fas fa-plus"></i>
          </div>
        </div>
      );
    });
  };

  render() {
    return (
      <Fragment>
        <div className={styles.form}>
          <h2>New Song</h2>
          <h3>Search Spotify</h3>

          <div>
            <input
              type="text"
              name="spotify"
              placeholder="Search"
              autoComplete="off"
              value={this.state.search_value}
              onChange={this.handleSpotifySearch}
            ></input>
            <div className={styles.search_results}>
              {this.state.spotify_songs.items &&
              this.state.spotify_songs.items.length > 0
                ? this.searchResults()
                : ""}
            </div>
          </div>

          <p className={styles.seperator}>or</p>

          <form onSubmit={this.handleSubmit}>
            <div>
              <input
                type="text"
                name="name"
                value={this.state.name}
                autoComplete="off"
                placeholder="Title"
                onChange={this.handleForm}
              ></input>
            </div>
            <div>
              <input
                type="text"
                name="spotify_id"
                value={this.state.spotify_id}
                autoComplete="off"
                placeholder="Spotify ID"
                onChange={this.handleForm}
              ></input>
            </div>
            <div>
              <button type="submit">Save</button>
            </div>
          </form>
        </div>
      </Fragment>
    );
  }
}

export default connect(null, { addSong })(NewSongForm);
