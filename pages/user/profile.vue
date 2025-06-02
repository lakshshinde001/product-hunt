<template>
    <section class="max-w-4xl mx-auto p-6 pt-20">
        <h1 class="text-3xl font-bold mb-6">My Profile</h1>

        <div class="flex flex-col items-center mb-12 border p-4 rounded-md shadow-sm">

            <div class=" w-48 h-48 rounded-full border-2 border-gray-300">
                <img src="https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-male-user-profile-vector-illustration-isolated-background-man-profile-sign-business-concept_157943-38764.jpg?semt=ais_hybrid&w=740"
                    alt="User Profile" class="object-cover w-48 h-48"
                    @error="event => event.target.src = '/default-profile.png'" />
            </div>
            <div class="flex flex-col items-center mt-4">
                <p><strong>Full Name:</strong> {{ userStore.fullname || 'N/A' }}</p>
                <p><strong>Email:</strong> {{ userStore.email || 'N/A' }}</p>
                <p><strong>Status:</strong> <span v-if="userStore.isLoggedIn">Logged In</span><span v-else>Guest</span>
                </p>
                <p><strong>Phone Number :</strong> <span>{{ userStore.phoneNumber }}</span></p>
            </div>
        </div>

        <div class="mb-12">
            <h2 class="text-2xl font-bold mb-6 text-gray-800"> Upvoted Products</h2>

            <div>
                

                <div v-if="upvotedProducts.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div v-for="product in upvotedProducts" :key="product._id"
                        class="bg-white border border-gray-200 rounded-2xl p-5 shadow-md hover:shadow-lg transition duration-300">
                        <h3 class="text-xl font-semibold mb-2">{{ product.name }}</h3>
                        <p class="text-gray-700 mb-3 line-clamp-3">{{ product.description }}</p>

                        <a :href="product.website" target="_blank" rel="noopener noreferrer"
                            class="inline-block font-medium">
                            Visit Website →
                        </a>
                    </div>
                </div>

                <p v-else class="text-gray-500 text-center mt-10">You haven't upvoted any products yet.</p>
            </div>


            <p v-if="!upvotedProducts.length" class="text-gray-500 italic mt-6">
                You haven't upvoted any products yet.
            </p>
        </div>


        <div>
            <h2>Products You Have Commented On</h2>
            <div v-if="commentedProducts.length === 0">You haven't commented on any products yet.</div>

            <div v-for="product in commentedProducts" :key="product._id"
                class="bg-white shadow-md rounded-lg p-6 mb-6 hover:shadow-lg transition-shadow duration-300">
                <div class="flex justify-between items-center mb-3">
                    <h3 class="text-2xl font-semibold text-[#FF6154]">{{ product.name }}</h3>
                    <span class="text-sm font-mediu bg-[#FF6154] text-white px-3 py-1 rounded-full">
                        {{ product.category }}
                    </span>
                </div>

                <p class="text-gray-600 italic mb-3">{{ product.tagline }}</p>

                <p class="text-sm text-gray-500 mb-4">
                    <strong>Owner:</strong> {{ product.user.fullname }}
                    (<a href="mailto:{{ product.user.email }}" class="text-[#FF6154] hover:underline">{{
                        product.user.email }}</a>)
                </p>

                <div>
                    <h4 class="text-lg font-semibold mb-2">Your Comments:</h4>
                    <ul class="space-y-3 max-h-60 overflow-y-auto">
                        <li v-for="comment in product.userComments" :key="comment._id"
                            class="border-l-4 text-[#FF6154] bg-orange-50 p-3 rounded-md">
                            <p class="text-gray-700">{{ comment.text }}</p>
                            <small class="text-gray-400">
                                {{ new Date(comment.createdAt).toLocaleString() }}
                            </small>
                        </li>
                    </ul>
                </div>
            </div>

        </div>
    </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'
import { useApi } from '@/composables/useApi'
const { USER_API } = useApi()

const userStore = useUserStore()
const router = useRouter()

if (!userStore.isLoggedIn) {
    alert('You must be logged in to view your profile.')
    router.push('/auth/login')
}



const upvotedProducts = ref([])
const commentedProducts = ref([])

const fetchUpvotedProducts = async () => {
    if (!userStore.isLoggedIn) return

    try {
        const response = await $fetch(`${USER_API}/upvote`, {
            headers: {
                Authorization: `Bearer ${userStore.token}`
            }
        })

        if (response.success) {
            upvotedProducts.value = response.products
        } else {
            console.error('Failed to fetch upvoted products:', response.message)
        }
    } catch (error) {
        console.error('Error fetching upvoted products:', error)
    }
}

const fetchCommentedProducts = async () => {
    try {
        const response = await $fetch(`${USER_API}/comments`, {
            headers: {
                Authorization: `Bearer ${userStore.token}`
            }
        })

        if (response.success) {
            commentedProducts.value = response.products
        } else {
            alert(response.message || 'Failed to fetch commented products.')
        }
    } catch (error) {
        console.error('Error fetching commented products:', error)
        alert('Error fetching commented products.')
    }
}

onMounted(() => {
    fetchUpvotedProducts()
    fetchCommentedProducts()
})


</script>