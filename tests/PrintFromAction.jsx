import React from 'react';
import { createNode } from '../packages/rootz-core';

// Test to Print a text "Hello" without state
const [node, dispatchNode] =
        createNode(
                "PrintFromAction",
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
node.defineState({ text: null });
node.createAction("ON_CLICK", { text: "Hello" });

export const PrintFromAction = dispatchNode(node);