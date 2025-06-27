<template>
  <NuxtLayout name="client-layout">
    <div class="max-w-2xl mx-auto py-12 px-4">
      <h1 class="text-3xl font-bold mb-8 text-primary">My Profile</h1>
      <div v-if="user" class="bg-white rounded-xl shadow-md p-8">
        <div class="flex items-center mb-6">
          <div class="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-3xl font-bold text-primary mr-6">
            <span>
              {{ user.name ? user.name.charAt(0).toUpperCase() : "U" }}
            </span>
          </div>
          <div>
            <h2 class="text-2xl font-semibold">{{ user.name }}</h2>
            <p class="text-gray-500">{{ user.email }}</p>
          </div>
        </div>
        <div class="space-y-4">
          <div>
            <span class="font-medium text-gray-700">Name:</span>
            <span class="ml-2">{{ user.name }}</span>
          </div>
          <div>
            <span class="font-medium text-gray-700">Email:</span>
            <span class="ml-2">{{ user.email }}</span>
          </div>
          <div>
            <span class="font-medium text-gray-700">User Type:</span>
            <span class="ml-2 capitalize">{{ user.userType }}</span>
          </div>
          <div v-if="user.phone">
            <span class="font-medium text-gray-700">Phone:</span>
            <span class="ml-2">{{ user.phone }}</span>
          </div>
          <div v-if="user.address">
            <span class="font-medium text-gray-700">Address:</span>
            <span class="ml-2">{{ user.address }}</span>
          </div>
        </div>
      </div>
      <div v-else class="text-center py-12">
        <span class="text-gray-500">Loading profile...</span>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
const authStore = useAuthStore()
const user = computed(() => authStore.user)
</script>
