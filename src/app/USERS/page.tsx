'use client';

import { useEffect, useState } from 'react';

interface User {
  id: string;
  name: string;
  email?: string;
  amount?: number;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoading(true);
        const response = await fetch('/api/users');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Логування для діагностики
        console.log('Received data:', data);
        
        // Перевіряємо чи data є масивом
        if (Array.isArray(data)) {
          setUsers(data);
        } else if (data && Array.isArray(data.rows)) {
          // Якщо дані приходять в форматі { rows: [...] }
          setUsers(data.rows);
        } else if (data && typeof data === 'object') {
          // Якщо це об'єкт з даними
          setUsers([data]);
        } else {
          throw new Error('Received data is not in expected format');
        }
        
        setError(null);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch users');
        setUsers([]);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  if (loading) {
    return <div className="p-4">Loading users...</div>;
  }

  if (error) {
    return (
      <div className="p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <ul className="space-y-2">
          {users.map((user, index) => (
            <li key={user.id || index} className="p-2 bg-gray-100 rounded">
              {user.name} 
              {user.email && ` (${user.email})`}
              {user.amount && ` - Amount: ${user.amount}`}
            </li>
          ))}
        </ul>
      )}
      
      <div className="mt-4 text-sm text-gray-600">
        Total users: {users.length}
      </div>
    </div>
  );
}