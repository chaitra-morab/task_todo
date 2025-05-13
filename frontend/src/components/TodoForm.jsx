import React, { useState } from 'react';

const TodoForm = () => {
  const [name, setName] = useState('');
  const [text, setText] = useState('');

  const addTodo = async (e) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;
    await fetch('http://localhost:5000/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, text }),
    });
    setName('');
    setText('');
  };

  return (
    <form onSubmit={addTodo} className="flex flex-col items-center gap-2 max-w-sm">
      <input
        className="p-2 border border-gray-300 rounded w-full"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="p-2 border border-gray-300 rounded w-full"
        placeholder="Task"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded mt-2 hover:bg-green-600 w-full">
        Add
      </button>
    </form>
  );
};

export default TodoForm;

