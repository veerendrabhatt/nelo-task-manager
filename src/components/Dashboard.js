import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { clearSession, getCurrentUser } from '../utils/auth';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import FilterBar from './FilterBar';
import SearchBar from './SearchBar';
import { useTaskMail } from '../hooks/useTaskMail';

/**
 * Dashboard Component
 * Main task management interface with CRUD operations, filtering, and search
 */
const Dashboard = () => {
  const [tasks, setTasks] = useState(() => {
    // Load tasks from localStorage on mount
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate();

  // Use task mail automation hook
  useTaskMail(tasks);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  /**
   * Handle task creation
   * @param {Object} taskData - New task data
   */
  const handleAddTask = (taskData) => {
    const newTask = {
      id: Date.now().toString(),
      ...taskData,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  /**
   * Handle task edit
   * @param {string} id - Task ID
   * @param {Object} updatedData - Updated task data
   */
  const handleEditTask = (id, updatedData) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, ...updatedData } : task))
    );
  };

  /**
   * Handle task deletion
   * @param {string} id - Task ID
   */
  const handleDeleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  /**
   * Handle toggle task completion status
   * @param {string} id - Task ID
   */
  const handleToggleComplete = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, status: task.status === 'completed' ? 'pending' : 'completed' }
          : task
      )
    );
  };

  /**
   * Handle logout
   */
  const handleLogout = () => {
    clearSession();
    navigate('/');
  };

  /**
   * Filter and search tasks
   * Implements elastic search-style workflow with case-insensitive partial matching
   */
  const filteredTasks = useMemo(() => {
    let filtered = [...tasks];

    // Apply filter
    switch (filter) {
      case 'completed':
        filtered = filtered.filter((task) => task.status === 'completed');
        break;
      case 'pending':
        filtered = filtered.filter((task) => task.status === 'pending');
        break;
      case 'high':
        filtered = filtered.filter((task) => task.priority === 'high');
        break;
      default:
        // 'all' - no filter
        break;
    }

    // Apply search (case-insensitive, partial substring matching)
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(
        (task) =>
          task.title.toLowerCase().includes(searchLower) ||
          task.description.toLowerCase().includes(searchLower) ||
          task.priority.toLowerCase().includes(searchLower)
      );
    }

    return filtered;
  }, [tasks, filter, searchTerm]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Task Manager Dashboard</h1>
              <p className="text-gray-600 mt-1">
                Welcome, {getCurrentUser()} | Total Tasks: {tasks.length}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Task Form */}
        <TaskForm onSubmit={handleAddTask} />

        {/* Filter and Search Bar */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Filter & Search</h2>
          <FilterBar activeFilter={filter} onFilterChange={setFilter} />
          <SearchBar onSearch={setSearchTerm} />
        </div>

        {/* Task List */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Tasks ({filteredTasks.length})
          </h2>
          <TaskList
            tasks={filteredTasks}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
            onToggleComplete={handleToggleComplete}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

