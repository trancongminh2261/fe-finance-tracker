'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (username === 'admin' && password === '123') {
      setError('')
      alert('Đăng nhập thành công!')
      router.push('/home')
    } else {
      setError('Sai tài khoản hoặc mật khẩu')
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 shadow rounded w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-4 text-center">Đăng nhập</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Tài khoản"
            className="mb-3 block border p-2 w-full"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            className="mb-3 block border p-2 w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-500 mb-3">{error}</p>}
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  )
}
