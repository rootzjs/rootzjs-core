import React from 'react';
import { createNode } from '../src/rootz-core';

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
node.defineState({ text: "Hello" });

export const PrintFromState = dispatchNode(node);