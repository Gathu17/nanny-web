<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <!-- Header -->
    <header class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <!-- Logo and Navigation -->
          <div class="flex">
            <!-- Logo -->
            <div class="flex-shrink-0 flex items-center">
              <NuxtLink to="/client/dashboard" class="flex items-center">
                <span class="text-pink text-2xl font-bold">NannyMatch</span>
              </NuxtLink>
            </div>

            <!-- Navigation Links -->
            <nav class="hidden sm:ml-6 sm:flex sm:space-x-8">
              <NuxtLink
                to="/client/dashboard"
                class="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                :class="[
                  $route.path === '/client/dashboard'
                    ? 'border-pink-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                ]"
              >
                Dashboard
              </NuxtLink>

              <NuxtLink
                to="/client/nannies"
                class="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                :class="[
                  $route.path.includes('/client/nannies')
                    ? 'border-pink-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                ]"
              >
                Hire Nanny
              </NuxtLink>

              <NuxtLink
                to="/client/messages"
                class="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                :class="[
                  $route.path === '/client/messages'
                    ? 'border-pink-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                ]"
              >
                Chats
              </NuxtLink>

              <NuxtLink
                to="/client/bookings"
                class="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                :class="[
                  $route.path === '/client/bookings'
                    ? 'border-pink-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                ]"
              >
                My Bookings
              </NuxtLink>

              <NuxtLink
                to="/client/resources"
                class="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                :class="[
                  $route.path === '/client/resources'
                    ? 'border-pink-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                ]"
              >
                Resources
              </NuxtLink>
            </nav>
          </div>

          <!-- Right side menu -->
          <div class="hidden sm:ml-6 sm:flex sm:items-center">
            <!-- Notifications -->
            <button
              class="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 relative"
            >
              <span class="sr-only">View notifications</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span
                class="absolute top-0 right-0 block h-2 w-2 rounded-full bg-pink-400 ring-2 ring-white"
              ></span>
            </button>

            <!-- Profile dropdown -->
            <div class="ml-3 relative">
              <div>
                <button
                  @click="profileMenuOpen = !profileMenuOpen"
                  class="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                >
                  <span class="sr-only">Open user menu</span>
                  <img
                    class="h-8 w-8 rounded-full"
                    src="https://randomuser.me/api/portraits/women/24.jpg"
                    alt="User profile"
                  />
                </button>
              </div>

              <!-- Dropdown menu -->
              <div
                v-if="profileMenuOpen"
                class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
              >
                <NuxtLink
                  to="/client/profile"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >Your Profile</NuxtLink
                >
                <NuxtLink
                  to="/client/settings"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >Settings</NuxtLink
                >
                <button
                  @click="logout"
                  class="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>

          <!-- Mobile menu button -->
          <div class="flex items-center sm:hidden">
            <button
              @click="mobileMenuOpen = !mobileMenuOpen"
              class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-pink-500"
            >
              <span class="sr-only">Open main menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                :class="{ hidden: mobileMenuOpen, block: !mobileMenuOpen }"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                :class="{ block: mobileMenuOpen, hidden: !mobileMenuOpen }"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile menu -->
      <div v-if="mobileMenuOpen" class="sm:hidden">
        <div class="pt-2 pb-3 space-y-1">
          <NuxtLink
            to="/client/dashboard"
            class="block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            :class="[
              $route.path === '/client/dashboard'
                ? 'bg-pink-50 border-pink-500 text-pink-700'
                : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800',
            ]"
          >
            Dashboard
          </NuxtLink>

          <NuxtLink
            to="/client/hire"
            class="block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            :class="[
              $route.path.includes('/client/hire')
                ? 'bg-pink-50 border-pink-500 text-pink-700'
                : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800',
            ]"
          >
            Hire Nanny
          </NuxtLink>

          <NuxtLink
            to="/client/messages"
            class="block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            :class="[
              $route.path === '/client/messages'
                ? 'bg-pink-50 border-pink-500 text-pink-700'
                : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800',
            ]"
          >
            Chats
          </NuxtLink>

          <NuxtLink
            to="/client/bookings"
            class="block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            :class="[
              $route.path === '/client/bookings'
                ? 'bg-pink-50 border-pink-500 text-pink-700'
                : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800',
            ]"
          >
            My Bookings
          </NuxtLink>

          <NuxtLink
            to="/client/resources"
            class="block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            :class="[
              $route.path === '/client/resources'
                ? 'bg-pink-50 border-pink-500 text-pink-700'
                : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800',
            ]"
          >
            Resources
          </NuxtLink>
        </div>

        <!-- Mobile profile section -->
        <div class="pt-4 pb-3 border-t border-gray-200">
          <div class="flex items-center px-4">
            <div class="flex-shrink-0">
              <img
                class="h-10 w-10 rounded-full"
                src="https://randomuser.me/api/portraits/women/24.jpg"
                alt="User profile"
              />
            </div>
            <div class="ml-3">
              <div class="text-base font-medium text-gray-800">
                Jessica Smith
              </div>
              <div class="text-sm font-medium text-gray-500">
                jessica@example.com
              </div>
            </div>
            <button
              class="ml-auto flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
            >
              <span class="sr-only">View notifications</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </button>
          </div>
          <div class="mt-3 space-y-1">
            <NuxtLink
              to="/client/profile"
              class="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
            >
              Your Profile
            </NuxtLink>
            <NuxtLink
              to="/client/settings"
              class="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
            >
              Settings
            </NuxtLink>
            <button
              @click="logout"
              class="w-full text-left block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main content -->
    <main class="flex-1">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-white border-t border-gray-200">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <div class="flex items-center">
            <span class="text-pink-600 text-xl font-bold">NannyMatch</span>
            <span class="ml-2 text-sm text-gray-500"
              >© 2023 All rights reserved</span
            >
          </div>
          <div class="mt-4 md:mt-0 flex space-x-6">
            <a href="#" class="text-gray-500 hover:text-gray-700"
              >Privacy Policy</a
            >
            <a href="#" class="text-gray-500 hover:text-gray-700"
              >Terms of Service</a
            >
            <a href="#" class="text-gray-500 hover:text-gray-700">Contact Us</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mobileMenuOpen: false,
      profileMenuOpen: false,
    };
  },
  methods: {
    logout() {
      // Implement logout functionality
      console.log("Logging out...");
      // Redirect to login page or home page
      // this.$router.push('/');
    },
  },
  watch: {
    $route() {
      // Close mobile menu when route changes
      this.mobileMenuOpen = false;
      this.profileMenuOpen = false;
    },
  },
};
</script>
