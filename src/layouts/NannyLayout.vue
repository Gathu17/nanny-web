<template>
  <div class="overflow-hidden">
    <nav class="bg-white shadow-lg h-[8vh] w-full">
      <div class="max-w-6xl pl-4">
        <div class="flex justify-between">
          <!-- Logo -->
          <div class="flex space-x-7">
            <div>
              <a href="#" class="flex items-center  px-2">
                <img src="@/assets/images/nanny-logo.png" alt="Logo" class="h-20 w-48 mr-2">
                <!-- <span class="font-semibold text-gray-500 text-lg"
                  >Nanny App</span
                > -->
                <div>
          </div>
              </a>
            </div>
          </div>

        
          <ul class="flex justify-around items-center w-[60%] mx-auo space-x-4 mr-10">
            <li class="mr-2 whitespace-nowrap cursor-pointer">
              <NuxtLink to="/nanny/dashboard" class="hover:text-pink" :class="{ 'text-pink': route.path == '/nanny/dashboard' }">Find a Job</NuxtLink>
            </li>
            <li class="mr-2 cursor-pointer">
              <NuxtLink to="/nanny/bookings" class="hover:text-pink" :class="{ 'text-pink': $route.path === '/nanny/bookings' }">Bookings</NuxtLink>
            </li>
            <li class="mr-2 cursor-pointer">
              <NuxtLink to="/nanny/messages" class="hover:text-pink" :class="{ 'text-pink': $route.path === '/nanny/messages' }">Messages</NuxtLink>
            </li>
           
            <input
            type="text"
            placeholder="🔍 Search"
            class="rounded border w-[60%] pl-2 focus:border-pink-400"
            />
            <font-awesome-icon
              :icon="['far', 'bell']"
              class="w-[10%] mr-5 ml-10"
            />
            <div class="1">
            <div class="relative">
              <font-awesome-icon
                @click="toggleDropdown"
                :icon="['fas', 'user']"
                class="w-[25%] ml-5 rounded-full bg-gray-200 hover:bg-gray-300 p-2 cursor-pointer"
              />
              <div v-if="showDropdown" class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                <NuxtLink to="/nanny/profile" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  My Profile
                </NuxtLink>
                <button @click="logout" class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Logout
                </button>
              </div>
            </div>
            </div>
          </ul>

          <!-- Mobile menu button -->
          <div class="md:hidden flex items-center">
            <button class="outline-none mobile-menu-button">
              <svg
                class="w-6 h-6 text-gray-500 hover:text-green-500"
                x-show="!showMenu"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
    <slot />
  </div>
</template>
<script lang="ts" setup>
import {useRoute} from 'vue-router'
const route = useRoute()
const showDropdown = ref(false)

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}

const logout = () => {
  // TODO: Implement logout logic
  navigateTo('/login')
}

// Close dropdown when clicking outside
onMounted(() => {
  document.addEventListener('click', (e) => {
    const dropdown = document.querySelector('.relative')
    if (dropdown && !dropdown.contains(e.target as Node)) {
      showDropdown.value = false
    }
  })
})

onUnmounted(() => {
  document.removeEventListener('click', () => {})
})

</script>
