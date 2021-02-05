import React from 'react';
import { createNode } from '../../dist/rootz-core.dev';

// Test to Print a text "Hello" without state
const [node, dispatchNode] =
        createNode(
                "PrintFromState",
                function ({
                        state
                }) {
                        return (
                                <p>{state.text}</p>
                        )
                }
        );
node.state({ text: "Hello" });

export const PrintFromState = dispatchNode(node);