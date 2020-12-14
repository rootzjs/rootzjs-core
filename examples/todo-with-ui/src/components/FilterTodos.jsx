import React from 'react';
import '../styles/FilterTodo.css';

export const Component = ({
        state,
        actions
}) => {
        return (
                <div className="filter-todo-container">
                        <button
                                id="0"
                                className={state.selected === "0" ? "btn-selected" : ""}
                                onClick={evt => actions.SHOW_ALL_TODOS(actions, evt.currentTarget.id)}
                        >
                                All
                        </button>
                        <button
                                id="1"
                                className={state.selected === "1" ? "btn-selected" : ""}
                                onClick={evt => actions.SHOW_ACTIVE_TODOS(actions, evt.currentTarget.id)}
                        >
                                Active
                        </button>
                        <button
                                id="2"
                                className={state.selected === "2" ? "btn-selected" : ""}
                                onClick={evt => actions.SHOW_COMPLETED_TODOS(actions, evt.currentTarget.id)}
                        >
                                Completed
                        </button>
                </div>
        );
}