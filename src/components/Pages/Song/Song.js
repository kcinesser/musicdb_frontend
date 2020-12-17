import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getSong, editSong } from "../../../actions/songs";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import { Link } from "react-router-dom";
import Moment from "react-moment";

import styles from "./Song.module.scss";
import "./Song.scss";
import SpotifyWidget from "../../Common/SpotifyWidget";
import YoutubeWidget from "../../Common/YoutubeWidget";
import Rating from "../../Common/Rating/Rating";
import Sidetray from "../../Common/Sitetray/Sidetray";
import EditSongForm from "../Songs/EditSongForm/EditSongForm";
import Loading from "../../Common/Loading/Loading";

const status = {
  1: "Not Started",
  2: "In Progress",
  3: "Proficient",
};

class Song extends Component {
  static propTypes = {
    song: PropTypes.object,
    getSong: PropTypes.func.isRequired,
    editSong: PropTypes.func.isRequired,
  };

  state = {
    file: "",
    currentPage: 1,
    numPages: null,
    sidetray: false,
    notes: "",
  };

  componentDidMount() {
    let id = this.props.match.params.id;

    this.props.getSong(id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({ notes: this.props.song.notes });
    }
  }

  setPage = (index) => {
    this.setState({ currentPage: (this.state.currentPage += index) });
  };

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages: numPages });
  };

  toggleTray = () => {
    this.setState({ sidetray: !this.state.sidetray });
  };

  handleNotes = (e) => {
    this.setState({ notes: e.target.value });
  };

  handleNotesSave = (e) => {
    this.props.editSong(this.props.song.id, { notes: this.state.notes });
  };

  render() {
    let song = this.props.song;

    if (song) {
      return (
        <div className={styles.song}>
          <div className={styles.song__info}>
            <div className={styles.song__title}>
              <h2>{song.title}</h2>
              <i className="fas fa-pen" onClick={this.toggleTray}></i>
            </div>
            <div className={styles.song__about}>
              <Link to={`/artist/${song.artist_id}`}>{song.artist_name}</Link>
              <span>{status[song.status]}</span>
              <span>
                {song.instrument === "Guitar" ? (
                  <i className="fas fa-guitar"></i>
                ) : (
                  <i className={`${styles.icon} ${styles.icon__piano}`}></i>
                )}
              </span>
              <span>
                <Rating rating={song.difficulty} editable={false} />
              </span>
              <span>{song.genre}</span>
              <span>
                <Moment format={"MM/DD/YYYY"}>{song.created_at}</Moment>
              </span>
            </div>
          </div>

          <div className={styles.song__content}>
            <div className={styles.song__left}>
              {song.youtube_id ? <YoutubeWidget id={song.youtube_id} /> : ""}
              {song.spotify_id ? <SpotifyWidget id={song.spotify_id} /> : ""}
              <h3>Notes</h3>
              <div className={styles.song__notes}>
                <textarea
                  value={this.state.notes}
                  onChange={this.handleNotes}
                ></textarea>
                <button
                  className={styles.notes__save}
                  onClick={this.handleNotesSave}
                >
                  <i className="fas fa-save"></i>
                </button>
              </div>
            </div>
            <div className={styles.song__right}>
              <Document
                className={styles.pdf__viewer}
                file={
                  "https://musicdbassets.s3.us-east-2.amazonaws.com/assets/tabs/Feathered+Indians+Tab+by+Tyler+Childerstabs.pdf"
                }
                onLoadSuccess={this.onDocumentLoadSuccess}
              >
                <Page pageNumber={this.state.currentPage} />

                {this.state.numPages > 1 ? (
                  <div className={styles.pdf__controls}>
                    {this.state.currentPage <= 1 ? (
                      <span>
                        <i
                          className={`fas fa-chevron-left ${styles.disabled}`}
                        ></i>
                      </span>
                    ) : (
                      <span onClick={() => this.setPage(-1)}>
                        <i className="fas fa-chevron-left"></i>
                      </span>
                    )}

                    {this.state.currentPage >= this.state.numPages ? (
                      <span>
                        <i
                          className={`fas fa-chevron-right ${styles.disabled}`}
                        ></i>
                      </span>
                    ) : (
                      <span onClick={() => this.setPage(1)}>
                        <i className="fas fa-chevron-right"></i>
                      </span>
                    )}
                  </div>
                ) : (
                  ""
                )}
              </Document>
            </div>
          </div>
          <Sidetray
            status={this.state.sidetray}
            component={EditSongForm}
            toggle={this.toggleTray}
            data={this.props.song}
          />
        </div>
      );
    } else {
      return "";
    }
  }
}

const mapStateToProps = (state) => ({
  song: state.songs.song,
});

export default connect(mapStateToProps, { getSong, editSong })(Song);
