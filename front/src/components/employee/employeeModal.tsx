// EmployeeModal.js
import React from 'react';

const EmployeeModal = ({ employee, onChange, onSubmit, onClose }) => {
    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-lg w-96">
                <h3 className="text-2xl mb-4">Update Employee</h3>
                <form onSubmit={onSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={employee.name}
                            onChange={onChange}
                            className="w-full px-3 py-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={employee.email}
                            onChange={onChange}
                            className="w-full px-3 py-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Mobile</label>
                        <input
                            type="text"
                            name="mobile"
                            value={employee.mobile}
                            onChange={onChange}
                            className="w-full px-3 py-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Designation</label>
                        <input
                            type="text"
                            name="designation"
                            value={employee.designation}
                            onChange={onChange}
                            className="w-full px-3 py-2 border rounded"
                        />
                    </div>

                    {/* Gender Input */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Gender</label>
                        <select
                            name="gender"
                            value={employee.gender}
                            onChange={onChange}
                            className="w-full px-3 py-2 border rounded"
                        >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    {/* Course Input */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Course</label>
                        <input
                            type="text"
                            name="course"
                            value={employee.course}
                            onChange={onChange}
                            className="w-full px-3 py-2 border rounded"
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Update
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="ml-2 bg-gray-500 text-white px-4 py-2 rounded"
                    >
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EmployeeModal;
