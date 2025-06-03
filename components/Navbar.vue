<template>
  <header class="w-full px-4 py-3 bg-white dark:bg-background shadow-sm fixed z-50">
    <nav class="max-w-6xl mx-auto flex items-center justify-between">

    
      <div class="flex items-center gap-4 flex-1">
        <NuxtLink to="/" class="text-xl font-bold text-[#FF6154]">
          ProductHunt
        </NuxtLink>
        <div class="hidden sm:block relative w-full max-w-xs">
          <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">🔍</span>
          <input
            type="text"
            placeholder="Search CTRL + K"
            class="pl-9 pr-3 py-1.5 w-full border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>


      <div class="hidden lg:flex gap-8 items-center text-gray-800 font-medium">
        <div class="flex items-center gap-1 cursor-pointer hover:text-[#FF6154]">Launches <span class="text-sm">▼</span></div>
        <div class="flex items-center gap-1 cursor-pointer hover:text-[#FF6154]">Products <span class="text-sm">▼</span></div>
        <div class="flex items-center gap-1 cursor-pointer hover:text-[#FF6154]">News <span class="text-sm">▼</span></div>
        <div class="flex items-center gap-1 cursor-pointer hover:text-[#FF6154]">Forums <span class="text-sm">▼</span></div>
        
      </div>

     
      <div class="hidden sm:flex items-center gap-4 ml-3">
        <NuxtLink to="/subscribe" class="text-sm text-[#FF6154] font-medium hover:text-primary transition">
          <button class="flex items-center gap-2 border border-gray-300 rounded-full px-4 py-2 text-gray-800 hover:bg-gray-100 transition">
            
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
          <NuxtLink to="/auth/login">
            <button class="flex items-center gap-2 bg-red-500 text-white rounded-full px-5 py-2 hover:bg-red-600 transition">
              Sign in
            </button>
          </NuxtLink>
        </template>
      </div>

     
      <button @click="toggleMobileMenu" class="lg:hidden ml-4 sm:ml-2 text-gray-700 focus:outline-none">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </nav>


    <div v-if="isMobileMenuOpen" class="lg:hidden mt-4 px-4 space-y-4 text-gray-800 font-medium">
      <div class="flex flex-col gap-2">
        <div class="cursor-pointer hover:text-[#FF6154]">Launches</div>
        <div class="cursor-pointer hover:text-[#FF6154]">Products</div>
        <div class="cursor-pointer hover:text-[#FF6154]">News</div>
        <div class="cursor-pointer hover:text-[#FF6154]">Forums</div>
        <div class="cursor-pointer hover:text-[#FF6154]">Advertise</div>
      </div>

      <div class="sm:hidden block relative w-full max-w-full">
        <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">🔍</span>
        <input
          type="text"
          placeholder="Search CTRL + K"
          class="pl-9 pr-3 py-1.5 w-full border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      <div>
        <NuxtLink to="/subscribe" class="text-sm text-[#FF6154] font-medium hover:text-primary transition">
          <button class="w-full border border-gray-300 rounded-full px-4 py-2 text-gray-800 hover:bg-gray-100 transition">Subscribe</button>
        </NuxtLink>
        <div class="mt-2">
          <template v-if="isLoggedIn">
            <div class="space-y-2">
              <div @click="navigateTo('/user/profile')" class="cursor-pointer hover:text-[#FF6154]">Profile</div>
              <div @click="navigateTo('/submit')" class="cursor-pointer hover:text-[#FF6154]">Upload Product</div>
              <div @click="logout" class="cursor-pointer hover:text-[#FF6154]">Logout</div>
            </div>
          </template>
          <template v-else>
            <NuxtLink to="/auth/login">
              <button class="w-full bg-red-500 text-white rounded-full px-4 py-2 hover:bg-red-600 transition">
                Sign in
              </button>
            </NuxtLink>
          </template>
        </div>
      </div>
    </div>
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

const isMobileMenuOpen = ref(false)
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}
</script>
