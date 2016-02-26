import React, { PropTypes } from 'react';
import gtmParts from 'react-google-tag-manager';

class GoogleTagManager extends React.Component {
  static propTypes = {
    gtmId: PropTypes.string.isRequired,
    dataLayerName: PropTypes.string,
    additionalEvents: PropTypes.object,
    scriptId: PropTypes.string
  };

  componentDidMount() {
    const dataLayerName = this.props.dataLayerName || 'dataLayer';
    const scriptId = this.props.scriptId || 'react-google-tag-manager-gtm';

    if (!window[dataLayerName]) {
      const gtmScriptNode = document.getElementById(scriptId);

      eval(gtmScriptNode.textContent);
    }
  }

  render() {
    const gtm = gtmParts({
      id: this.props.gtmId,
      dataLayerName: this.props.dataLayerName || 'dataLayer',
      additionalEvents: this.props.additionalEvents || {}
    });

    return (
      <div id={this.props.scriptId || 'react-google-tag-manager-gtm'}>
        {gtm.noScriptAsReact()}
        {gtm.scriptAsReact()}
      </div>
    );
  }
}

export default GoogleTagManager;