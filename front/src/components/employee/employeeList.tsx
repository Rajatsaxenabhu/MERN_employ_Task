// EmployeeList.js
import React, { useEffect, useState } from 'react';
import userapi from '../../api/userapi';
import SearchBox from './searchbox';
import EmployeeTable from './employeeTable';
import EmployeeModal from './employeeModal';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // State for modal (update form)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingEmployee, setEditingEmployee] = useState(null);

    // State for search query and sorting
    const [searchQuery, setSearchQuery] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await userapi.get('/employees');
                if (response.status !== 200) {
                    throw new Error('Failed to fetch employees');
                }
                const data = await response.data;
                setEmployees(data.employees);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchEmployees();
    }, []);

    // Handle delete action
    const handleDelete = async (id) => {
        const previousEmployees = [...employees];
        setEmployees(employees.filter(employee => employee._id !== id)); // Optimistic UI update

        try {
            const response = await userapi.delete(`/employees/${id}`);
            if (response.status !== 200) {
                throw new Error('Failed to delete employee');
            }
        } catch (err) {
            setEmployees(previousEmployees); // Rollback in case of error
            setError(err.message);
        }
    };

    // Handle update action (opens modal with employee data)
    const handleUpdate = (employee) => {
        setEditingEmployee(employee);
        setIsModalOpen(true);
    };

    // Handle form submission to update employee
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const updatedEmployee = { ...editingEmployee };
        
        try {
            const response = await userapi.put(`/employees/${editingEmployee._id}`, updatedEmployee);
            if (response.status === 200) {
                setEmployees(employees.map(emp => emp._id === editingEmployee._id ? updatedEmployee : emp));
                setIsModalOpen(false);
            } else {
                throw new Error('Failed to update employee');
            }
        } catch (err) {
            setError(err.message);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditingEmployee({ ...editingEmployee, [name]: value });
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    // Filter employees by search query
    const filteredEmployees = employees.filter((employee) => {
        const query = searchQuery.toLowerCase();
        return (
            employee.name.toLowerCase().includes(query) ||
            employee.email.toLowerCase().includes(query) ||
            employee.mobile.includes(query)
        );
    });

    const sortedEmployees = [...filteredEmployees].sort((a, b) => {
        if (!sortConfig.key) return 0;
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
    });

    if (loading) {
        return <div className="text-center text-xl">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500 text-xl">Error: {error}</div>;
    }
    return (
        <div className="container mx-auto p-4">
            <h2 className="text-3xl font-semibold text-center mb-8">Employee List</h2>
            <div className='flex justify-end'>
            <SearchBox searchQuery={searchQuery} onSearchChange={handleSearchChange} />
            </div>
            <EmployeeTable
                employees={sortedEmployees}
                onSort={handleSort}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
                sortConfig={sortConfig}
            />
            {isModalOpen && (
                <EmployeeModal
                    employee={editingEmployee}
                    onChange={handleChange}
                    onSubmit={handleFormSubmit}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
};
export default EmployeeList;
