<template>
  <NuxtLayout name="guest-layout">
    <div class="relative w-[100vw]">
      <img src="@/assets/images/hero-img.jpg" class="w-[100vw] opacity-85" />
      <div class="absolute bottom-20 lg:bottom-30 xl:bottom-40 left-1 lg:left-10  flex sm:right-2">
        <button
          class="relative w-[12rem] h-[50px] sm:w-[200px] font-bold mx-3 bg-pink hover:bg-pink/80"
        >
          Find Child Care
        </button>
        <button
          class="relative h-[50px] w-[8rem] sm:w-[200px] font-bold bg-gray-200 hover:bg-gray-300"
        >
          I am a sitter
        </button>
      </div>
      <div class="mx-15 mb-5 top-[90%] z-10 absolute flex overflow-x-auto w-[100vw]">
        <div class="flex-1  min-w-[200px] h-[18rem] bg-white mx-10 shadow-md p-2">
          <img src="@/assets/images/train.jpg" class="w-[100px] mx-auto" />
          <h1 class="font-bold text-center text-xl">Babysitter</h1>
          <p>Occasional support for last-minute needs, date nights and more</p>
        </div>
        <div class="flex-1 min-w-[200px] h-[18rem] bg-white mx-10 shadow-md p-2">
          <img src="@/assets/images/stroller.jpg" class="w-[100px] mx-auto" />
          <h1 class="font-bold text-center text-xl">Nanny</h1>
          <p>Regular support on weekdays, weekends and after-school hours.</p>
        </div>
        <div class=" flex-1 min-w-[200px] h-[18rem] bg-white mx-10 shadow-md p-2">
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
          <li class="flex mt-6 md:ml-16 ml-2">
            <font-awesome-icon
              :icon="['fas', 'shield-halved']"
              class="w-[30px] mr-5 ml-10"
            />100% of the caregivers are background checked before you can hire
          </li>
          <li class="flex mt-6 md:ml-16 ml-2">
            <font-awesome-icon
              :icon="['fas', 'address-card']"
              class="w-[30px] mr-5 ml-10"
            />Transparent profiles, ratings and reviews.
          </li>
          <li class="flex mt-6 md:ml-16 ml-2">
            <font-awesome-icon
              :icon="['fas', 'phone-volume']"
              class="w-[30px] mr-5 ml-10"
            />
            Dedicated safety and support teams
          </li>
        </ul>
      </div>
      <div class="bg-pink h-[40rem] flex">
        <img src="@/assets/images/hero-img2.jpg" class="h-full w-1/2 md-block lg:block aspect-square hidden"/>
        <div class="flex-1 p-5">
          <h1 class="text-center text-4xl font-caponi mb-5">We make finding the right care easier</h1>
          <ul>
            <li class="flex items-center text-2xl mb-3 p-2">
              <font-awesome-icon
              :icon="['far', 'square-check']"
              class="w-[30px] mr-5 ml-10"
            />
            Trusted and verified nannies with detailed profiles and reviews
            </li>
            <li class="flex items-center text-2xl mb-3 p-2">
              <font-awesome-icon
              :icon="['far', 'square-check']"
              class="w-[30px] mr-5 ml-10"
            />
            Flexible scheduling to fit your family's needs
            </li>
            <li class="flex items-center text-2xl mb-3 p-2">
              <font-awesome-icon
              :icon="['far', 'square-check']"
              class="w-[30px] mr-5 ml-10"
            />
            Care options for all ages, from infants to toddlers
            </li>
            <li class="flex items-center text-2xl mb-3 p-2">
              <font-awesome-icon
              :icon="['far', 'square-check']"
              class="w-[30px] mr-5 ml-10"
            />
            24/7 customer support to assist with your care needs
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="relative md:w-[70vw] mx-auto bg-lime-50 h-[40vh] mt-28 xl:mt-30 mb-24 w-full">
      <img src="@/assets/images/chats.png" class="md:w-[15vw] w-[40vw] mx-auto absolute md:left-40 left-5 xl:left-50 xl:-top-20"/>
      <div class="float-right md:mr-10  w-[50%] mt-10">
        <p class="text-3xl font-bold sm:text-xl">Find the care you need from someone you trust</p> 
        <div class="flex">
          <button class="bg-pink mt-10 p-4 mr-4">Post a Job</button>
          <button class="border b-3 mt-10 p-4 sm:mr-2">I'm a Nanny</button>
        </div>
      </div>
    </div>
    <Footer/>
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
