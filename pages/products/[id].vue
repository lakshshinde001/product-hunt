<template>
  <section class=" pt-20 max-w-4xl mx-auto py-10 px-4 ">
    <div v-if="product">
      <Card class="p-6 bg-background shadow rounded-xl border">
        <CardHeader class="flex items-center justify-between">
          <div>
            <CardTitle class="text-6xl font-bold">
              {{ product.name }}
            </CardTitle>
            <p class="text-muted-foreground pt-5">{{ product.tagline }}</p>
          </div>
          <div class="flex items-center gap-4 mt-2">
            <Button @click="toggleVote"
              :class="hasUpvoted ? 'bg-white border-black border text-black hover:bg-red-500 hover:text-white' : ' bg-[#FF6154] hover:bg-white hover:text-black hover:border-black border text-white'">
              🔥 {{ hasUpvoted ? 'Unvote' : 'Upvote' }} ({{ product?.upvotesCount || 0 }}) Points
            </Button>


          </div>
        </CardHeader>

        <CardContent class="space-y-4 flex flex-col justify-between w-full gap-6">

          <div class="w-full space-y-4">
            <div>
              <img v-if="product.logo" :src="product.logo" alt="Product logo" class="w-72 h-72 object-contain" />
              <p>{{ product.description }}</p>
            </div>

            <div class="flex gap-2 items-center text-sm text-muted-foreground">
              <a :href="product.website" target="_blank" class="text-blue-500 underline">
                Visit Website
              </a>
              <span>• Submitted by: {{ product.user?.fullname || 'Unknown' }}</span>
            </div>
          </div>


          <div class="w-full">


            <div>
              <h3 class="text-lg font-semibold mt-6 mb-2">Comments</h3>

              <form @submit.prevent="addComment" class="space-y-2 mb-4">
                <Textarea v-model="commentText" placeholder="Write a comment..." rows="3" />
                <Button type="submit" class="bg-[#FF6154]">Post Comment</Button>
              </form>

              <div v-if="product.comments?.length" class="space-y-3 overflow-y-auto max-h-80 pr-2">
                <div v-for="comment in product.comments" :key="comment._id" class="p-3 border rounded-md">
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

const hasUpvoted = ref(false);


const fetchProduct = async () => {
  try {
    const res = await $fetch(`${PRODUCT_API}/${productId}`);
    product.value = {
      ...res.product,
      comments: res.product.comments || [],
      upvotesCount: res.product.upvotesCount || 0,
      upvotes: res.product.upvotes || [],
    };
    updateHasUpvoted();
  } catch (error) {
    console.error('Failed to fetch product', error);
  }
};






const updateHasUpvoted = () => {
  console.log("hasopted", hasUpvoted.value)
  console.log("ID ", userStore.userId)
  console.log("product", product.value?.upvotes)
  hasUpvoted.value = product.value?.upvotes?.includes(userStore.userId) || false;
  console.log("hasopted", hasUpvoted.value)
};


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
      await fetchProduct();
      updateHasUpvoted();
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


onMounted(async () => {

  fetchProduct();

});

</script>
