import React from 'react';
import '../styles/TodoList.css';

export const Component = ({
        state,
        actions,
}) => {
        let todos = [];
        let message = "";
        switch (state.visibilityFilter) {
                case "ALL": {
                        todos = state.todos.filter(todo => todo);
                        todos.length === 0 && (message = "There are no Todos added yet");
                        break;
                }
                case "ACTIVE": {
                        todos = state.todos.filter(todo => !todo.isCompleted);
                        todos.length === 0 && (message = "It seems, you have conquered all");
                        break;
                }
                case "COMPLETED": {
                        todos = state.todos.filter(todo => todo.isCompleted);
                        todos.length === 0 && (message = "It seems, You haven't completed any");
                        break;
                }
                default: {
                        todos = state.todos.filter(todo => todo);
                }
        }
        return (
                <div className="todo-list-container">
                        {
                                todos.length > 0 ?
                                        todos.map((todo, i) =>
                                                <div
                                                        key={todo.name + i}
                                                        className="todos-list"
                                                >
                                                        <label
                                                                htmlFor={todo.name + i}
                                                                className={`todo ${todo.isCompleted && "todo-completed"}`}
                                                        >
                                                                {todo.name}
                                                                <input
                                                                        type="checkbox"
                                                                        id={todo.name + i}
                                                                        checked={todo.isCompleted}
                                                                        className="todo-checkbox"
                                                                        onChange={() => actions.SET_VISIBIITY_FILTER(todo.name)}
                                                                />
                                                                <span className="checkmark"></span>
                                                        </label>

                                                </div>
                                        ) :
                                        <div className="todo-empty-message">{message}</div>
                        }
                </div>
        );
}