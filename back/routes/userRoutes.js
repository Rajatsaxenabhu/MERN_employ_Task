import express from 'express';
import {
  addEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee
} from '../controllers/employeeController.js';
import protect from '../middlewares/authMiddleware.js';
const router = express.Router();

router.post('/employees', protect,addEmployee);

router.get('/employees', protect,getAllEmployees);

router.get('/employees/:id',protect, getEmployeeById);

router.post('/employees/:id',protect, updateEmployee);

router.delete('/employees/:id',protect, deleteEmployee);

export default router;
