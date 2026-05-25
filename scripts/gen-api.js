import { execSync } from 'child_process'
import { writeFileSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// 读取 swagger.json（实际项目中可改为 fetch 远程地址）
const swaggerPath = path.resolve(__dirname, './swagger.json')

// 方式1：使用 openapi-typescript 生成纯类型
execSync(`npx openapi-typescript ${swaggerPath} --output src/api/generated/types.ts`, { stdio: 'inherit' })

// 方式2：使用 @hey-api 生成请求函数（需要额外配置）
console.log('✅ API类型已生成到 src/api/generated/types.ts')

// 生成一个简单的请求客户端包装
const clientTemplate = `// 自动生成，请勿手动修改
import type { paths } from './types'

export type User = paths['/api/users']['get']['responses']['200']['content']['application/json'][0]

// 基础请求封装
const request = async <T>(url: string, options?: RequestInit): Promise<T> => {
  const response = await fetch(url, options)
  if (!response.ok) throw new Error(\`HTTP \${response.status}\`)
  return response.json()
}

export const api = {
  getUsers: () => request<User[]>('/api/users'),
  createUser: (data: { name: string; email: string }) => 
    request('/api/users', { method: 'POST', body: JSON.stringify(data), headers: { 'Content-Type': 'application/json' } })
}
`

writeFileSync(path.resolve(__dirname, '../src/api/generated/client.ts'), clientTemplate)
console.log('✅ API客户端已生成到 src/api/generated/client.ts')
