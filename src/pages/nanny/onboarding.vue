<template>
  <div
    class="min-h-screen w-full bg-gradient-to-br from-pink/10 to-purple/10 flex items-center justify-center"
  >
  <NannyLoader v-if="isLoading" message="Setting up your profile..." />
    <div v-if="jobProfile" class="w-[80%] rounded bg-white p-8">
      <h1 class="font-bold text-xl">What kind of jobs are you looking for?</h1>
      <p class="text-sm font-lighter hover:text-pink-200">
        Don't worry - you can add profiles once you've registered
      </p>
      <div class="flex justify-around mt-6">
        <div
          class="cursor-pointer flex-1 h-[20vh] shadow-md text-center p-8 mr-4 hover:shadow-pink-200 hover:shadow-md items-center justify-center"
          @click="selectJobType('babysitter')"
          >
          Babysitter
          <font-awesome-icon
            :icon="['fas', 'arrow-right']"
            class="w-[30px] mx-auto mt-5 text-pink-500"
          />
        </div>
        <div class="cursor-pointer flex-1 h-[20vh] shadow-md text-center p-8 mr-4"
          @click="selectJobType('housekeeper')"
        >
          HouseKeeper
          <font-awesome-icon
            :icon="['fas', 'arrow-right']"
            class="w-[30px] mx-auto mt-5 text-pink-500"
         
          />
        </div>
        <div class="cursor-pointer flex-1 h-[20vh] shadow-md text-center p-8"
        @click="selectJobType('care companion')"
        
        >
          Care Companion
          <font-awesome-icon
            :icon="['fas', 'arrow-right']"
            class="w-[30px] mx-auto mt-5 text-pink-500 hover:scale-3"
          />
        </div>
      </div>
    </div>
    <div v-if="form">
      <div
        class="h-[100%] w-[80vw] lg:w-[40vw] bg-white rounded-lg  p-8 flex flex-col"
      >
        <div class="mb-6 text-center font-bold">
          <p>Who would you like to care for?</p>
        </div>

        <form class="space-y-6 flex-1">
          <div class="space-y-2">
            <label class="block text-center font-medium text-gray-700"
              >I'm cormfortable caring for</label
            >
            <div class="flex items-center shadow-sm rounded-md bg-gray-50">
              <button 
                type="button"
                class="px-4 py-2 text-white bg-gray-300 hover:text-pink-500 hover:bg-gray-100 rounded-full transition-colors"
                @click="count > 0 && count--"
              >
                -
              </button>
              <input
                type="number"
                v-model="count"
                min="0"
                class="w-full bg-transparent px-4 py-2 text-center focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                placeholder="Years of experience"
              />
              <button
                type="button" 
                class="px-4 py-2 text-white bg-blue-500 hover:text-pink-500 hover:bg-gray-100 rounded-full transition-colors"
                @click="count++"
              >
                +
              </button>
            </div>
          </div>

          <div class="space-y-2">
            <label class="block text-center font-medium text-gray-700"
              >Ages<p class="text-xs">Select all that apply</p></label
            >
            <div class="flex gap-4">
              <div class="flex flex-wrap gap-2">
                <button
                  type="button"
                  class="px-4 py-2 rounded-full border border-gray-300 hover:border-pink-500 hover:text-pink-500 transition-colors"
                  :class="{ 'bg-pink-500 text-pink': selectedAges.includes('0-11 months') }"
                  @click="toggleAge('0-11 months')"
                >
                  0-11 months
                </button>
                <button
                  type="button"
                  class="px-4 py-2 rounded-full border border-gray-300 hover:border-pink-500 hover:text-pink-500 transition-colors"
                  :class="{ 'border-pink text-pink': selectedAges.includes('1-3 years') }"
                  @click="toggleAge('1-3 years')"
                >
                  1-3 years
                </button>
                <button
                  type="button"
                  class="px-4 py-2 rounded-full border border-gray-300 hover:border-pink-500 hover:text-pink-500 transition-colors"
                  :class="{ 'border-pink text-pink': selectedAges.includes('4-6 years') }"
                  @click="toggleAge('4-6 years')"
                >
                  4-6 years
                </button>
                <button
                  type="button"
                  class="px-4 py-2 rounded-full border border-gray-300 hover:border-pink-500 hover:text-pink-500 transition-colors"
                  :class="{ 'border-pink text-pink': selectedAges.includes('7-11 years') }"
                  @click="toggleAge('7-11 years')"
                >
                  7-11 years
                </button>
                <button
                  type="button"
                  class="px-4 py-2 rounded-full border border-gray-300 hover:border-pink-500 hover:text-pink-500 transition-colors"
                  :class="{ 'border-pink text-pink': selectedAges.includes('12+ years') }"
                  @click="toggleAge('12+ years')"
                >
                  12+ years
                </button>
              </div>
            </div>
          </div>
          

          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700"
              >Set your hourly rate per child</label
            >
            <div class="flex flex-col gap-2">
              <span class="text-gray-700">${{ hourlyRate || 0 }}/hr</span>
              <input
                type="range"
                min="0"
                max="50"
                step="1"
                v-model="hourlyRate"
                class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-pink-500 "
              />
              <div class="flex justify-between text-xs text-gray-500">
                <span>$0</span>
                <span>$50</span>
              </div>
            </div>
          </div>

          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700"
              >Write a bio</label
            >
            <textarea
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all h-32"
            ></textarea>
          </div>
        </form>

        <div class="flex justify-end mt-6">
          <button
            class="bg-pink hover:bg-pink/40 text-white px-6 py-2 rounded-3xl transition-colors w-[50vw]"
            @click="handleSubmit"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import NannyLoader from "@/components/common/NannyLoader.vue";

const isLoading = ref<boolean>(false);
const jobProfile = ref<boolean>(true);
const form = ref<boolean>(false);
const count = ref(0);
const selectedAges = ref<string[]>([]);
const hourlyRate = ref(10);
const selectedJobType = ref<string>('') 

const router = useRouter();

function selectJobType(type: string): void {
  selectedJobType.value = type;
  jobProfile.value = false;
  form.value = true;
}

function toggleAge(age: string): void {
  if (!selectedAges.value.includes(age)) {
    selectedAges.value.push(age);
  }
}



// Add animation classes
const formClasses = ref(["opacity-0", "translate-y-4"]);

onMounted(() => {
  // Add animation after mount
  setTimeout(() => {
    formClasses.value = ["opacity-100", "translate-y-0"];
  }, 100);
});

function handleSubmit(): void {
  isLoading.value = true;
  jobProfile.value = false;
  form.value = false;
  setTimeout(() => {
    router.push('/nanny/verification');
  }, 2000);
}
</script>

<style scoped>
.form-enter-active,
.form-leave-active {
  transition: all 0.3s ease-out;
}

.form-enter-from,
.form-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

input,
textarea {
  @apply transition-all duration-200 ease-in-out;
}

input:focus,
textarea:focus {
  @apply outline-none;
}

input[type="checkbox"] {
  @apply w-4 h-4 cursor-pointer;
}
</style>
