<template>
    <div>
        <!-- Navbar -->
  <nav class="bg-white shadow-lg">
    <div class="max-w-6xl mx-auto px-4">
      <div class="flex justify-between">

        <!-- Logo -->
        <div class="flex space-x-7">
          <div>
            <a href="#" class="flex items-center  px-2">
              <img src="@/assets/images/nanny-logo.png" alt="Logo" class="h-20 w-48 mr-2">
              <!-- <span class="font-semibold text-gray-500 text-lg">NannyMatch</span> -->
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
        <div class="hidden md:flex items-center space-x-3 ">
          <a href="/auth/login" class="py-2 px-2 font-medium text-gray-500 rounded hover:bg-gray-200 transition duration-300">Log In</a>
          <a href="/auth/login" class="py-2 px-2 font-medium text-white bg-pink rounded hover:bg-green-400 transition duration-300">Sign Up</a>
        </div>
  
        <!-- Mobile menu button -->
        <div class="md:hidden flex items-center">
          <button class="outline-none mobile-menu-button">
            <svg class=" w-6 h-6 text-gray-500 hover:text-green-500 "
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
    </div>
</template>