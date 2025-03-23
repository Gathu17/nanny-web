<template>
  <div>
    <NannyLoader v-if="isLoading" message="Setting up your profile..." />

    <div v-if="form" v-show="!isLoading">
      <!-- Your existing form content -->

      <!-- Add this at the bottom of your form -->
      <div class="flex justify-end mt-6">
        <button
          @click="handleSubmit"
          class="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-md transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import NannyLoader from "@/components/common/NannyLoader.vue";

const jobProfile = ref<boolean>(false);
const form = ref<boolean>(true);
const isLoading = ref<boolean>(false);

// Add animation classes
const formClasses = ref(["opacity-0", "translate-y-4"]);

onMounted(() => {
  // Show loader initially
  isLoading.value = true;

  // Hide loader after 2 seconds
  setTimeout(() => {
    isLoading.value = false;

    // Add animation after loader is hidden
    setTimeout(() => {
      formClasses.value = ["opacity-100", "translate-y-0"];
    }, 100);
  }, 2000);
});

function handleSubmit(): void {
  isLoading.value = true;

  // Simulate form submission
  setTimeout(() => {
    isLoading.value = false;
    // Navigate or show next step
  }, 2000);
}

function handleClick(): void {}
</script>
