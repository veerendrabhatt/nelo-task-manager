import { useState } from 'react';

/**
 * TaskItem Component
 * Displays individual task with edit, delete, and toggle complete functionality
 * 
 * @param {Object} task - Task object
 * @param {Function} onEdit - Callback when task is edited
 * @param {Function} onDelete - Callback when task is deleted
 * @param {Function} onToggleComplete - Callback when task status is toggled
 */
const TaskItem = ({ task, onEdit, onDelete, onToggleComplete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: task.title,
    description: task.description,
    priority: task.priority,
    dueDate: task.dueDate,
  });

  /**
   * Handle edit button click
   */
  const handleEditClick = () => {
    setIsEditing(true);
    setEditData({
      title: task.title,
      description: task.description,
      priority: task.priority,
      dueDate: task.dueDate,
    });
  };

  /**
   * Handle save edit
   */
  const handleSave = () => {
    onEdit(task.id, editData);
    setIsEditing(false);
  };

  /**
   * Handle cancel edit
   */
  const handleCancel = () => {
    setIsEditing(false);
    setEditData({
      title: task.title,
      description: task.description,
      priority: task.priority,
      dueDate: task.dueDate,
    });
  };

  /**
   * Handle delete with confirmation
   */
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      onDelete(task.id);
    }
  };

  /**
   * Get priority badge color
   * @param {string} priority - Priority level
   * @returns {string} - CSS classes for badge
   */
  const getPriorityBadge = (priority) => {
    const colors = {
      low: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-red-100 text-red-800',
    };
    return colors[priority] || colors.medium;
  };

  /**
   * Format date for display
   * @param {string} dateString - Date string
   * @returns {string} - Formatted date
   */
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (isEditing) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md border-2 border-blue-500">
        <div className="space-y-3">
          <input
            type="text"
            value={editData.title}
            onChange={(e) => setEditData({ ...editData, title: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Task title"
          />
          <textarea
            value={editData.description}
            onChange={(e) => setEditData({ ...editData, description: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            rows="2"
            placeholder="Task description"
          />
          <div className="grid grid-cols-2 gap-3">
            <select
              value={editData.priority}
              onChange={(e) => setEditData({ ...editData, priority: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <input
              type="date"
              value={editData.dueDate}
              onChange={(e) => setEditData({ ...editData, dueDate: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-lg transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`bg-white p-4 rounded-lg shadow-md border-l-4 ${
        task.status === 'completed'
          ? 'border-green-500 opacity-75'
          : task.priority === 'high'
          ? 'border-red-500'
          : task.priority === 'medium'
          ? 'border-yellow-500'
          : 'border-green-500'
      }`}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1">
          <h3
            className={`text-lg font-semibold ${
              task.status === 'completed' ? 'line-through text-gray-500' : 'text-gray-800'
            }`}
          >
            {task.title}
          </h3>
          <p
            className={`text-sm text-gray-600 mt-1 ${
              task.status === 'completed' ? 'line-through' : ''
            }`}
          >
            {task.description}
          </p>
        </div>
        <div className="flex gap-2 ml-4">
          <span
            className={`px-2 py-1 rounded text-xs font-semibold ${getPriorityBadge(
              task.priority
            )}`}
          >
            {task.priority.toUpperCase()}
          </span>
          <span
            className={`px-2 py-1 rounded text-xs font-semibold ${
              task.status === 'completed'
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-800'
            }`}
          >
            {task.status === 'completed' ? 'COMPLETED' : 'PENDING'}
          </span>
        </div>
      </div>

      <div className="mt-3 flex justify-between items-center">
        <div className="text-sm text-gray-500">
          <span className="font-medium">Due:</span> {formatDate(task.dueDate)}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onToggleComplete(task.id)}
            className={`px-3 py-1 rounded text-sm font-medium transition ${
              task.status === 'completed'
                ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                : 'bg-green-100 text-green-800 hover:bg-green-200'
            }`}
          >
            {task.status === 'completed' ? 'Mark Pending' : 'Mark Complete'}
          </button>
          <button
            onClick={handleEditClick}
            className="px-3 py-1 bg-blue-100 text-blue-800 rounded text-sm font-medium hover:bg-blue-200 transition"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="px-3 py-1 bg-red-100 text-red-800 rounded text-sm font-medium hover:bg-red-200 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;

