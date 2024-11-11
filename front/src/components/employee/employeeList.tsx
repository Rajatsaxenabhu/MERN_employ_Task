import React, { useEffect, useState, FormEvent, ChangeEvent } from 'react';
import userapi from '../../api/userapi';
import SearchBox from './searchbox';
import EmployeeTable from './employeeTable';
import EmployeeModal from './employeeModal';
import { ToastContainer, toast } from 'react-toastify';  // Import toastify
import 'react-toastify/dist/ReactToastify.css';  // Import toast styles

interface Employees {
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
  key: keyof Employees;
  direction: 'asc' | 'desc';
}

const EmployeeList: React.FC = () => {
  const [employees, setEmployees] = useState<Employees[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingEmployee, setEditingEmployee] = useState<Employees| null>(null);
  const [originalEmployee, setOriginalEmployee] = useState<Employees | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'name', direction: 'asc' });

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await userapi.get('/employees');
        if (response.status !== 200) {
          throw new Error('Failed to fetch employees');
        }
        const data = await response.data;
        setEmployees(data.employees);

      } catch (err: any) {
        setError(err.message);

        toast.error(`Error fetching employees: ${err.message}`);
      }
    };

    fetchEmployees();
  }, []);

  
  const handleDelete = async (id: string) => {
    const previousEmployees = [...employees];
    setEmployees(employees.filter(employee => employee._id !== id)); // Optimistic UI update

    try {
      const response = await userapi.delete(`/employees/${id}`);
      if (response.status !== 200) {
        throw new Error('Failed to delete employee');
      }
      toast.success("Employee deleted successfully!");
    } catch (err: any) {
      setEmployees(previousEmployees); 
      toast.error(`Error deleting employee: ${err.message}`);
    }
  };

  const handleUpdate = (employee: Employees) => {
    setEditingEmployee(employee);
  setOriginalEmployee(employee);  // Save the original data before editing
  setIsModalOpen(true);
  };

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!editingEmployee || !originalEmployee) return;
  
    // Create an object to store only the changed fields
    const updatedFields: Partial<Employees> = {};
  
    // Compare each field and add it to updatedFields if it has changed
    Object.keys(editingEmployee).forEach((key) => {
      const keyTyped = key as keyof Employees;
      if (editingEmployee[keyTyped] !== originalEmployee[keyTyped]) {
        updatedFields[keyTyped] = editingEmployee[keyTyped];
      }
    });
  
    // If no fields have changed, we don't need to make an API request
    if (Object.keys(updatedFields).length === 0) {
      toast.info("No changes detected.");
      setIsModalOpen(false);
      return;
    }
  
    try {
      const response = await userapi.post(`/employees/${editingEmployee._id}`, updatedFields);
  
      if (response.status === 301) {
        toast.error("You don't have permission to update this employee!");
        return;
      }
  
      if (response.status === 400) {
        const errorMessage = response.data?.message || 'Updated value has duplication!';
        toast.error(errorMessage);
      } else if (response.status === 200) {
        // Update the employee in the state after successful update
        setEmployees(employees.map(emp => emp._id === editingEmployee._id ? { ...emp, ...updatedFields } : emp));
        setIsModalOpen(false);
        toast.success("Employee updated successfully!");
      }
    } catch (err: any) {
      toast.error(`Error updating deblicate value found`);
    }
  };
  


  const handleChange = (e: ChangeEvent<HTMLInputElement|HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (editingEmployee) {
      setEditingEmployee({ ...editingEmployee, [name]: value });
    }
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSort = (key: keyof Employees): void => {
    let direction: 'asc' | 'desc' = 'asc';
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
    const aValue: any = a[sortConfig.key];
    const bValue: any = b[sortConfig.key];
    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-semibold text-center mb-8">Employee List</h2>
      <div className="flex justify-end">
        <SearchBox searchQuery={searchQuery} onSearchChange={handleSearchChange} />
      </div>
      <EmployeeTable
        employee={sortedEmployees}
        onSort={handleSort}
        onChanges={handleUpdate}
        onDelete={handleDelete}
        sortConfig={sortConfig}
      />
      {isModalOpen && (
        <EmployeeModal
          employee={editingEmployee}  
          onChanges={handleChange}     // The function to handle input field changes
          onSubmit={handleFormSubmit} // The function to handle form submission
          onClose={() => setIsModalOpen(false)} // Close the modal
        />
      )}

      {/* ToastContainer to show the notifications */}
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default EmployeeList;
