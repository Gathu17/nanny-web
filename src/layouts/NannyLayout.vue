<template>
  <div class="overflow-hidden">
    <nav class="bg-white shadow-lg h-[10vh] w-full">
      <div class="max-w-6xl shadow-md pl-4">
        <div class="flex justify-between">
          <!-- Logo -->
          <div class="flex space-x-7">
            <div>
              <a href="#" class="flex items-center py-4 px-2">
                <img
                  src="https://via.placeholder.com/40"
                  alt="Logo"
                  class="h-8 w-8 mr-2"
                />
                <span class="font-semibold text-gray-500 text-lg"
                  >Nanny App</span
                >
              </a>
            </div>
          </div>

          <!-- Primary Navbar items -->
          <!-- <div class="hidden md:flex items-center space-x-1">
          <a href="#" class="py-4 px-2 text-green-500 border-b-4 border-green-500 font-semibold">Home</a>
          <a href="#" class="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300">About</a>
          <a href="#" class="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300">Services</a>
          <a href="#" class="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300">Contact</a>
        </div> -->

          <!-- Secondary Navbar items -->
          <!-- <div class="hidden md:flex items-center space-x-3">
            <a
              href="/auth/login"
              class="py-2 px-2 font-medium text-gray-500 rounded hover:bg-gray-200 transition duration-300"
              >Log In</a
            >
            <a
              href="/auth/login"
              class="py-2 px-2 font-medium text-white bg-pink-500 rounded hover:bg-green-400 transition duration-300"
              >Sign Up</a
            >
          </div> -->
          <ul class="flex justify-around items-center w-[60%] mx-auo space-x-4 mr-10">
            <li class="mr-2 hover:text-pink-400 cursor-pointer">Home</li>
            <li class="mr-2 whitespace-nowrap hover:text-pink-400 cursor-pointer">Find a Job</li>
            <li class="mr-2 hover:text-pink-400 cursor-pointer">Messages</li>
            <!-- <li class="rounded border w-[50%] pl-2 focus:border-pink-400">Search <span class="float-right pr-2">🔍</span></li> -->
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
            <font-awesome-icon
              :icon="['fas', 'user']"
              class="w-[25%] ml-5 rounded-full bg-gray-200 hover:bg-gray-300 p-2"
            />
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
<script lang="ts" setup></script>
