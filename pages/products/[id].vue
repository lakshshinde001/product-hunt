<template>
    <section class="max-w-4xl mx-auto py-10 px-4">
        <div v-if="product">
            <Card class="p-6 bg-background shadow rounded-xl border">
                <CardHeader>
                    <CardTitle class="text-2xl font-bold">
                        {{ product.name }}
                    </CardTitle>
                    <p class="text-muted-foreground">{{ product.tagline }}</p>
                </CardHeader>

                <CardContent class="space-y-4 flex justify-between w-full gap-6">

                    <div class="w-1/2 space-y-4">
                        <div>
                            <img v-if="product.logo" :src="product.logo" alt="Product logo"
                                class="w-48 h-48 object-contain" />
                            <p>{{ product.description }}</p>
                        </div>

                        <div class="flex gap-2 items-center text-sm text-muted-foreground">
                            <a :href="product.website" target="_blank" class="text-blue-500 underline">
                                Visit Website
                            </a>
                            <span>• Submitted by: {{ product.user?.fullname || 'Unknown' }}</span>
                        </div>
                    </div>


                    <div class="w-1/2">
                        <div class="flex items-center gap-4 mt-2">
                            <Button @click="handleUpvote" class="">
                                🔥 Upvote ({{ product.upvotesCount || 0 }})
                            </Button>
                        </div>

                        <div>
                            <h3 class="text-lg font-semibold mt-6 mb-2">Comments</h3>

                            <form @submit.prevent="addComment" class="space-y-2 mb-4">
                                <Textarea v-model="commentText" placeholder="Write a comment..." rows="3" />
                                <Button type="submit">Post Comment</Button>
                            </form>

                            <div v-if="product.comments?.length" class="space-y-3">
                                <div v-for="comment in product.comments" :key="comment._id"
                                    class="p-3 border rounded-md">
                                    <p class="text-sm text-muted-foreground">
                                        {{ comment.user?.fullname || 'User' }}
                                    </p>
                                    <p>{{ comment.text }}</p>
                                </div>
                            </div>

                            <p v-else class="text-sm text-muted-foreground">No comments yet.</p>
                        </div>
                    </div>
                </CardContent>

            </Card>
        </div>
    </section>
</template>


<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { PRODUCT_API } from '@/constants/constant'
import { useUserStore } from '@/stores/userStore'

const route = useRoute()
const productId = route.params.id
const product = ref(null)
const comments = ref([])
const commentText = ref('')
const userStore = useUserStore()

const fetchProduct = async () => {
    try {
        const res = await $fetch(`${PRODUCT_API}/${productId}`)


        product.value = {
            ...res.product,
            comments: res.product.comments || [],
            upvotesCount: res.product.upvotesCount || 0,
        }
        console.log('Fetched product:', product.value)
    } catch (error) {
        console.error('Failed to fetch product', error)
    }
}


const fetchComments = async () => {
    //   try {
    //     const res = await $fetch(`${COMMENT_API}?productId=${productId}`)
    //     comments.value = res.comments
    //   } catch (error) {
    //     console.error('Failed to fetch comments', error)
    //   }
}

const handleUpvote = async () => {
    //   try {
    //     await $fetch(`${PRODUCT_API}/${productId}/upvote`, {
    //       method: 'POST',
    //       headers: {
    //         Authorization: `Bearer ${userStore.token}`,
    //       },
    //     })
    //     // product.value.upvotes++
    //   } catch (error) {
    //     alert('Login to upvote.')
    //   }
}

const addComment = async () => {
    //   if (!commentText.value.trim()) return

    //   try {
    //     const res = await $fetch(`${COMMENT_API}`, {
    //       method: 'POST',
    //       body: {
    //         text: commentText.value,
    //         productId,
    //       },
    //       headers: {
    //         Authorization: `Bearer ${userStore.token}`,
    //       },
    //     })
    //     comments.value.push(res.comment)
    //     commentText.value = ''
    //   } catch (error) {
    //     alert('Login to comment.')
    //   }
}

onMounted(() => {
    fetchProduct()
    //   fetchComments()
})
</script>
