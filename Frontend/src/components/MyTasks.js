import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function MyTasks() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('posted');
    const [postedTasks, setPostedTasks] = useState([]);
    const [appliedTasks, setAppliedTasks] = useState([]);

    // Fetch tasks dynamically
    useEffect(() => {
        const userId = 'user123'; // Remplacez par l'ID de l'utilisateur connecté

        if (activeTab === 'posted') {
            fetch(`http://localhost:8080/api/tasks?createdBy=${userId}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch posted tasks');
                    }
                    return response.json();
                })
                .then(data => setPostedTasks(data))
                .catch(error => console.error('Error fetching posted tasks:', error));
        } else if (activeTab === 'applied') {
            fetch(`http://localhost:8080/api/tasks/user/${userId}/applied`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch applied tasks');
                    }
                    return response.json();
                })
                .then(data => setAppliedTasks(data))
                .catch(error => console.error('Error fetching applied tasks:', error));
        }
    }, [activeTab]);

    // Supprimer une tâche
    const deleteTask = (taskId) => {
        fetch(`http://localhost:8080/api/tasks/${taskId}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to delete task');
                }
                // Supprimer la tâche de la liste locale après suppression
                setPostedTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
                alert('Task deleted successfully!');
            })
            .catch(error => {
                console.error('Error deleting task:', error);
                alert('Failed to delete task.');
            });
    };

    const handleNavigation = () => {
        navigate("/checkout");
    };

    return (
        <div className="space-y-6 relative pb-16">
            <h1 className="text-3xl font-bold text-gray-800">My Tasks</h1>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="flex border-b">
                    <button
                        className={`flex-1 py-2 px-4 text-center ${activeTab === 'posted' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
                        onClick={() => setActiveTab('posted')}
                    >
                        Posted Tasks
                    </button>
                    <button
                        className={`flex-1 py-2 px-4 text-center ${activeTab === 'applied' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
                        onClick={() => setActiveTab('applied')}
                    >
                        Applied Tasks
                    </button>
                </div>
                {activeTab === 'posted' ? (
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicants</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {postedTasks.map((task) => (
                            <tr key={task.id}>
                                <td className="px-6 py-4 whitespace-nowrap">{task.title}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{task.status}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{task.applicants?.length || 0}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <button className="text-blue-600 hover:text-blue-900">View</button>
                                    <button
                                        onClick={() => deleteTask(task.id)}
                                        className="ml-2 text-red-600 hover:text-red-900"
                                    >
                                        Delete
                                    </button>
                                    <button
                                        onClick={handleNavigation}
                                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full shadow-lg ml-4"
                                    >
                                        Pay task
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) : (
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Posted By</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {appliedTasks.map((task) => (
                            <tr key={task.id}>
                                <td className="px-6 py-4 whitespace-nowrap">{task.title}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{task.status}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{task.createdBy}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <button className="text-blue-600 hover:text-blue-900">View</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default MyTasks;