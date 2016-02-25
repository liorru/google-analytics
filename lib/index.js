'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.set = exports.send = exports.error = exports.create = exports.googleAnalyticsCode = exports.NOT_FATAL = exports.FATAL = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.ga = ga;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FATAL = exports.FATAL = true;
var NOT_FATAL = exports.NOT_FATAL = false;

var analytics = __CLIENT__ ? window.ga : function () {
  return undefined;
};

var googleAnalyticsCode = exports.googleAnalyticsCode = __DEVELOPMENT__ ? 'window.ga = function(){};' : '\n  (function(i,s,o,g,r,a,m){i[\'GoogleAnalyticsObject\']=r;i[r]=i[r]||function(){\n  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),\n  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)\n  })(window,document,\'script\',\'//www.google-analytics.com/analytics.js\',\'ga\');\n';

var create = exports.create = function create(gaUa) {
  analytics.call(null, 'create', gaUa, 'auto');
};

var error = exports.error = function error(msg, isFatal) {
  analytics.bind(null, 'send', 'exception', {
    exDescription: msg,
    exFatal: isFatal
  });
};
var send = exports.send = analytics.bind(null, 'send');
var set = exports.set = analytics.bind(null, 'set');

function ga(ComposedComponent) {
  return function (_React$Component) {
    _inherits(Decorator, _React$Component);

    function Decorator() {
      _classCallCheck(this, Decorator);

      var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Decorator).call(this));

      _this.state = {};
      return _this;
    }

    _createClass(Decorator, [{
      key: 'handleMouseEnter',
      value: function handleMouseEnter(e) {
        send("event", {
          eventCategory: "Widget",
          eventAction: "MouseEnter",
          eventLabel: ""
        });
      }
    }, {
      key: 'handleMouseLeave',
      value: function handleMouseLeave(e) {
        send("event", {
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

exports.default = {
  analytics: analytics,
  create: create,
  error: error,
  send: send,
  set: set
};