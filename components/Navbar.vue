<template>
  <header class="w-full px-4 py-3  bg-white dark:bg-background shadow-sm fixed ">
    <nav class="max-w-6xl mx-auto flex items-center justify-between">



      <div class="flex items-center justify-between gap-6">
        <NuxtLink to="/" class="text-xl font-bold  text-[#FF6154]">
          ProductHunt
        </NuxtLink>

        <div class="relative w-full max-w-xs">
          <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
            🔍
          </span>
          <input type="text" placeholder="Search CTRL + K"
            class="pl-9 pr-3 py-1.5 w-full border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" />
        </div>
      </div>

      <div class="flex gap-8 items-center text-gray-800 font-medium">
  <div class="flex items-center gap-1 cursor-pointer hover:text-[#FF6154]">
    Launches
    <span class="text-sm">▼</span>
  </div>
  <div class="flex items-center gap-1 cursor-pointer hover:text-[#FF6154]">
    Products
    <span class="text-sm">▼</span>
  </div>
  <div class="flex items-center gap-1 cursor-pointer hover:text-[#FF6154]">
    News
    <span class="text-sm">▼</span>
  </div>
  <div class="flex items-center gap-1 cursor-pointer hover:text-[#FF6154]">
    Forums
    <span class="text-sm">▼</span>
  </div>
  <div class="cursor-pointer hover:text-[#FF6154]">
    Advertise
  </div>
</div>




      <div class="flex items-center gap-6">
        


        <NuxtLink to="/subscribe" class="text-sm  text-[#FF6154] font-medium hover:text-primary transition">
          <button
            class="flex items-center gap-2 border border-gray-300 rounded-full px-4 py-2 text-gray-800 hover:bg-gray-100 transition">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12H8m0 0l4-4m-4 4l4 4" />
            </svg>
            Subscribe
          </button>
        </NuxtLink>

        <template v-if="isLoggedIn">
          <DropdownMenu>
            <DropdownMenuTrigger class="flex items-center gap-2 cursor-pointer">
              <img src="https://api.dicebear.com/7.x/initials/svg?seed=U" alt="User" class="w-8 h-8 rounded-full" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem @click="navigateTo('/user/profile')">Profile</DropdownMenuItem>
             
              <DropdownMenuItem @click="navigateTo('/submit')">Upload Product</DropdownMenuItem>
               <DropdownMenuItem @click="logout">Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </template>

        <template v-else>
          <NuxtLink to="/auth/login" class="text-sm font-medium hover:text-primary transition">
            <button
              class="flex items-center gap-2 bg-red-500 text-white rounded-full px-5 py-2 hover:bg-red-600 transition">
             
              Sign in
            </button>
          </NuxtLink>
        </template>
      </div>

    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'

const router = useRouter()
const userStore = useUserStore()

const isLoggedIn = computed(() => userStore.isLoggedIn)

const logout = () => {
  userStore.clearUser()
  router.push('/auth/login')
}
</script>
