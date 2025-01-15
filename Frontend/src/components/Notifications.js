import React from 'react';

function Notifications() {
  // This would typically fetch data from an API
  const notifications = [
    { id: 1, message: 'New application for Task 1' },
    { id: 2, message: 'Task 2 status updated to In Progress' },
    { id: 3, message: 'You have been selected for Task 3' },
  ];

  return (
    <section className="notifications">
      <h2>Notifications</h2>
      <ul>
        {notifications.map(notification => (
          <li key={notification.id}>{notification.message}</li>
        ))}
      </ul>
    </section>
  );
}

export default Notifications;

