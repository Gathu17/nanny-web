<template>
  <NuxtLayout name="nanny-layout">
    <div class="min-h-screen bg-pink-50 p-4 sm:p-6 lg:p-8">
      <div class="max-w-7xl mx-auto">
        <!-- Search and Filter Section -->
        <div class="bg-white rounded-xl shadow-md p-6 mb-6">
          <div class="flex flex-col md:flex-row md:items-center md:space-x-4">
            <div class="flex-1 relative mb-4 md:mb-0">
              <div class="absolute left-3 top-2.5 text-gray-400">
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
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                v-model="searchQuery"
                placeholder="Search jobs..."
                class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink focus:border-pink"
              />
            </div>
            <div class="flex flex-wrap gap-2">
              <div class="relative">
                <button
                  @click="toggleFilter('location')"
                  class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center"
                  :class="{
                    'bg-pink-50 border-pink text-pink': activeFilters.location,
                  }"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Location
                </button>
                <div
                  v-if="activeFilters.location"
                  class="filter-dropdown absolute z-10 mt-2 w-56 bg-white rounded-lg shadow-lg p-2 border border-gray-200"
                >
                  <div
                    v-for="location in locations"
                    :key="location"
                    class="p-2 hover:bg-pink-50 rounded cursor-pointer"
                  >
                    <label class="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        :value="location"
                        v-model="selectedLocations"
                        class="mr-2 text-pink-600 focus:ring-pink-500"
                      />
                      {{ location }}
                    </label>
                  </div>
                  <div class="flex justify-end mt-2">
                    <button
                      @click="applyFilter('location')"
                      class="px-3 py-1 bg-pink text-white rounded-lg text-sm"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>

              <div class="relative">
                <button
                  @click="toggleFilter('schedule')"
                  class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center"
                  :class="{
                    'bg-pink-50 border-pink text-pink': activeFilters.schedule,
                  }"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 mr-2"
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
                  Schedule
                </button>
                <div
                  v-if="activeFilters.schedule"
                  class="filter-dropdown absolute z-10 mt-2 w-56 bg-white rounded-lg shadow-lg p-2 border border-gray-200"
                >
                  <div
                    v-for="schedule in schedules"
                    :key="schedule"
                    class="p-2 hover:bg-pink-50 rounded cursor-pointer"
                  >
                    <label class="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        :value="schedule"
                        v-model="selectedSchedules"
                        class="mr-2 text-pink-600 focus:ring-pink-500"
                      />
                      {{ schedule }}
                    </label>
                  </div>
                  <div class="flex justify-end mt-2">
                    <button
                      @click="applyFilter('schedule')"
                      class="px-3 py-1 bg-pink text-white rounded-lg text-sm"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>

              <div class="relative">
                <button
                  @click="toggleFilter('salary')"
                  class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center"
                  :class="{
                    'bg-pink-50 border-pink text-pink': activeFilters.salary,
                  }"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 mr-2"
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
                  Salary
                </button>
                <div
                  v-if="activeFilters.salary"
                  class="filter-dropdown absolute z-10 mt-2 w-56 bg-white rounded-lg shadow-lg p-2 border border-gray-200"
                >
                  <div
                    v-for="range in salaryRanges"
                    :key="range.label"
                    class="p-2 hover:bg-pink-50 rounded cursor-pointer"
                  >
                    <label class="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        :value="range.value"
                        v-model="selectedSalaryRanges"
                        class="mr-2 text-pink-600 focus:ring-pink-500"
                      />
                      {{ range.label }}
                    </label>
                  </div>
                  <div class="flex justify-end mt-2">
                    <button
                      @click="applyFilter('salary')"
                      class="px-3 py-1 bg-pink text-white rounded-lg text-sm"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>

              <div class="relative">
                <button
                  @click="toggleFilter('more')"
                  class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center"
                  :class="{
                    'bg-pink-50 border-pink text-pink': activeFilters.more,
                  }"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                    />
                  </svg>
                  More
                </button>
                <div
                  v-if="activeFilters.more"
                  class="filter-dropdown absolute right-0 z-10 mt-2 w-56 bg-white rounded-lg shadow-lg p-2 border border-gray-200"
                >
                  <div class="p-2">
                    <h4 class="font-medium text-gray-700 mb-2">Requirements</h4>
                    <div v-for="req in requirements" :key="req" class="py-1">
                      <label class="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          :value="req"
                          v-model="selectedRequirements"
                          class="mr-2 text-pink-600 focus:ring-pink-500"
                        />
                        {{ req }}
                      </label>
                    </div>
                  </div>
                  <div class="flex justify-end mt-2">
                    <button
                      @click="applyFilter('more')"
                      class="px-3 py-1 bg-pink text-white rounded-lg text-sm"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>

              <button
                v-if="isFiltering"
                @click="clearAllFilters"
                class="px-4 py-2 border border-pink text-pink rounded-lg hover:bg-pink-50 flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        <!-- Job Listings -->
        <div class="space-y-4">
          <!-- Filter Tabs -->
          <div class="flex flex-wrap gap-2 mb-6">
            <button
              :class="[
                'px-4 py-2 rounded-lg',
                activeFilter === 'all'
                  ? 'bg-pink text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50',
              ]"
              @click="setActiveFilter('all')"
            >
              All Jobs
            </button>
            <button
              :class="[
                'px-4 py-2 rounded-lg',
                activeFilter === 'new'
                  ? 'bg-pink text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50',
              ]"
              @click="setActiveFilter('new')"
            >
              New
            </button>
            <button
              :class="[
                'px-4 py-2 rounded-lg',
                activeFilter === 'applied'
                  ? 'bg-pink text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50',
              ]"
              @click="setActiveFilter('applied')"
            >
              Applied
            </button>
            <button
              :class="[
                'px-4 py-2 rounded-lg',
                activeFilter === 'saved'
                  ? 'bg-pink text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50',
              ]"
              @click="setActiveFilter('saved')"
            >
              Saved Jobs
            </button>
          </div>

          <!-- Active Filters Display -->
          <div
            v-if="isFiltering"
            class="bg-white rounded-xl shadow-md p-4 mb-4"
          >
            <div class="flex flex-wrap items-center gap-2">
              <span class="text-sm text-gray-600">Active Filters:</span>

              <div
                v-for="location in selectedLocations"
                :key="`loc-${location}`"
                class="px-2 py-1 bg-pink-100 text-pink-800 rounded-full text-xs flex items-center"
              >
                {{ location }}
                <button
                  @click="removeFilter('location', location)"
                  class="ml-1 text-pink-800 hover:text-pink-900"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-3 w-3"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              <div
                v-for="schedule in selectedSchedules"
                :key="`sch-${schedule}`"
                class="px-2 py-1 bg-pink-100 text-pink-800 rounded-full text-xs flex items-center"
              >
                {{ schedule }}
                <button
                  @click="removeFilter('schedule', schedule)"
                  class="ml-1 text-pink-800 hover:text-pink-900"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-3 w-3"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              <div
                v-for="range in selectedSalaryRanges"
                :key="`sal-${range}`"
                class="px-2 py-1 bg-pink-100 text-pink-800 rounded-full text-xs flex items-center"
              >
                {{ getSalaryRangeLabel(range) }}
                <button
                  @click="removeFilter('salary', range)"
                  class="ml-1 text-pink-800 hover:text-pink-900"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-3 w-3"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              <div
                v-for="req in selectedRequirements"
                :key="`req-${req}`"
                class="px-2 py-1 bg-pink-100 text-pink-800 rounded-full text-xs flex items-center"
              >
                {{ req }}
                <button
                  @click="removeFilter('requirements', req)"
                  class="ml-1 text-pink-800 hover:text-pink-900"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-3 w-3"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Job Cards -->
          <div
            v-if="filteredJobs.length === 0"
            class="bg-white rounded-xl shadow-md p-8 text-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-16 w-16 text-gray-400 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            <h3 class="mt-4 text-lg font-medium text-gray-900">
              No jobs found
            </h3>
            <p class="mt-2 text-gray-600">
              {{ noJobsMessage }}
            </p>
          </div>

          <div
            v-for="job in filteredJobs"
            :key="job.id"
            class="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <!-- Job card content remains the same -->
            <div class="flex justify-between items-start mb-4">
              <div>
                <h3 class="text-lg font-semibold text-gray-900">
                  {{ job.title }}
                </h3>
                <p class="text-gray-500 flex items-center mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  {{ job.location }}
                </p>
              </div>
              <div class="flex items-center space-x-2">
                <span v-if="job.saved" class="text-pink">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"
                    />
                  </svg>
                </span>
                <span
                  class="px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-sm"
                >
                  {{ job.posted }}
                </span>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div class="flex items-center text-gray-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 mr-2"
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
                {{ job.schedule }}
              </div>
              <div class="flex items-center text-gray-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 mr-2"
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
                {{ job.salary }}
              </div>
            </div>

            <div class="flex items-center text-gray-600 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              {{ job.requirements }}
            </div>

            <div class="flex justify-end space-x-3">
              <button
                @click="toggleSaveJob(job)"
                class="px-4 py-2 border rounded-lg flex items-center transition-colors"
                :class="
                  job.saved
                    ? 'border-pink text-pink bg-pink-50 hover:bg-pink-100'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 mr-2"
                  :fill="job.saved ? 'currentColor' : 'none'"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                  />
                </svg>
                {{ job.saved ? "Saved" : "Save" }}
              </button>
              <button
                v-if="job.status !== 'applied'"
                @click="applyForJob(job)"
                class="px-4 py-2 bg-pink text-white rounded-lg hover:bg-pink-700 transition-colors"
              >
                Quick Apply
              </button>
              <button
                v-else
                class="px-4 py-2 bg-green-500 text-white rounded-lg cursor-default"
              >
                Applied
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Application Success Modal -->
    <div
      v-if="showApplicationModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <div
        class="bg-white rounded-xl shadow-xl max-w-md w-full p-6 text-center"
      >
        <div
          class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8 text-green-500"
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
        <h3 class="text-xl font-bold text-gray-900 mb-2">
          Application Submitted!
        </h3>
        <p class="text-gray-600 mb-6">
          Your application has been successfully submitted. The family will be
          notified and may contact you soon.
        </p>
        <button
          @click="showApplicationModal = false"
          class="w-full px-4 py-2 bg-pink text-white rounded-lg hover:bg-pink-700 transition-colors"
        >
          Continue Browsing
        </button>
      </div>
    </div>
  </NuxtLayout>
</template>
<script lang="ts" setup>
import { ref, computed, watch, onMounted, onUnmounted } from "vue";

// Search and filter state
const searchQuery = ref("");
const activeFilter = ref("all");
const showApplicationModal = ref(false);
const recentlyAppliedJobId = ref(null);

// Filter dropdowns state
const activeFilters = ref({
  location: false,
  schedule: false,
  salary: false,
  more: false,
});

// Selected filter values
const selectedLocations = ref([]);
const selectedSchedules = ref([]);
const selectedSalaryRanges = ref([]);
const selectedRequirements = ref([]);

// Filter options
const locations = [
  "Brooklyn, NY",
  "Manhattan, NY",
  "Queens, NY",
  "Staten Island, NY",
  "Bronx, NY",
];
const schedules = ["Full-time", "Part-time", "Weekends", "Evenings", "Summer"];
const salaryRanges = [
  { label: "Ksh 1,500-2,000/hr", value: "1500-2000" },
  { label: "Ksh 2,000-2,500/hr", value: "2000-2500" },
  { label: "Ksh 2,500-3,000/hr", value: "2500-3000" },
  { label: "Ksh 3,000+/hr", value: "3000+" },
];
const requirements = [
  "First Aid Certified",
  "Driver's License",
  "Experience with infants",
  "Swimming supervision",
  "Background Check",
];

// Jobs data
const jobs = ref([
  {
    id: 1,
    title: "Full-time Nanny for 2 Children",
    location: "Westlands, Nairobi",
    schedule: "Mon-Fri, 8AM-6PM",
    scheduleType: "Full-time", 
    salary: "Ksh 2,000-2,500/hr",
    requirements: "3+ years experience",
    posted: "2 days ago",
    status: "new",
    saved: false,
  },
  {
    id: 2,
    title: "Part-time After School Care",
    location: "Kilimani, Nairobi",
    schedule: "Mon-Thu, 3PM-7PM",
    scheduleType: "Part-time",
    salary: "Ksh 2,300/hr",
    requirements: "Driver's License Required",
    posted: "1 day ago",
    status: "new",
    saved: false,
  },
  {
    id: 3,
    title: "Weekend Babysitter",
    location: "Karen, Nairobi",
    schedule: "Sat-Sun, Flexible Hours",
    scheduleType: "Weekends",
    salary: "Ksh 1,800-2,000/hr",
    requirements: "Experience with infants",
    posted: "5 days ago",
    status: "new",
    saved: false,
  },
  {
    id: 4,
    title: "Summer Nanny for 3 Children",
    location: "Lavington, Nairobi",
    schedule: "Mon-Fri, 9AM-5PM (June-August)",
    scheduleType: "Summer",
    salary: "Ksh 2,800/hr",
    requirements: "Swimming supervision, 5+ years experience",
    posted: "3 days ago",
    status: "new",
    saved: false,
  },
  {
    id: 5,
    title: "Date Night Sitter",
    location: "Kileleshwa, Nairobi",
    schedule: "Fri-Sat Evenings, 6PM-11PM",
    scheduleType: "Evenings",
    salary: "Ksh 2,000/hr",
    requirements: "Experience with toddlers",
    posted: "1 week ago",
    status: "new",
    saved: false,
  },
]);

// Computed Properties
const isFiltering = computed(() => {
  return (
    selectedLocations.value.length > 0 ||
    selectedSchedules.value.length > 0 ||
    selectedSalaryRanges.value.length > 0 ||
    selectedRequirements.value.length > 0 ||
    searchQuery.value.trim() !== ""
  );
});

const filteredJobs = computed(() => {
  let filtered = jobs.value;

  // Search filter
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(
      (job) =>
        job.title.toLowerCase().includes(query) ||
        job.location.toLowerCase().includes(query) ||
        job.requirements.toLowerCase().includes(query)
    );
  }

  // Location filter
  if (selectedLocations.value.length > 0) {
    filtered = filtered.filter((job) =>
      selectedLocations.value.includes(job.location)
    );
  }

  // Schedule filter
  if (selectedSchedules.value.length > 0) {
    filtered = filtered.filter((job) =>
      selectedSchedules.value.includes(job.scheduleType)
    );
  }

  // Salary filter
  if (selectedSalaryRanges.value.length > 0) {
    filtered = filtered.filter((job) => {
      const jobSalary = parseInt(job.salary.replace(/\D/g, ""));
      return selectedSalaryRanges.value.some((range) => {
        const [min, max] = range.split("-");
        if (max) {
          return jobSalary >= parseInt(min) && jobSalary <= parseInt(max);
        }
        return jobSalary >= parseInt(min);
      });
    });
  }

  // Requirements filter
  if (selectedRequirements.value.length > 0) {
    filtered = filtered.filter((job) =>
      selectedRequirements.value.some((req) => job.requirements.includes(req))
    );
  }

  // Status filter
  if (activeFilter.value !== "all") {
    if (activeFilter.value === "saved") {
      filtered = filtered.filter((job) => job.saved);
    } else {
      filtered = filtered.filter((job) => job.status === activeFilter.value);
    }
  }

  return filtered;
});

const noJobsMessage = computed(() => {
  if (isFiltering.value) {
    return "No jobs match your current filters. Try adjusting your search criteria.";
  }
  switch (activeFilter.value) {
    case "saved":
      return "You haven't saved any jobs yet. Save jobs to view them later.";
    case "applied":
      return "You haven't applied to any jobs yet. Apply to jobs to see them here.";
    default:
      return "No jobs available at the moment. Please check back later.";
  }
});

// Methods
const toggleFilter = (filterName: string) => {
  // Close other filters
  
  Object.keys(activeFilters.value).forEach((key) => {
    if (key !== filterName) {
      activeFilters.value[key] = false;
    }
  });
  // Toggle the selected filter
  activeFilters.value[filterName] = !activeFilters.value[filterName];
};

const applyFilter = (filterType: string) => {
  activeFilters.value[filterType] = false;
};

const removeFilter = (type: string, value: string) => {
  switch (type) {
    case "location":
      selectedLocations.value = selectedLocations.value.filter(
        (loc) => loc !== value
      );
      break;
    case "schedule":
      selectedSchedules.value = selectedSchedules.value.filter(
        (sch) => sch !== value
      );
      break;
    case "salary":
      selectedSalaryRanges.value = selectedSalaryRanges.value.filter(
        (sal) => sal !== value
      );
      break;
    case "requirements":
      selectedRequirements.value = selectedRequirements.value.filter(
        (req) => req !== value
      );
      break;
  }
};

const clearAllFilters = () => {
  selectedLocations.value = [];
  selectedSchedules.value = [];
  selectedSalaryRanges.value = [];
  selectedRequirements.value = [];
  searchQuery.value = "";
};

const getSalaryRangeLabel = (value: string) => {
  const range = salaryRanges.find((r) => r.value === value);
  return range ? range.label : value;
};

const setActiveFilter = (filter: string) => {
  activeFilter.value = filter;
};

const toggleSaveJob = (job) => {
  job.saved = !job.saved;
};

const applyForJob = (job) => {
  job.status = "applied";
  recentlyAppliedJobId.value = job.id;
  showApplicationModal.value = true;
};

// Close filter dropdowns when clicking outside
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (!target.closest(".filter-dropdown")) {
    Object.keys(activeFilters.value).forEach((key) => {
      activeFilters.value[key] = false;
    });
  }
};

// Lifecycle hooks
onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>
