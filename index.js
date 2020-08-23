"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactHelmet = require("react-helmet");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var OpenPdf = /*#__PURE__*/function (_Component) {
  _inherits(OpenPdf, _Component);

  var _super = _createSuper(OpenPdf);

  function OpenPdf(props) {
    _classCallCheck(this, OpenPdf);

    return _super.call(this, props);
  }

  _createClass(OpenPdf, [{
    key: "render",
    value: function render() {
      var _this = this;

      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("div", {
        id: "pdf-viewer"
      }), /*#__PURE__*/_react["default"].createElement(_reactHelmet.Helmet, null, /*#__PURE__*/_react["default"].createElement("script", {
        src: "https://cdn.jsdelivr.net/npm/pdfjs-dist@2.1.266/build/pdf.min.js",
        type: "text/javascript"
      }), /*#__PURE__*/_react["default"].createElement("script", {
        src: "https://cdn.jsdelivr.net/npm/pdfjs-dist@2.1.266/web/pdf_viewer.min.js",
        type: "text/javascript"
      }), /*#__PURE__*/_react["default"].createElement("script", {
        src: "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js",
        type: "text/javascript"
      }), setTimeout(function () {
        var uri = _this.props.uri;
        var password = _this.props.password;
        var scale = _this.props.scale;
        var loadingTask = pdfjsLib.getDocument({
          url: uri,
          password: password
        });
        loadingTask.promise.then(function (pdf) {
          // Load information from the first page.
          var num = 1;

          function renderPage(num, scale) {
            pdf.getPage(num).then(function (page) {
              var viewport = page.getViewport(scale); // Apply page dimensions to the <canvas> element.

              var canvasId = 'pdf-viewer-' + num;
              $('#pdf-viewer').append($('<canvas/>', {
                'id': canvasId
              }));
              var canvas = document.getElementById(canvasId);
              var context = canvas.getContext("2d");
              canvas.height = viewport.height;
              canvas.width = viewport.width; // Render the page into the <canvas> element.

              var renderContext = {
                canvasContext: context,
                viewport: viewport
              };
              page.render(renderContext).then(function () {
                console.log("Page rendered!");
              });
            });
          }

          for (var i = 1; i < pdf.numPages; i++) {
            renderPage(i, scale);
          }
        }, function (reason) {
          console.error(reason);
        });
      }, 5000)));
    }
  }]);

  return OpenPdf;
}(_react.Component);

exports["default"] = OpenPdf;
