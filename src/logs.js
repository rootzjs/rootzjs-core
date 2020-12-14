export const logType = {
        inf: "info",
        bra: "brand",
        err: "error",
        war: "warning"
};
const consoleColorCode = {
        error: {
                brand:
                        "color: #fff; font-size:12px;  border-radius: 3px; padding: 2px 7px 2px 7px; text-align: center; background-color: #f44336;"
        },
        warning: {
                brand:
                        "color: #fff; font-size:12px;  border-radius: 3px; padding: 2px 7px 2px 7px; text-align: center; background-color: #f48e36;"
        },
        information: {
                brand:
                        "color: #fff; font-size:12px;  border-radius: 3px; padding: 2px 7px 2px 7px; text-align: center; background-color: #38b9f4;"
        },
        branding: {
                brand:
                        "color: #fff; font-size:12px;  border-radius: 3px; padding: 2px 7px 2px 7px; text-align: center; background-color: #677b8c;"
        }
};
export const logMap = {
        // Node Not Found
        NNF: name =>
                `%cRootz Error: Node ${name} should have a defined Component`,

        // Invalid Number Of Arguments
        INOA: name =>
                `%cRootz Error: Node constructor ${name} requires exactly 2 argument 'id' of type string and 'Component' of type React Component`,

        // Duplicate Entry Node Id
        DENI: name =>
                `%cRootz Error: In '${name}', Duplicate entry found, Node Name already exists`,

        // Invalid type State Required Object Or Fucntion
        ITSROOF: (name, actionName) =>
                `%cRootz Error: In '${name}', Invalid type arguments in useActionFor for '${actionName}', required Object or a Function`,

        // Invalid type Action Name Required String
        ITANRS: (name, actionName) =>
                `%cRootz Error: In '${name}', Invalid type arguments for '${actionName}', required String`,

        // Invalid type Node ID
        ITNI: (name, actionsName) =>
                `%cRootz Error: In ${name}, Node name passed for '${actionsName}' does not exist, please check if it is defined`,

        // Invalid type Callback Required Function 
        ITCRF: (name, actionName) =>
                `%cRootz Error: In '${name}', Invalid type arguments '${actionName}', required function.`,

        // Invalid type State Required Object
        ITSRO: (name, actionName) =>
                `%cRootz Error: In '${name}', Invalid type arguments in '${actionName}', required Object. States are of type Object only.`,
};
export const logger = (type, logMap) => {
        switch (type) {
                case logType.err: {
                        console.log(logMap, consoleColorCode.error.brand);
                        break;
                }
                case logType.war: {
                        console.log(logMap, consoleColorCode.warning.brand);
                        break;
                }
                case logType.inf: {
                        console.log(logMap, consoleColorCode.information.brand);
                        break;
                }
                case logType.bra: {
                        console.log(logMap, consoleColorCode.branding.brand);
                        break;
                }
                default: {
                        console.log(logMap, consoleColorCode.information.brand);
                }
        }
};
