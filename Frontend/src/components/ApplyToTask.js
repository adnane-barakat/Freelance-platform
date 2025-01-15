import React, { useState, useEffect } from 'react';

function ApplyToTask() {
    const [tasks, setTasks] = useState([]); // Liste des tâches ouvertes
    const [applicationMessage, setApplicationMessage] = useState(''); // Message de candidature global
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    // Charger toutes les tâches avec le statut "OPEN"
    useEffect(() => {
        fetch(`http://localhost:8080/api/tasks`) // Endpoint pour récupérer toutes les tâches
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch tasks');
                }
                return response.json();
            })
            .then((data) => {
                const openTasks = data.filter((task) => task.status === 'OPEN'); // Filtrer les tâches ouvertes
                setTasks(openTasks);
            })
            .catch((error) => {
                console.error('Error fetching tasks:', error);
                setError('Failed to load tasks');
            });
    }, []);

    // Gérer la postulation à une tâche spécifique
    const handleApply = (taskId) => {
        setError('');
        setSuccess('');

        const userId = 'user123'; // Remplacez par l'ID de l'utilisateur connecté

        if (!applicationMessage.trim()) {
            setError('Please enter an application message before applying.');
            return;
        }

        fetch(`http://localhost:8080/api/tasks/${taskId}/apply?userId=${userId}&message=${applicationMessage}`, {
            method: 'POST',
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to apply to task');
                }
                return response.json();
            })
            .then((data) => {
                setSuccess(`Successfully applied to task: ${data.title}`);
                setApplicationMessage(''); // Réinitialiser le message
            })
            .catch((error) => {
                console.error('Error applying to task:', error);
                setError('Failed to apply to task');
            });
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">Apply to Task</h1>
            {error && <p className="text-red-600">{error}</p>}
            {success && <p className="text-green-600">{success}</p>}

            <div className="bg-white shadow-md rounded-lg p-4">
                <h2 className="text-2xl font-bold">Available Tasks</h2>
                <ul className="divide-y divide-gray-200">
                    {tasks.map((task) => (
                        <li key={task.id} className="py-4">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="text-lg font-bold">{task.title}</h3>
                                    <p className="text-gray-700">{task.description}</p>
                                    <p className="text-gray-700">
                                        <strong>Budget:</strong> ${task.budget}
                                    </p>
                                    <p className="text-gray-700">
                                        <strong>Category:</strong> {task.category}
                                    </p>
                                </div>
                                <button
                                    onClick={() => handleApply(task.id)}
                                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                                >
                                    Apply
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="mt-4">
                <textarea
                    className="w-full p-2 border rounded"
                    placeholder="Enter your application message"
                    value={applicationMessage}
                    onChange={(e) => setApplicationMessage(e.target.value)}
                    required
                />
            </div>
        </div>
    );
}

export default ApplyToTask;