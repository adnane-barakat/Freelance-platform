"use client";

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard.js';
import PostTask from './components/PostTask.js';
import SearchTasks from './components/SearchTasks.js';
import MyTasks from './components/MyTasks.js';
import Profile from './components/Profile.js';
import Sidebar from './components/Sidebar.js';
import Checkout from "./payment-frontend/index.jsx";
import Confirmation from "./payment-frontend/Confirmation.jsx";
import ApplyToTask from './components/ApplyToTask.js';
import Login from "./components/Login.js";

function App() {
  return (
      <Router>
        <div className="flex h-screen bg-gray-100">
          <Sidebar />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
            <div className="container mx-auto px-6 py-8">
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/post-task" element={<PostTask />} />
                <Route path="/search-tasks" element={<SearchTasks />} />
                <Route path="/my-tasks" element={<MyTasks />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/confirmation" element={<Confirmation />} />
                <Route path="/apply-task/:taskId" element={<ApplyToTask />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<Login />} /> {/* Redirect all unknown routes to Login */}
              </Routes>
            </div>
          </main>
        </div>
      </Router>
  );
}

export default App;