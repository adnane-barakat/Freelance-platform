import React, { useState } from 'react';

function PostTask() {
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    category: '',
    budget: '',
    deadline: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset messages
    setMessage('');
    setError('');

    // Préparer les données pour correspondre au backend
    const dataToSend = {
      ...taskData,
      createdBy: 'user456', // Identifiant temporaire pour le test
      createdAt: new Date().toISOString(), // Date actuelle formatée
      status: 'OPEN', // Statut par défaut
      applications: [] // Liste vide pour les candidatures
    };

    // Envoi des données au backend
    fetch('http://localhost:8080/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to post the task');
          }
          return response.json();
        })
        .then(data => {
          setMessage('Task posted successfully!');
          setTaskData({
            title: '',
            description: '',
            category: '',
            budget: '',
            deadline: ''
          });
        })
        .catch(error => {
          console.error('Error posting task:', error);
          setError('An error occurred while posting the task. Please try again.');
        });
  };

  return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">Post a New Task</h1>
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
              Task Title
            </label>
            <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="title"
                type="text"
                placeholder="Enter task title"
                name="title"
                value={taskData.title}
                onChange={handleChange}
                required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
              Description
            </label>
            <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="description"
                placeholder="Enter task description"
                name="description"
                value={taskData.description}
                onChange={handleChange}
                required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
              Category
            </label>
            <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="category"
                name="category"
                value={taskData.category}
                onChange={handleChange}
                required
            >
              <option value="">Select a category</option>
              <option value="Design">Design</option>
              <option value="Development">Development</option>
              <option value="Writing">Writing</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="budget">
              Budget
            </label>
            <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="budget"
                type="number"
                placeholder="Enter budget"
                name="budget"
                value={taskData.budget}
                onChange={handleChange}
                required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="deadline">
              Deadline
            </label>
            <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="deadline"
                type="date"
                name="deadline"
                value={taskData.deadline}
                onChange={handleChange}
                required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
            >
              Post Task
            </button>
          </div>
        </form>
        {message && <p className="text-green-600">{message}</p>}
        {error && <p className="text-red-600">{error}</p>}
      </div>
  );
}

export default PostTask;