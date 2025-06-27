<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    @click="closeModal"
  >
    <div class="bg-white rounded-xl shadow-xl max-w-md w-full p-6" @click.stop>
      <!-- Header -->
      <div class="text-center mb-6">
        <h2 class="text-2xl font-bold text-gray-900 mb-2">Join NannyMatch</h2>
        <p class="text-gray-600">Choose your role to get started</p>
      </div>

      <!-- Role Selection -->
      <div class="space-y-4 mb-6">
        <!-- Parent Option -->
        <div
          class="border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 hover:border-pink-300 hover:bg-pink-50"
          :class="{
            'border-primary bg-pink-50': selectedRole === 'parent',
            'border-gray-200': selectedRole !== 'parent',
          }"
          @click="selectRole('parent')"
        >
          <div class="flex items-center space-x-4">
            <div class="flex-shrink-0">
              <div
                class="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 text-pink-600"
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
              </div>
            </div>
            <div class="flex-1">
              <h3 class="text-lg font-semibold text-gray-900">Parent</h3>
              <p class="text-sm text-gray-600">
                Find trusted nannies for your children
              </p>
            </div>
            <div class="flex-shrink-0">
              <div
                class="w-5 h-5 rounded-full border-2 flex items-center justify-center"
                :class="{
                  'border-primary bg-primary': selectedRole === 'parent',
                  'border-gray-300': selectedRole !== 'parent',
                }"
              >
                <svg
                  v-if="selectedRole === 'parent'"
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-3 w-3 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Nanny Option -->
        <div
          class="border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 hover:border-pink-300 hover:bg-pink-50"
          :class="{
            'border-primary bg-pink-50': selectedRole === 'nanny',
            'border-gray-200': selectedRole !== 'nanny',
          }"
          @click="selectRole('nanny')"
        >
          <div class="flex items-center space-x-4">
            <div class="flex-shrink-0">
              <div
                class="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 text-pink-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                  />
                </svg>
              </div>
            </div>
            <div class="flex-1">
              <h3 class="text-lg font-semibold text-gray-900">Nanny</h3>
              <p class="text-sm text-gray-600">
                Find great families to work with
              </p>
            </div>
            <div class="flex-shrink-0">
              <div
                class="w-5 h-5 rounded-full border-2 flex items-center justify-center"
                :class="{
                  'border-primary bg-primary': selectedRole === 'nanny',
                  'border-gray-300': selectedRole !== 'nanny',
                }"
              >
                <svg
                  v-if="selectedRole === 'nanny'"
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-3 w-3 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex space-x-3">
        <button
          @click="closeModal"
          class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          @click="proceedToSignup"
          :disabled="!selectedRole"
          class="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

interface Props {
  isOpen: boolean;
}

interface Emits {
  (e: "close"): void;
  (e: "proceed", role: "parent" | "nanny"): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const selectedRole = ref<"parent" | "nanny" | null>(null);

const selectRole = (role: "parent" | "nanny") => {
  selectedRole.value = role;
};

const closeModal = () => {
  selectedRole.value = null;
  emit("close");
};

const proceedToSignup = () => {
  if (selectedRole.value) {
    emit("proceed", selectedRole.value);
    selectedRole.value = null;
  }
};
</script>
