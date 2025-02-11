<template>
  <div
    class="min-h-screen w-full bg-gradient-to-br from-pink-300 to-purple-600 flex items-center justify-center"
  >
 
    <div v-if="jobProfile" class="w-[80%] rounded bg-white p-8">
      <h1 class="font-bold text-xl">What kind of jobs are you looking for?</h1>
      <p class="text-sm font-lighter hover:text-pink-200">
        Don't worry - you can add profiles once you've registered
      </p>
      <div class="flex justify-around mt-6 ">
        <div
          class="flex-1 h-[20vh] shadow-md text-center p-8 mr-4 hover:shadow-pink-200 hover:shadow-md items-center justify-center"
        >
          Babysitter
          <font-awesome-icon
            :icon="['fas', 'arrow-right']"
            class="w-[30px] mx-auto mt-5 text-pink-500"
          />
        </div>
        <div class="flex-1 h-[20vh] shadow-md text-center p-8 mr-4">
          HouseKeeper
          <font-awesome-icon
            :icon="['fas', 'arrow-right']"
            class="w-[30px] mx-auto mt-5 text-pink-500"
          />
        </div>
        <div class="flex-1 h-[20vh] shadow-md text-center p-8">
          Care Companion
          <font-awesome-icon
            :icon="['fas', 'arrow-right']"
            class=" w-[30px] mx-auto mt-5 text-pink-500 hover:scale-3"
          />
        </div>
      </div>
    </div>
    <div v-if="form">
        <div class="h-[80vh] bg-gray-100 rounded shadow-sm p-4 flex flex-col">
          <span>Step 1 of 2</span>
          <span>Introduce yourself</span>
          <form >
            <div class="inline">
              <label>Years of paid experience</label>
              <input
              placeholder="Years of experinece"
              />
            </div>
            <div>
              <label>What ages do you  have experience with?</label>
             <input type="checkbox"/>
              <input type="checkbox"/>
              <input type="checkbox"/>
              <input type="checkbox"/>
              <input type="checkbox"/>
            </div>
            <div>
              <label>Do you have any certifications?</label>
              <input type="checkbox"/> 
              <input type="checkbox"/> 
            </div>
            <h1>Share your job preferences</h1>
            <div>
              <label>Maximum distance you'll travel for a job</label>
              <input type="number" placeholder="# of miles"/>
            </div>
            
            <div>
              <label>Maximum children you'll watch at one time </label>
              <input type="number" placeholder="# of children"/>
            </div>
            <div>
              <label>Will you work in a home with pets</label>
              <input type="checkbox" />
              <input type="checkbox" />
            </div>
            <div>
              <span>Set your hourly rate per child</span>
              <div class="flex">
                <input type="number" placeholder="$ Min"/>
                <span>to</span>
                <input type="number" placeholder="$ Max"/>
              </div>
            </div>
            <div>
              <span class="font-bold text-xl">Write a bio</span>
              <textarea></textarea>
            </div>
          </form>
        </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";

const jobProfile = ref<boolean>(false);
const form = ref<boolean>(true);

function handleClick(): void {}
</script>
