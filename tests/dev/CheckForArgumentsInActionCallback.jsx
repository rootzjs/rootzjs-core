import React from 'react';
import { createNode } from '../../dist/rootz-core.prod';

// Test to Print a text "Hello" without state
const [node, dispatchNode] = createNode(
        "CheckForArgumentsInActionCallback",
        function ({
                state,
                actions
        }) {
                return (
                        <React.Fragment>
                                <p>{state.text}</p>
                                <button data-testid="btn-test" onClick={() => actions.ON_CLICK("Hello")}>Click</button>
                        </React.Fragment>
                )
        }
);
node.state({ text: null });
node.useActionCallback("ON_CLICK", (state, [args]) => ({ text: args }));

export const CheckForArgumentsInActionCallback = dispatchNode(node);