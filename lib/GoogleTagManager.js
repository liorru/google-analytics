'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactGoogleTagManager = require('react-google-tag-manager');

var _reactGoogleTagManager2 = _interopRequireDefault(_reactGoogleTagManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GoogleTagManager = function (_React$Component) {
  _inherits(GoogleTagManager, _React$Component);

  function GoogleTagManager() {
    _classCallCheck(this, GoogleTagManager);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(GoogleTagManager).apply(this, arguments));
  }

  _createClass(GoogleTagManager, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var dataLayerName = this.props.dataLayerName || 'dataLayer';
      var scriptId = this.props.scriptId || 'react-google-tag-manager-gtm';

      if (!window[dataLayerName]) {
        var gtmScriptNode = document.getElementById(scriptId);

        eval(gtmScriptNode.textContent);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var gtm = (0, _reactGoogleTagManager2.default)({
        id: this.props.gtmId,
        dataLayerName: this.props.dataLayerName || 'dataLayer',
        additionalEvents: this.props.additionalEvents || {}
      });

      return _react2.default.createElement(
        'div',
        { id: this.props.scriptId || 'react-google-tag-manager-gtm' },
        gtm.noScriptAsReact(),
        gtm.scriptAsReact()
      );
    }
  }]);

  return GoogleTagManager;
}(_react2.default.Component);

GoogleTagManager.propTypes = {
  gtmId: _react.PropTypes.string.isRequired,
  dataLayerName: _react.PropTypes.string,
  additionalEvents: _react.PropTypes.object,
  scriptId: _react.PropTypes.string
};
exports.default = GoogleTagManager;
module.exports = exports['default'];