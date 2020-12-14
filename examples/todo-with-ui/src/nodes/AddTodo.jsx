import { createNode } from '@rootzjs/core';
import { Component } from '../components/AddTodo';

const [node, dispatchNode] = createNode("AddTodo", Component);

node.useContract(
        "TodoList",
        "ADD_TODO",
        (state, [inputRef]) => {
                return {
                        todos: [
                                ...state.todos,
                                {
                                        name: inputRef.value,
                                        isCompleted: false,
                                }
                        ]
                }
        }
);
export const AddTodo = dispatchNode(node);
