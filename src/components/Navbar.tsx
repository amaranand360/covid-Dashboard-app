import React from "react";
import { Link } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
const Navbar: React.ComponentType = () => {
  return (
    <Router>
      <div className="bg-gray-700 py-2">
        <nav className="bg-gray-700">
          <div className="container mx-auto text-center">
            <Link to="/" className="text-white text-lg font-bold ml-5 ">
              COVID-19 Dashboard
            </Link>
          </div>
        </nav>
      </div>
    </Router>
  );
};

export default Navbar;
