import TaskItem from './TaskItem';

/**
 * TaskList Component
 * Displays list of tasks with filtering and search
 * 
 * @param {Array} tasks - Array of tasks
 * @param {Function} onEdit - Callback when task is edited
 * @param {Function} onDelete - Callback when task is deleted
 * @param {Function} onToggleComplete - Callback when task status is toggled
 */
const TaskList = ({ tasks, onEdit, onDelete, onToggleComplete }) => {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow-md">
        <p className="text-gray-500 text-lg">No tasks found. Create a new task to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleComplete={onToggleComplete}
        />
      ))}
    </div>
  );
};

export default TaskList;

