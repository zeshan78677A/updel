import React, { useState } from 'react';
import './AddEmployee.css'; // Assuming you create this CSS file for styling.

const AddEmployee = ({ addEmployee }) => {
  const [employee, setEmployee] = useState({
    id: '',
    userName: '',
    email: '',
    status: 'active',
    phone: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const validate = () => {
    let tempErrors = {};
    if (!employee.userName.trim()) tempErrors.userName = 'User Name is required';
    if (!employee.email) {
      tempErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(employee.email)) {
      tempErrors.email = 'Email is not valid';
    }
    if (!employee.phone.trim()) tempErrors.phone = 'Phone number is required';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      addEmployee({ ...employee, id: Date.now() });
      setEmployee({ id: '', userName: '', email: '', status: 'active', phone: '' });
      setErrors({});
    }
  };

  return (
    <form onSubmit={handleSubmit} className="employee-form">
      <div className="form-group">
        <label htmlFor="userName">User Name</label>
        <input
          type="text"
          id="userName"
          name="userName"
          value={employee.userName}
          onChange={handleChange}
          placeholder="Enter user name"
          required
        />
        {errors.userName && <span className="error">{errors.userName}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={employee.email}
          onChange={handleChange}
          placeholder="Enter email"
          required
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="phone">Phone Number</label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={employee.phone}
          onChange={handleChange}
          placeholder="Enter phone number"
          required
        />
        {errors.phone && <span className="error">{errors.phone}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="status">Status</label>
        <select
          id="status"
          name="status"
          value={employee.status}
          onChange={handleChange}
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
      <button type="submit" className="submit-btn">Add Employee</button>
    </form>
  );
};

export default AddEmployee;
