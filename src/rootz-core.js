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
import React from "react";
import PropTypes from "prop-types";
import { logMap, logger, logType } from "./logs";

logger(
        logType.bra,
        `%cUse Rootz DevTools for better debugging experience: https://devtools.rootzjs.org`
);

// performance measure empty object for test
window.performance.measure = window.performance.measure || function () { };

let bus = {};
const store = {};
const setImmutableObject = (state, newState) =>
        Object.assign({}, state, newState);
const setImmutableArray = (state, newState) => [...state, ...newState];
const requestUpdate = function (id) {
        const scope = store[id]["scope"];
        const rootzStateHandlerVariable =
                scope["state"]["rootzStateHandlerVariable"] + 1;

        scope.updater.enqueueSetState(scope, { rootzStateHandlerVariable });
};
const now = id => performance.measure(id);
now("@@APP_INIT");
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
const addProfile = function (state) {
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
const getProfile = function () {
        return bus;
};

// Insert Node
/**
 * @typedef {({ id: String, actions: {}, contract: {}, Component: (React.Component | React.FC) })} dispatchNodeParamType
 */
/**
 *
 * @param {dispatchNodeParamType}
 * @returns {React.PureComponent}
 */
const dispatchNode = ({ id, actions, contract, Component }) => {
        if (Component === null) {
                logger(logType.err, logMap.NODE_WITHOUT_COMPONENT(id));
                throw new Error();
        }
        return {
                [id]: class extends React.PureComponent {
                        constructor(props) {
                                super(props);
                                this.state = { rootzStateHandlerVariable: 0 };
                        }
                        componentDidMount() {
                                now(id);
                        }
                        componentDidUpdate() {
                                now(id + "_update");
                        }
                        render() {
                                const updatedState = store[id]["state"];
                                store[id]["scope"] = setImmutableObject(store[id]["scope"], this);
                                // fetches the latest state everytime the package is called
                                const profile = getProfile();

                                return (
                                        <Component
                                                state={updatedState}
                                                profile={profile}
                                                props={this.props}
                                                actions={{ ...actions, ...contract }}
                                        />
                                );
                        }
                }
        }[id];
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
NodeC.prototype.defineState = function (state) {
        if (typeof state !== "object") {
                logger(
                        logType.err,
                        logMap.INVALID_TYPE_IN_DEFINE_STATE_REQUIRED_OBJECT(this.id)
                );
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
NodeC.prototype.createContract = function (forNode, actionName, newState) {
        // if Node already exists with the name
        if (Object.prototype.hasOwnProperty.call(store, forNode)) {
                logger(
                        logType.err,
                        logMap.INVAID_TYPE_NODE_ID_IN_CONTRACT(this.id, forNode)
                );
                throw new Error();
        }
        if (typeof actionName !== "string") {
                logger(
                        logType.err,
                        logMap.INVALID_TYPE_IN_CREATE_CONTRACT_REQUIRED_STRING(
                                this.id,
                                actionName
                        )
                );
                throw new Error();
        }
        if (!(typeof newState === "object" || typeof newState === "function")) {
                logger(
                        logType.err,
                        logMap.INVALID_TYPE_IN_CREATE_CONTRACT_REQUIRED_OBJECT_OR_FUNCTION(
                                this.id,
                                actionName
                        )
                );
                throw new Error();
        }
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
                this.createContractCallback(forNode, actionName, newState);
        }
};

/**
 * @param {string} actionName - type ACTIONS_ID, UPPERCASE string
 * @param {{}} newState - Object of type Node.state
 * @returns void
 */
NodeC.prototype.createAction = function (actionName, newState) {
        if (typeof actionName !== "string") {
                logger(
                        logType.err,
                        logMap.INVALID_TYPE_IN_CREATE_ACTION_REQUIRED_STRING(this.id, actionName)
                );
                throw new Error();
        }
        if (!(typeof newState === "object" || typeof newState === "function")) {
                logger(
                        logType.err,
                        logMap.INVALID_TYPE_IN_CREATE_ACTION_REQUIRED_OBJECT_OR_FUNCTION(
                                this.id,
                                actionName
                        )
                );
                throw new Error();
        }
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
                this.createActionCallback(actionName, newState);
        }
};

/**
 * @param {string} actionName - type ACTIONS_ID, UPPERCASE string
 * @param {function} func - function returns Object of type Node.state
 * @returns void
 */
NodeC.prototype.createActionCallback = function (actionName, func) {
        if (typeof actionName !== "string") {
                logger(
                        logType.err,
                        logMap.INVALID_TYPE_IN_CREATEACTIONMETHODS_REQUIRED_STRING(
                                this.id,
                                actionName
                        )
                );
                throw new Error();
        }
        if (typeof func !== "function") {
                logger(
                        logType.err,
                        logMap.INVALID_TYPE_IN_CREATEACTIONMETHODS_REQUIRED_FUNCTION(
                                this.id,
                                actionName
                        )
                );
                throw new Error();
        }
        let derivedAction = {};
        derivedAction[actionName] = (...props) => {
                now("$" + actionName);
                const derivedState = func(...props);
                store[this.id]["state"] = setImmutableObject(
                        store[this.id]["state"],
                        derivedState
                );
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
NodeC.prototype.createContractCallback = function (forNode, actionName, func) {
        if (Object.prototype.hasOwnProperty.call(store, forNode)) {
                logger(
                        logType.err,
                        logMap.INVAID_TYPE_NODE_ID_IN_CONTRACT_CALLBACK(this.id, forNode)
                );
                throw new Error();
        }
        if (typeof actionName !== "string") {
                logger(
                        logType.err,
                        logMap.INVALID_TYPE_IN_CREATEACTIONMETHODS_REQUIRED_STRING(
                                this.id,
                                actionName
                        )
                );
                throw new Error();
        }
        if (typeof func !== "function") {
                logger(
                        logType.err,
                        logMap.INVALID_TYPE_IN_CREATEACTIONMETHODS_REQUIRED_FUNCTION(
                                this.id,
                                actionName
                        )
                );
                throw new Error();
        }
        let derivedContract = {};
        derivedContract[actionName] = (...props) => {
                now("$" + actionName);
                const derivedState = func(...props);
                store["#" + forNode]["state"] = setImmutableObject(
                        store["#" + forNode]["state"],
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
 * @returns {[node, dispatchNode]} [Rootz.NodeInstance, Rootz.dispatchNode]
 *
 */
const createNode = function (id, Component) {
        // if less / more arguments passed
        if (arguments.length != 2) {
                logger(logType.err, logMap.NODE_INTERFACE_LENGTH(id));
                throw new Error();
        }
        const nodeId = "#" + id;
        // if Node already exists with the name
        if (Object.prototype.hasOwnProperty.call(store, nodeId)) {
                logger(logType.err, logMap.NODE_NAME_ALREADY_EXISTS(id));
                throw new Error();
        }
        const node = new NodeC(nodeId, Component);

        store[nodeId] = {
                actions: [],
                contract: [],
                state: {},
                scope: {}
        };
        // declare store variables
        return [node, dispatchNode];
};

/**
 * Type Definitions for Dev only
 */
if (process.env.NODE_ENV === "development") {
        createNode.propTypes = {
                id: PropTypes.string.isRequired,
                Component: PropTypes.element.isRequired
        };
        NodeC.propTypes = {
                id: PropTypes.string.isRequired,
                Component: PropTypes.element.isRequired
        };
        NodeC.prototype.createContractCallback.propTypes = {
                forNode: PropTypes.string.isRequired,
                actionName: PropTypes.string.isRequired,
                func: PropTypes.func.isRequired
        };
        NodeC.prototype.createActionCallback.propTypes = {
                actionName: PropTypes.string.isRequired,
                func: PropTypes.func.isRequired
        };
        NodeC.prototype.createAction.propTypes = {
                actionName: PropTypes.string.isRequired,
                newState: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired
        };
        NodeC.prototype.createContract.propTypes = {
                forNode: PropTypes.string.isRequired,
                actionName: PropTypes.string.isRequired,
                newState: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired
        };
        NodeC.prototype.defineState.propTypes = {
                state: PropTypes.object.isRequired
        };
        dispatchNode.propTypes = PropTypes.shape({
                id: PropTypes.string.isRequired,
                actions: PropTypes.object.isRequired,
                contract: PropTypes.object.isRequired,
                Component: PropTypes.element.isRequired
        });
}

export { createNode as createNode, addProfile, getProfile, getAllNodes };
