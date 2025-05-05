import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <div className="navbar">
      <ul className="navmenu-item ">
        <li>
          <Link to="/" className="hover:text-yellow-300">Site List</Link>
        </li>
        <li>
          <Link to="/add-site" className="hover:text-yellow-300">Add Site</Link>
        </li>
        <li>
          <Link to="/report/1" className="hover:text-yellow-300">Report</Link>
        </li>
        <li>
          <Link to="/site/1/tasks" className="hover:text-yellow-300">Task-Progress</Link>
        </li>
        <li>
          <Link to="/site/1/tasks" className="hover:text-yellow-300">View Tasks</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
