import React from 'react';

// Define the types for Employee and Props

interface Employee  {
    _id: string;
    name: string;
    email: string;
    mobile: string;
    designation: string;
    gender: 'Male' | 'Female' | 'Other';
    course: string;
  }
  
interface EmployeeModalProps {
    employee: Employee | null;
    onChanges: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    onSubmit: (e: React.FormEvent) => void;
    onClose: () => void;
}

const EmployeeModal: React.FC<EmployeeModalProps> = ({ employee, onChanges, onSubmit, onClose }) => {
    if (!employee) {
        return null;  // Return nothing if no employee data is available
      }
    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-lg w-96">
                <h3 className="text-2xl mb-4">Update Employee</h3>
                <form onSubmit={onSubmit}>
                    <div className="mb-4">
                        <label className=''/>
                        <label className="block text-sm font-medium">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={employee?.name || ''}
                            onChange={onChanges}
                            className="w-full px-3 py-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={employee?.email}
                            onChange={onChanges}
                            className="w-full px-3 py-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Mobile</label>
                        <input
                            type="text"
                            name="mobile"
                            value={employee?.mobile}
                            onChange={onChanges}
                            className="w-full px-3 py-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Designation</label>
                        <input
                            type="text"
                            name="designation"
                            value={employee?.designation}
                            onChange={onChanges}
                            className="w-full px-3 py-2 border rounded"
                        />
                    </div>

                    {/* Gender Input */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Gender</label>
                        <select
                            name="gender"
                            value={employee?.gender}
                            onChange={onChanges}
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
                            value={employee?.course}
                            onChange={onChanges}
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
