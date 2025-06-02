<template>
  <footer class="bg-gray-100 border-t mt-10">
    <div class="max-w-6xl mx-auto px-4 py-8 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600">
      <p class="mb-4 sm:mb-0">&copy; {{ currentYear }} ProductHunt . All rights reserved.</p>
      <div class="flex space-x-6">
        <NuxtLink to="#" class="hover:text-orange-500 transition">Privacy Policy</NuxtLink>
        <NuxtLink to="#" class="hover:text-orange-500 transition">Terms of Service</NuxtLink>
        <NuxtLink to="#" class="hover:text-orange-500 transition">Contact</NuxtLink>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>
