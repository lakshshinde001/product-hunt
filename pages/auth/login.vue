<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-background px-4">
    <Card class="w-full max-w-md shadow-xl">
      <CardHeader>
        <CardTitle class="text-2xl font-bold text-center">Login</CardTitle>
        <CardDescription class="text-center text-muted-foreground">
          Welcome back! Please login to continue.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form @submit.prevent="handleLogin" class="space-y-4">
          <FormField label="Email">
            <Input
              v-model="form.email"
              type="email"
              placeholder="you@example.com"
              required
            />
          </FormField>

          <FormField label="Password">
            <Input
              v-model="form.password"
              type="password"
              placeholder="••••••••"
              required
            />
          </FormField>

          <Button class="w-full" type="submit" :loading="loading">
            Login
          </Button>
        </form>
      </CardContent>

      <CardFooter class="text-center text-sm text-muted-foreground">
        Don’t have an account?
        <NuxtLink to="/auth/register" class="text-blue-500 ml-1 hover:underline">
          Register
        </NuxtLink>
      </CardFooter>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import  FormField  from '@/components/ui/form-field'
import { useUserStore } from '@/stores/userStore' 
// import {USER_API} from '@/constants/constant'
import { useApi } from '@/composables/useApi'
const { USER_API } = useApi();

const form = ref({
  email: '',
  password: '',
})

const loading = ref(false)
const router = useRouter()
const userStore = useUserStore()

interface LoginResponse {
  token: string;
  user: {
    email: string;
    fullname: string;
  };
}

const handleLogin = async () => {
  try {
    loading.value = true
    
    const res = await $fetch<LoginResponse>(`${USER_API}/login`, {
      method: 'POST',
      body: form.value,
    })

    console.log('Login response:', res)

    userStore.setUser({
      token: res.token,
      email: res.user.email,
      fullname : res.user.fullname
    })

    router.push('/')
  } catch (err) {
    alert('Login failed')
  } finally {
    loading.value = false
  }
}
</script>
