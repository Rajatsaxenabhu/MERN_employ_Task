import React, { useEffect, useState } from 'react';
import userapi from '../api/userapi';
interface user {
    name: string;
    email: string;
    mobile: string;
    designation: string;
    gender: string;
    course: string;
    image: string;
}

const UserList = () => {
  const [users, setUsers] = useState([]); // Store the users data
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for error

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from the backend API
        const response = await userapi.get('/employees'); // Change this to your actual backend API
        if (!response.ok) {
          throw new Error('Data fetch failed');
        }
        const data = await response.json();
        setUsers(data); // Set users data
      } catch (err) {
        setError(err.message); // Set error message if fetch fails
      } finally {
        setLoading(false); // Set loading to false when data fetching is complete
      }
    };

    fetchData(); // Fetch data when the component mounts
  }, []);

  if (loading) {
    return <div className="text-center text-xl p-6">Loading...</div>; // Show loading text
  }

  if (error) {
    return <div className="text-center text-xl text-red-500 p-6">Error: {error}</div>; // Show error message
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">User List</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {users.map((user: user, index) => (
          <li
            key={index}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out"
          >
            <div className="flex flex-col items-center">
              <img
                src={user.image}
                alt={user.name}
                className="w-24 h-24 rounded-full object-cover mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800">{user.name}</h3>
              <p className="text-gray-600">Email: {user.email}</p>
              <p className="text-gray-600">Mobile: {user.mobile}</p>
              <p className="text-gray-600">Designation: {user.designation}</p>
              <p className="text-gray-600">Course: {user.course}</p>
              <p className="text-gray-600">Gender: {user.gender}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
