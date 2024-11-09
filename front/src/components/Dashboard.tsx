import React, { useState } from 'react';
import Header from '../components/header/header';
import EmployeeForm from './employee/employee'; // Component for the employee form
import EmployeeList from './employee/employeeList';
import Homepage from '../pages/Homepage'
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store'; // Component for the employee list

const App = () => {  
  const showEmployeeList=useSelector((state: RootState) => state.auth.showEmployeeList);
  const showEmployeeForm=useSelector((state: RootState) => state.auth.showEmployeeForm);
  const showHome=useSelector((state: RootState) => state.auth.homepage);
  return (
    <div className='min-h-screen bg-fuchsia-300'>
      <Header/>
      {/* Conditional rendering based on states */}
      {showEmployeeForm && <EmployeeForm />}
      {showEmployeeList && <EmployeeList />}
      {showHome && <Homepage />}
    </div>
  );
};

export default App;
