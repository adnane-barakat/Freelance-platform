import React, { useState } from 'react';

function Calendar() {
  const [selectedDate, setSelectedDate] = useState(null);
  
  // This would typically fetch data from an API
  const tasks = [
    { id: 1, title: 'Task 1', deadline: '2023-06-15' },
    { id: 2, title: 'Task 2', deadline: '2023-06-20' },
    { id: 3, title: 'Task 3', deadline: '2023-06-25' },
  ];

  const renderCalendar = () => {
    const today = new Date();
    const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    const days = [];

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(today.getFullYear(), today.getMonth(), i);
      const hasTask = tasks.some(task => new Date(task.deadline).toDateString() === date.toDateString());
      
      days.push(
        <div 
          key={i} 
          className={`
            p-2 text-center cursor-pointer transition-colors duration-200
            ${hasTask ? 'bg-blue-100' : ''}
            ${selectedDate === i ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}
          `}
          onClick={() => setSelectedDate(i)}
        >
          {i}
        </div>
      );
    }

    return days;
  };

  const renderTasksForSelectedDate = () => {
    if (!selectedDate) return null;

    const selectedDateObj = new Date(new Date().getFullYear(), new Date().getMonth(), selectedDate);
    const tasksForDate = tasks.filter(task => new Date(task.deadline).toDateString() === selectedDateObj.toDateString());

    return (
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Tasks for {selectedDateObj.toDateString()}</h3>
        <ul className="space-y-2">
          {tasksForDate.map(task => (
            <li key={task.id} className="bg-white p-2 rounded shadow">{task.title}</li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <section className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Calendar</h2>
      <div className="grid grid-cols-7 gap-1">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center font-semibold">{day}</div>
        ))}
        {renderCalendar()}
      </div>
      {renderTasksForSelectedDate()}
    </section>
  );
}

export default Calendar;
