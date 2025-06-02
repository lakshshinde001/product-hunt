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
console.log("Products :", props.products)
const categories = computed(() => [...new Set(props.products.map(p => p.category))])



const filteredProducts = computed(() => {
  let list = [...props.products]

  if (selectedCategory.value) {
    list = list.filter(p => p.category === selectedCategory.value)
  }

  if (sortBy.value === 'trending') {
    list.sort((a, b) => (b.upvotes?.length || 0) - (a.upvotes?.length || 0))
  } else {
    list.sort(
      (a, b) =>
        new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
    )
  }

  return list
})

</script>
