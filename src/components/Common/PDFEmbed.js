import React, { Component } from "react";

export default class PDFEmbed extends Component {
  render() {
    return (
      <div>
        <iframe
          src="https://musicdbassets.s3.us-east-2.amazonaws.com/assets/tabs/Feathered+Indians+Tab+by+Tyler+Childerstabs.pdf"
          height="848"
          width="600"
          frameBorder="0"
          marginHeight="0"
          marginWidth="0"
        ></iframe>
      </div>
    );
  }
}
