import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import axios from "axios";
import { addArtist } from "../../../../actions/artists";

import styles from "./NewArtistForm.module.scss";

class NewArtistForm extends Component {
  state = {
    name: "",
    spotify_id: "",
    image_url: "",
    spotify_artists: {},
    search_value: "",
  };

  static propTypes = {
    addArtist: PropTypes.func.isRequired,
  };

  handleForm = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, spotify_id, image_url } = this.state;
    const artist = { name, spotify_id, image_url };
    this.props.addArtist(artist);
    this.setState({
      name: "",
      imague_url: "",
      spotify_id: "",
    });
  };

  handleSpotifySearch = (e) => {
    let value = e.target.value;

    this.setState({ search_value: value });

    if (value.length > 0) {
      axios
        .post("http://localhost:5000/api/spotify/artists", { value: value })
        .then((res) => {
          this.setState({ spotify_artists: res.data.artists });
        });
    } else {
      this.setState({ spotify_artists: {} });
    }
  };

  handleAddSpotify = (artist) => {
    this.props.addArtist(artist);
    this.setState({ spotify_artists: {}, search_value: "" });
    this.props.toggle();
  };

  searchResults = () => {
    return this.state.spotify_artists.items.map((artist, index) => {
      let image = artist.images[0];
      image ? (image = image.url) : (image = "");

      let newArtist = {
        name: artist.name,
        image_url: image,
        spotify_id: artist.id,
      };

      return (
        <div
          key={index}
          className={styles.result}
          onClick={() => this.handleAddSpotify(newArtist)}
        >
          <div
            className={styles.result__image}
            style={{ backgroundImage: `url(${image})` }}
          ></div>
          <div className={styles.result__name}>
            <p>{artist.name}</p>
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
          <h2>New Artist</h2>
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
              {this.state.spotify_artists.items &&
              this.state.spotify_artists.items.length > 0
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
                placeholder="Name"
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
              <input
                type="text"
                name="image_url"
                value={this.state.image_url}
                autoComplete="off"
                placeholder="Image URL"
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

export default connect(null, { addArtist })(NewArtistForm);
