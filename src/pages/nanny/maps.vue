<template>
  <div class="min-h-screen bg-gray-50">
    <div class="p-4">
      <h1 class="text-2xl font-bold text-gray-800 mb-4">Nearby Jobs</h1>

      <!-- Map container -->
      <div
        class="bg-white rounded-lg shadow-md overflow-hidden h-[60vh] mb-4 relative"
      >
        <div
          v-if="isLoading"
          class="absolute inset-0 flex items-center justify-center bg-white/80 z-10"
        >
          <NannyLoader message="Loading map..." />
        </div>
        <div id="map" class="w-full h-full"></div>
      </div>

      <!-- Job listings -->
      <div class="space-y-4 mt-6">
        <h2 class="text-xl font-semibold text-gray-800">Jobs Near You</h2>
        <div
          v-if="nearbyJobs.length === 0 && !isLoading"
          class="bg-white p-4 rounded-lg shadow text-center"
        >
          <p class="text-gray-500">No jobs found in your area</p>
          <button class="mt-3 text-pink hover:underline">
            Expand search radius
          </button>
        </div>
        <div
          v-for="job in nearbyJobs"
          :key="job.id"
          class="bg-white p-4 rounded-lg shadow"
        >
          <div class="flex justify-between items-start">
            <div>
              <h3 class="font-semibold">{{ job.title }}</h3>
              <p class="text-sm text-gray-500">{{ job.location }}</p>
            </div>
            <span
              class="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
              >{{ job.distance }}</span
            >
          </div>
          <div class="mt-2 flex justify-end">
            <button class="text-pink hover:underline text-sm">
              View details
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useMapStore } from "@/stores/map";
import { useJobStore } from "@/stores/job";
import NannyLoader from "@/components/common/NannyLoader.vue";

const mapStore = useMapStore();
const jobStore = useJobStore();
const isLoading = ref(true);
const map = ref(null);
const userLocation = ref({ lat: 0, lng: 0 });
const nearbyJobs = ref([]);

onMounted(async () => {
  try {
    // Initialize map
    await initMap();

    // Load nearby jobs
    await loadNearbyJobs();
  } catch (error) {
    console.error("Error initializing map:", error);
  } finally {
    isLoading.value = false;
  }
});

async function initMap() {
  // Get user's location
  await getUserLocation();

  // Initialize the map (this would use a mapping library like Google Maps or Leaflet)
  // For this example, we're just simulating the map initialization
  setTimeout(() => {
    console.log("Map initialized at", userLocation.value);
    mapStore.setUserLocation(userLocation.value);
  }, 1000);
}

async function getUserLocation() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          userLocation.value = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          resolve(userLocation.value);
        },
        (error) => {
          console.error("Error getting location:", error);
          // Default to a fallback location
          userLocation.value = { lat: 40.7128, lng: -74.006 }; // New York
          resolve(userLocation.value);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser");
      userLocation.value = { lat: 40.7128, lng: -74.006 }; // New York
      resolve(userLocation.value);
    }
  });
}

async function loadNearbyJobs() {
  try {
    // In a real app, this would fetch from an API based on location
    await jobStore.fetchNearbyJobs(userLocation.value);
    nearbyJobs.value = jobStore.nearbyJobs;
  } catch (error) {
    console.error("Error loading nearby jobs:", error);
  }
}

onUnmounted(() => {
  // Clean up map resources if needed
});
</script>
