// EmployeeTable.js
import React from 'react';

const EmployeeTable = ({ employees, onSort, onUpdate, onDelete, sortConfig }) => {
    return (
        <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead>
                <tr className="border-b">
                    <th className="py-3 px-6 text-left">
                        <button onClick={() => onSort('_id')}>ID</button>
                    </th>
                    <th className="py-3 px-6 text-left">Image</th>
                    <th className="py-3 px-6 text-left">
                        <button onClick={() => onSort('name')}>Name</button>
                    </th>
                    <th className="py-3 px-6 text-left">
                        <button onClick={() => onSort('email')}>Email</button>
                    </th>
                    <th className="py-3 px-6 text-left">
                        <button onClick={() => onSort('mobile')}>Mobile</button>
                    </th>
                    <th className="py-3 px-6 text-left">Designation</th>
                    <th className="py-3 px-6 text-left">Gender</th>
                    <th className="py-3 px-6 text-left">Course</th>
                    <th className="py-3 px-6 text-left">Created At</th>
                    <th className="py-3 px-6 text-left">Action</th>
                </tr>
            </thead>
            <tbody>
                {employees.map((employee, index) => (
                    <tr key={employee._id} className="border-b">
                        <td className="py-4 px-6">{index + 1}</td>
                        <td className="py-4 px-6">
                            {employee.image && (
                                <img
                                    className="w-16 h-16 object-cover rounded-full"
                                    src={employee.image}
                                    alt={employee.name}
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
                                onClick={() => onUpdate(employee)}
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
