import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'], // restricts gender to specific values
  },
  course: {
    type: String,
    required: true,
  },
  image: {
    type: String, // Assuming this is a URL to an image
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Emp = mongoose.model('Employee', employeeSchema);

export default Emp;
