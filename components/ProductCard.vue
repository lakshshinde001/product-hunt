<template>
  <NuxtLink :to="`/products/${product._id}`" class="block">
  <div class="p-4 border rounded-xl shadow hover:shadow-md transition w-full">
    <div class="flex gap-4 items-center justify-between">
      <div class="flex gap-4"> 
        <div>
           <img :src="product.logo" alt="" class="w-10 h-10 object-cover rounded-md mb-4" />
        </div>
       <div>
         <h2 class="text-lg font-semibold">{{ product.name }}</h2>
        <p class="text-muted-foreground text-sm mb-2">{{ product.tagline }}</p>
        <p class="bg-muted px-2 py-1 rounded text-xs">{{ product.category }}</p>
       </div>
       
      </div>
      <div class="flex items-center gap-4 text-sm text-muted-foreground mt-2">
        <div class="flex items-center gap-1 p-3 border rounded-md ">
          <ArrowUp class="w-4 h-4" />
          <span>{{ product.upvotesCount || 0 }}</span>
        </div>
        <div class="flex items-center gap-1 p-3 border rounded-md">

          <MessageCircle class="w-4 h-4" />
          <span>{{ product.comments.length }}</span>
        </div>
      </div>
    </div>


  </div>


</NuxtLink>
</template>

<script setup lang="ts">
import { ArrowUp, MessageCircle } from 'lucide-vue-next'

defineProps<{ product: any }>()
</script>
