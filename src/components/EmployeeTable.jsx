import React, { useState } from 'react';

function EmployeeTable({ employees, editEmployee, deleteEmployee }) {
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [errors, setErrors] = useState({});

  // Handle edit initiation
  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setErrors({});
  };

  // Validation
  const validateForm = () => {
    let validationErrors = {};
    if (!editingEmployee.userName.trim()) {
      validationErrors.userName = 'User name is required';
    }
    if (!/\S+@\S+\.\S+/.test(editingEmployee.email)) {
      validationErrors.email = 'Valid email is required';
    }
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  // Handle update with validation
  const handleUpdate = () => {
    if (validateForm()) {
      editEmployee(editingEmployee.id, editingEmployee);
      setEditingEmployee(null);
    }
  };

  // Confirmation dialog for delete
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      deleteEmployee(id);
    }
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>User Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr
              key={emp.id}
              style={{
                backgroundColor: editingEmployee?.id === emp.id ? '#f0f8ff' : 'transparent',
              }}
            >
              <td>
                {editingEmployee?.id === emp.id ? (
                  <div>
                    <input
                      type="text"
                      value={editingEmployee.userName}
                      onChange={(e) =>
                        setEditingEmployee({ ...editingEmployee, userName: e.target.value })
                      }
                    />
                    {errors.userName && <span className="error">{errors.userName}</span>}
                  </div>
                ) : (
                  emp.userName
                )}
              </td>
              <td>
                {editingEmployee?.id === emp.id ? (
                  <div>
                    <input
                      type="email"
                      value={editingEmployee.email}
                      onChange={(e) =>
                        setEditingEmployee({ ...editingEmployee, email: e.target.value })
                      }
                    />
                    {errors.email && <span className="error">{errors.email}</span>}
                  </div>
                ) : (
                  emp.email
                )}
              </td>
              <td>
                {editingEmployee?.id === emp.id ? (
                  <select
                    value={editingEmployee.status}
                    onChange={(e) =>
                      setEditingEmployee({ ...editingEmployee, status: e.target.value })
                    }
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                ) : (
                  emp.status
                )}
              </td>
              <td>
                {editingEmployee?.id === emp.id ? (
                  <>
                    <button onClick={handleUpdate}>Save</button>
                    <button onClick={() => setEditingEmployee(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEdit(emp)}>Edit</button>
                    <button onClick={() => handleDelete(emp.id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeTable;
