import React from 'react';
import ReactDOM from 'react-dom';

import GoogleTagManager from './GoogleTagManager';

const dataLayer = __CLIENT__ ? window.dataLayer : [];
const analytics = {};

analytics.send = function(event, payload) {
  dataLayer.push({
    event,
    ...payload
  })
};

export function ga(ComposedComponent) {
  return class Decorator extends React.Component {
    constructor() {
      super();
    }

    handleMouseEnter(e) {
      analytics.send("event", {
        eventCategory: "Widget",
        eventAction:   "MouseEnter",
        eventLabel:    ""
      });
    }

    handleMouseLeave(e) {
      analytics.send("event", {
        eventCategory: "Widget",
        eventAction:   "MouseLeave",
        eventLabel:    ""
      });
    }

    componentDidMount() {
      var node = ReactDOM.findDOMNode(this);
      node.addEventListener('mouseenter ', this.handleMouseEnter);
      node.addEventListener('mouseleave', this.handleMouseLeave);
    }

    componentWillUnmount() {
      var node = ReactDOM.findDOMNode(this);
      node.removeEventListener('mouseenter ', this.handleMouseEnter);
      node.removeEventListener('mouseleave', this.handleMouseLeave);
    }

    render() {
      return <ComposedComponent {...this.props}/>;
    }

  };
}


export {
  GoogleTagManager,
  analytics
};
