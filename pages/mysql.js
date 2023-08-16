import React, { useState } from 'react';

function DatabaseStatus() {
  const [users, setUsers] = useState([]);

  const checkDatabaseStatus = async () => {
    try {
      const response = await fetch('/api/db');
      const data = await response.json();
      console.log(data); // Log the data received from the API
      setUsers(data.users);
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
  
  return (
    <div>
      <button onClick={checkDatabaseStatus}>Check Database Status</button>
      <p>User Data:</p>
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
}

export default DatabaseStatus;
