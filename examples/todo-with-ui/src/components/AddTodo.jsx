import React from 'react';
import '../styles/AddTodo.css';

let inputRef = null;
export const Component = ({
        actions
}) => {
        return (
                <div className="add-todo-container">
                        <input
                                type="text"
                                className="add-todo-input"
                                placeholder="What have you planned to do today ?"
                                ref={ref => { inputRef = ref }}
                                onKeyUp={evt => {
                                        if (evt.keyCode === 13 || evt.which === 13) {
                                                actions.ADD_TODO(inputRef);
                                                inputRef.value = "";
                                                inputRef.focus();
                                        }
                                }}
                        />
                        <button
                                className="add-todo-btn"
                                onClick={() => {
                                        actions.ADD_TODO(inputRef);
                                        inputRef.value = "";
                                        inputRef.focus();
                                }}
                        >
                                Add
                        </button>
                </div>
        );
}