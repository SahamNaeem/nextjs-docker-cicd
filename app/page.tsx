'use client';
import { useState } from 'react';

interface Task {
  id: number;
  title: string;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: 'Dockerize Next.js App' },
    { id: 2, title: 'Set up GitHub Actions' },
  ]);
  const [input, setInput] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);

  // CREATE or UPDATE
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    if (editingId !== null) {
      setTasks(tasks.map((t) => (t.id === editingId ? { ...t, title: input } : t)));
      setEditingId(null);
    } else {
      setTasks([...tasks, { id: Date.now(), title: input }]);
    }
    setInput('');
  };

  // EDIT MODE
  const startEdit = (task: Task) => {
    setEditingId(task.id);
    setInput(task.title);
  };

  // DELETE
  const deleteTask = (id: number) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-10">
      <h1 className="text-3xl font-bold mb-6">DevOps Task Tracker (CRUD)</h1>

      <form onSubmit={handleSubmit} className="flex gap-2 mb-8 w-full max-w-md">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter a task..."
          className="flex-1 px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded font-semibold"
        >
          {editingId !== null ? 'Update' : 'Add'}
        </button>
      </form>

      <ul className="w-full max-w-md space-y-3">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex justify-between items-center bg-gray-800 px-4 py-3 rounded border border-gray-700"
          >
            <span>{task.title}</span>
            <div className="flex gap-2">
              <button
                onClick={() => startEdit(task)}
                className="text-sm px-3 py-1 bg-yellow-600 hover:bg-yellow-500 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => deleteTask(task.id)}
                className="text-sm px-3 py-1 bg-red-600 hover:bg-red-500 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}