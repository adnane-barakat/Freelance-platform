import React from 'react';
import Calendar from './Calendar.js';

function Dashboard() {
  return (
      <>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-100 p-4 rounded">
                  <p className="text-sm text-blue-600">Tasks Posted</p>
                  <p className="text-2xl font-bold text-blue-800">12</p>
                </div>
                <div className="bg-green-100 p-4 rounded">
                  <p className="text-sm text-green-600">Tasks Applied</p>
                  <p className="text-2xl font-bold text-green-800">5</p>
                </div>
                <div className="bg-yellow-100 p-4 rounded">
                  <p className="text-sm text-yellow-600">Tasks Completed</p>
                  <p className="text-2xl font-bold text-yellow-800">8</p>
                </div>
                <div className="bg-purple-100 p-4 rounded">
                  <p className="text-sm text-purple-600">Total Earnings</p>
                  <p className="text-2xl font-bold text-purple-800">$1,200</p>
                </div>
              </div>
            </div>
            <Calendar/>
          </div>
        </div>
      </>

  );
}

export default Dashboard;

