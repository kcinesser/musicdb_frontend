import React, { Component } from "react";

export default class YoutubeWidget extends Component {
  render() {
    return (
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${this.props.id}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Youtube"
      ></iframe>
    );
  }
}
