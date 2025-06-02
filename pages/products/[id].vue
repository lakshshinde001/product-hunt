<template>
    <section class=" pt-20 max-w-4xl mx-auto py-10 px-4 ">
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
                                class="w-72 h-72 object-contain" />
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
  <Button
    @click="toggleVote"
    :class="hasUpvoted ? 'bg-white text-black hover:bg-red-500 hover:text-white' : ''"
  >
    🔥 {{ hasUpvoted ? 'Unvote' : 'Upvote' }} ({{ product.upvotesCount || 0 }})
  </Button>
</div>

                        <div>
                            <h3 class="text-lg font-semibold mt-6 mb-2">Comments</h3>

                            <form @submit.prevent="addComment" class="space-y-2 mb-4">
                                <Textarea v-model="commentText" placeholder="Write a comment..." rows="3" />
                                <Button type="submit">Post Comment</Button>
                            </form>

                            <div v-if="product.comments?.length" class="space-y-3 overflow-y-auto max-h-80 pr-2">
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
// import { COMMENT_API, PRODUCT_API } from '@/constants/constant'
import { useUserStore } from '@/stores/userStore'

import { useApi } from '@/composables/useApi'

const { PRODUCT_API, COMMENT_API } = useApi()

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



const hasUpvoted = ref(false);



const toggleVote = async () => {
  if (!userStore.isLoggedIn) {
    alert('Please login to vote.');
    return;
  }

  try {
    const endpoint = hasUpvoted.value ? 'unvote' : 'upvote';
    const response = await $fetch(`${PRODUCT_API}/${productId}/${endpoint}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${userStore.token}`,
      },
    });

    if (response.success) {
      if (hasUpvoted.value) {
        product.value.upvotesCount -= 1;
        hasUpvoted.value = false;
      } else {
        product.value.upvotesCount += 1;
        hasUpvoted.value = true;
      }
    } else {
      alert(response.message || 'Vote action failed.');
    }
  } catch (error) {
    const errorMessage = error?.response?._data?.message || 'Something went wrong.';
    console.error('Vote failed:', errorMessage);
    alert('Error: ' + errorMessage);
  }
};



const addComment = async () => {
  if (!userStore.isLoggedIn) {
    alert("Please login to comment.");
    return;
  }

  if (!commentText.value.trim()) {
    alert("Comment cannot be empty.");
    return;
  }

  try {
    const response = await $fetch(`${COMMENT_API}/${productId}/add`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${userStore.token}`,
      },
      body: {
        text: commentText.value,
        // parentCommentId: parentId.value || null,
      },
    });

    if (response.success) {
      product.value.comments.push(response.comment);
      await fetchProduct();
      commentText.value = ""; 
    } else {
      alert(response.message || "Failed to post comment.");
    }
  } catch (error) {
    console.error("Add comment error:", error);
    alert("Something went wrong while posting the comment.");
  }
};


onMounted(() => {
    fetchProduct()
    
})
</script>
