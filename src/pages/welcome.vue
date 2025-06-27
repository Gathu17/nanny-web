<template>
  <NuxtLayout name="guest-layout">
    <div class="relative w-[100vw] overflow-hidden">
      <div
        class="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60 z-10"
      ></div>
      <img
        src="@/assets/images/hero-img.jpg"
        class="w-[100vw] h-[90vh] object-cover"
      />
      <div
        class="absolute inset-0 flex flex-col justify-center items-center z-20 text-white"
      >
        <h1 class="text-5xl md:text-6xl font-bold mb-8 text-center px-4">
          Find Your Perfect Child Care
        </h1>
        <p class="text-xl md:text-2xl mb-12 text-center px-4">
          Connecting families with trusted caregivers in Kenya
        </p>
        <div class="flex flex-col sm:flex-row gap-4">
          <button
            class="px-8 py-4 bg-[#FF6B6B] hover:bg-[#FF5252] text-white font-bold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Find Child Care
          </button>
          <button
            class="px-8 py-4 bg-white/20 hover:bg-white/30 text-white font-bold rounded-full backdrop-blur-sm transition-all duration-300 transform hover:scale-105"
          >
            I am a Nanny
          </button>
        </div>
      </div>
    </div>

    <div class="py-20 bg-gradient-to-b from-white to-[#FFF5F5]">
      <div class="container mx-auto px-4">
        <h2 class="text-4xl font-bold text-center mb-16">Our Services</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            class="bg-white rounded-2xl shadow-xl p-8 transform hover:scale-105 transition-all duration-300"
          >
            <img
              src="@/assets/images/train.jpg"
              class="w-32 h-32 mx-auto mb-6 rounded-full object-cover"
            />
            <h3 class="font-bold text-2xl text-center mb-4 text-[#FF6B6B]">
              Babysitter
            </h3>
            <p class="text-gray-600 text-center">
              Occasional support for last-minute needs, date nights and more
            </p>
          </div>
          <div
            class="bg-white rounded-2xl shadow-xl p-8 transform hover:scale-105 transition-all duration-300"
          >
            <img
              src="@/assets/images/stroller.jpg"
              class="w-32 h-32 mx-auto mb-6 rounded-full object-cover"
            />
            <h3 class="font-bold text-2xl text-center mb-4 text-[#FF6B6B]">
              Nanny
            </h3>
            <p class="text-gray-600 text-center">
              Regular support on weekdays, weekends and after-school hours.
            </p>
          </div>
          <div
            class="bg-white rounded-2xl shadow-xl p-8 transform hover:scale-105 transition-all duration-300"
          >
            <img
              src="@/assets/images/special.jpg"
              class="w-32 h-32 mx-auto mb-6 rounded-full object-cover"
            />
            <h3 class="font-bold text-2xl text-center mb-4 text-[#FF6B6B]">
              Specialized Care
            </h3>
            <p class="text-gray-600 text-center">
              Specialized care to meet the individual needs of your child
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="py-20 bg-[#FFF5F5]">
      <div class="container mx-auto px-4">
        <h2 class="text-4xl font-bold text-center mb-16">
          Tap into the
          <span class="text-[#FF6B6B]">largest online network</span> in Kenya
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div class="bg-white rounded-xl p-6 shadow-lg">
            <font-awesome-icon
              :icon="['fas', 'shield-halved']"
              class="w-12 h-12 text-[#FF6B6B] mb-4"
            />
            <p class="text-lg">
              100% of the caregivers are background checked before you can hire
            </p>
          </div>
          <div class="bg-white rounded-xl p-6 shadow-lg">
            <font-awesome-icon
              :icon="['fas', 'address-card']"
              class="w-12 h-12 text-[#FF6B6B] mb-4"
            />
            <p class="text-lg">Transparent profiles, ratings and reviews</p>
          </div>
          <div class="bg-white rounded-xl p-6 shadow-lg">
            <font-awesome-icon
              :icon="['fas', 'phone-volume']"
              class="w-12 h-12 text-[#FF6B6B] mb-4"
            />
            <p class="text-lg">Dedicated safety and support teams</p>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-gradient-to-r from-[#FF6B6B] to-[#FF8E8E] py-20">
      <div
        class="container mx-auto px-4 flex flex-col md:flex-row items-center"
      >
        <img
          src="@/assets/images/hero-img2.jpg"
          class="w-full md:w-1/2 rounded-2xl shadow-2xl mb-8 md:mb-0 md:mr-12"
        />
        <div class="text-white">
          <h2 class="text-4xl font-bold mb-8">
            We make finding the right care easier
          </h2>
          <ul class="space-y-6">
            <li class="flex items-center text-xl">
              <span class="flex items-center justify-center w-8 h-8 mr-4">
                <font-awesome-icon
                  :icon="['far', 'square-check']"
                  class="!w-8 !h-8"
                  style="font-size: 2rem;"
                  fixed-width
                />
              </span>
              Trusted and verified nannies with detailed profiles and reviews
            </li>
            <li class="flex items-center text-xl">
              <span class="flex items-center justify-center w-8 h-8 mr-4">
                <font-awesome-icon
                  :icon="['far', 'square-check']"
                  class="!w-8 !h-8"
                  style="font-size: 2rem;"
                  fixed-width
                />
              </span>
              Flexible scheduling to fit your family's needs
            </li>
            <li class="flex items-center text-xl">
              <span class="flex items-center justify-center w-8 h-8 mr-4">
                <font-awesome-icon
                  :icon="['far', 'square-check']"
                  class="!w-8 !h-8"
                  style="font-size: 2rem;"
                  fixed-width
                />
              </span>
              Care options for all ages, from infants to toddlers
            </li>
            <li class="flex items-center text-xl">
              <span class="flex items-center justify-center w-8 h-8 mr-4">
                <font-awesome-icon
                  :icon="['far', 'square-check']"
                  class="!w-8 !h-8"
                  style="font-size: 2rem;"
                  fixed-width
                />
              </span>
              24/7 customer support to assist with your care needs
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="relative bg-gradient-to-br from-[#FFF5F5] to-white py-20">
      <div class="container mx-auto px-4">
        <div class="bg-white rounded-2xl shadow-xl pb-40 pt-5 relative overflow-hidden flex">
          <div class="relative w-full h-48 flex justify-center">
            <img
              src="@/assets/images/chats.png"
              class="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 md:w-48 object-contain "
            />
          </div>
          <div class="text-center mt-8 ">
            <h2 class="text-4xl font-bold mb-8">
              Find the care you need from someone you trust
            </h2>
            <div class="flex flex-col sm:flex-row justify-center gap-4">
              <button
                class="px-8 py-4 bg-[#FF6B6B] hover:bg-[#FF5252] text-white font-bold rounded-full transition-all duration-300"
                @click="() => $router.push()"
              >
                Find Child Care
              </button>
              <button
                class="px-8 py-4 border-2 border-[#FF6B6B] text-[#FF6B6B] hover:bg-[#FF6B6B] hover:text-white font-bold rounded-full transition-all duration-300"
              >
                I'm a Nanny
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </NuxtLayout>
</template>

<script lang="ts" setup></script>

<style scoped>
.container {
  max-width: 1280px;
  margin: 0 auto;
}
</style>
