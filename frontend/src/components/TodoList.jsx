import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos }) => (
  <ul className="flex flex-wrap gap-4 justify-center">
    {todos.map(todo => (
      <TodoItem key={todo._id} todo={todo} />
    ))}
  </ul>
);

export default TodoList;


