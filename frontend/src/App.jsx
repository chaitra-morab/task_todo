import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import FilterBar from './components/FilterBar';
import NotificationToast from './components/NotificationToast';

const socket = io('http://localhost:5000');

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [notification, setNotification] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchTodos();

    socket.on('todo_added', (todo) => {
      setTodos((prev) => [...prev, todo]);
      setNotification('A new todo was added');
    });

    socket.on('todo_updated', (updated) => {
      setTodos((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));
      setNotification('A todo was updated');
    });

    socket.on('todo_deleted', (id) => {
      setTodos((prev) => prev.filter((t) => t._id !== id));
      setNotification('A todo was deleted');
    });

    return () => {
      socket.off('todo_added');
      socket.off('todo_updated');
      socket.off('todo_deleted');
    };
  }, []);

  const fetchTodos = async () => {
    const res = await fetch('http://localhost:5000/todos');
    const data = await res.json();
    setTodos(data);
  };

  const filteredTodos = todos.filter((todo) =>
    (filter === 'all' ||
      (filter === 'completed' && todo.completed) ||
      (filter === 'active' && !todo.completed)) &&
    (todo.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
      todo.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <div className=" w-full flex items-center justify-center gap-3 mb-4">
        <h1 className="text-2xl font-bold mb-4 text-center">Real-Time Todo App</h1>
        <input
          type="text"
          placeholder="Search..."
          className="h-10 px-4 border border-gray-500 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <FilterBar filter={filter} setFilter={setFilter} />

      <div className="flex justify-center items-center">
        <div className="bg-white shadow-lg p-4 rounded-xl w-64 text-center">
          <TodoForm />
        </div>
      </div>

      <br/>
      <TodoList todos={filteredTodos} />

      {notification && <NotificationToast message={notification} onClose={() => setNotification('')} />}
    </div>
  );
}

export default App;
