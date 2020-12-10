/** @license RootzJs v2.0.7
 ** @author Trishanth Naidu
 ** @github https://github.com/rootzjs/core v2.0.7
 * react-jsx-dev-runtime.development.js
 * Copyright 2019 Trishanth Naidu
 * Copyright (c) Rootz Js,and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import {
        logMap,
        logger,
        logType,
} from './logs-min';

logger(logType.bra, `%cUse Rootz DevTools for better debugging experience: https://devtools.rootzjs.org`);

let bus = {};
const store = {};
const perf = window.performance;
const setImmutableObject = (state, newState) => Object.assign({}, state, newState);
const setImmutableArray = (state, newState) => [...state, ...newState];
const requestUpdate = function (id) {
        const scope = store[id]["scope"];
        const rootzStateHandlerVariable = scope["state"]["rootzStateHandlerVariable"] + 1;

        scope.updater.enqueueSetState(
                scope,
                { rootzStateHandlerVariable }
        );
};
const addProfile = function (state) {
        bus = setImmutableObject(bus, state);
};
const now = id => performance.measure(id);
const getAllNodes = function () { return store };
const getProfile = function () { return bus };

// performance measure empty object for test
perf.measure = perf.measure || function () { }

now("@@APP_INIT");

// Insert Node
const dispatchNode = ({
        id,
        state,
        actions,
        contract,
        updateIf,
        Component,
}) => {
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
                        shouldComponentUpdate = updateIf
                        componentDidMount() { now(id); }
                        componentDidUpdate() { now(id + "_update") }
                        render() {
                                const updatedState = store[id]["state"];
                                store[id]["scope"] = setImmutableObject(store[id]["scope"], this);
                                // fetches the latest state everytime the package is called
                                const profile = getProfile();

                                return <Component
                                        state={updatedState}
                                        profile={profile}
                                        props={this.props}
                                        actions={{ ...actions, ...contract }}
                                />
                        }
                }
        }[id];
}
// constructor Node
const NodeC = function (id, Component) {
        this.id = id;
        this.actions = {};
        this.contract = {};
        this.Component = Component;
}
NodeC.prototype.defineState = function (state) {
        if (typeof state !== "object") {
                logger(logType.err, logMap.INVALID_TYPE_IN_DEFINE_STATE_REQUIRED_OBJECT(this.id));
                throw new Error();
        }
        store[this.id]["state"] = setImmutableObject(store[this.id]["state"], state);
        this.state = state || {};
}
NodeC.prototype.createContract = function (forNode, actionName, newState) {
        // if Node already exists with the name
        if (store.hasOwnProperty(forNode)) {
                logger(logType.err, logMap.INVAID_TYPE_NODE_ID_IN_CONTRACT(this.id, forNode));
                throw new Error();
        }
        if (typeof actionName !== "string") {
                logger(logType.err, logMap.INVALID_TYPE_IN_CREATE_CONTRACT_REQUIRED_STRING(this.id, actionName));
                throw new Error();
        }
        if (!(typeof newState === "object" || typeof newState === "function")) {
                logger(logType.err, logMap.INVALID_TYPE_IN_CREATE_CONTRACT_REQUIRED_OBJECT_OR_FUNCTION(this.id, actionName));
                throw new Error();
        }
        if (typeof newState === "object") {
                let derivedContract = {};
                derivedContract[actionName] = () => {
                        now("$" + actionName);
                        store["#" + forNode]["state"] = setImmutableObject(store["#" + forNode]["state"], newState);
                        requestUpdate("#" + forNode);
                }
                store[this.id]["contract"] = setImmutableArray(store[this.id]["contract"], [actionName]);

                this.contract = setImmutableObject(this.contract, derivedContract);
        } else {
                this.createContractCallback(forNode, actionName, newState);
        }
}
NodeC.prototype.createAction = function (actionName, newState) {
        if (typeof actionName !== "string") {
                logger(logType.err, logMap.INVALID_TYPE_IN_CREATE_ACTION_REQUIRED_STRING(this.id, actionName));
                throw new Error();
        }
        if (!(typeof newState === "object" || typeof newState === "function")) {
                logger(logType.err, logMap.INVALID_TYPE_IN_CREATE_ACTION_REQUIRED_OBJECT_OR_FUNCTION(this.id, actionName));
                throw new Error();
        }
        if (typeof newState === "object") {
                let derivedAction = {};
                derivedAction[actionName] = () => {
                        now("$" + actionName);
                        store[this.id]["state"] = setImmutableObject(store[this.id]["state"], newState);
                        requestUpdate(this.id);
                }
                store[this.id]["actions"] = setImmutableArray(store[this.id]["actions"], [actionName]);

                this.actions = setImmutableObject(this.actions, derivedAction);
        } else if (typeof newState === "function") {
                this.createActionCallback(actionName, newState);
        }
}
NodeC.prototype.createActionCallback = function (actionName, func) {
        if (typeof actionName !== "string") {
                logger(logType.err, logMap.INVALID_TYPE_IN_CREATEACTIONMETHODS_REQUIRED_STRING(this.id, actionName));
                throw new Error();
        }
        if (typeof func !== "function") {
                logger(logType.err, logMap.INVALID_TYPE_IN_CREATEACTIONMETHODS_REQUIRED_FUNCTION(this.id, actionName));
                throw new Error();
        }
        let derivedAction = {};
        derivedAction[actionName] = (...props) => {
                now("$" + actionName);
                const derivedState = func(...props);
                store[this.id]["state"] = setImmutableObject(store[this.id]["state"], derivedState);
                requestUpdate(this.id);
        }
        store[this.id]["actions"] = setImmutableArray(store[this.id]["actions"], [actionName]);
        this.actions = setImmutableObject(this.actions, derivedAction);
}
NodeC.prototype.createContractCallback = function (forNode, actionName, func) {
        if (store.hasOwnProperty(forNode)) {
                logger(logType.err, logMap.INVAID_TYPE_NODE_ID_IN_CONTRACT_CALLBACK(this.id, forNode));
                throw new Error();
        }
        if (typeof actionName !== "string") {
                logger(logType.err, logMap.INVALID_TYPE_IN_CREATEACTIONMETHODS_REQUIRED_STRING(this.id, actionName));
                throw new Error();
        }
        if (typeof func !== "function") {
                logger(logType.err, logMap.INVALID_TYPE_IN_CREATEACTIONMETHODS_REQUIRED_FUNCTION(this.id, actionName));
                throw new Error();
        }
        let derivedContract = {};
        derivedContract[actionName] = (...props) => {
                now("$" + actionName);
                const derivedState = func(...props);
                store["#" + forNode]["state"] = setImmutableObject(store["#" + forNode]["state"], derivedState);
                requestUpdate("#" + forNode);
        }
        store[this.id]["contract"] = setImmutableArray(store[this.id]["contract"], [actionName]);
        this.actions = setImmutableObject(this.actions, derivedContract);
}
const createNode = function (id, Component) {
        // if less / more arguments passed
        if (arguments.length != 2) {
                logger(logType.err, logMap.NODE_INTERFACE_LENGTH(id));
                throw new Error();
        }
        const nodeId = "#" + id;
        // if Node already exists with the name
        if (store.hasOwnProperty(nodeId)) {
                logger(logType.err, logMap.NODE_NAME_ALREADY_EXISTS(id));
                throw new Error();
        }
        const node = new NodeC(nodeId, Component);

        store[nodeId] = {
                "actions": [],
                "contract": [],
                "state": {},
                "scope": {},
        };
        // declare store variables
        return [
                node,
                dispatchNode
        ]
}

export { createNode, addProfile, getProfile, getAllNodes };