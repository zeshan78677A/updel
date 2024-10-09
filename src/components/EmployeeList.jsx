import React, { useState } from 'react';
import EmployeeTable from './EmployeeTable';

function EmployeeList({ employees, editEmployee, deleteEmployee }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortKey, setSortKey] = useState('userName');
  const [sortOrder, setSortOrder] = useState('asc');

  // Search and filter employees based on the search query
  const filteredEmployees = employees.filter(
    (employee) =>
      employee.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sorting employees by a specific key
  const sortedEmployees = filteredEmployees.sort((a, b) => {
    if (sortOrder === 'asc') {
      return a[sortKey].localeCompare(b[sortKey]);
    } else {
      return b[sortKey].localeCompare(a[sortKey]);
    }
  });

  const handleSort = (key) => {
    if (key === sortKey) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  return (
    <div>
      <h2>Employee List</h2>
      
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by name or email"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ marginBottom: '10px', padding: '5px', width: '100%' }}
      />

      {/* Sort Buttons */}
      <div style={{ marginBottom: '10px' }}>
        <button onClick={() => handleSort('userName')}>
          Sort by Name {sortKey === 'userName' && (sortOrder === 'asc' ? '↑' : '↓')}
        </button>
        <button onClick={() => handleSort('email')}>
          Sort by Email {sortKey === 'email' && (sortOrder === 'asc' ? '↑' : '↓')}
        </button>
      </div>

      {/* Employee Table */}
      <EmployeeTable
        employees={sortedEmployees}
        editEmployee={editEmployee}
        deleteEmployee={deleteEmployee}
      />
    </div>
  );
}

export default EmployeeList;
