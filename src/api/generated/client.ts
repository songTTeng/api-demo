// 自动生成，请勿手动修改
import type { paths } from './types'

export type User = paths['/api/users']['get']['responses']['200']['content']['application/json'][0]

// 基础请求封装
const request = async <T>(url: string, options?: RequestInit): Promise<T> => {
  const response = await fetch(url, options)
  if (!response.ok) throw new Error(`HTTP ${response.status}`)
  return response.json()
}

export const api = {
  getUsers: () => request<User[]>('/api/users'),
  createUser: (data: { name: string; email: string }) => 
    request('/api/users', { method: 'POST', body: JSON.stringify(data), headers: { 'Content-Type': 'application/json' } })
}
