import React, { useState, useEffect } from 'react';

function SearchTasks() {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);

  // Fetch tasks from the backend
  useEffect(() => {
    fetch('http://localhost:8080/api/tasks')
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch tasks');
          }
          return response.json();
        })
        .then(data => {
          setTasks(data);
          setFilteredTasks(data);
        })
        .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  // Filter tasks based on search term and category
  useEffect(() => {
    setFilteredTasks(
        tasks.filter(task =>
            task.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (category === '' || task.category === category)
        )
    );
  }, [searchTerm, category, tasks]);

  return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">Search Tasks</h1>
        <div className="flex space-x-4">
          <input
              type="text"
              placeholder="Search tasks..."
              className="flex-1 p-2 border rounded"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
              className="p-2 border rounded"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Design">Design</option>
            <option value="Development">Development</option>
            <option value="Writing">Writing</option>
          </select>
        </div>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Budget</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deadline</th>
            </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
            {filteredTasks.map((task) => (
                <tr key={task.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{task.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{task.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{task.budget}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{task.deadline}</td>
                </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
  );
}

export default SearchTasks;