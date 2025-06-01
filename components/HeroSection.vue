<template>
  <section class="w-full bg-background py-16 border-b">
    <div class="max-w-6xl mx-auto px-4 flex flex-col items-center text-center">
      <h1 class="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight mb-4">
        Discover & Launch New Tech Products 
      </h1>
      <p class="text-muted-foreground text-lg max-w-2xl mb-6">
        Join the community of makers and early adopters. Explore trending tools in AI, Devtools, SaaS, and more.
      </p>
      <div class="flex flex-col sm:flex-row gap-4">
        <NuxtLink
          to="/submit"
          class="inline-flex items-center justify-center px-6 py-3 text-sm font-medium bg-primary text-white rounded-xl hover:bg-primary/90 transition"
        >
          Submit a Product
        </NuxtLink>
        <NuxtLink
          to="/products"
          class="inline-flex items-center justify-center px-6 py-3 text-sm font-medium border border-input rounded-xl hover:bg-muted transition"
        >
          Explore Products
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
