<template>
  <div class="app">
    <h1>自动化API生成 Demo</h1>
    
    <section>
      <h2>用户列表</h2>
      <button @click="fetchUsers">刷新</button>
      <ul v-if="users.length">
        <li v-for="user in users" :key="user.id">
          {{ user.name }} - {{ user.email }}
        </li>
      </ul>
      <div v-else>加载中...</div>
    </section>

    <section>
      <h2>创建用户</h2>
      <input v-model="newUser.name" placeholder="姓名" />
      <input v-model="newUser.email" placeholder="邮箱" />
      <button @click="createUser">提交</button>
    </section>

    <section>
      <h2>自动导入示例</h2>
      <p>ref、computed、watch 都不需要手动导入</p>
      <button @click="showMessage">点击测试</button>
    </section>
  </div>
</template>

<script setup lang="ts">
// 注意：ref、computed、onMounted 都没有手动导入！
import { api, type User } from './api/generated/client'

const users = ref<User[]>([])
const newUser = reactive({ name: '', email: '' })

const fetchUsers = async () => {
  try {
    const data = await api.getUsers()
    users.value = data
    console.log('获取用户成功', data)
  } catch (error) {
    console.error('获取失败', error)
  }
}

const createUser = async () => {
  if (!newUser.name || !newUser.email) return
  try {
    await api.createUser({ name: newUser.name, email: newUser.email })
    newUser.name = ''
    newUser.email = ''
    fetchUsers()
  } catch (error) {
    console.error('创建失败', error)
  }
}

const showMessage = () => {
  alert('自动导入测试成功！')
}

onMounted(() => {
  fetchUsers()
})
</script>

<style scoped>
.app { max-width: 600px; margin: 0 auto; padding: 20px; }
section { margin: 20px 0; padding: 15px; border: 1px solid #ddd; border-radius: 8px; }
input { margin: 0 10px 10px 0; padding: 5px; }
button { padding: 5px 15px; cursor: pointer; }
ul { list-style: none; padding: 0; }
li { padding: 8px; border-bottom: 1px solid #eee; }
</style>  