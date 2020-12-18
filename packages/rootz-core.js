/** @license RootzJs v2.0.20
 ** @author Trishanth Naidu
 ** @github https://github.com/rootzjs/core v2.0.20
 * react-jsx-dev-runtime.development.js
 * Copyright 2019 Trishanth Naidu
 * Copyright (c) Rootz Js,and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
        value: true
});
exports.getAllNodes = exports.getProfile = exports.setProfile = exports.createNode = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// performance measure empty object for test
window.performance.measure = window.performance.measure || function () { };

let bus = {};
const store = {};
const isDev = process.env.NODE_ENV === "development";

const now = id => performance.measure(id);

const setImmutableObject = (state, newState) => Object.assign({}, state, newState);

const setImmutableArray = (state, newState) => [...state, ...newState];

const requestUpdate = function (id) {
        const scope = store[id]["scope"];
        const rootzStateHandlerVariable = scope["state"]["rootzStateHandlerVariable"] + 1;
        scope.updater.enqueueSetState(scope, {
                rootzStateHandlerVariable
        });
};

now("@@APP_INIT"); // Dynamic import of modules based on Env

if (isDev) {
        Promise.resolve().then(() => _interopRequireWildcard(require("./logs"))).then(module => {
                const {
                        logMap,
                        logger,
                        logType
                } = module;
                logger(logType.bra, `%cUse Rootz DevTools for better debugging experience: https://devtools.rootzjs.org`);
        });
}
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


const setProfile = function (state) {
        bus = setImmutableObject(bus, state);
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

const getAllNodes = function () {
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

const getProfile = function () {
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

const dispatchNode = ({
        id,
        actions,
        contract,
        Component
}) => {
        let C = {};

        if (Component === null) {
                logger(logType.err, logMap.NNF(id));
                throw new Error();
        }

        C[id] = class extends _react.default.PureComponent {
                constructor(props) {
                        super(props);
                        this.state = {
                                rootzStateHandlerVariable: 0
                        };
                }

                componentDidMount() {
                        now(id);
                }

                componentDidUpdate() {
                        now(id + "_update");
                }

                render() {
                        const updatedState = store[id]["state"];
                        store[id]["scope"] = setImmutableObject(store[id]["scope"], this); // fetches the latest state everytime the package is called

                        const profile = getProfile();
                        return /*#__PURE__*/_react.default.createElement(Component, {
                                state: updatedState,
                                profile: profile,
                                props: this.props,
                                actions: {
                                        ...actions,
                                        ...contract
                                }
                        });
                }

        };
        return C[id];
};
/**
 *
 * @param {string} id string
 * @param {(React.Component | React.FC)} Component React.Component | React.FC
 * @returns void
 */


const NodeC = function (id, Component) {
        this.id = id;
        this.actions = {};
        this.contract = {};
        this.Component = Component;
};
/**
 * @param {{}} state - Object of type any
 * @returns void
 */


NodeC.prototype.state = function (state) {
        if (typeof state !== "object") {
                logger(logType.err, logMap.ITSRO(this.id));
                throw new Error();
        }

        store[this.id]["state"] = setImmutableObject(store[this.id]["state"], state);
        this.state = state || {};
};
/**
 * @param {string} forNode - type NODE_ID (Node with NODE_ID should exists)
 * @param {string} actionName - type ACTIONS_ID, UPPERCASE string
 * @param {{}} newState - Object of type Node.state
 * @returns void
 */


NodeC.prototype.useContract = function (forNode, actionName, newState) {
        if (isDev) {
                // if Node already exists with the name
                if (Object.prototype.hasOwnProperty.call(store, forNode)) {
                        logger(logType.err, logMap.ITNI(this.id, forNode));
                        throw new Error();
                }

                if (typeof actionName !== "string") {
                        logger(logType.err, logMap.ITANRS(this.id, actionName));
                        throw new Error();
                }

                if (!(typeof newState === "object" || typeof newState === "function")) {
                        logger(logType.err, logMap.ITSROOF(this.id, actionName));
                        throw new Error();
                }
        }

        if (typeof newState === "object") {
                let derivedContract = {};

                derivedContract[actionName] = () => {
                        now("$" + actionName);
                        store["#" + forNode]["state"] = setImmutableObject(store["#" + forNode]["state"], newState);
                        requestUpdate("#" + forNode);
                };

                store[this.id]["contract"] = setImmutableArray(store[this.id]["contract"], [actionName]);
                this.contract = setImmutableObject(this.contract, derivedContract);
        } else {
                this.useContractCallback(forNode, actionName, newState);
        }
};
/**
 * @param {string} actionName - type ACTIONS_ID, UPPERCASE string
 * @param {{}} newState - Object of type Node.state
 * @returns void
 */


NodeC.prototype.useAction = function (actionName, newState) {
        if (isDev) {
                if (typeof actionName !== "string") {
                        logger(logType.err, logMap.ITANRS(this.id, actionName));
                        throw new Error();
                }

                if (!(typeof newState === "object" || typeof newState === "function")) {
                        logger(logType.err, logMap.ITSROOF(this.id, actionName));
                        throw new Error();
                }
        }

        if (typeof newState === "object") {
                let derivedAction = {};

                derivedAction[actionName] = () => {
                        now("$" + actionName);
                        store[this.id]["state"] = setImmutableObject(store[this.id]["state"], newState);
                        requestUpdate(this.id);
                };

                store[this.id]["actions"] = setImmutableArray(store[this.id]["actions"], [actionName]);
                this.actions = setImmutableObject(this.actions, derivedAction);
        } else if (typeof newState === "function") {
                this.useActionCallback(actionName, newState);
        }
};
/**
 * @param {string} actionName - type ACTIONS_ID, UPPERCASE string
 * @param {function} func - function returns Object of type Node.state
 * @returns void
 */


NodeC.prototype.useActionCallback = function (actionName, func) {
        if (isDev) {
                if (typeof actionName !== "string") {
                        logger(logType.err, logMap.ITANRS(this.id, actionName));
                        throw new Error();
                }

                if (typeof func !== "function") {
                        logger(logType.err, logMap.ITCRF(this.id, actionName));
                        throw new Error();
                }
        }

        let derivedAction = {};

        derivedAction[actionName] = (...props) => {
                now("$" + actionName);
                const selfState = store[this.id]["state"];
                const derivedState = func(selfState, props);
                store[this.id]["state"] = setImmutableObject(selfState, derivedState);
                requestUpdate(this.id);
        };

        store[this.id]["actions"] = setImmutableArray(store[this.id]["actions"], [actionName]);
        this.actions = setImmutableObject(this.actions, derivedAction);
};
/**
 * @param {string} forNode - type NODE_ID (Node with NODE_ID should exists)
 * @param {string} actionName - type ACTIONS_ID, UPPERCASE string
 * @param {function} func - function returns Object of type Node.state
 * @returns void
 */


NodeC.prototype.useContractCallback = function (forNode, actionName, func) {
        if (isDev) {
                if (Object.prototype.hasOwnProperty.call(store, forNode)) {
                        logger(logType.err, logMap.ITNI(this.id, forNode));
                        throw new Error();
                }

                if (typeof actionName !== "string") {
                        logger(logType.err, logMap.ITANRS(this.id, actionName));
                        throw new Error();
                }

                if (typeof func !== "function") {
                        logger(logType.err, logMap.ITCRF(this.id, actionName));
                        throw new Error();
                }
        }

        let derivedContract = {};

        derivedContract[actionName] = (...props) => {
                now("$" + actionName);
                const calleeState = store["#" + forNode]["state"];
                const derivedState = func(calleeState, props);
                store["#" + forNode]["state"] = setImmutableObject(calleeState, derivedState);
                requestUpdate("#" + forNode);
        };

        store[this.id]["contract"] = setImmutableArray(store[this.id]["contract"], [actionName]);
        this.actions = setImmutableObject(this.actions, derivedContract);
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


NodeC.prototype.setProfile = function (newState) {
        bus = setImmutableObject(bus, newState);
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


const createNode = function (id, Component) {
        // if less / more arguments passed
        if (isDev && arguments.length != 2) {
                logger(logType.err, logMap.INOA(id));
                throw new Error();
        }

        const nodeId = "#" + id; // if Node already exists with the name

        if (Object.prototype.hasOwnProperty.call(store, nodeId)) {
                logger(logType.err, logMap.DENI(id));
                throw new Error();
        }

        const node = new NodeC(nodeId, Component);
        store[nodeId] = {
                actions: [],
                contract: [],
                state: {},
                scope: {}
        }; // declare store variables

        return [node, dispatchNode];
};

exports.createNode = createNode;