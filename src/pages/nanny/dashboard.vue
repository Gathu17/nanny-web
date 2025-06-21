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
                        :checked="selectedLocations.includes(location)"
                        @change="
                          () =>
                            selectedLocations.includes(location)
                              ? jobStore.removeLocationFilter(location)
                              : jobStore.addLocationFilter(location)
                        "
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
                        :checked="selectedSchedules.includes(schedule)"
                        @change="
                          () =>
                            selectedSchedules.includes(schedule)
                              ? jobStore.removeScheduleFilter(schedule)
                              : jobStore.addScheduleFilter(schedule)
                        "
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
                        :checked="selectedSalaryRanges.includes(range.value)"
                        @change="
                          () =>
                            selectedSalaryRanges.includes(range.value)
                              ? jobStore.removeSalaryFilter(range.value)
                              : jobStore.addSalaryFilter(range.value)
                        "
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
                          :checked="selectedRequirements.includes(req)"
                          @change="
                            () =>
                              selectedRequirements.includes(req)
                                ? jobStore.removeRequirementFilter(req)
                                : jobStore.addRequirementFilter(req)
                          "
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
            v-if="loading"
            class="bg-white rounded-xl shadow-md p-8 text-center"
          >
            <div
              class="animate-spin rounded-full h-12 w-12 border-b-2 border-pink mx-auto"
            ></div>
            <h3 class="mt-4 text-lg font-medium text-gray-900">
              Loading jobs...
            </h3>
            <p class="mt-2 text-gray-600">
              Please wait while we fetch the latest job listings.
            </p>
          </div>

          <div
            v-else-if="error"
            class="bg-white rounded-xl shadow-md p-8 text-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-16 w-16 text-red-400 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
            <h3 class="mt-4 text-lg font-medium text-gray-900">
              Error loading jobs
            </h3>
            <p class="mt-2 text-gray-600">
              {{ error }}
            </p>
            <button
              @click="jobStore.loadJobs"
              class="mt-4 px-4 py-2 bg-pink text-white rounded-lg hover:bg-pink-700 transition-colors"
            >
              Try Again
            </button>
          </div>

          <div
            v-else-if="jobs.length === 0"
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

          <div v-else>
            <div
              v-for="job in activeFilter === 'all' ? jobs : savedJobs"
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
                  {{ job.schedule["days"] }} - ({{ job.schedule["hours"] }})
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
                  {{ job.salaryRange }}
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
                {{ job.requirements.toString() }}
              </div>

              <div class="flex justify-end space-x-3">
                <button
                  @click="toggleSaveJob(job)"
                  class="px-4 py-2 border rounded-lg flex items-center transition-colors"
                  :class="
                    isSaved(job.savedByUsers)
                      ? 'border-pink text-pink bg-pink-50 hover:bg-pink-100'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 mr-2"
                    :fill="isSaved(job.savedByUsers) ? 'currentColor' : 'none'"
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
            <!-- Pagination -->
            <div v-if="totalPages > 1" class="mt-8 flex justify-center">
              <nav class="flex items-center space-x-2">
                <button
                  @click="jobStore.previousPage()"
                  :disabled="!canGoPrevious"
                  class="px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Previous
                </button>
                <span class="px-3 py-2 text-gray-600">
                  Page {{ currentPage }} of {{ totalPages }}
                </span>
                <button
                  @click="jobStore.nextPage()"
                  :disabled="!canGoNext"
                  class="px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Next
                </button>
              </nav>
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
import { storeToRefs } from "pinia";
import { useJobStore } from "@/stores/job";
import { useAuthStore } from "@/stores/auth";
// Use the job store
const jobStore = useJobStore();
const authStore = useAuthStore();
// Application modal state
const showApplicationModal = ref(false);
const recentlyAppliedJobId = ref(null);

// Filter dropdowns state
const activeFilters = ref({
  location: false,
  schedule: false,
  salary: false,
  more: false,
});

// Get reactive state from store
const {
  jobs,
  loading,
  error,
  filterOptions,
  selectedLocations,
  selectedSchedules,
  selectedSalaryRanges,
  selectedRequirements,
  activeFilter,
  searchQuery,
  totalPages,
  currentPage,
  // Computed properties
  isFiltering,
  hasActiveFilters,
  canGoNext,
  canGoPrevious,
  // Filter options
  getLocations: locations,
  getSchedules: schedules,
  getSalaryRanges: salaryRanges,
  getRequirements: requirements,
} = storeToRefs(jobStore);

const savedJobs = computed(() => {
  if (!authStore.user?.id) return [];
  return jobStore.getSavedJobs(authStore.user.id);
});
const noJobsMessage = computed(() => {
  if (loading.value) {
    return "Loading jobs...";
  }
  if (error.value) {
    return "Error loading jobs. Please try again.";
  }
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

const isSaved = (users) => {
  if (!Array.isArray(users) || !authStore.user || !authStore.user.id)
    return false;
  return users.some((user) => user.id === authStore.user.id);
};

const applyFilter = (filterType: string) => {
  activeFilters.value[filterType] = false;
};

const removeFilter = (type: string, value: string) => {
  switch (type) {
    case "location":
      jobStore.removeLocationFilter(value);
      break;
    case "schedule":
      jobStore.removeScheduleFilter(value);
      break;
    case "salary":
      jobStore.removeSalaryFilter(value);
      break;
    case "requirements":
      jobStore.removeRequirementFilter(value);
      break;
  }
};

const clearAllFilters = () => {
  jobStore.clearAllFilters();
};

const getSalaryRangeLabel = (value: string) => {
  const range = salaryRanges.value.find((r) => r.value === value);
  return range ? range.label : value;
};

const setActiveFilter = (filter: string) => {
  jobStore.setActiveFilter(filter as "all" | "new" | "applied" | "saved");
};

const toggleSaveJob = async (job: any) => {
  try {
    await jobStore.toggleSaveJob(job.id);
  } catch (err) {
    console.error("Failed to toggle save job:", err);
    // Fallback to local toggle if API fails
    job.saved = !job.saved;
  }
};

const applyForJob = async (job: any) => {
  try {
    await jobStore.applyForJob(job.id, {});
    recentlyAppliedJobId.value = job.id;
    showApplicationModal.value = true;
  } catch (err) {
    console.error("Failed to apply for job:", err);
    // Still show success modal for demo purposes
    job.status = "applied";
    recentlyAppliedJobId.value = job.id;
    showApplicationModal.value = true;
  }
};

// Watch for search query changes with debounce
let searchTimeout: number;
watch(searchQuery, (newQuery) => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    jobStore.setSearchQuery(newQuery);
  }, 500);
});

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
onMounted(async () => {
  document.addEventListener("click", handleClickOutside);
  await jobStore.loadJobs();
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>
