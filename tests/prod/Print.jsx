import React from 'react';
import { createNode } from '../../dist/rootz-core.prod';

// Test to Print a text "Hello" without state
const [node, dispatchNode] =
        createNode(
                "Print",
                function ({
                        state
                }) {
                        return (
                                <p>Hello</p>
                        )
                }
        );

export const Print = dispatchNode(node);