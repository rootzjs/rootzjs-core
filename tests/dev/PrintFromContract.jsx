import React from 'react';
import { createNode } from '../../dist/rootz-core.dev';

// Test to Print a text "Hello" through contract
const [node, dispatchNode] =
        createNode(
                "PrintFromContract",
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
node.state({ text: null });
node.useContract("PrintFromContract", "ON_CLICK", { text: "Hello" });

export const PrintFromContract = dispatchNode(node);