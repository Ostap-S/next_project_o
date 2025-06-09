'use client'

import { useEffect, useState } from 'react'

// Створимо тип для користувача
interface User {
  id: number;
  name: string;
  email: string;
}

export default function HomePage() {
  // Тип для користувачів: масив об'єктів User
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [])

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name} ({user.email})</li>
        ))}
      </ul>
    </div>
  )
}
