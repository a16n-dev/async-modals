'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

var ModalContext = /*#__PURE__*/react.createContext({
  setModal: function setModal() {}
});
var ChildWrapper = React.memo(function (_ref) {
  var children = _ref.children;
  return /*#__PURE__*/React.createElement(React.Fragment, null, children);
});
var ModalProvider = function ModalProvider(_ref2) {
  var children = _ref2.children,
      _ref2$backgroundClass = _ref2.backgroundClassName,
      backgroundClassName = _ref2$backgroundClass === void 0 ? 'async-modals__background' : _ref2$backgroundClass,
      _ref2$backgroundId = _ref2.backgroundId,
      backgroundId = _ref2$backgroundId === void 0 ? 'modal-back' : _ref2$backgroundId;

  var _useState = react.useState(),
      _useState2 = _slicedToArray(_useState, 2),
      modal = _useState2[0],
      _setModal = _useState2[1];

  var _useState3 = react.useState(''),
      _useState4 = _slicedToArray(_useState3, 2),
      bgClassName = _useState4[0],
      setBgClassName = _useState4[1];

  var ctx = {
    setModal: function setModal(obj) {
      var backgroundClassName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

      _setModal(obj);

      setBgClassName(backgroundClassName);
    }
  };
  return /*#__PURE__*/React.createElement(ModalContext.Provider, {
    value: ctx
  }, /*#__PURE__*/React.createElement(ChildWrapper, null, children), modal && /*#__PURE__*/React.createElement("div", {
    className: backgroundClassName + ' ' + bgClassName,
    id: backgroundId,
    onMouseDown: function onMouseDown(e) {
      var _e$target;

      if (modal.canClose && ((_e$target = e.target) === null || _e$target === void 0 ? void 0 : _e$target.id) === backgroundId) {
        modal.resolve(undefined);

        _setModal(undefined);
      }
    }
  }, /*#__PURE__*/React.createElement(modal.component, {
    data: modal.data,
    submit: function submit(data) {
      modal.resolve(data);

      _setModal(undefined);
    },
    cancel: function cancel() {
      modal.resolve(undefined);

      _setModal(undefined);
    }
  })));
};

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

var useModal = function useModal(modal) {
  var _useContext = react.useContext(ModalContext),
      setModal = _useContext.setModal;

  return {
    show: function () {
      var _show = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var options,
            _args = arguments;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                options = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
                return _context.abrupt("return", new Promise(function (resolve, reject) {
                  var obj = {
                    resolve: resolve,
                    reject: reject,
                    data: options.data,
                    component: modal,
                    canClose: options.canClose === undefined ? true : options.canClose
                  };
                  setModal(obj, options.backgroundClassName);
                }));

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function show() {
        return _show.apply(this, arguments);
      }

      return show;
    }()
  };
};

exports.ModalProvider = ModalProvider;
exports.useModal = useModal;
