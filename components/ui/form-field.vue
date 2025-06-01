<template>
  <div class="grid gap-1">
    <label class="text-sm font-medium text-foreground">{{ label }}</label>
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{ label: string }>()
</script>