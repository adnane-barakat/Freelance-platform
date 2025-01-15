import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
      <nav className="w-64 bg-white h-full border-r">
        <div className="flex items-center justify-center h-16 border-b">
          <span className="text-2xl font-semibold text-gray-800">TaskDash</span>
        </div>
        <ul className="py-4">
          <li className="px-6 py-3 hover:bg-gray-100">
            <Link to="/" className="flex items-center text-gray-700 hover:text-gray-900">
              <svg className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              Dashboard
            </Link>
          </li>
          <li className="px-6 py-3 hover:bg-gray-100">
            <Link to="/post-task" className="flex items-center text-gray-700 hover:text-gray-900">
              <svg className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Post Task
            </Link>
          </li>
          <li className="px-6 py-3 hover:bg-gray-100">
            <Link to="/search-tasks" className="flex items-center text-gray-700 hover:text-gray-900">
              <svg className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
              Search Tasks
            </Link>
          </li>
          <li className="px-6 py-3 hover:bg-gray-100">
            <Link to="/my-tasks" className="flex items-center text-gray-700 hover:text-gray-900">
              <svg className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
              </svg>
              My Tasks
            </Link>
          </li>
          <li className="px-6 py-3 hover:bg-gray-100">
            <Link to="/apply-task/:taskId" className="flex items-center text-gray-700 hover:text-gray-900">
              <svg className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm5 4h2v6H9V7z" />
              </svg>
              Apply to Task
            </Link>
          </li>
          <li className="px-6 py-3 hover:bg-gray-100">
            <Link to="/profile" className="flex items-center text-gray-700 hover:text-gray-900">
              <svg className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              Profile
            </Link>
          </li>
        </ul>
      </nav>
  );
}

export default Sidebar;