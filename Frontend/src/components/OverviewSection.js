import React from 'react';

function OverviewSection() {
  // This would typically fetch data from an API
  const stats = {
    tasksPosted: 10,
    tasksApplied: 15,
    tasksCompleted: 5,
    balance: 500
  };

  return (
    <section className="overview-section">
      <h2>Overview</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Tasks Posted</h3>
          <p>{stats.tasksPosted}</p>
        </div>
        <div className="stat-card">
          <h3>Tasks Applied</h3>
          <p>{stats.tasksApplied}</p>
        </div>
        <div className="stat-card">
          <h3>Tasks Completed</h3>
          <p>{stats.tasksCompleted}</p>
        </div>
        <div className="stat-card">
          <h3>Balance</h3>
          <p>${stats.balance}</p>
        </div>
      </div>
    </section>
  );
}

export default OverviewSection;

