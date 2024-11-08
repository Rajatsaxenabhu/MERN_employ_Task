import Emp from '../models/employee.js'; // Import the Employee model

// Add new employee
export const addEmployee = async (req, res) => {
  try {
    const { name, email, mobile, designation, gender, course, image } = req.body;
    const existingEmployee = await Emp.findOne({ $or: [{ email }, { name }] });
    if (existingEmployee) {
      return res.status(400).json({ message: 'Employee with this name or email already exists' });
    }
    const newEmployee = new Emp({
      name,
      email,
      mobile,
      designation,
      gender,
      course,
      image,
    });

    await newEmployee.save();
    return res.status(201).json({ message: 'Employee added successfully', employee: newEmployee });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to add employee', error: error.message });
  }
};


export const getAllEmployees = async (req, res) => {

  try {
    console.log("input")
    const employees = await Emp.find();
    return res.status(200).json({ employees });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch employees', error: error.message });
  }
};

// Get employee by ID
export const getEmployeeById = async (req, res) => {
  try {
    const employee = await Emp.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    return res.status(200).json({ employee });
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching employee', error: error.message });
  }
};

// Update employee data
export const updateEmployee = async (req, res) => {
  try {
    const { name, email, mobile, designation, gender, course, image } = req.body;
    const updatedEmployee = await Emp.findByIdAndUpdate(
      req.params.id,
      { name, email, mobile, designation, gender, course, image },
      { new: true } // to return the updated document
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    return res.status(200).json({ message: 'Employee updated successfully', employee: updatedEmployee });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to update employee', error: error.message });
  }
};

// Delete employee data
export const deleteEmployee = async (req, res) => {
  try {
    const employee = await Emp.findByIdAndDelete(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    return res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to delete employee', error: error.message });
  }
};
