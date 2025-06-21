<template>
  <div
    class="min-h-screen w-full bg-gradient-to-br from-pink-50 via-white to-purple-50 flex items-center justify-center p-4"
  >
    <NannyLoader v-if="isLoading" message="Setting up your profile..." />

    <!-- Job Profile Selection -->
    <div
      v-if="jobProfile"
      class="w-full max-w-5xl rounded-2xl bg-white/80 backdrop-blur-sm p-6 sm:p-8 lg:p-10 shadow-xl border border-white/20"
    >
      <div class="text-center mb-8">
        <div
          class="w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
        >
          <font-awesome-icon
            :icon="['fas', 'heart']"
            class="h-8 w-"
          />
        </div>
        <h1
          class="font-bold text-2xl sm:text-3xl lg:text-4xl text-gray-800 mb-3"
        >
          What kind of jobs are you looking for?
        </h1>
        <p class="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
          Choose your preferred role and we'll help you find the perfect
          opportunities
        </p>
      </div>

      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
      >
        <!-- Babysitter Card -->
        <div
          class="group cursor-pointer h-56 sm:h-64 lg:h-72 bg-gradient-to-br from-pink-50 to-pink-100 text-center p-6 sm:p-8 hover:from-pink-100 hover:to-pink-200 transition-all duration-300 rounded-2xl border-2 border-transparent hover:border-pink-300 hover:shadow-2xl hover:scale-105"
          @click="selectJobType('babysitter')"
        >
          <div class="flex flex-col items-center justify-center h-full">
            <div
              class="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg"
            >
              <font-awesome-icon
                :icon="['fas', 'heart']"
                class="h-8 w-8"
              />
            </div>
            <h3 class="font-bold text-xl mb-2 text-gray-800">Babysitter</h3>
            <p class="text-gray-600 text-sm mb-4">
              Care for children in their home
            </p>
            <div
              class="flex items-center text-pink-600 font-medium group-hover:translate-x-1 transition-transform duration-300"
            >
              <span class="mr-2">Get Started</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </div>
          </div>
        </div>

        <!-- Housekeeper Card -->
        <div
          class="group cursor-pointer h-56 sm:h-64 lg:h-72 bg-gradient-to-br from-blue-50 to-blue-100 text-center p-6 sm:p-8 hover:from-blue-100 hover:to-blue-200 transition-all duration-300 rounded-2xl border-2 border-transparent hover:border-blue-300 hover:shadow-2xl hover:scale-105"
          @click="selectJobType('housekeeper')"
        >
          <div class="flex flex-col items-center justify-center h-full">
            <div
              class="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg"
            >
              <font-awesome-icon
                :icon="['fas', 'broom']"
                class="h-8 w-8 text-pink"
              />
            </div>
            <h3 class="font-bold text-xl mb-2 text-gray-800">Housekeeper</h3>
            <p class="text-gray-600 text-sm mb-4">
              Keep homes clean and organized
            </p>
            <div
              class="flex items-center text-blue-600 font-medium group-hover:translate-x-1 transition-transform duration-300"
            >
              <span class="mr-2">Get Started</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </div>
          </div>
        </div>

        <!-- Care Companion Card -->
        <div
          class="group cursor-pointer h-56 sm:h-64 lg:h-72 bg-gradient-to-br from-purple-50 to-purple-100 text-center p-6 sm:p-8 hover:from-purple-100 hover:to-purple-200 transition-all duration-300 rounded-2xl border-2 border-transparent hover:border-purple-300 hover:shadow-2xl hover:scale-105 sm:col-span-2 lg:col-span-1"
          @click="selectJobType('care companion')"
        >
          <div class="flex flex-col items-center justify-center h-full">
            <div
              class="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg"
            >
              <font-awesome-icon
                :icon="['fas', 'user-friends']"
                class="h-8 w-8 text-pink"
              />
            </div>
            <h3 class="font-bold text-xl mb-2 text-gray-800">Care Companion</h3>
            <p class="text-gray-600 text-sm mb-4">
              Provide companionship and support
            </p>
            <div
              class="flex items-center text-purple-600 font-medium group-hover:translate-x-1 transition-transform duration-300"
            >
              <span class="mr-2">Get Started</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Form Section -->
    <div v-if="form" class="w-full max-w-2xl">
      <div
        class="bg-white/90 backdrop-blur-sm rounded-2xl p-6 sm:p-8 lg:p-10 flex flex-col min-h-[80vh] sm:min-h-[70vh] shadow-xl border border-white/20"
      >
        <div class="text-center mb-8">
          <div
            class="w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
          >
            <font-awesome-icon
              :icon="['fas', 'user']"
              class="h-8 w-8 text-white"
            />
          </div>
          <h2 class="font-bold text-2xl sm:text-3xl text-gray-800 mb-2">
            Tell us about yourself
          </h2>
          <p class="text-gray-600 text-sm sm:text-base">
            Help families get to know you better
          </p>
        </div>

        <form class="space-y-6 sm:space-y-8 flex-1">
          <!-- Years of Experience -->
          <div class="space-y-3">
            <label
              class="block text-center font-semibold text-gray-700 text-sm sm:text-base"
            >
              <div class="flex items-center justify-center mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-2 text-pink-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Years of experience
              </div>
            </label>
            <div
              class="flex items-center shadow-lg rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 max-w-xs mx-auto border border-gray-200"
            >
              <button
                type="button"
                class="px-4 sm:px-6 py-3 text-white bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 rounded-l-xl transition-all duration-200 text-lg font-bold shadow-md"
                @click="count > 0 && count--"
              >
                -
              </button>
              <input
                type="number"
                v-model="count"
                min="0"
                class="w-full bg-transparent px-4 py-3 text-center focus:outline-none text-lg sm:text-xl font-bold text-gray-800 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                placeholder="0"
              />
              <button
                type="button"
                class="px-4 sm:px-6 py-3 text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-r-xl transition-all duration-200 text-lg font-bold shadow-md"
                @click="count++"
              >
                +
              </button>
            </div>
          </div>

          <!-- Ages Selection -->
          <div class="space-y-3">
            <label
              class="block text-center font-semibold text-gray-700 text-sm sm:text-base"
            >
              <div class="flex items-center justify-center mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-2 text-pink-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                Age groups you're comfortable with
              </div>
              <p class="text-xs text-gray-500 mt-1">Select all that apply</p>
            </label>
            <div class="flex justify-center">
              <div
                class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 w-full max-w-lg"
              >
                <button
                  type="button"
                  class="group px-3 sm:px-4 py-3 rounded-xl border-2 border-gray-200 hover:border-pink-400 hover:bg-pink-50 transition-all duration-200 text-xs sm:text-sm font-medium relative overflow-hidden"
                  :class="{
                    'border-pink-500 bg-pink-500 text-white shadow-lg scale-105':
                      selectedAges.includes('0-11 months'),
                  }"
                  @click="toggleAge('0-11 months')"
                >
                  <span class="relative z-10">0-11 months</span>
                  <div
                    v-if="selectedAges.includes('0-11 months')"
                    class="absolute inset-0 bg-gradient-to-r from-pink-500 to-pink-600"
                  ></div>
                </button>
                <button
                  type="button"
                  class="group px-3 sm:px-4 py-3 rounded-xl border-2 border-gray-200 hover:border-pink-400 hover:bg-pink-50 transition-all duration-200 text-xs sm:text-sm font-medium relative overflow-hidden"
                  :class="{
                    'border-pink-500 bg-pink-500 text-white shadow-lg scale-105':
                      selectedAges.includes('1-3 years'),
                  }"
                  @click="toggleAge('1-3 years')"
                >
                  <span class="relative z-10">1-3 years</span>
                  <div
                    v-if="selectedAges.includes('1-3 years')"
                    class="absolute inset-0 bg-gradient-to-r from-pink-500 to-pink-600"
                  ></div>
                </button>
                <button
                  type="button"
                  class="group px-3 sm:px-4 py-3 rounded-xl border-2 border-gray-200 hover:border-pink-400 hover:bg-pink-50 transition-all duration-200 text-xs sm:text-sm font-medium relative overflow-hidden"
                  :class="{
                    'border-pink-500 bg-pink-500 text-white shadow-lg scale-105':
                      selectedAges.includes('4-6 years'),
                  }"
                  @click="toggleAge('4-6 years')"
                >
                  <span class="relative z-10">4-6 years</span>
                  <div
                    v-if="selectedAges.includes('4-6 years')"
                    class="absolute inset-0 bg-gradient-to-r from-pink-500 to-pink-600"
                  ></div>
                </button>
                <button
                  type="button"
                  class="group px-3 sm:px-4 py-3 rounded-xl border-2 border-gray-200 hover:border-pink-400 hover:bg-pink-50 transition-all duration-200 text-xs sm:text-sm font-medium relative overflow-hidden"
                  :class="{
                    'border-pink-500 bg-pink-500 text-white shadow-lg scale-105':
                      selectedAges.includes('7-11 years'),
                  }"
                  @click="toggleAge('7-11 years')"
                >
                  <span class="relative z-10">7-11 years</span>
                  <div
                    v-if="selectedAges.includes('7-11 years')"
                    class="absolute inset-0 bg-gradient-to-r from-pink-500 to-pink-600"
                  ></div>
                </button>
                <button
                  type="button"
                  class="group px-3 sm:px-4 py-3 rounded-xl border-2 border-gray-200 hover:border-pink-400 hover:bg-pink-50 transition-all duration-200 text-xs sm:text-sm font-medium relative overflow-hidden sm:col-span-3 lg:col-span-1"
                  :class="{
                    'border-pink-500 bg-pink-500 text-white shadow-lg scale-105':
                      selectedAges.includes('12+ years'),
                  }"
                  @click="toggleAge('12+ years')"
                >
                  <span class="relative z-10">12+ years</span>
                  <div
                    v-if="selectedAges.includes('12+ years')"
                    class="absolute inset-0 bg-gradient-to-r from-pink-500 to-pink-600"
                  ></div>
                </button>
              </div>
            </div>
          </div>

          <!-- Hourly Rate -->
          <div class="space-y-3">
            <label
              class="block text-sm sm:text-base font-semibold text-gray-700 text-center"
            >
              <div class="flex items-center justify-center mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-2 text-pink-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Set your hourly rate per child
              </div>
            </label>
            <div class="flex flex-col gap-3 max-w-xs mx-auto">
              <div class="text-center">
                <span class="text-2xl sm:text-3xl font-bold text-gray-800"
                  >${{ hourlyRate || 0 }}</span
                >
                <span class="text-lg text-gray-600">/hour</span>
              </div>
              <div class="relative">
                <input
                  type="range"
                  min="0"
                  max="50"
                  step="1"
                  v-model="hourlyRate"
                  class="w-full h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full appearance-none cursor-pointer slider"
                />
                <div class="flex justify-between text-xs text-gray-500 mt-2">
                  <span>$0</span>
                  <span>$50</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Bio -->
          <div class="space-y-3">
            <label
              class="block text-sm sm:text-base font-semibold text-gray-700 text-center"
            >
              <div class="flex items-center justify-center mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-2 text-pink-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                Tell families about yourself
              </div>
            </label>
            <textarea
              class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200 h-28 sm:h-32 resize-none shadow-sm"
              placeholder="Share your experience, passion for childcare, and what makes you a great caregiver..."
            ></textarea>
          </div>
        </form>

        <!-- Submit Button -->
        <div class="flex justify-center mt-8">
          <button
            class="group bg-gradient-to-r from-pink to-purple hover:from-pink-600 hover:to-purple-700 text-white px-8 py-4 rounded-full transition-all duration-300 w-full sm:w-auto text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
            @click="handleSubmit"
          >
            <div class="flex items-center justify-center">
              <span class="mr-2">Continue</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </div>
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
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const isLoading = ref<boolean>(false);
const jobProfile = ref<boolean>(true);
const form = ref<boolean>(false);
const count = ref(0);
const selectedAges = ref<string[]>([]);
const hourlyRate = ref(10);
const selectedJobType = ref<string>("");

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
    router.push("/nanny/verification");
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

/* Custom slider styling */
.slider {
  background: linear-gradient(to right, #e5e7eb 0%, #e5e7eb 100%);
}

.slider::-webkit-slider-thumb {
  appearance: none;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ec4899, #8b5cf6);
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease;
}

.slider::-webkit-slider-thumb:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.slider::-moz-range-thumb {
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ec4899, #8b5cf6);
  cursor: pointer;
  border: none;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease;
}

.slider::-moz-range-thumb:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

/* Smooth animations for card interactions */
.group:hover .group-hover\:scale-110 {
  transform: scale(1.1);
}

.group:hover .group-hover\:translate-x-1 {
  transform: translateX(0.25rem);
}

/* Glass morphism effect */
.backdrop-blur-sm {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

/* Enhanced shadows */
.shadow-xl {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.shadow-2xl {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

/* Gradient text effect for selected age buttons */
.group:has(.bg-gradient-to-r) {
  background: linear-gradient(135deg, #ec4899, #8b5cf6);
}

/* Pulse animation for the main icon */
@keyframes pulse-glow {
  0%,
  100% {
    box-shadow: 0 0 20px rgba(236, 72, 153, 0.4);
  }
  50% {
    box-shadow: 0 0 30px rgba(236, 72, 153, 0.6);
  }
}

.w-16.h-16.bg-gradient-to-br {
  animation: pulse-glow 2s ease-in-out infinite;
}

/* Smooth transitions for all interactive elements */
* {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
}

/* Enhanced focus states */
button:focus,
input:focus,
textarea:focus {
  outline: 2px solid #ec4899;
  outline-offset: 2px;
}

/* Custom scrollbar for textarea */
textarea::-webkit-scrollbar {
  width: 6px;
}

textarea::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 3px;
}

textarea::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #ec4899, #8b5cf6);
  border-radius: 3px;
}

textarea::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #db2777, #7c3aed);
}
</style>
