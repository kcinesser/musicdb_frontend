import React, { Component } from "react";

export default class SpotifyWidget extends Component {
  render() {
    return (
      <iframe
        src={`https://open.spotify.com/embed/track/${this.props.id}`}
        width="300"
        height="380"
        frameBorder="0"
        allowtransparency="true"
        allow="encrypted-media"
        title="Spotify"
      ></iframe>
    );
  }
}
