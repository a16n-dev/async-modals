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

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

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

var ModalContext = React.createContext({
    setModal: function () { },
    closeModal: function () { },
});
var ChildWrapper = React__namespace.memo(function (_a) {
    var children = _a.children;
    return React__namespace.createElement(React__namespace.Fragment, null, children);
});
var ModalProvider = function (_a) {
    var children = _a.children, animated = _a.animated, _b = _a.backgroundClassName, baseClassName = _b === void 0 ? animated
        ? function (isClosing) {
            return "async-modals__bg-base async-modals__" + (isClosing ? "closing" : "open");
        }
        : "async-modals__bg-base async-modals__open" : _b;
    var _c = React.useState({}), state = _c[0], setState = _c[1];
    var modalContainer = React.useRef(null);
    // Close the modal, optionally passing in some data
    var closeModal = function (data) {
        var _a, _b, _c, _d, _e;
        if (animated) {
            // If exit delay is set then dont unmount until timer is up
            setState(function (s) { return (__assign(__assign({}, s), { isClosing: true })); });
            var listener = function () {
                var _a;
                (_a = state.modal) === null || _a === void 0 ? void 0 : _a.resolve(data);
                setState({});
            };
            (_a = modalContainer.current) === null || _a === void 0 ? void 0 : _a.addEventListener("transitionend", listener);
            (_b = modalContainer.current) === null || _b === void 0 ? void 0 : _b.addEventListener("webkitTransitionEnd", listener);
            (_c = modalContainer.current) === null || _c === void 0 ? void 0 : _c.addEventListener("animationend", listener);
            (_d = modalContainer.current) === null || _d === void 0 ? void 0 : _d.addEventListener("webkitAnimationEnd", listener);
        }
        else {
            (_e = state.modal) === null || _e === void 0 ? void 0 : _e.resolve(data);
            setState({});
        }
    };
    // Cleanup hook for animation timer
    React.useEffect(function () {
        //listener to prevent navigation and instead close the modal
        var listener = function (e) {
            var _a;
            if (((_a = e.state) === null || _a === void 0 ? void 0 : _a.modal) !== true) {
                closeModal();
            }
        };
        window.addEventListener("popstate", listener);
        return function () {
            window.removeEventListener("popstate", listener);
        };
    }, []);
    var context = {
        setModal: function (obj) {
            history.replaceState({ modal: false }, "");
            history.pushState({ modal: true }, "");
            setState(function (s) { return (__assign(__assign({}, s), { modal: obj })); });
        },
        modal: state,
        closeModal: function (data) {
            closeModal(data);
        },
    };
    return (React__namespace.createElement(ModalContext.Provider, { value: context },
        React__namespace.createElement(ChildWrapper, null, children),
        state.modal && (React__namespace.createElement("div", { className: typeof baseClassName === "function"
                ? baseClassName(state.isClosing)
                : baseClassName, id: "modal-back", onMouseDown: function (e) {
                var _a, _b;
                if (((_a = state.modal) === null || _a === void 0 ? void 0 : _a.canClose) &&
                    ((_b = e.target) === null || _b === void 0 ? void 0 : _b.id) === "modal-back") {
                    closeModal();
                }
            }, ref: modalContainer },
            React__namespace.createElement(state.modal.component, { data: state.modal.data, submit: function (data) { return closeModal(data); }, cancel: function () { return closeModal(); }, isClosing: state.isClosing })))));
};

function useModal(modalComponent, modalOptions) {
    var _this = this;
    if (modalOptions === void 0) { modalOptions = {}; }
    var _a = React.useContext(ModalContext), setModal = _a.setModal, closeModal = _a.closeModal;
    var show = function (component) { return function (options) {
        if (options === void 0) { options = modalOptions; }
        return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var obj = {
                            resolve: resolve,
                            reject: reject,
                            data: options.data,
                            component: component,
                            canClose: Boolean(options.canClose),
                        };
                        setModal(obj);
                    })];
            });
        });
    }; };
    return {
        show: modalComponent ? show(modalComponent) : function (component, options) {
            if (options === void 0) { options = modalOptions; }
            return show(component)(options);
        },
        close: function () { return closeModal(); }
    };
}

exports.ModalProvider = ModalProvider;
exports.useModal = useModal;
//# sourceMappingURL=index.js.map
