<template>
  <div class="pt-10">
    <section class="max-w-6xl mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-6"> Explore Products</h1>
      <ProductList :products="products" />
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Navbar from '@/components/Navbar.vue'
import HeroSection from '@/components/HeroSection.vue'
import ProductList from '@/components/ProductList.vue'
import { PRODUCT_API } from '@/constants/constant'

const products = ref([])

const fetchProducts = async () => {
  try {
    const response = await $fetch(`${PRODUCT_API}`) 
    
    products.value = response.products.map(product => ({
      ...product,
      comments: product.comments || []
    }))
    console.log('Fetched products:', products.value)
  } catch (err) {
    console.error('Failed to fetch products:', err)
  }
}


onMounted(() => {
  fetchProducts()
})
</script>
