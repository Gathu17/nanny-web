<template>
  <div>
    <nav class="bg-white shadow-md fixed w-full top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-20">
          <!-- Logo -->
          <div class="flex-shrink-0">
            <NuxtLink to="/client/dashboard" class="flex items-center">
                <span class="text-primary text-2xl font-bold">NannyMatch</span>
            </NuxtLink>
          </div>

          <!-- Desktop Navigation -->
          <div class="hidden md:flex items-center space-x-8">
            <a
              href="#"
              class="text-gray-600 hover:text-pink-500 font-medium transition-colors duration-200"
              >Home</a
            >
            <a
              href="#"
              class="text-gray-600 hover:text-pink-500 font-medium transition-colors duration-200"
              >About</a
            >
            <a
              href="#"
              class="text-gray-600 hover:text-pink-500 font-medium transition-colors duration-200"
              >Services</a
            >
            <a
              href="#"
              class="text-gray-600 hover:text-pink-500 font-medium transition-colors duration-200"
              >Contact</a
            >
          </div>

          <!-- Auth Buttons -->
          <div class="hidden md:flex items-center space-x-4">
            <a
              href="/auth/login"
              class="px-4 py-2 text-gray-600 font-medium hover:text-pink-500 transition-colors duration-200"
            >
              Log In
            </a>
            <button
              @click="showSignupModal = true"
              class="px-6 py-2.5 bg-primary text-white font-medium rounded-full hover:bg-pink-600 transform hover:scale-105 transition-all duration-200 shadow-md"
            >
              Sign Up
            </button>
          </div>

          <!-- Mobile menu button -->
          <div class="md:hidden">
            <button
              class="mobile-menu-button p-2 rounded-md text-gray-600 hover:text-pink-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-pink-500 transition-colors duration-200"
            >
              <svg
                class="h-6 w-6"
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

      <!-- Mobile menu, show/hide based on menu state -->
      <div class="hidden mobile-menu md:hidden">
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a
            href="#"
            class="block px-3 py-2 text-gray-600 hover:text-pink-500 hover:bg-gray-50 rounded-md transition-colors duration-200"
            >Home</a
          >
          <a
            href="#"
            class="block px-3 py-2 text-gray-600 hover:text-pink-500 hover:bg-gray-50 rounded-md transition-colors duration-200"
            >About</a
          >
          <a
            href="#"
            class="block px-3 py-2 text-gray-600 hover:text-pink-500 hover:bg-gray-50 rounded-md transition-colors duration-200"
            >Services</a
          >
          <a
            href="#"
            class="block px-3 py-2 text-gray-600 hover:text-pink-500 hover:bg-gray-50 rounded-md transition-colors duration-200"
            >Contact</a
          >
          <div class="pt-4 pb-3 border-t border-gray-200">
            <a
              href="/auth/login"
              class="block px-3 py-2 text-gray-600 hover:text-pink-500 hover:bg-gray-50 rounded-md transition-colors duration-200"
              >Log In</a
            >
            <button
              @click="showSignupModal = true"
              class="block w-full text-left px-3 py-2 text-gray-600 hover:text-pink-500 hover:bg-gray-50 rounded-md transition-colors duration-200"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </nav>
    <!-- Add padding to prevent content from hiding under fixed header -->
    <div class="h-20"></div>

    <!-- Signup Modal -->
    <SignupModal
      :is-open="showSignupModal"
      @close="showSignupModal = false"
      @proceed="handleSignupProceed"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import SignupModal from "./SignupModal.vue";

const showSignupModal = ref(false);

const handleSignupProceed = (role) => {
  const signupUrl =
    role === "parent"
      ? "/auth/signup?role=parent"
      : "/auth/signup?role=nanny";
  window.location.href = signupUrl;
};

onMounted(() => {
  // Mobile menu toggle functionality
  const btn = document.querySelector(".mobile-menu-button");
  const menu = document.querySelector(".mobile-menu");

  btn.addEventListener("click", () => {
    menu.classList.toggle("hidden");
  });
});
</script>
