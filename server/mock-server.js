import express from 'express'

const app = express()
app.use(express.json())

let users = [
  { id: 1, name: '张三', email: 'zhangsan@example.com' },
  { id: 2, name: '李四', email: 'lisi@example.com' },
]

app.get('/api/users', (req, res) => {
  res.json(users)
})

app.post('/api/users', (req, res) => {
  const newUser = { id: users.length + 1, ...req.body }
  users.push(newUser)
  res.json(newUser)
})

app.listen(3001, () => {
  console.log('Mock API服务器运行在 http://localhost:3001')
})