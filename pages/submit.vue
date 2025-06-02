<template>
  <section class="h-screen pt-10 w-full flex items-center justify-center bg-background px-4">
    <Card class="p-6 w-2/3 bg-background shadow rounded-xl border">
      <CardHeader>
        <CardTitle class="text-3xl font-bold">Submit Your Product </CardTitle>
      </CardHeader>

      <CardContent>
        <form @submit.prevent="handleSubmit" class="space-y-6">
          
          <div>
            <label class="block text-sm font-medium mb-1" for="name">Product Name</label>
            <Input id="name" v-model="form.name" placeholder="e.g. AI Writer" />
          </div>

         
          <div>
            <label class="block text-sm font-medium mb-1" for="tagline">Tagline</label>
            <Input id="tagline" v-model="form.tagline" placeholder="Short catchy tagline" />
          </div>

          <div>
            <label class="block text-sm font-medium mb-1" for="description">Description</label>
            <Textarea id="description" v-model="form.description" placeholder="Describe your product..." rows="4" />
          </div>

          
          <div>
            <label class="block text-sm font-medium mb-1" for="website">Website URL</label>
            <Input id="website" v-model="form.website" placeholder="https://yourproduct.com" />
          </div>

         
          <div>
            <label class="block text-sm font-medium mb-1" for="logo">Logo / Image</label>
            <Input type="file" id="logo" @change="handleFileUpload" />
          </div>

          <div>
            <label class="block text-sm font-medium mb-1" for="category">Category</label>
            <Select v-model="form.category">
              <SelectTrigger>
                <SelectValue placeholder="Choose category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="AI">AI</SelectItem>
                <SelectItem value="SaaS">SaaS</SelectItem>
                <SelectItem value="Devtools">Devtools</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

       
          <Button type="submit" class="w-full mt-4">Submit Product</Button>
        </form>
      </CardContent>
    </Card>
  </section>
</template>

<script setup>
import { ref, onBeforeMount  } from 'vue'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import { PRODUCT_API } from '@/constants/constant'


import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const router = useRouter()
const userStore = useUserStore()


onBeforeMount(() => {
  if (!userStore.isLoggedIn) {
   alert('You must be logged in to submit a product.')
    router.push('/auth/login')
  }
})

const form = ref({
  name: '',
  tagline: '',
  description: '',
  website: '',
  logo: null,
  category: '',
})
const loading = ref(false)

function handleFileUpload(event) {
  const file = event.target.files[0]
  if (file) {
    form.value.logo = file
  }
}

const  handleSubmit = async () =>  {
  if (!form.value.name || !form.value.tagline || !form.value.description || !form.value.website || !form.value.category || !form.value.logo) {
    alert('All fields are required.')
    return
  }

  try {
    loading.value = true
    const formData = new FormData()

    formData.append('name', form.value.name)
    formData.append('tagline', form.value.tagline)
    formData.append('description', form.value.description)
    formData.append('website', form.value.website)
    formData.append('category', form.value.category)
    formData.append('logo', form.value.logo)

    const token = userStore.token 
    console.log(token)

    const res = await fetch(`${PRODUCT_API}/submit`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    })

    const data = await res.json()

    if (res.ok) {
      alert('Product submitted successfully.')
      router.push('/')
    } else {
      alert(data.message || 'Submission failed.')
    }
  } catch (err) {
    console.error(err)
    alert('Something went wrong.')
  } finally {
    loading.value = false
  }
}
</script>
