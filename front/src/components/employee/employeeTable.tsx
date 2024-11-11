import React from 'react';

interface Employee {
  _id: string;
  name: string;
  email: string;
  mobile: string;
  designation: string;
  gender: 'Male' | 'Female' | 'Other';
  course: string;
  createdAt: string;
  image?: string; // Add image here
}

interface SortConfig {
  key: keyof Employee;
  direction: 'asc' | 'desc';
}

interface EmployeeTableProps {
  employee: Employee[];
  onSort: (key: keyof Employee) => void;
  onChanges: (employee: Employee) => void;  // For updating employee
  onDelete: (id: string) => void;
  sortConfig: SortConfig;
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({ employee, onSort, onChanges, onDelete, sortConfig }) => {
  return (
    <table className="min-w-full bg-white shadow-md rounded-lg">
      <thead>
        <tr className="border-b">
        <th className="py-3 px-6 text-left">
            <button onClick={() => onSort('_id')} aria-label="Sort by id">
              Id {sortConfig.key === '_id' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
            </button>
          </th>
          <th className="py-3 px-6 text-left">Image</th>
          <th className="py-3 px-6 text-left">
            <button onClick={() => onSort('name')} aria-label="Sort by Name">
              Name {sortConfig.key === 'name' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
            </button>
          </th>
          
          <th className="py-3 px-6 text-left">
            <button onClick={() => onSort('email')} aria-label="Sort by Email">
              Email {sortConfig.key === 'email' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
            </button>
          </th>
          <th className="py-3 px-6 text-left">
            <button onClick={() => onSort('mobile')} aria-label="Sort by Mobile">
              Mobile {sortConfig.key === 'mobile' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
            </button>
          </th>
          <th className="py-3 px-6 text-left">Designation</th>
          <th className="py-3 px-6 text-left">Gender</th>
          <th className="py-3 px-6 text-left">Course</th>
          <th className="py-3 px-6 text-left">Created At</th>
          <th className="py-3 px-6 text-left">Action</th>
        </tr>
      </thead>
      <tbody>
        {employee.map((employee, index) => (
          <tr key={employee._id} className="border-b">
            <td className="py-4 px-6">{index + 1}</td>
            <td className="py-4 px-6">
              {employee.image ? (
                <img
                  className="w-16 h-16 object-cover rounded-full"
                  src={employee.image}
                  alt={employee.name}
                  onError={(e) => (e.target as HTMLImageElement).src = '/path/to/placeholder/image.jpg'}
                />
              ) : (
                <img
                  className="w-16 h-16 object-cover rounded-full"
                  src="/path/to/placeholder/image.jpg"
                  alt="No image available"
                />
              )}
            </td>
            <td className="py-4 px-6">{employee.name}</td>
            <td className="py-4 px-6">{employee.email}</td>
            <td className="py-4 px-6">{employee.mobile}</td>
            <td className="py-4 px-6">{employee.designation}</td>
            <td className="py-4 px-6">{employee.gender}</td>
            <td className="py-4 px-6">{employee.course}</td>
            <td className="py-4 px-6">{employee.createdAt.slice(0, 10)}</td>
            <td className="py-4 px-6">
              <button
                onClick={() => onChanges(employee)}
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
              >
                Update
              </button>
              <button
                onClick={() => onDelete(employee._id)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EmployeeTable;
