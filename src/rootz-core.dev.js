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
import { checkErr, logger, logType } from "./logs-dev";

// performance measure empty object for test
window.performance.measure = window.performance.measure || function () { };

let bus = {};
let store = {};
const now = id => performance.measure(id);
const setImmutableObject = (state, newState) =>
        Object.assign({}, state, newState);
const setImmutableArray = (state, newState) => [...state, ...newState];
const requestUpdate = function (id) {
        const scope = store[id]["scope"];
        const rootzStateHandlerVariable =
                scope["state"]["rootzStateHandlerVariable"] + 1;

        scope.updater.enqueueSetState(scope, { rootzStateHandlerVariable });
};

logger(
        logType.bra,
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
        let C = {};
        checkErr.checksForNodeNotFound(Component, id);
        C[id] = class extends React.PureComponent {
                static displayName = id;
                constructor(props) {
                        super(props);
                        this.state = { rootzStateHandlerVariable: 0 };
                        // this helps make actions static variable to be used as dependency for useEffect, useCallback and useMemo 
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
                        store[id]["scope"] = setImmutableObject(store[id]["scope"], this);
                        // fetches the latest state everytime the package is called
                        const profile = getProfile();

                        return (
                                <Component
                                        state={updatedState}
                                        profile={profile}
                                        props={this.props}
                                        actions={this.actions}
                                />
                        );
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
        checkErr.checksForStateObject(this.id, state);
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
        checkErr.checkLogsForUseContract(this.id, forNode, actionName, newState);
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
        checkErr.checkLogsForUseAction(this.id, actionName, newState);
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
        checkErr.checkLogsForUseActionCallback(this.id, actionName, func);
        let derivedAction = {};
        derivedAction[actionName] = async (...props) => {
                now("$" + actionName);
                const selfState = store[this.id]["state"];
                const derivedState = await func(selfState, props);
                store[this.id]["state"] = setImmutableObject(
                        selfState,
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
NodeC.prototype.useContractCallback = function (forNode, actionName, func) {
        checkErr.checkLogsForUseContractCallback(this.id, actionName, forNode, func);
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
        checkErr.checkLogsForCreateNode(arguments, id);
        const nodeId = "#" + id;
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
createNode.propTypes = {
        id: PropTypes.string.isRequired,
        Component: PropTypes.element.isRequired
};
NodeC.propTypes = {
        id: PropTypes.string.isRequired,
        Component: PropTypes.element.isRequired
};
NodeC.prototype.useContractCallback.propTypes = {
        forNode: PropTypes.string.isRequired,
        actionName: PropTypes.string.isRequired,
        func: PropTypes.func.isRequired
};
NodeC.prototype.useActionCallback.propTypes = {
        actionName: PropTypes.string.isRequired,
        func: PropTypes.func.isRequired
};
NodeC.prototype.useAction.propTypes = {
        actionName: PropTypes.string.isRequired,
        newState: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired
};
NodeC.prototype.useContract.propTypes = {
        forNode: PropTypes.string.isRequired,
        actionName: PropTypes.string.isRequired,
        newState: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired
};
NodeC.prototype.state.propTypes = {
        state: PropTypes.object.isRequired
};
dispatchNode.propTypes = PropTypes.shape({
        id: PropTypes.string.isRequired,
        actions: PropTypes.object.isRequired,
        contract: PropTypes.object.isRequired,
        Component: PropTypes.element.isRequired
});

export { createNode, setProfile, getProfile, getAllNodes };