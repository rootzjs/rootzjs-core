(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("react")) : factory(root["React"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE__113__) {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 733:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (true) {
  module.exports = __webpack_require__(424);
} else {}

/***/ }),

/***/ 184:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


function _typeof(a) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(a) { return typeof a; }; } else { _typeof = function _typeof(a) { return a && typeof Symbol === "function" && a.constructor === Symbol && a !== Symbol.prototype ? "symbol" : typeof a; }; } return _typeof(a); }

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.checkErr = exports.logger = exports.logType = void 0;

var _rootzCoreDev = __webpack_require__(424);

var logType = {
  inf: "info",
  bra: "brand",
  err: "error",
  war: "warning"
};
exports.logType = logType;
var consoleColorCode = {
  error: {
    brand: "color: #fff; font-size:12px;  border-radius: 3px; padding: 2px 7px 2px 7px; text-align: center; background-color: #f44336;"
  },
  warning: {
    brand: "color: #fff; font-size:12px;  border-radius: 3px; padding: 2px 7px 2px 7px; text-align: center; background-color: #f48e36;"
  },
  information: {
    brand: "color: #fff; font-size:12px;  border-radius: 3px; padding: 2px 7px 2px 7px; text-align: center; background-color: #38b9f4;"
  },
  branding: {
    brand: "color: #fff; font-size:12px;  border-radius: 3px; padding: 2px 7px 2px 7px; text-align: center; background-color: #677b8c;"
  }
};
var logMap = {
  // Node Not Found
  NNF: function NNF(a) {
    return "%cRootz Error: Node ".concat(a, " should have a defined Component");
  },
  // Invalid Number Of Arguments
  INOA: function INOA(a) {
    return "%cRootz Error: Node constructor ".concat(a, " requires exactly 2 argument 'id' of type string and 'Component' of type React Component");
  },
  // Duplicate Entry Node Id
  DENI: function DENI(a) {
    return "%cRootz Error: In '".concat(a, "', Duplicate entry found, Node Name already exists");
  },
  // Invalid type State Required Object Or Fucntion
  ITSROOF: function ITSROOF(a, b) {
    return "%cRootz Error: In '".concat(a, "', Invalid type arguments in useActionFor for '").concat(b, "', required Object or a Function");
  },
  // Invalid type Action Name Required String
  ITANRS: function ITANRS(a, b) {
    return "%cRootz Error: In '".concat(a, "', Invalid type arguments for '").concat(b, "', required String");
  },
  // Invalid type Node ID
  ITNI: function ITNI(a, b) {
    return "%cRootz Error: In ".concat(a, ", Node name passed for '").concat(b, "' does not exist, please check if it is defined");
  },
  // Invalid type Callback Required Function 
  ITCRF: function ITCRF(a, b) {
    return "%cRootz Error: In '".concat(a, "', Invalid type arguments '").concat(b, "', required function.");
  },
  // Invalid type State Required Object
  ITSRO: function ITSRO(a, b) {
    return "%cRootz Error: In '".concat(a, "', Invalid type arguments in '").concat(b, "', required Object. States are of type Object only.");
  }
};

var logger = function logger(a, b) {
  switch (a) {
    case logType.err:
      {
        console.log(b, consoleColorCode.error.brand);
        break;
      }

    case logType.war:
      {
        console.log(b, consoleColorCode.warning.brand);
        break;
      }

    case logType.inf:
      {
        console.log(b, consoleColorCode.information.brand);
        break;
      }

    case logType.bra:
      {
        console.log(b, consoleColorCode.branding.brand);
        break;
      }

    default:
      {
        console.log(b, consoleColorCode.information.brand);
      }
  }
};

exports.logger = logger;
var checkErr = {
  checksForStateObject: function checksForStateObject(a, b) {
    if (_typeof(b) !== "object") {
      logger(logType.err, logMap.ITSRO(a));
      throw new Error();
    }
  },
  checksForNodeNotFound: function checksForNodeNotFound(a, b) {
    if (a === null) {
      logger(logType.err, logMap.NNF(b));
      throw new Error();
    }
  },
  checkLogsForCreateNode: function checkLogsForCreateNode(a, b) {
    var c = (0, _rootzCoreDev.getAllNodes)(); // if less / more arguments passed

    if (a.length != 2) {
      logger(logType.err, logMap.INOA(b));
      throw new Error();
    } // if Node already exists with the name


    if (Object.prototype.hasOwnProperty.call(c, "#" + b)) {
      logger(logType.err, logMap.DENI(b));
      throw new Error();
    }
  },
  checkLogsForUseAction: function checkLogsForUseAction(a, b, c) {
    if (typeof b !== "string") {
      logger(logType.err, logMap.ITANRS(a, b));
      throw new Error();
    }

    if (!(_typeof(c) === "object" || typeof c === "function")) {
      logger(logType.err, logMap.ITSROOF(a, b));
      throw new Error();
    }
  },
  checkLogsForUseContract: function checkLogsForUseContract(a, b, c, d) {
    var e = (0, _rootzCoreDev.getAllNodes)(); // if Node already exists with the name

    if (Object.prototype.hasOwnProperty.call(e, b)) {
      logger(logType.err, logMap.ITNI(a, b));
      throw new Error();
    }

    if (typeof c !== "string") {
      logger(logType.err, logMap.ITANRS(a, c));
      throw new Error();
    }

    if (!(_typeof(d) === "object" || typeof d === "function")) {
      logger(logType.err, logMap.ITSROOF(a, c));
      throw new Error();
    }
  },
  checkLogsForUseActionCallback: function checkLogsForUseActionCallback(a, b, c) {
    if (typeof b !== "string") {
      logger(logType.err, logMap.ITANRS(a, b));
      throw new Error();
    }

    if (typeof c !== "function") {
      logger(logType.err, logMap.ITCRF(a, b));
      throw new Error();
    }
  },
  checkLogsForUseContractCallback: function checkLogsForUseContractCallback(a, b, c, d) {
    var e = (0, _rootzCoreDev.getAllNodes)();

    if (Object.prototype.hasOwnProperty.call(e, c)) {
      logger(logType.err, logMap.ITNI(a, c));
      throw new Error();
    }

    if (typeof b !== "string") {
      logger(logType.err, logMap.ITANRS(a, b));
      throw new Error();
    }

    if (typeof d !== "function") {
      logger(logType.err, logMap.ITCRF(a, b));
      throw new Error();
    }
  }
};
exports.checkErr = checkErr;

/***/ }),

/***/ 424:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


function asyncGeneratorStep(a, b, c, d, e, f, g) { try { var h = a[f](g); var i = h.value; } catch (a) { c(a); return; } if (h.done) { b(i); } else { Promise.resolve(i).then(d, e); } }

function _asyncToGenerator(a) { return function () { var b = this, c = arguments; return new Promise(function (d, e) { var h = a.apply(b, c); function f(a) { asyncGeneratorStep(h, d, e, f, g, "next", a); } function g(a) { asyncGeneratorStep(h, d, e, f, g, "throw", a); } f(undefined); }); }; }

function _typeof(a) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(a) { return typeof a; }; } else { _typeof = function _typeof(a) { return a && typeof Symbol === "function" && a.constructor === Symbol && a !== Symbol.prototype ? "symbol" : typeof a; }; } return _typeof(a); }

function ownKeys(a, b) { var c = Object.keys(a); if (Object.getOwnPropertySymbols) { var d = Object.getOwnPropertySymbols(a); if (b) d = d.filter(function (b) { return Object.getOwnPropertyDescriptor(a, b).enumerable; }); c.push.apply(c, d); } return c; }

function _objectSpread(a) { for (var b = 1; b < arguments.length; b++) { var c = arguments[b] != null ? arguments[b] : {}; if (b % 2) { ownKeys(Object(c), true).forEach(function (b) { _defineProperty2(a, b, c[b]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(a, Object.getOwnPropertyDescriptors(c)); } else { ownKeys(Object(c)).forEach(function (b) { Object.defineProperty(a, b, Object.getOwnPropertyDescriptor(c, b)); }); } } return a; }

function _defineProperty2(a, b, c) { if (b in a) { Object.defineProperty(a, b, { value: c, enumerable: true, configurable: true, writable: true }); } else { a[b] = c; } return a; }

function _classCallCheck(a, b) { if (!(a instanceof b)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(a, b) { for (var c = 0; c < b.length; c++) { var d = b[c]; d.enumerable = d.enumerable || false; d.configurable = true; if ("value" in d) d.writable = true; Object.defineProperty(a, d.key, d); } }

function _createClass(a, b, c) { if (b) _defineProperties(a.prototype, b); if (c) _defineProperties(a, c); return a; }

function _inherits(a, b) { if (typeof b !== "function" && b !== null) { throw new TypeError("Super expression must either be null or a function"); } a.prototype = Object.create(b && b.prototype, { constructor: { value: a, writable: true, configurable: true } }); if (b) _setPrototypeOf(a, b); }

function _setPrototypeOf(a, b) { _setPrototypeOf = Object.setPrototypeOf || function a(b, c) { b.__proto__ = c; return b; }; return _setPrototypeOf(a, b); }

function _createSuper(a) { var b = _isNativeReflectConstruct(); return function c() { var d = _getPrototypeOf(a), e; if (b) { var f = _getPrototypeOf(this).constructor; e = Reflect.construct(d, arguments, f); } else { e = d.apply(this, arguments); } return _possibleConstructorReturn(this, e); }; }

function _possibleConstructorReturn(a, b) { if (b && ((typeof b === "undefined" ? "undefined" : _typeof(b)) === "object" || typeof b === "function")) { return b; } return _assertThisInitialized(a); }

function _assertThisInitialized(a) { if (a === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return a; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (a) { return false; } }

function _getPrototypeOf(a) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function a(b) { return b.__proto__ || Object.getPrototypeOf(b); }; return _getPrototypeOf(a); }

function _toConsumableArray(a) { return _arrayWithoutHoles(a) || _iterableToArray(a) || _unsupportedIterableToArray(a) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(a, b) { if (!a) return; if (typeof a === "string") return _arrayLikeToArray(a, b); var c = Object.prototype.toString.call(a).slice(8, -1); if (c === "Object" && a.constructor) c = a.constructor.name; if (c === "Map" || c === "Set") return Array.from(a); if (c === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(c)) return _arrayLikeToArray(a, b); }

function _iterableToArray(a) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(a)) return Array.from(a); }

function _arrayWithoutHoles(a) { if (Array.isArray(a)) return _arrayLikeToArray(a); }

function _arrayLikeToArray(a, b) { if (b == null || b > a.length) b = a.length; for (var c = 0, d = new Array(b); c < b; c++) { d[c] = a[c]; } return d; }

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.getAllNodes = exports.getProfile = exports.setProfile = exports.createNode = void 0;

var _react = _interopRequireDefault(__webpack_require__(113));

var _propTypes = _interopRequireDefault(__webpack_require__(697));

var _logs = __webpack_require__(184);

function _interopRequireDefault(a) {
  return a && a.__esModule ? a : {
    "default": a
  };
}

function _defineProperty(a, b, c) {
  if (b in a) {
    Object.defineProperty(a, b, {
      value: c,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    a[b] = c;
  }

  return a;
} // performance measure empty object for test


window.performance.measure = window.performance.measure || function () {};

var bus = {};
var store = {};

var now = function now(a) {
  return performance.measure(a);
};

var setImmutableObject = function setImmutableObject(a, b) {
  return Object.assign({}, a, b);
};

var setImmutableArray = function setImmutableArray(a, b) {
  return [].concat(_toConsumableArray(a), _toConsumableArray(b));
};

var requestUpdate = function requestUpdate(a) {
  var b = store[a]["scope"];
  var c = b["state"]["rootzStateHandlerVariable"] + 1;
  b.updater.enqueueSetState(b, {
    rootzStateHandlerVariable: c
  });
};

(0, _logs.logger)(_logs.logType.bra, "%cUse Rootz DevTools for better debugging experience: https://devtools.rootzjs.org");
now("@@APP_INIT");
/**
 * To view all the Nodes defined in the Application at any point of time
 *
 * ```js
 *      const allNodes = addProfile({ sessionId: "9694dca333f01433ecb179d32251c946" });
 * ```
 * @preserve
 * @param {typeObject} state
 * @returns {bus} void
 *
 */

var setProfile = function setProfile(a) {
  bus = setImmutableObject(bus, a);
};
/**
 * To view all the Nodes defined in the Application at any point of time
 *
 * ```js
 *      const allNodes = getAllNodes();
 * ```
 *
 * @returns {{}} Rootz.appRoot
 *
 */


exports.setProfile = setProfile;

var getAllNodes = function getAllNodes() {
  return store;
};
/**
 * Profile is similar to the concept of Bus in Networks.
 * It helps you to store application specific generic data which could be accessible at any point within the application execution.
 *
 * ```js
 *      const sessionId = getProfile()["sessionId"];
 * ```
 *
 * @returns {any} Rootz.Bus
 *
 */


exports.getAllNodes = getAllNodes;

var getProfile = function getProfile() {
  return bus;
}; // Insert Node

/**
 * @typedef {({ id: String, actions: {}, contract: {}, Component: (React.Component | React.FC) })} dispatchNodeParamType
 */

/**
 *
 * @param {dispatchNodeParamType}
 * @returns {React.PureComponent}
 */


exports.getProfile = getProfile;

var dispatchNode = function dispatchNode(a) {
  var b = a.id,
      c = a.actions,
      d = a.contract,
      e = a.Component;
  var f, g;
  var h = {};

  _logs.checkErr.checksForNodeNotFound(e, b);

  h[b] = (g = f = /*#__PURE__*/function (a) {
    _inherits(f, a);

    var g = _createSuper(f);

    function f(a) {
      var b;

      _classCallCheck(this, f);

      b = g.call(this, a);
      b.state = {
        rootzStateHandlerVariable: 0
      }; // this helps make actions static variable to be used as dependency for useEffect, useCallback and useMemo 

      b.actions = _objectSpread(_objectSpread({}, c), d);
      return b;
    }

    _createClass(f, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        now(b);
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate() {
        now(b + "_update");
      }
    }, {
      key: "render",
      value: function render() {
        var a = store[b]["state"];
        store[b]["scope"] = setImmutableObject(store[b]["scope"], this); // fetches the latest state everytime the package is called

        var c = getProfile();
        return /*#__PURE__*/_react["default"].createElement(e, {
          state: a,
          profile: c,
          props: this.props,
          actions: this.actions
        });
      }
    }]);

    return f;
  }(_react["default"].PureComponent), _defineProperty(f, "displayName", b), g);
  return h[b];
};
/**
 *
 * @param {string} id string
 * @param {(React.Component | React.FC)} Component React.Component | React.FC
 * @returns void
 */


var NodeC = function NodeC(a, b) {
  this.id = a;
  this.actions = {};
  this.contract = {};
  this.Component = b;
};
/**
 * @param {{}} state - Object of type any
 * @returns void
 */


NodeC.prototype.state = function (a) {
  _logs.checkErr.checksForStateObject(this.id, a);

  store[this.id]["state"] = setImmutableObject(store[this.id]["state"], a);
  this.state = a || {};
};
/**
 * @param {string} forNode - type NODE_ID (Node with NODE_ID should exists)
 * @param {string} actionName - type ACTIONS_ID, UPPERCASE string
 * @param {{}} newState - Object of type Node.state
 * @returns void
 */


NodeC.prototype.useContract = function (a, b, c) {
  _logs.checkErr.checkLogsForUseContract(this.id, a, b, c);

  if (_typeof(c) === "object") {
    var d = {};

    d[b] = function () {
      now("$" + b);
      store["#" + a]["state"] = setImmutableObject(store["#" + a]["state"], c);
      requestUpdate("#" + a);
    };

    store[this.id]["contract"] = setImmutableArray(store[this.id]["contract"], [b]);
    this.contract = setImmutableObject(this.contract, d);
  } else {
    this.useContractCallback(a, b, c);
  }
};
/**
 * @param {string} actionName - type ACTIONS_ID, UPPERCASE string
 * @param {{}} newState - Object of type Node.state
 * @returns void
 */


NodeC.prototype.useAction = function (a, b) {
  var c = this;

  _logs.checkErr.checkLogsForUseAction(this.id, a, b);

  if (_typeof(b) === "object") {
    var d = {};

    d[a] = function () {
      now("$" + a);
      store[c.id]["state"] = setImmutableObject(store[c.id]["state"], b);
      requestUpdate(c.id);
    };

    store[this.id]["actions"] = setImmutableArray(store[this.id]["actions"], [a]);
    this.actions = setImmutableObject(this.actions, d);
  } else if (typeof b === "function") {
    this.useActionCallback(a, b);
  }
};
/**
 * @param {string} actionName - type ACTIONS_ID, UPPERCASE string
 * @param {function} func - function returns Object of type Node.state
 * @returns void
 */


NodeC.prototype.useActionCallback = function (a, b) {
  var c = this;

  _logs.checkErr.checkLogsForUseActionCallback(this.id, a, b);

  var d = {};
  d[a] = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function d() {
    var e,
        f,
        g,
        h,
        i,
        j = arguments;
    return regeneratorRuntime.wrap(function d(k) {
      while (1) {
        switch (k.prev = k.next) {
          case 0:
            now("$" + a);
            e = store[c.id]["state"];

            for (f = j.length, g = new Array(f), h = 0; h < f; h++) {
              g[h] = j[h];
            }

            k.next = 5;
            return b(e, g);

          case 5:
            i = k.sent;
            store[c.id]["state"] = setImmutableObject(e, i);
            requestUpdate(c.id);

          case 8:
          case "end":
            return k.stop();
        }
      }
    }, d);
  }));
  store[this.id]["actions"] = setImmutableArray(store[this.id]["actions"], [a]);
  this.actions = setImmutableObject(this.actions, d);
};
/**
 * @param {string} forNode - type NODE_ID (Node with NODE_ID should exists)
 * @param {string} actionName - type ACTIONS_ID, UPPERCASE string
 * @param {function} func - function returns Object of type Node.state
 * @returns void
 */


NodeC.prototype.useContractCallback = function (a, b, c) {
  _logs.checkErr.checkLogsForUseContractCallback(this.id, b, a, c);

  var d = {};
  d[b] = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function d() {
    var e,
        f,
        g,
        h,
        i,
        j = arguments;
    return regeneratorRuntime.wrap(function d(k) {
      while (1) {
        switch (k.prev = k.next) {
          case 0:
            now("$" + b);
            e = store["#" + a]["state"];

            for (f = j.length, g = new Array(f), h = 0; h < f; h++) {
              g[h] = j[h];
            }

            k.next = 5;
            return c(e, g);

          case 5:
            i = k.sent;
            store["#" + a]["state"] = setImmutableObject(e, i);
            requestUpdate("#" + a);

          case 8:
          case "end":
            return k.stop();
        }
      }
    }, d);
  }));
  store[this.id]["contract"] = setImmutableArray(store[this.id]["contract"], [b]);
  this.actions = setImmutableObject(this.actions, d);
};
/**
 * To view all the Nodes defined in the Application at any point of time
 *
 * ```js
 *      const allNodes = addProfile({ sessionId: "9694dca333f01433ecb179d32251c946" });
 * ```
 * @param {typeObject} state
 * @returns {bus} void
 *
 */


NodeC.prototype.setProfile = function (a) {
  bus = setImmutableObject(bus, a);
};
/**
 * You can create a Node with a createNode hook which Rootz provides.
 * The createNode hook accepts a unique Id NODE_ID of type string and a Component (Functional or Class).
 * In return it provides an array of 2, first an Object **node** while the later being a HOF (*High Order Function*) **dispatchNode**.
 * > **Note**: The node object has few helper methods for creating Actions and Contract (*discussed in later examples*).
 * It holds Id, Component, State and other details of the Node.
 * Calling the dispatchNode function returns a Component (*Which basically is the passed Component with additional features*).
 *
 * ```js
 *      const [node, dispatchNode] = createNode("NodeA", ({
 *              props,
 *              state,
 *              actions,
 *              profile,
 *      }) => {
 *	        return (
 *                      {YOUR JSX ELEMENTS GOES HERE}
 *              )
 *      });
 *
 *      export const NodeA = dispatchNode(node);
 * ```
 * > ***Tips***: *Keeping the name of NODE_ID and Component same helps in better Identification.*
 * @param {string} id
 * @param {(React.Component | React.FC)} Component
 * @returns {[NodeC, dispatchNode]} [Rootz.NodeInstance, Rootz.dispatchNode]
 *
 */


var createNode = function createNode(a, b) {
  _logs.checkErr.checkLogsForCreateNode(arguments, a);

  var c = "#" + a;
  var d = new NodeC(c, b);
  store[c] = {
    actions: [],
    contract: [],
    state: {},
    scope: {}
  }; // declare store variables

  return [d, dispatchNode];
};
/**
 * Type Definitions for Dev only
 */


exports.createNode = createNode;
createNode.propTypes = {
  id: _propTypes["default"].string.isRequired,
  Component: _propTypes["default"].element.isRequired
};
NodeC.propTypes = {
  id: _propTypes["default"].string.isRequired,
  Component: _propTypes["default"].element.isRequired
};
NodeC.prototype.useContractCallback.propTypes = {
  forNode: _propTypes["default"].string.isRequired,
  actionName: _propTypes["default"].string.isRequired,
  func: _propTypes["default"].func.isRequired
};
NodeC.prototype.useActionCallback.propTypes = {
  actionName: _propTypes["default"].string.isRequired,
  func: _propTypes["default"].func.isRequired
};
NodeC.prototype.useAction.propTypes = {
  actionName: _propTypes["default"].string.isRequired,
  newState: _propTypes["default"].oneOfType([_propTypes["default"].object, _propTypes["default"].func]).isRequired
};
NodeC.prototype.useContract.propTypes = {
  forNode: _propTypes["default"].string.isRequired,
  actionName: _propTypes["default"].string.isRequired,
  newState: _propTypes["default"].oneOfType([_propTypes["default"].object, _propTypes["default"].func]).isRequired
};
NodeC.prototype.state.propTypes = {
  state: _propTypes["default"].object.isRequired
};
dispatchNode.propTypes = _propTypes["default"].shape({
  id: _propTypes["default"].string.isRequired,
  actions: _propTypes["default"].object.isRequired,
  contract: _propTypes["default"].object.isRequired,
  Component: _propTypes["default"].element.isRequired
});

/***/ }),

/***/ 703:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = __webpack_require__(414);

function emptyFunction() {}
function emptyFunctionWithReset() {}
emptyFunctionWithReset.resetWarningCache = emptyFunction;

module.exports = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    var err = new Error(
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
    err.name = 'Invariant Violation';
    throw err;
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    elementType: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim,

    checkPropTypes: emptyFunctionWithReset,
    resetWarningCache: emptyFunction
  };

  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),

/***/ 697:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (false) { var throwOnDirectAccess, ReactIs; } else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(703)();
}


/***/ }),

/***/ 414:
/***/ ((module) => {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),

/***/ 113:
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE__113__;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	__webpack_require__(424);
/******/ 	return __webpack_require__(733);
/******/ })()
;
});