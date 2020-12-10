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
export const logType = {
        inf: "info",
        bra: "brand",
        err: "error",
        war: "warning",
}
const consoleColorCode = {
        error: {
                brand: "color: #fff; font-size:12px;  border-radius: 3px; padding: 2px 7px 2px 7px; text-align: center; background-color: #f44336;",
        },
        warning: {
                brand: "color: #fff; font-size:12px;  border-radius: 3px; padding: 2px 7px 2px 7px; text-align: center; background-color: #f48e36;",
        },
        information: {
                brand: "color: #fff; font-size:12px;  border-radius: 3px; padding: 2px 7px 2px 7px; text-align: center; background-color: #38b9f4;",
        },
        branding: {
                brand: "color: #fff; font-size:12px;  border-radius: 3px; padding: 2px 7px 2px 7px; text-align: center; background-color: #677b8c;",
        }
}
export const logMap = {
        NODE_WITHOUT_COMPONENT: name => `%cRootz Error: Node ${name} should have a defined Component`,
        NODE_INTERFACE_LENGTH: name => `%cRootz Error: Node constructor ${name} requires exactly 2 argument 'id' of type string and 'Component' of type React Component`,
        NODE_NAME_ALREADY_EXISTS: name => `%cRootz Error: In '${name}', Duplicate entry found, Node Name already exists`,
        LEAF_NAME_ALREADY_EXISTS: name => `%cRootz Error: In '${name}', Duplicate entry found, Leaf Name already exists`,
        ACTIONS_ARE_NOT_FUNCTION: name => `%cRootz Error: In '${name}', Invalid type Actions, Actions should be of type function`,
        INVALID_CONTRACT_TYPE: name => `%cRootz Error: In '${name}', Contract should be a function, create a contract by 'node.defineContract' method only`,
        CONTRACTS_ARE_NOT_FUNCTION: name => `%cRootz Error: In '${name}', Invalid type Actions in Contract, Actions passed in Contract should be of type function`,
        INVALID_TYPE_IN_CREATE_ACTION_REQUIRED_STRING: (name, actionName) => `%cRootz Error: In '${name}', Invalid type arguments in createAction for '${actionName}', required String`,
        INVALID_TYPE_IN_CREATE_ACTION_REQUIRED_OBJECT: (name, actionName) => `%cRootz Error: In '${name}', Invalid type arguments in createAction for '${actionName}', required Object`,
        INVALID_TYPE_IN_CREATE_ACTION_REQUIRED_OBJECT_OR_FUNCTION: (name, actionName) => `%cRootz Error: In '${name}', Invalid type arguments in createAction for '${actionName}', required Object or a Function`,
        INVALID_TYPE_IN_CREATE_CONTRACT_REQUIRED_OBJECT_OR_FUNCTION: (name, actionName) => `%cRootz Error: In '${name}', Invalid type arguments in createContract for '${actionName}', required Object or a Function`,
        INVALID_TYPE_IN_CREATE_CONTRACT_REQUIRED_STRING: (name, actionName) => `%cRootz Error: In '${name}', Invalid type arguments in createContract for '${actionName}', required String`,
        INVALID_TYPE_IN_CREATE_CONTRACT_REQUIRED_OBJECT: (name, actionName) => `%cRootz Error: In '${name}', Invalid type arguments in createContract for '${actionName}', required Object`,
        INVALID_TYPE_IN_CREATEACTIONMETHODS_REQUIRED_STRING: (name, actionName) => `%cRootz Error: In '${name}', Invalid type arguments in createActionCallback '${actionName}', required String.`,
        INVALID_TYPE_IN_CREATECONTRACTMETHODS_REQUIRED_STRING: (name, actionName) => `%cRootz Error: In '${name}', Invalid type arguments in createContractCallback '${actionName}', required String.`,
        INVAID_TYPE_NODE_ID_IN_CONTRACT: (name, actionsName) => `%cRootz Error: In ${name}, Node name passed in createContract for '${actionsName}' does not exist, please check if it is defined`,
        INVAID_TYPE_NODE_ID_IN_CONTRACT_CALLBACK: (name, actionsName) => `%cRootz Error: In ${name}, Node name passed in createContractCallback for '${actionsName}' does not exist, please check if it is defined`,
        INVALID_TYPE_IN_CREATEACTIONMETHODS_REQUIRED_FUNCTION: (name, actionName) => `%cRootz Error: In '${name}', Invalid type arguments in createActionCallback '${actionName}', required function.`,
        INVALID_TYPE_IN_DEFINE_STATE_REQUIRED_OBJECT: (name, actionName) => `%cRootz Error: In '${name}', Invalid type arguments in defineState '${actionName}', required Object. States are of type Object only.`,
}
export const logger = (type, logMap) => {
        switch (type) {
                case logType.err: {
                        console.log(
                                logMap,
                                consoleColorCode.error.brand
                        )
                }
                case logType.war: {
                        console.log(
                                logMap,
                                consoleColorCode.warning.brand
                        )
                }
                case logType.inf: {
                        console.log(
                                logMap,
                                consoleColorCode.information.brand
                        )
                }
                case logType.bra: {
                        console.log(
                                logMap,
                                consoleColorCode.branding.brand
                        )
                }
                default: {
                        console.log(
                                logMap,
                                consoleColorCode.information.brand
                        )
                }
        }
}

