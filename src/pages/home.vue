<template>
  <NuxtLayout name="guest-layout">
    <div class="relative">
      <img src="@/assets/images/hero-img.jpg" class="w-[100vw] opacity-85" />
      <div class="absolute bottom-20 left-14">
        <button
          class="relative w-[500px] h-[50px] sm:w-[200px] font-bold mx-3 bg-pink-500 hover:bg-pink-200"
        >
          Find Child Care
        </button>
        <button
          class="relative h-[50px] w-[200px] sm:w-[200px] font-bold bg-gray-200 hover:bg-gray-500"
        >
          I am a sitter
        </button>
      </div>
      <div class="mx-15 mb-5 z-10 absolute -bottom-1/2 flex">
        <div class="w-[1/3] h-[300px] bg-white mx-10 shadow-md p-2">
          <img src="@/assets/images/train.jpg" class="w-[100px] mx-auto" />
          <h1 class="font-bold text-center text-xl">Babysitter</h1>
          <p>Occasional support for last-minute needs, date nights and more</p>
        </div>
        <div class="w-[1/3] h-[300px] bg-white mx-10 shadow-md p-2">
          <img src="@/assets/images/stroller.jpg" class="w-[100px] mx-auto" />
          <h1 class="font-bold text-center text-xl">Nanny</h1>
          <p>Regular support on weekdays, weekends and after-school hours.</p>
        </div>
        <div class="w-[1/3] h-[300px] bg-white mx-10 shadow-md p-2">
          <img src="@/assets/images/special.jpg" class="w-[100px] mx-auto" />
          <h1 class="font-bold text-center text-xl">Specialized Care</h1>
          <p>Specialized care to meet the individual needs of your child</p>
        </div>
      </div>
    </div>
    <div class="mt-[20rem]">
      <div class="mb-[2rem]">
        <h2 class="font-lato font-bold text-2xl text-center">
          Tap into the <span class="sketchy-bg">largest online network</span> in
          Kenya for finding caregivers.
        </h2>
        <ul>
          <li class="flex mt-6 ml-16">
            <font-awesome-icon
              :icon="['fas', 'shield-halved']"
              class="w-[30px] mr-5 ml-10"
            />100% of the caregivers are background checked before you can hire
          </li>
          <li class="flex mt-6 ml-16">
            <font-awesome-icon
              :icon="['fas', 'address-card']"
              class="w-[30px] mr-5 ml-10"
            />Transparent profiles, ratings and reviews.
          </li>
          <li class="flex mt-6 ml-16">
            <font-awesome-icon
              :icon="['fas', 'phone-volume']"
              class="w-[30px] mr-5 ml-10"
            />
            Dedicated safety and support teams
          </li>
        </ul>
      </div>
      <div class="bg-pink-200 h-[30rem]">
        <img src="@/assets/images/hero-img2.jpg" class="h-full w-1/2 aspect-square"/>
        <div class="float-right">
          <h1>We make finding the right care easier</h1>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
<script lang="ts" setup></script>
<style scoped>
.sketchy-bg {
  background: repeating-linear-gradient(
    135deg,
    #f0e4d7,
    #f0e4d7 4px,
    #ffccd5 5px,
    /* Light pink */ #ffccd5 9px
  );
  border-radius: 5px;
  box-shadow: 2px 2px 0px rgba(0, 0, 0, 0.1), -2px -2px 0px rgba(0, 0, 0, 0.1);
}
</style>
