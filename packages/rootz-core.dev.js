"use strict";

Object.defineProperty(exports, "__esModule", {
        value: true
});
exports.getAllNodes = exports.getProfile = exports.setProfile = exports.createNode = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _logsDev = require("./logs-dev");

function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
}

function _defineProperty(obj, key, value) {
        if (key in obj) {
                Object.defineProperty(obj, key, {
                        value: value,
                        enumerable: true,
                        configurable: true,
                        writable: true
                });
        } else {
                obj[key] = value;
        }
        return obj;
}

// performance measure empty object for test
window.performance.measure = window.performance.measure || function () { };

let bus = {};
let store = {};

const now = (id) => performance.measure(id);

const setImmutableObject = (state, newState) =>
        Object.assign({}, state, newState);

const setImmutableArray = (state, newState) => [...state, ...newState];

const requestUpdate = function (id) {
        const scope = store[id]["scope"];
        const rootzStateHandlerVariable =
                scope["state"]["rootzStateHandlerVariable"] + 1;
        scope.updater.enqueueSetState(scope, {
                rootzStateHandlerVariable
        });
};

(0, _logsDev.logger)(
        _logsDev.logType.bra,
        `%cUse Rootz DevTools for better debugging experience: https://devtools.rootzjs.org`
);
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

const dispatchNode = ({ id, actions, contract, Component }) => {
        var _class, _temp;

        let C = {};

        _logsDev.checkErr.checksForNodeNotFound(Component, id);

        C[id] =
                ((_temp = _class = class extends _react.default.PureComponent {
                        constructor(props) {
                                super(props);
                                this.state = {
                                        rootzStateHandlerVariable: 0
                                }; // this helps make actions static variable to be used as dependency for useEffect, useCallback and useMemo

                                this.actions = { ...actions, ...contract };
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
                                return /*#__PURE__*/ _react.default.createElement(Component, {
                                        state: updatedState,
                                        profile: profile,
                                        props: this.props,
                                        actions: this.actions
                                });
                        }
                }),
                        _defineProperty(_class, "displayName", id),
                        _temp);
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
        _logsDev.checkErr.checksForStateObject(this.id, state);

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
        _logsDev.checkErr.checkLogsForUseContract(
                this.id,
                forNode,
                actionName,
                newState
        );

        if (typeof newState === "object") {
                let derivedContract = {};

                derivedContract[actionName] = () => {
                        now("$" + actionName);
                        store["#" + forNode]["state"] = setImmutableObject(
                                store["#" + forNode]["state"],
                                newState
                        );
                        requestUpdate("#" + forNode);
                };

                store[this.id]["contract"] = setImmutableArray(store[this.id]["contract"], [
                        actionName
                ]);
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
        _logsDev.checkErr.checkLogsForUseAction(this.id, actionName, newState);

        if (typeof newState === "object") {
                let derivedAction = {};

                derivedAction[actionName] = () => {
                        now("$" + actionName);
                        store[this.id]["state"] = setImmutableObject(
                                store[this.id]["state"],
                                newState
                        );
                        requestUpdate(this.id);
                };

                store[this.id]["actions"] = setImmutableArray(store[this.id]["actions"], [
                        actionName
                ]);
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
        _logsDev.checkErr.checkLogsForUseActionCallback(this.id, actionName, func);

        let derivedAction = {};

        derivedAction[actionName] = async (...props) => {
                now("$" + actionName);
                const selfState = store[this.id]["state"];
                const derivedState = await func(selfState, props);
                store[this.id]["state"] = setImmutableObject(selfState, derivedState);
                requestUpdate(this.id);
        };

        store[this.id]["actions"] = setImmutableArray(store[this.id]["actions"], [
                actionName
        ]);
        this.actions = setImmutableObject(this.actions, derivedAction);
};
/**
 * @param {string} forNode - type NODE_ID (Node with NODE_ID should exists)
 * @param {string} actionName - type ACTIONS_ID, UPPERCASE string
 * @param {function} func - function returns Object of type Node.state
 * @returns void
 */

NodeC.prototype.useContractCallback = function (forNode, actionName, func) {
        _logsDev.checkErr.checkLogsForUseContractCallback(
                this.id,
                actionName,
                forNode,
                func
        );

        let derivedContract = {};

        derivedContract[actionName] = async (...props) => {
                now("$" + actionName);
                const calleeState = store["#" + forNode]["state"];
                const derivedState = await func(calleeState, props);
                store["#" + forNode]["state"] = setImmutableObject(
                        calleeState,
                        derivedState
                );
                requestUpdate("#" + forNode);
        };

        store[this.id]["contract"] = setImmutableArray(store[this.id]["contract"], [
                actionName
        ]);
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
        _logsDev.checkErr.checkLogsForCreateNode(arguments, id);

        const nodeId = "#" + id;
        const node = new NodeC(nodeId, Component);
        store[nodeId] = {
                actions: [],
                contract: [],
                state: {},
                scope: {}
        }; // declare store variables

        return [node, dispatchNode];
};
/**
 * Type Definitions for Dev only
 */

exports.createNode = createNode;
createNode.propTypes = {
        id: _propTypes.default.string.isRequired,
        Component: _propTypes.default.element.isRequired
};
NodeC.propTypes = {
        id: _propTypes.default.string.isRequired,
        Component: _propTypes.default.element.isRequired
};
NodeC.prototype.useContractCallback.propTypes = {
        forNode: _propTypes.default.string.isRequired,
        actionName: _propTypes.default.string.isRequired,
        func: _propTypes.default.func.isRequired
};
NodeC.prototype.useActionCallback.propTypes = {
        actionName: _propTypes.default.string.isRequired,
        func: _propTypes.default.func.isRequired
};
NodeC.prototype.useAction.propTypes = {
        actionName: _propTypes.default.string.isRequired,
        newState: _propTypes.default.oneOfType([
                _propTypes.default.object,
                _propTypes.default.func
        ]).isRequired
};
NodeC.prototype.useContract.propTypes = {
        forNode: _propTypes.default.string.isRequired,
        actionName: _propTypes.default.string.isRequired,
        newState: _propTypes.default.oneOfType([
                _propTypes.default.object,
                _propTypes.default.func
        ]).isRequired
};
NodeC.prototype.state.propTypes = {
        state: _propTypes.default.object.isRequired
};
dispatchNode.propTypes = _propTypes.default.shape({
        id: _propTypes.default.string.isRequired,
        actions: _propTypes.default.object.isRequired,
        contract: _propTypes.default.object.isRequired,
        Component: _propTypes.default.element.isRequired
});
