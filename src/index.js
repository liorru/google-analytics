import React from 'react';
import ReactDOM from 'react-dom';

export const FATAL = true;
export const NOT_FATAL = false;

const analytics = __CLIENT__ ? window.ga : () => undefined;

export const googleAnalyticsCode = __DEVELOPMENT__ ? 'window.ga = function(){};' : `
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
`;

export const create = function(gaUa) {
  analytics.call(null, 'create', gaUa, 'auto');
};

export const error = (msg, isFatal) => {
  analytics.bind(null, 'send', 'exception', {
    exDescription: msg,
    exFatal: isFatal
  })
};
export const send = analytics.bind(null, 'send');
export const set = analytics.bind(null, 'set');

export function ga(ComposedComponent) {
  return class Decorator extends React.Component {

    constructor() {
      super();
      this.state = {};
    }

    handleMouseEnter(e) {
      console.log('enter', e.clientX, e.clientY);
      send("event", {
        eventCategory: "Widget",
        eventAction:   "MouseEnter",
        eventLabel:    ""
      });
    }

    handleMouseLeave(e) {
      console.log('leave', e.clientX, e.clientY);
      send("event", {
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

export default {
  analytics,
  create,
  error,
  send,
  set
};
