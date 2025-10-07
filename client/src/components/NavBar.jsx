import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <header className="bg-blue-600 text-white py-4 shadow-md flex justify-between px-20">
      <h1 className="text-2xl font-semibold text-center">
        Employee Management System
      </h1>
      <div>
        <Link to="/" className="px-4 hover:underline transition-transform duration-200">
          Employees
        </Link>
        <Link to="/employee" className="px-4 hover:underline transition-transform duration-200">
          Post Employee
        </Link>
      </div>
    </header>
  );
};

export default NavBar;
