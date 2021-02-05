import React from 'react';
import { createNode } from '../../dist/rootz-core.prod';

// Test to Print a text "Hello" without state
const [node, dispatchNode] =
        createNode(
                "CheckForStateInActionCallback",
                function ({
                        state,
                        actions
                }) {
                        return (
                                <React.Fragment>
                                        <p>{state.text}</p>
                                        <button data-testid="btn-test" onClick={actions.ON_CLICK}>Click</button>
                                </React.Fragment>
                        )
                }
        );
node.state({ checkFlag: true, text: "Not Available" });
node.useActionCallback("ON_CLICK", (state,) => {
        if (state && state.checkFlag)
                return { text: "Hello" }
        else
                return { text: "Hello" }
});

export const CheckForStateInActionCallback = dispatchNode(node);