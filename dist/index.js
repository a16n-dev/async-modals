Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () {
            return e[k];
          }
        });
      }
    });
  }
  n['default'] = e;
  return Object.freeze(n);
}

var React__namespace = /*#__PURE__*/_interopNamespace(React);

var ModalContext = React.createContext({
    setModal: function () { },
});
var ChildWrapper = React__namespace.memo(function (_a) {
    var children = _a.children;
    return React__namespace.createElement(React__namespace.Fragment, null, children);
});
var ModalProvider = function (_a) {
    var children = _a.children, _b = _a.backgroundClassName, backgroundClassName = _b === void 0 ? 'async-modals__background' : _b, _c = _a.backgroundId, backgroundId = _c === void 0 ? 'modal-back' : _c;
    var _d = React.useState(), modal = _d[0], setModal = _d[1];
    var _e = React.useState(''), bgClassName = _e[0], setBgClassName = _e[1];
    var ctx = {
        setModal: function (obj, backgroundClassName) {
            if (backgroundClassName === void 0) { backgroundClassName = ''; }
            setModal(obj);
            setBgClassName(backgroundClassName);
        },
    };
    return (React__namespace.createElement(ModalContext.Provider, { value: ctx },
        React__namespace.createElement(ChildWrapper, null, children),
        modal && (React__namespace.createElement("div", { className: backgroundClassName + ' ' + bgClassName, id: backgroundId, onMouseDown: function (e) {
                var _a;
                if (modal.canClose && ((_a = e.target) === null || _a === void 0 ? void 0 : _a.id) === backgroundId) {
                    modal.resolve(undefined);
                    setModal(undefined);
                }
            } },
            React__namespace.createElement(modal.component, { data: modal.data, submit: function (data) {
                    modal.resolve(data);
                    setModal(undefined);
                }, cancel: function () {
                    modal.resolve(undefined);
                    setModal(undefined);
                } })))));
};

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var useModal = function (modal) {
    var setModal = React.useContext(ModalContext).setModal;
    return {
        show: function (options) {
            if (options === void 0) { options = {}; }
            return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            var obj = {
                                resolve: resolve,
                                reject: reject,
                                data: options.data,
                                component: modal,
                                canClose: options.canClose === undefined ? true : options.canClose,
                            };
                            setModal(obj, options.backgroundClassName);
                        })];
                });
            });
        },
    };
};

exports.ModalProvider = ModalProvider;
exports.useModal = useModal;
//# sourceMappingURL=index.js.map
