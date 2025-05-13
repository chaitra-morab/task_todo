import React, { useState } from 'react';

const TodoItem = ({ todo, socket }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo.text);
  const [newName, setNewName] = useState(todo.name);
  const [loading, setLoading] = useState(false);

  const toggleCompleted = async () => {
    setLoading(true);
    const updated = { ...todo, completed: !todo.completed };
    await fetch(`http://localhost:5000/todos/${todo._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated),
    });
    socket.emit('todoUpdated', updated);
    setLoading(false);
  };

  const deleteTodo = async () => {
    if (!confirm('Are you sure you want to delete this todo?')) return;
    setLoading(true);
    await fetch(`http://localhost:5000/todos/${todo._id}`, { method: 'DELETE' });
    socket.emit('todoDeleted', todo._id);
    setLoading(false);
  };

  const updateTodo = async () => {
    setLoading(true);
    const updated = {
      ...todo,
      name: newName,
      text: newText,
    };
    await fetch(`http://localhost:5000/todos/${todo._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated),
    });
    socket.emit('todoUpdated', updated);
    setIsEditing(false);
    setLoading(false);
  };

  return (
    <li className="bg-white shadow-lg p-4 rounded-xl w-64 flex flex-col items-center text-center">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={toggleCompleted}
        disabled={loading}
        className="mb-2"
      />

      {isEditing ? (
        <>
          <div className="mb-2">
            <label className="block text-gray-500 text-sm">Name</label>
            <input
              className="border p-1 w-full rounded"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-500 text-sm">Task</label>
            <input
              className="border p-1 w-full rounded"
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
            />
          </div>
        </>
      ) : (
        <>
          <div className="mb-2">
            <label className="block text-gray-500 text-sm">Name</label>
            <p className={`${todo.completed ? 'line-through text-gray-400' : 'font-medium'}`}>{todo.name}</p>
          </div>
          <div className="mb-2">
            <label className="block text-gray-500 text-sm">Task</label>
            <p className={`${todo.completed ? 'line-through text-gray-400' : ''}`}>{todo.text}</p>
          </div>
        </>
      )}

      <div className="flex gap-4 mt-2">
        {isEditing ? (
          <button
            onClick={updateTodo}
            className="text-green-600 hover:underline"
            disabled={loading}
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-500 hover:underline"
            disabled={loading}
          >
            Edit
          </button>
        )}
        <button
          onClick={deleteTodo}
          className="text-red-500 hover:underline"
          disabled={loading}
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
