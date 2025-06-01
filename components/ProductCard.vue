<template>
  <div class="p-4 border rounded-xl shadow hover:shadow-md transition">
    <h2 class="text-lg font-semibold">{{ product.name }}</h2>
    <p class="text-muted-foreground text-sm mb-2">{{ product.tagline }}</p>
    <div class="text-sm flex items-center justify-between">
      <span class="bg-muted px-2 py-1 rounded text-xs">{{ product.category }}</span>
      <span>🔥 {{ product.upvotes }} upvotes</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ product: any }>()
</script>
