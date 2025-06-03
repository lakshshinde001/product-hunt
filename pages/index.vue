<template>
  <div class="pt-20 w-full  flex flex-col md:flex-row p-4 md:p-10 gap-6">
    <section class="w-full md:w-2/3 max-w-6xl mx-auto px-4 py-6">
      <h1 class="text-3xl font-bold mb-6">Explore Products</h1>
      <ProductList :products="products" />
    </section>

   
    <section class="w-full md:w-1/3 px-4 space-y-6 pt-20">
      <h2>Trending 🔥</h2>
      <div
        v-for="i in 5"
        :key="i"
        class="border rounded-lg  shadow-sm p-4 bg-white hover:border hover:border-[#f97316]"
      >
        <h3 class="text-lg font-semibold mb-2 text-black hover:text-orange-500 cursor-pointer">
          😶‍🌫️ p/indiecursh
        </h3>
        <p class="text-sm text-gray-600 mb-4 hover:text-orange-500 cursor-pointer">
          from zero to 500 users: how I <br />
          launched indieCrush Solo
        </p>
        <div class="text-right text-sm text-gray-500">
          <span class="hover:text-orange-500 cursor-pointer">upvote(56)</span> ·
          <span class="hover:text-orange-500 cursor-pointer">💬 (16)</span> ·
          <span class="hover:text-orange-500 cursor-pointer">7 Online 🟢</span>
        </div>
      </div>
    </section>
  </div>
  <Footer />
</template>

<script setup>
import { ref, onMounted } from 'vue'

import ProductList from '@/components/ProductList.vue'
import Footer from '@/components/Footer.vue'

import {useApi} from '@/composables/useApi'

const { PRODUCT_API } = useApi();


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
