import React, { Component } from 'react';
import { Helmet } from "react-helmet";

export default class OpenPdf extends Component {
  constructor(props) {
    super(props)
  }

  render () {
    return (
      <>
        <div id="pdf-viewer"></div>
        <Helmet>
          <script src="https://cdn.jsdelivr.net/npm/pdfjs-dist@2.1.266/build/pdf.min.js" type="text/javascript"></script>
          <script src="https://cdn.jsdelivr.net/npm/pdfjs-dist@2.1.266/web/pdf_viewer.min.js" type="text/javascript"></script>
          <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js" type="text/javascript"></script>
          {
            setTimeout(() => {
              const uri = this.props.uri;
              const password = this.props.password;
              const scale = this.props.scale;

              const loadingTask = pdfjsLib.getDocument({url: uri, password: password});
              loadingTask.promise.then((pdf) => {
                // Load information from the first page.
                const num = 1;

                function renderPage(num, scale) {
                  pdf.getPage(num).then(function(page) {
                    const viewport = page.getViewport(scale);

                    // Apply page dimensions to the <canvas> element.
                    const canvasId = 'pdf-viewer-' + num;
                    $('#pdf-viewer').append($('<canvas/>', {'id': canvasId}));
                    const canvas = document.getElementById(canvasId);
                    const context = canvas.getContext("2d");
                    canvas.height = viewport.height;
                    canvas.width = viewport.width;

                    // Render the page into the <canvas> element.
                    const renderContext = {
                      canvasContext: context,
                      viewport: viewport
                    };

                    page.render(renderContext).then(function() {
                      console.log("Page rendered!");
                    });
                  });
                }

                for (let i = 1; i < pdf.numPages; i ++) {
                  renderPage(i, scale);
                }

              },
              function(reason) {
                console.error(reason);
              })
            }, 5000)
          }
        </Helmet>
      </>
    )
  }
}
