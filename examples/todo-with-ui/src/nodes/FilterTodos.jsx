import { createNode } from '@rootzjs/core';
import { Component } from '../components/FilterTodos';

const [node, dispatchNode] = createNode("FilterTodos", Component);
node.state({
        selected: "0"
});
node.useContract(
        "TodoList",
        "SHOW_ALL_TODOS",
        (state, [actions, id]) => {
                actions.UPDATE_SELECTED(id);
                return {
                        visibilityFilter: "ALL"
                }
        }
);
node.useContract(
        "TodoList",
        "SHOW_ACTIVE_TODOS",
        (state, [actions, id]) => {
                actions.UPDATE_SELECTED(id);
                return {
                        visibilityFilter: "ACTIVE"
                }
        }
);
node.useContract(
        "TodoList",
        "SHOW_COMPLETED_TODOS",
        (state, [actions, id]) => {
                actions.UPDATE_SELECTED(id);
                return {
                        visibilityFilter: "COMPLETED"
                }
        }
);
node.useAction(
        "UPDATE_SELECTED",
        (state, [selected]) => ({ selected })
)

export const FilterTodos = dispatchNode(node);
