<template>
  <div class="flex justify-between items-start mb-4">
    <div>
      <h3 class="text-lg font-semibold text-gray-900">{{ job.title }}</h3>
      <p class="text-gray-500 flex items-center mt-1">
        <!-- <MapPin class="w-4 h-4 mr-1" /> -->
        {{ job.location }}
      </p>
    </div>
    <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
      {{ job.posted }}
    </span>
  </div>

  <div class="grid grid-cols-2 gap-4 mb-4">
    <div class="flex items-center text-gray-600">
      <!-- <Clock class="w-4 h-4 mr-2" /> -->
      {{ job.schedule }}
    </div>
    <div class="flex items-center text-gray-600">
      <!-- <DollarSign class="w-4 h-4 mr-2" /> -->
      {{ job.salary }}
    </div>
  </div>

  <div class="flex items-center text-gray-600 mb-4">
    <!-- <BookOpen class="w-4 h-4 mr-2" /> -->
    {{ job.requirements }}
  </div>

  <div class="flex justify-end space-x-3">
    <button
      class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
    >
      Save
    </button>
    <button class="px-4 py-2 bg-pink text-white rounded-lg hover:bg-blue-700">
      Quick Apply
    </button>
  </div>
</template>
<script setup lang="ts">
interface PropsType {
  id: number;
  title: string;
  location: string;
  schedule: string;
  salary: string;
  posted: string;
  requirements: string[];
}
const job = defineProps({
  id: {
    type: Number as PropType<PropsType["id"]>,
    required: true,
  },
  title: {
    type: String as PropType<PropsType["title"]>,
    required: true,
  },
  schedule: {
    type: String as PropType<PropsType["schedule"]>,
    required: true,
  },
  location: {
    type: String as PropType<PropsType["location"]>,
    required: true,
  },
  salary: {
    type: String as PropType<PropsType["salary"]>,
    required: true,
  },
  posted: {
    type: String as PropType<PropsType["posted"]>,
    required: true,
  },
  requirements: {
    type: Array as PropType<string[]>,
    required: true,
  },
});
</script>
