import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { editSong } from "../../../../actions/songs";

import Rating from "../../../Common/Rating/Rating";

import styles from "./EditSongForm.module.scss";

class EditSongForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      genre: "",
      instrument: "",
      difficulty: "",
      youtube_id: "",
      spotify_id: "",
      status: "",
      file: null,
    };
  }

  static propTypes = {
    editSong: PropTypes.func.isRequired,
  };

  componentDidMount() {
    // Typical usage (don't forget to compare props):
    this.setState(this.props.data);
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.data !== prevProps.data) {
      this.setState(this.props.data);
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();

    let song = {
      spotify_id: this.state.spotify_id,
      youtube_id: this.state.youtube_id,
      genre: this.state.genre,
      difficulty: this.state.difficulty,
      instrument: this.state.instrument,
      status: this.state.status,
      file: "",
    };

    if (this.state.file) {
      song.file = this.state.file;
    }

    this.props.editSong(this.props.data.id, song);
    this.props.toggle();
  };

  handleForm = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleRating = (rating) => {
    this.setState({ difficulty: rating });
  };

  onFileChange = (e) => {
    this.setState({ file: e.target.files[0] });
  };

  render() {
    return (
      <div className={styles.form}>
        <h2>Edit {this.props.data.title}</h2>
        <form onSubmit={this.handleSubmit}>
          <div className={styles.form__control}>
            <label htmlFor="genre">Difficulty</label>
            <Rating
              rating={this.state.difficulty}
              editable={true}
              onRate={this.handleRating}
            ></Rating>
          </div>
          <div className={styles.form__control}>
            <label htmlFor="genre">Genre</label>
            <select
              name="genre"
              value={this.state.genre}
              onChange={this.handleForm}
            >
              <option value="Alternative">Alternative</option>
              <option value="Classical">Classical</option>
              <option value="Country">Country</option>
              <option value="Jazz">Jazz</option>
              <option value="Folk">Folk</option>
              <option value="Metal">Metal</option>
              <option value="Pop">Pop</option>
              <option value="Rock">Rock</option>
            </select>
          </div>
          <div className={styles.form__control}>
            <label htmlFor="instrument">Instrument</label>
            <select
              name="instrument"
              onChange={this.handleForm}
              value={this.state.instrument}
            >
              <option value="Guitar">Guitar</option>
              <option value="Piano">Piano</option>
            </select>
          </div>
          <div className={styles.form__control}>
            <label htmlFor="status">Status</label>
            <select
              name="status"
              onChange={this.handleForm}
              value={this.state.status}
            >
              <option value="1">Not Started</option>
              <option value="2">In Progress</option>
              <option value="3">Proficient</option>
            </select>
          </div>
          <div className={styles.form__control}>
            <label htmlFor="youtube_id">Youtube ID</label>
            <input
              value={this.state.youtube_id}
              name="youtube_id"
              onChange={this.handleForm}
            />
          </div>
          <div className={styles.form__control}>
            <label htmlFor="spotify_id">Spotify ID</label>
            <input
              value={this.state.spotify_id}
              name="spotify_id"
              onChange={this.handleForm}
            />
          </div>
          <div className={styles.form__control}>
            <input type="file" onChange={this.onFileChange} />
          </div>
          <div className={styles.form__control}>
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(null, { editSong })(EditSongForm);
