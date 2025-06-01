<template>
  <header class="w-full px-4 py-3 bg-white dark:bg-background shadow-sm">
    <nav class="max-w-6xl mx-auto flex items-center justify-between">
      <!-- Logo -->
      <NuxtLink to="/" class="text-xl font-bold text-primary">
         ProductHuntClone
      </NuxtLink>

      <!-- Links -->
      <div class="flex items-center gap-6">
        <NuxtLink to="/products" class="text-sm font-medium hover:text-primary transition">
          Products
        </NuxtLink>
        <NuxtLink to="/subscribe" class="text-sm font-medium hover:text-primary transition">
          Subscribe
        </NuxtLink>

        <template v-if="isLoggedIn">
          <!-- Profile dropdown -->
          <DropdownMenu>
            <DropdownMenuTrigger class="flex items-center gap-2 cursor-pointer">
              <img src="https://api.dicebear.com/7.x/initials/svg?seed=U" alt="User" class="w-8 h-8 rounded-full" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem @click="navigateTo('/profile')">Profile</DropdownMenuItem>
              <DropdownMenuItem @click="logout">Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </template>

        <template v-else>
          <NuxtLink to="/auth/login" class="text-sm font-medium hover:text-primary transition">
            Login
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
