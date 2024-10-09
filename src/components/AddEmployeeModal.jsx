import React, { useState, useEffect } from 'react';

const AddEmployeeModal = ({ isOpen, onClose, addEmployee }) => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('active');
  const [errors, setErrors] = useState({});

  // Handle closing modal when clicking outside the modal
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (event.target.classList.contains('modal-overlay')) {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('click', handleOutsideClick);
    }

    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, [isOpen, onClose]);

  // Form validation
  const validateForm = () => {
    let validationErrors = {};
    if (!userName.trim()) validationErrors.userName = 'User name is required';
    if (!email) {
      validationErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      validationErrors.email = 'Email format is invalid';
    }
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const newEmployee = {
      id: Date.now(),
      userName,
      email,
      status,
    };
    addEmployee(newEmployee);
    onClose(); // Close modal after adding employee
    resetForm();
  };

  const resetForm = () => {
    setUserName('');
    setEmail('');
    setStatus('active');
    setErrors({});
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Add Employee</h2>
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="userName">User Name:</label>
            <input
              type="text"
              id="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter username"
            />
            {errors.userName && <span className="error">{errors.userName}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="status">Status:</label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div className="modal-buttons">
            <button type="submit" className="submit-btn">Add Employee</button>
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployeeModal;
