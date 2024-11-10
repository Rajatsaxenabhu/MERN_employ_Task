import { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../redux/store';
import { toggleEmployeeForm, toggleEmployeeList, toggleHomepage, logout } from '../../redux/slice/authSlice';

const Header = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false); // State for dropdown
  const dropdownRef = useRef<HTMLDivElement>(null); // Ref for dropdown container
  const name = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <header className="bg-blue-600 text-white shadow-md h-20">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="hidden md:flex  w-full justify-between pr-44">
          <button onClick={() => dispatch(toggleHomepage())} className="text-xl font-semibold hover:text-blue-200">Home</button>
          <button onClick={() => dispatch(toggleEmployeeForm())} className="text-xl font-semibold hover:text-blue-200">Employee</button>
          <button onClick={() => dispatch(toggleEmployeeList())} className="text-xl font-semibold hover:text-blue-200">Employee List</button>

          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2 text-lg font-semibold hover:text-blue-200 pl-4"
            >
              <span>{name}</span>
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
              </svg>
            </button>


            {isDropdownOpen && (
              <div
                ref={dropdownRef}
                className="absolute right-0 mt-2 w-28 bg-white text-black rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <div className="">
                  <Link
                    to="/login"
                    onClick={handleLogout}
                    className="block py-2 text-white bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 transition-all duration-300 rounded-lg text-center"
                  >
                    Logout
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>


        <button
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-white focus:outline-none"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>

        {/* Mobile Menu */}
        <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} absolute top-16 left-0 right-0 bg-blue-600 text-white p-4`}>
          <button onClick={() => dispatch(toggleHomepage())} className="text-lg font-semibold hover:text-blue-200">Homepage</button>
          <button onClick={() => dispatch(toggleEmployeeForm())} className="text-lg font-semibold hover:text-blue-200">Employee</button>
          <button onClick={() => dispatch(toggleEmployeeList())} className="text-lg font-semibold hover:text-blue-200">Employee List</button>

          <div className="py-2 border-t border-blue-700"></div>
          <div className="py-2 border-t border-blue-700">
            <h1 className="text-lg text-white">{name}</h1>
            <Link
              to="/login"
              onClick={handleLogout}
              className="block py-2 text-white bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 transition-all duration-300"
            >
              Logout
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
