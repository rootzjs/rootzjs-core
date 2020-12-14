import { createNode } from '@rootzjs/core';
import { Component } from '../components/TodoList';

const [node, dispatchNode] = createNode("TodoList", Component);

node.state({
        todos: [],
        visibilityFilter: "ALL",
});

node.useAction(
        "SET_VISIBIITY_FILTER",
        (state, [todoName]) => {
                const todos = state.todos.map(
                        todo => todo.name === todoName ?
                                { ...todo, isCompleted: !todo.isCompleted }
                                :
                                todo
                );

                return { todos }
        }
)
export const TodoList = dispatchNode(node);
