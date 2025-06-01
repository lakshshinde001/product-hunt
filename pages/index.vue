<template>
  <div>
    <Navbar />
    <HeroSection/>
    <section class="max-w-6xl mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-6">🚀 Explore Products</h1>
      <ProductList :products="products" />
    </section>
  </div>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue'
import HeroSection from '@/components/HeroSection.vue'
import ProductList from '@/components/ProductList.vue'

const products = ref([
  {
    id: 1,
    name: 'AI Writer',
    tagline: 'Generate content in seconds',
    category: 'AI',
    upvotes: 45,
    createdAt: new Date('2025-05-20'),
  },
  {
    id: 2,
    name: 'SaaS CRM',
    tagline: 'Manage leads and customers',
    category: 'SaaS',
    upvotes: 12,
    createdAt: new Date('2025-05-30'),
  },
  {
    id: 3,
    name: 'DevTools Pro',
    tagline: 'Boost your developer productivity',
    category: 'Devtools',
    upvotes: 66,
    createdAt: new Date('2025-05-28'),
  },
])
</script>
