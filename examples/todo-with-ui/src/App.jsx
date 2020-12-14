import React from 'react';

// Import Modules
import { AddTodo } from './nodes/AddTodo';
import { TodoList } from './nodes/TodoList';
import { FilterTodos } from './nodes/FilterTodos';

// Import Styles
import './App.css';

export const TodoApp = () => {
      return (
            <div className="todo-root">
                  <div className="todo-container">
                        <AddTodo />
                        <TodoList />
                        <FilterTodos />
                  </div>
            </div>
      );
}