<template>
  <div class="min-h-screen pt-20 flex items-center justify-center bg-gray-100 dark:bg-background px-4">
    <Card class="w-full max-w-md shadow-xl">
      <CardHeader>
        <CardTitle class="text-2xl font-bold text-center">Create an account</CardTitle>
        <CardDescription class="text-center text-muted-foreground">
          Join the community and submit your favorite products.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form @submit.prevent="handleRegister" class="space-y-4">
          <FormField label="Name">
            <Input v-model="form.fullname" placeholder="John Doe" required />
          </FormField>

          <FormField label="Email">
            <Input v-model="form.email" type="email" placeholder="you@example.com" required />
          </FormField>

           <FormField label="Phone Number">
            <Input v-model="form.phoneNumber" type="number" placeholder="8484939393" required />
          </FormField>

          <FormField label="Password">
            <Input v-model="form.password" type="password" placeholder="••••••••" required />
          </FormField>

          <Button class="w-full bg-[#FF6154] hover:bg-[#FF6154] cursor-pointer" type="submit" :loading="loading">
            Register
          </Button>
        </form>
      </CardContent>

      <CardFooter class="text-center text-sm text-muted-foreground">
        Already have an account?
        <NuxtLink to="/auth/login" class="text-blue-500 ml-1 hover:underline">
          Login
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
// import { USER_API } from '~/constants/constant'
import { useApi } from '@/composables/useApi'
const { USER_API } = useApi();

const form = ref({
  fullname: '',
  email: '',
  password: '',
  phoneNumber : ''
})

const loading = ref(false)
const router = useRouter()

const handleRegister = async () => {
  try {
    loading.value = true
    
     const payload = {
      ...form.value,
      phoneNumber: Number(form.value.phoneNumber), // convert string to number
    }
  
    const res = await $fetch(`${USER_API}/register`, {
      method: 'POST',
      body: payload,
    }) as any

    if (res.success) {
      alert(res.message || 'Registration successful, Please login to continue')
      router.push('/auth/login')
    } else {
      alert(res.message || 'Registration failed')
    }
  } catch (err) {
    alert('Registration failed')
  } finally {
    loading.value = false
  }
}
</script>
