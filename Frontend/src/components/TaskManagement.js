import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function TaskManagement() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  // Fetch tasks from the backend
  useEffect(() => {
    fetch('http://localhost:8080/api/tasks') // Replace with your backend URL
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch tasks');
        }
        return response.json();
      })
      .then(data => setTasks(data))
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  // Delete a task
  const deleteTask = (id) => {
    fetch(`http://localhost:8080/api/tasks/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to delete task');
        }
        // Remove the deleted task from the UI
        setTasks(tasks.filter(task => task.id !== id));
      })
      .catch(error => console.error('Error deleting task:', error));
  };

  return (
    <section className="task-management">
      <h2>Task Management</h2>
      <Link to="/post-task" className="button">Post a Task</Link>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task.id}>
              <td>{task.title}</td>
              <td>{task.status}</td>
              <td>
                <button onClick={() => navigate(`/edit-task/${task.id}`)}>Edit</button>
                <button onClick={() => deleteTask(task.id)}>Delete</button>
                <button onClick={() => navigate(`/task/${task.id}`)}>View Details</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default TaskManagement;