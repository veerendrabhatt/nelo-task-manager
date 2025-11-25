import { useEffect, useRef } from 'react';

/**
 * Custom hook for task mail automation
 * Checks pending tasks every 20 minutes and logs mock email notifications
 * 
 * @param {Array} tasks - Array of tasks
 */
export const useTaskMail = (tasks) => {
  const intervalRef = useRef(null);

  useEffect(() => {
    /**
     * Function to check and log pending tasks
     */
    const checkPendingTasks = () => {
      const pendingTasks = tasks.filter(
        (task) => task.status === 'pending' && new Date(task.dueDate) <= new Date()
      );

      if (pendingTasks.length > 0) {
        console.log('📧 Mock Email Notification - Pending Tasks:', {
          timestamp: new Date().toISOString(),
          pendingCount: pendingTasks.length,
          tasks: pendingTasks.map((task) => ({
            id: task.id,
            title: task.title,
            dueDate: task.dueDate,
          })),
        });

        // In a real application, this would send actual emails
        // For now, we just log to console
      }
    };

    // Initial check
    checkPendingTasks();

    // Set up interval to check every 20 minutes (1200000 milliseconds)
    intervalRef.current = setInterval(checkPendingTasks, 20 * 60 * 1000);

    // Cleanup function to clear interval on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [tasks]);
};

