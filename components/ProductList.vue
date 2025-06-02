<template>
  <div class="space-y-4">
    <div class="flex items-center gap-4">
        <select v-model="selectedCategory" class="border rounded p-2 text-sm">
          <option value="">All Categories</option>
          <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
        </select>

      <select v-model="sortBy" class="border rounded p-2 text-sm">
        <option value="latest">Latest</option>
        <option value="trending">Trending</option>
      </select>
    </div>

    <div class=" flex flex-col gap-4">
      <ProductCard
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import ProductCard from './ProductCard.vue'
import { ref, computed } from 'vue'

const props = defineProps<{ products: any[] }>()

const selectedCategory = ref('')
const sortBy = ref('latest')

const categories = [...new Set(props.products.map(p => p.category))]
console.log('Categories:', categories)

const filteredProducts = computed(() => {
  let list = [...props.products]

  if (selectedCategory.value) {
    list = list.filter(p => p.category === selectedCategory.value)
  }

  if (sortBy.value === 'trending') {
    list.sort((a, b) => b.upvotes - a.upvotes)
  } else {
    list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }

  return list
})
</script>
