import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getArtist, deleteArtist } from "../../../actions/artists";
import { Link, Redirect } from "react-router-dom";
import Moment from "react-moment";

import Sidetray from "../../Common/Sitetray/Sidetray";
import NewSongForm from "../Songs/NewSongForm/NewSongForm";

import Rating from "../../Common/Rating/Rating";

import styles from "./Artist.module.scss";

const status = {
  1: "Not Started",
  2: "In Progress",
  3: "Proficient",
};

class Artist extends Component {
  static propTypes = {
    artist: PropTypes.object.isRequired,
    getArtist: PropTypes.func.isRequired,
    deleteArtist: PropTypes.func.isRequired,
  };

  state = {
    sidetray: false,
    sideTrayComponent: NewSongForm,
    sideTrayData: {},
    alertIndex: null,
    artistAlert: false,
    artistDeleted: false,
  };

  componentDidMount() {
    let id = this.props.match.params.id;

    this.props.getArtist(id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({
        sideTrayComponent: NewSongForm,
        sideTrayData: {
          name: this.props.artist.name,
          id: this.props.artist.id,
        },
      });
    }
  }

  songList = () => {
    return this.props.artist.songs.map((song, index) => {
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
            <i className="fas fa-check"></i>
            <i className="fas fa-times" onClick={this.hideAlert}></i>
          </div>
        </div>
      );
    });
  };

  toggleTray = () => {
    this.setState({
      sidetray: !this.state.sidetray,
    });
  };

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

  toggleArtistAlert = () => {
    this.setState({ artistAlert: !this.state.artistAlert });
  };

  handleDelete = (id) => {
    this.props.deleteArtist(id);

    this.setState({
      artistDeleted: true,
    });
  };

  render() {
    let artist = this.props.artist;

    if (this.state.artistDeleted) {
      return <Redirect to="/artists" />;
    }

    if (artist) {
      return (
        <div className={styles.artist}>
          <span className={styles.background}>{artist.name}</span>
          <div className={styles.artist__hero}>
            <div
              className={styles.artist__image}
              style={{ backgroundImage: `url(${artist.image_url})` }}
            >
              <h2>{artist.name}</h2>
            </div>
            <div className={styles.artist__info}>
              {artist.spotify_id ? (
                <p>
                  <a
                    href={`https://open.spotify.com/artist/${artist.spotify_id}`}
                    target="
            -blank"
                  >
                    <i className="fab fa-spotify"></i>
                  </a>
                </p>
              ) : (
                ""
              )}
              <p>
                Added <Moment format={"MM/DD/YYYY"}>{artist.create_at}</Moment>
              </p>
            </div>
          </div>
          <div className={styles.list__container}>
            <div className={styles.list__header}>
              <h2>Songs</h2>
              <span>
                <i
                  onClick={() =>
                    this.toggleTray(NewSongForm, {
                      name: artist.name,
                      id: artist.id,
                    })
                  }
                  className="fas fa-plus"
                ></i>
              </span>
              <div
                className={`${styles.right} ${styles.alert__box} ${
                  this.state.artistAlert ? styles.alert : ""
                }`}
              >
                <span onClick={this.toggleArtistAlert}>
                  <i className={`fas fa-trash`}></i>
                </span>
                <p className={styles.alert__text}>
                  Delete artist?{" "}
                  <i
                    className={`fas fa-check ${styles.red}`}
                    onClick={() => this.handleDelete(artist.id)}
                  ></i>
                  <i
                    className="fas fa-times"
                    onClick={this.toggleArtistAlert}
                  ></i>
                </p>
              </div>
            </div>
            <div className={styles.song__list}>
              {artist.songs && artist.songs.length > 0 ? (
                <Fragment>{this.songList()}</Fragment>
              ) : (
                <p>No songs found for {artist.name}.</p>
              )}
            </div>
          </div>
          <Sidetray
            status={this.state.sidetray}
            component={NewSongForm}
            data={{ name: artist.name, id: artist.id }}
            toggle={this.toggleTray}
          />
        </div>
      );
    } else {
      return <p>Loading...</p>;
    }
  }
}

const mapStateToProps = (state) => ({
  artist: state.artists.artist,
});

export default connect(mapStateToProps, { getArtist, deleteArtist })(Artist);
