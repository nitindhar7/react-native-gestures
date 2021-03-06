'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _mixinsEvents = require('./mixins/events');

var _mixinsEvents2 = _interopRequireDefault(_mixinsEvents);

var _mixinsDraggable = require('./mixins/draggable');

var _mixinsDraggable2 = _interopRequireDefault(_mixinsDraggable);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

exports['default'] = _react2['default'].createClass({
  displayName: 'GestureView',

  mixins: [(0, _mixinsEvents2['default'])(['onLayout']), (0, _mixinsDraggable2['default'])()],

  propTypes: {
    gestures: _react.PropTypes.array.isRequired,
    onError: _react.PropTypes.func.isRequired,
    toStyle: _react.PropTypes.func.isRequired,
    style: _react.PropTypes.any,
    children: _react.PropTypes.array,
    type: _react.PropTypes.oneOf(['View', 'Image']),
    source: _react.PropTypes.any
  },

  componentDidMount: function componentDidMount() {
    var _this = this;

    this.layoutStream.subscribe(function (layout) {
      return _this.container.setNativeProps({
        style: _this.props.toStyle(layout)
      });
    }, function (err) {
      return _this.props.onError(err);
    });
  },

  render: function render() {
    var _this2 = this;

    var props = _extends({
      ref: function ref(container) {
        return _this2.container = container;
      },
      style: this.props.style,
      onLayout: function onLayout(_ref) {
        var nativeEvent = _ref.nativeEvent;

        _this2.onLayout.onNext(nativeEvent);
      },
      type: this.props.type || 'View',
      source: this.props.source
    }, this.gestureResponder.panHandlers);
    return _react2['default'].createElement(
      _reactNative.View,
      null,
      this.props.type === 'View' ? _react2['default'].createElement(
        _reactNative.View,
        props,
        this.props.children
      ) : _react2['default'].createElement(_reactNative.Image, props)
    );
  }
});
module.exports = exports['default'];