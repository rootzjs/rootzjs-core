"use strict";

Object.defineProperty(exports, "__esModule", {
        value: true
});
exports.checkErr = exports.logger = exports.logType = void 0;

var _rootzCoreDev = require("./rootz-core-dev");

const logType = {
        inf: "info",
        bra: "brand",
        err: "error",
        war: "warning"
};
exports.logType = logType;
const consoleColorCode = {
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
const logMap = {
        // Node Not Found
        NNF: name => `%cRootz Error: Node ${name} should have a defined Component`,
        // Invalid Number Of Arguments
        INOA: name => `%cRootz Error: Node constructor ${name} requires exactly 2 argument 'id' of type string and 'Component' of type React Component`,
        // Duplicate Entry Node Id
        DENI: name => `%cRootz Error: In '${name}', Duplicate entry found, Node Name already exists`,
        // Invalid type State Required Object Or Fucntion
        ITSROOF: (name, actionName) => `%cRootz Error: In '${name}', Invalid type arguments in useActionFor for '${actionName}', required Object or a Function`,
        // Invalid type Action Name Required String
        ITANRS: (name, actionName) => `%cRootz Error: In '${name}', Invalid type arguments for '${actionName}', required String`,
        // Invalid type Node ID
        ITNI: (name, actionsName) => `%cRootz Error: In ${name}, Node name passed for '${actionsName}' does not exist, please check if it is defined`,
        // Invalid type Callback Required Function 
        ITCRF: (name, actionName) => `%cRootz Error: In '${name}', Invalid type arguments '${actionName}', required function.`,
        // Invalid type State Required Object
        ITSRO: (name, actionName) => `%cRootz Error: In '${name}', Invalid type arguments in '${actionName}', required Object. States are of type Object only.`
};

const logger = (type, logMap) => {
        switch (type) {
                case logType.err:
                        {
                                console.log(logMap, consoleColorCode.error.brand);
                                break;
                        }

                case logType.war:
                        {
                                console.log(logMap, consoleColorCode.warning.brand);
                                break;
                        }

                case logType.inf:
                        {
                                console.log(logMap, consoleColorCode.information.brand);
                                break;
                        }

                case logType.bra:
                        {
                                console.log(logMap, consoleColorCode.branding.brand);
                                break;
                        }

                default:
                        {
                                console.log(logMap, consoleColorCode.information.brand);
                        }
        }
};

exports.logger = logger;
const checkErr = {
        checksForStateObject: (id, state) => {
                if (typeof state !== "object") {
                        logger(logType.err, logMap.ITSRO(id));
                        throw new Error();
                }
        },
        checksForNodeNotFound: (Component, id) => {
                if (Component === null) {
                        logger(logType.err, logMap.NNF(id));
                        throw new Error();
                }
        },
        checkLogsForCreateNode: (args, id) => {
                const store = (0, _rootzCoreDev.getAllNodes)(); // if less / more arguments passed

                if (args.length != 2) {
                        logger(logType.err, logMap.INOA(id));
                        throw new Error();
                } // if Node already exists with the name


                if (Object.prototype.hasOwnProperty.call(store, "#" + id)) {
                        logger(logType.err, logMap.DENI(id));
                        throw new Error();
                }
        },
        checkLogsForUseAction: (id, actionName, newState) => {
                if (typeof actionName !== "string") {
                        logger(logType.err, logMap.ITANRS(id, actionName));
                        throw new Error();
                }

                if (!(typeof newState === "object" || typeof newState === "function")) {
                        logger(logType.err, logMap.ITSROOF(id, actionName));
                        throw new Error();
                }
        },
        checkLogsForUseContract: (id, forNode, actionName, newState) => {
                const store = (0, _rootzCoreDev.getAllNodes)(); // if Node already exists with the name

                if (Object.prototype.hasOwnProperty.call(store, forNode)) {
                        logger(logType.err, logMap.ITNI(id, forNode));
                        throw new Error();
                }

                if (typeof actionName !== "string") {
                        logger(logType.err, logMap.ITANRS(id, actionName));
                        throw new Error();
                }

                if (!(typeof newState === "object" || typeof newState === "function")) {
                        logger(logType.err, logMap.ITSROOF(id, actionName));
                        throw new Error();
                }
        },
        checkLogsForUseActionCallback: (id, actionName, func) => {
                if (typeof actionName !== "string") {
                        logger(logType.err, logMap.ITANRS(id, actionName));
                        throw new Error();
                }

                if (typeof func !== "function") {
                        logger(logType.err, logMap.ITCRF(id, actionName));
                        throw new Error();
                }
        },
        checkLogsForUseContractCallback: (id, actionName, forNode, func) => {
                const store = (0, _rootzCoreDev.getAllNodes)();

                if (Object.prototype.hasOwnProperty.call(store, forNode)) {
                        logger(logType.err, logMap.ITNI(id, forNode));
                        throw new Error();
                }

                if (typeof actionName !== "string") {
                        logger(logType.err, logMap.ITANRS(id, actionName));
                        throw new Error();
                }

                if (typeof func !== "function") {
                        logger(logType.err, logMap.ITCRF(id, actionName));
                        throw new Error();
                }
        }
};
exports.checkErr = checkErr;