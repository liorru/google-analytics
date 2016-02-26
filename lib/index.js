'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.analytics = exports.GoogleTagManager = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.ga = ga;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _GoogleTagManager = require('./GoogleTagManager');

var _GoogleTagManager2 = _interopRequireDefault(_GoogleTagManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var dataLayer = __CLIENT__ ? window.dataLayer : [];
var analytics = {};

analytics.send = function (event, payload) {
  dataLayer.push(_extends({
    event: event
  }, payload));
};

function ga(ComposedComponent) {
  return function (_React$Component) {
    _inherits(Decorator, _React$Component);

    function Decorator() {
      _classCallCheck(this, Decorator);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Decorator).call(this));
    }

    _createClass(Decorator, [{
      key: 'handleMouseEnter',
      value: function handleMouseEnter(e) {
        analytics.send("event", {
          eventCategory: "Widget",
          eventAction: "MouseEnter",
          eventLabel: ""
        });
      }
    }, {
      key: 'handleMouseLeave',
      value: function handleMouseLeave(e) {
        analytics.send("event", {
          eventCategory: "Widget",
          eventAction: "MouseLeave",
          eventLabel: ""
        });
      }
    }, {
      key: 'componentDidMount',
      value: function componentDidMount() {
        var node = _reactDom2.default.findDOMNode(this);
        node.addEventListener('mouseenter ', this.handleMouseEnter);
        node.addEventListener('mouseleave', this.handleMouseLeave);
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        var node = _reactDom2.default.findDOMNode(this);
        node.removeEventListener('mouseenter ', this.handleMouseEnter);
        node.removeEventListener('mouseleave', this.handleMouseLeave);
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2.default.createElement(ComposedComponent, this.props);
      }
    }]);

    return Decorator;
  }(_react2.default.Component);
}

exports.GoogleTagManager = _GoogleTagManager2.default;
exports.analytics = analytics;