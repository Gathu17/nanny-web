<template>
  <NuxtLayout name="client-layout">
    <div class="bg-pink-50 min-h-screen p-4 sm:p-6 lg:p-8">
      <!-- Welcome Section -->
      <div class="max-w-7xl mx-auto mb-8">
        <div
          class="bg-gradient-to-r from-pink to-violet-100 rounded-xl shadow-lg overflow-hidden"
        >
          <div
            class="px-6 py-8 md:px-10 md:py-12 md:flex md:items-center md:justify-between"
          >
            <div class="md:flex-1">
              <h1 class="text-2xl md:text-3xl font-bold text-white">
                Welcome back, {{ clientName }}!
              </h1>
              <p class="mt-2">
                Find the perfect nanny for your family's needs.
              </p>
            </div>
            <div class="mt-6 md:mt-0">
              <button
                @click="showPostJobModal = true"
                class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-pink bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-150"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Post a New Job
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Left Column - Jobs -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Active Jobs Section -->
          <div class="bg-white rounded-xl shadow-md overflow-hidden">
            <div
              class="px-6 py-4 border-b border-gray-200 flex justify-between items-center"
            >
              <h2 class="text-xl font-semibold text-gray-800">
                Your Active Jobs
              </h2>
              <div class="flex space-x-2">
                <button
                  class="text-sm px-3 py-1 rounded-md bg-pink text-pink-700 hover:bg-pink-200 transition-colors duration-150"
                >
                  All
                </button>
                <button
                  class="text-sm px-3 py-1 rounded-md text-gray-600 hover:bg-gray-100 transition-colors duration-150"
                >
                  Active
                </button>
                <button
                  class="text-sm px-3 py-1 rounded-md text-gray-600 hover:bg-gray-100 transition-colors duration-150"
                >
                  Completed
                </button>
              </div>
            </div>

            <div v-if="jobs.length > 0" class="divide-y divide-gray-200">
              <div
                v-for="job in jobs"
                :key="job.id"
                @click="handleJobClick(job)"
                class="p-6 hover:bg-gray-50 transition-colors duration-150"
              >
                <div class="flex justify-between items-start">
                  <div>
                    <h3 class="text-lg font-medium text-gray-900">
                      {{ job.title }}
                    </h3>
                    <div class="mt-1 flex items-center text-sm text-gray-500">
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
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      {{ job.date }}
                    </div>
                    <div class="mt-1 flex items-center text-sm text-gray-500">
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
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {{ job.time }}
                    </div>
                    <div class="mt-1 flex items-center text-sm text-gray-500">
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
                    </div>
                  </div>
                  <div class="flex flex-col items-end">
                    <span
                      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                      :class="{
                        'bg-green-100 text-green-800': job.status === 'Active',
                        'bg-pink-100 text-pink-800':
                          job.status === 'In Progress',
                        'bg-gray-100 text-gray-800': job.status === 'Completed',
                      }"
                    >
                      {{ job.status }}
                    </span>
                    <span class="mt-2 text-sm text-gray-500"
                      >{{ job.applicants }} applicants</span
                    >
                  </div>
                </div>

                <div class="mt-4 flex flex-wrap gap-2">
                  <span
                    v-for="(child, index) in job.children"
                    :key="index"
                    class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-pink-100 text-pink-800"
                  >
                    {{ child.name }}, {{ child.age }}
                  </span>
                </div>

                <div class="mt-4 flex justify-between">
                  <div class="text-sm">
                    <span class="font-medium text-gray-900"
                      >Ksh{{ job.rate }}/hour</span
                    >
                  </div>
                  <div class="flex space-x-2">
                    <button
                      class="text-sm px-3 py-1 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                    >
                      View Details
                    </button>
                    <button
                      class="text-sm px-3 py-1 rounded-md bg-pink-600 text-white hover:bg-pink-700 transition-colors duration-150"
                    >
                      View Applicants
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div v-else class="p-8 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-12 w-12 mx-auto text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <h3 class="mt-2 text-lg font-medium text-gray-900">
                No active jobs
              </h3>
              <p class="mt-1 text-sm text-gray-500">
                Get started by posting your first job.
              </p>
              <div class="mt-6">
                <button
                  @click="showPostJobModal = true"
                  class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink"
                >
                  Post a Job
                </button>
              </div>
            </div>
          </div>

          <!-- Recent Activity -->
          <div class="bg-white rounded-xl shadow-md overflow-hidden">
            <div class="px-6 py-4 border-b border-gray-200">
              <h2 class="text-xl font-semibold text-gray-800">
                Recent Activity
              </h2>
            </div>
            <div class="p-6 space-y-4">
              <div
                v-for="(activity, index) in recentActivity"
                :key="index"
                class="flex items-start space-x-3"
              >
                <div class="flex-shrink-0">
                  <img
                    :src="activity.avatar"
                    alt="User Avatar"
                    class="h-10 w-10 rounded-full"
                  />
                </div>
                <div class="min-w-0 flex-1">
                  <p class="text-sm text-gray-900">
                    <span class="font-medium">{{ activity.name }}</span>
                    {{ activity.action }}
                  </p>
                  <p class="text-sm text-gray-500">{{ activity.time }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column - Resources -->
        <div class="space-y-6">
          <!-- Quick Stats -->
          <div class="bg-white rounded-xl shadow-md overflow-hidden">
            <div class="px-6 py-4 border-b border-gray-200">
              <h2 class="text-xl font-semibold text-gray-800">Quick Stats</h2>
            </div>
            <div class="p-6 grid grid-cols-2 gap-4">
              <div class="bg-pink-50 rounded-lg p-4 text-center">
                <div class="text-2xl font-bold text-pink-700">
                  {{ stats.activeJobs }}
                </div>
                <div class="text-sm text-gray-600">Active Jobs</div>
              </div>
              <div class="bg-green-50 rounded-lg p-4 text-center">
                <div class="text-2xl font-bold text-green-700">
                  {{ stats.totalApplicants }}
                </div>
                <div class="text-sm text-gray-600">Total Applicants</div>
              </div>
              <div class="bg-purple-50 rounded-lg p-4 text-center">
                <div class="text-2xl font-bold text-purple-700">
                  {{ stats.hiredNannies }}
                </div>
                <div class="text-sm text-gray-600">Hired Nannies</div>
              </div>
              <div class="bg-yellow-50 rounded-lg p-4 text-center">
                <div class="text-2xl font-bold text-yellow-700">
                  {{ stats.savedNannies }}
                </div>
                <div class="text-sm text-gray-600">Saved Nannies</div>
              </div>
            </div>
          </div>

          <!-- Help & Resources -->
          <div class="bg-white rounded-xl shadow-md overflow-hidden">
            <div class="px-6 py-4 border-b border-gray-200">
              <h2 class="text-xl font-semibold text-gray-800">
                Help & Resources
              </h2>
            </div>
            <div class="p-6 space-y-4">
              <div class="group cursor-pointer">
                <h3
                  class="text-md font-medium text-gray-900 group-hover:text-pink-600 transition-colors duration-150"
                >
                  How to Find the Perfect Nanny
                </h3>
                <p class="mt-1 text-sm text-gray-500">
                  Learn about the key qualities to look for in a nanny for your
                  children.
                </p>
              </div>
              <div class="border-t border-gray-100 pt-4 group cursor-pointer">
                <h3
                  class="text-md font-medium text-gray-900 group-hover:text-pink-600 transition-colors duration-150"
                >
                  Payment Guidelines
                </h3>
                <p class="mt-1 text-sm text-gray-500">
                  Understand fair compensation and payment methods for childcare
                  services.
                </p>
              </div>
              <div class="border-t border-gray-100 pt-4 group cursor-pointer">
                <h3
                  class="text-md font-medium text-gray-900 group-hover:text-pink-600 transition-colors duration-150"
                >
                  Safety & Background Checks
                </h3>
                <p class="mt-1 text-sm text-gray-500">
                  Ensure your family's safety with proper vetting procedures.
                </p>
              </div>
              <div class="border-t border-gray-100 pt-4 group cursor-pointer">
                <h3
                  class="text-md font-medium text-gray-900 group-hover:text-pink-600 transition-colors duration-150"
                >
                  Creating an Effective Job Posting
                </h3>
                <p class="mt-1 text-sm text-gray-500">
                  Tips for writing a job description that attracts qualified
                  candidates.
                </p>
              </div>
            </div>
            <div class="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <a
                href="#"
                class="text-sm font-medium text-pink-600 hover:text-pink"
              >
                View all resources <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          <!-- Need Help? -->
          <div
            class="bg-gradient-to-r from-pink to-purple-600 rounded-xl shadow-md overflow-hidden"
          >
            <div class="px-6 py-8 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-12 w-12 mx-auto text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              <h3 class="mt-4 text-xl font-bold text-white">
                Need personalized help?
              </h3>
              <p class="mt-2 text-indigo-100">
                Our childcare specialists are ready to assist you in finding the
                perfect match for your family.
              </p>
              <button
                class="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Post Job Modal -->
      <div
        v-if="showPostJobModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      >
        <div
          class="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        >
          <div class="p-6">
            <div class="flex justify-between items-start">
              <h2 class="text-xl font-bold text-gray-900">Post a New Job</h2>
              <button
                @click="showPostJobModal = false"
                class="text-gray-400 hover:text-gray-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
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
              </button>
            </div>

            <form @submit.prevent="submitJob" class="mt-6 space-y-6">
              <div>
                <label
                  for="job-title"
                  class="block text-sm font-medium text-gray-700"
                  >Job Title</label
                >
                <input
                  type="text"
                  id="job-title"
                  v-model="newJob.title"
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-pink focus:border-pink"
                  placeholder="e.g., After-School Nanny for 2 Children"
                  required
                />
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    for="job-date"
                    class="block text-sm font-medium text-gray-700"
                    >Date</label
                  >
                  <input
                    type="date"
                    id="job-date"
                    v-model="newJob.date"
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-pink focus:border-pink"
                    required
                  />
                </div>
                <div>
                  <label
                    for="job-time"
                    class="block text-sm font-medium text-gray-700"
                    >Time</label
                  >
                  <input
                    type="text"
                    id="job-time"
                    v-model="newJob.time"
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-pink focus:border-pink"
                    placeholder="e.g., 3:00 PM - 7:00 PM"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  for="job-location"
                  class="block text-sm font-medium text-gray-700"
                  >Location</label
                >
                <input
                  type="text"
                  id="job-location"
                  v-model="newJob.location"
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-pink focus:border-pink"
                  placeholder="Your address"
                  required
                />
              </div>

              <div>
                <label
                  for="job-rate"
                  class="block text-sm font-medium text-gray-700"
                  >Hourly Rate (Ksh)</label
                >
                <input
                  type="number"
                  id="job-rate"
                  v-model="newJob.rate"
                  min="1"
                  step="0.01"
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-pink focus:border-pink"
                  required
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700"
                  >Children</label
                >
                <div class="mt-2 space-y-3">
                  <div
                    v-for="(child, index) in newJob.children"
                    :key="index"
                    class="flex items-center space-x-4"
                  >
                    <input
                      type="text"
                      v-model="child.name"
                      class="flex-1 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-pink focus:border-pink"
                      placeholder="Child's name"
                    />
                    <input
                      type="number"
                      v-model="child.age"
                      min="0"
                      max="18"
                      class="w-20 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-pink focus:border-pink"
                      placeholder="Age"
                    />
                    <button
                      type="button"
                      @click="removeChild(index)"
                      class="text-red-600 hover:text-red-800"
                    >
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
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                  <button
                    type="button"
                    @click="addChild"
                    class="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink"
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
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    Add Child
                  </button>
                </div>
              </div>

              <div>
                <label
                  for="job-description"
                  class="block text-sm font-medium text-gray-700"
                  >Job Description</label
                >
                <textarea
                  id="job-description"
                  v-model="newJob.description"
                  rows="4"
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-pink focus:border-pink"
                  placeholder="Describe the responsibilities, requirements, and any special instructions..."
                  required
                ></textarea>
              </div>

              <div class="flex justify-end space-x-3">
                <button
                  type="button"
                  @click="showPostJobModal = false"
                  class="px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  class="px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-pink/80 hover:bg-pink focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink"
                >
                  Post Job
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- Job Details Modal -->
      <div
        v-if="selectedJob"
        class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      >
        <div class="bg-white rounded-xl shadow-xl max-w-3xl w-full p-6">
          <div class="flex justify-between items-start mb-6">
            <h2 class="text-2xl font-bold text-gray-900">
              {{ isEditing ? "Edit Job" : "Job Details" }}
            </h2>
            <button
              @click="closeJobModal"
              class="text-gray-400 hover:text-gray-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
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
            </button>
          </div>

          <!-- View Mode -->
          <div v-if="!isEditing">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 class="text-sm font-medium text-gray-500">Title</h3>
                <p class="mt-1 text-gray-900">{{ selectedJob.title }}</p>
              </div>
              <div>
                <h3 class="text-sm font-medium text-gray-500">Location</h3>
                <p class="mt-1 text-gray-900">{{ selectedJob.location }}</p>
              </div>
              <div>
                <h3 class="text-sm font-medium text-gray-500">Schedule</h3>
                <p class="mt-1 text-gray-900">
                  {{ selectedJob.date }} {{ selectedJob.time }}
                </p>
              </div>
              <div>
                <h3 class="text-sm font-medium text-gray-500">Rate</h3>
                <p class="mt-1 text-gray-900">Ksh{{ selectedJob.rate }}/hour</p>
              </div>
            </div>

            <div class="mb-6">
              <h3 class="text-sm font-medium text-gray-500">Children</h3>
              <div class="mt-2 flex flex-wrap gap-2">
                <span
                  v-for="child in selectedJob.children"
                  :key="child.name"
                  class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-pink-100 text-pink-800"
                >
                  {{ child.name }}, {{ child.age }}
                </span>
              </div>
            </div>

            <div class="mb-6">
              <h3 class="text-sm font-medium text-gray-500">Description</h3>
              <p class="mt-1 text-gray-900">{{ selectedJob.description }}</p>
            </div>

            <div class="flex justify-end space-x-3">
              <button
                @click="confirmDelete"
                class="px-4 py-2 border border-red-300 text-red-700 shadow-sm text-sm font-medium rounded-md hover:bg-red-50"
              >
                Delete Job
              </button>
              <button
                @click="startEditing"
                class="px-4 py-2 bg-pink/80 text-white shadow-sm text-sm font-medium rounded-md hover:bg-pink"
              >
                Edit Job
              </button>
            </div>
          </div>

          <!-- Edit Mode -->
          <form v-else @submit.prevent="saveJobChanges">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label class="block text-sm font-medium text-gray-700"
                  >Title</label
                >
                <input
                  type="text"
                  v-model="editedJob.title"
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-pink focus:border-pink"
                  required
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700"
                  >Location</label
                >
                <input
                  type="text"
                  v-model="editedJob.location"
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-pink focus:border-pink"
                  required
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700"
                  >Date</label
                >
                <input
                  type="date"
                  v-model="editedJob.date"
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-pink focus:border-pink"
                  required
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700"
                  >Time</label
                >
                <input
                  type="text"
                  v-model="editedJob.time"
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-pink focus:border-pink"
                  required
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700"
                  >Rate (Ksh/hour)</label
                >
                <input
                  type="number"
                  v-model="editedJob.rate"
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-pink focus:border-pink"
                  required
                />
              </div>
            </div>

            <div class="mb-6">
              <label class="block text-sm font-medium text-gray-700"
                >Children</label
              >
              <div
                v-for="(child, index) in editedJob.children"
                :key="index"
                class="mt-2 flex items-center gap-2"
              >
                <input
                  type="text"
                  v-model="child.name"
                  placeholder="Name"
                  class="flex-1 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-pink focus:border-pink"
                />
                <input
                  type="text"
                  v-model="child.age"
                  placeholder="Age"
                  class="w-24 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-pink focus:border-pink"
                />
                <button
                  type="button"
                  @click="removeChild(index)"
                  class="text-red-600 hover:text-red-800"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
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
              <button
                type="button"
                @click="addChild"
                class="mt-2 text-sm text-pink-600 hover:text-pink-700"
              >
                + Add Child
              </button>
            </div>

            <div class="mb-6">
              <label class="block text-sm font-medium text-gray-700"
                >Description</label
              >
              <textarea
                v-model="editedJob.description"
                rows="4"
                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-pink focus:border-pink"
              ></textarea>
            </div>

            <div class="flex justify-end space-x-3">
              <button
                type="button"
                @click="cancelEditing"
                class="px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="px-4 py-2 bg-pink/80 text-white shadow-sm text-sm font-medium rounded-md hover:bg-pink"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Delete Confirmation Modal -->
      <div
        v-if="showDeleteConfirm"
        class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      >
        <div
          class="bg-white rounded-xl shadow-xl max-w-md w-full p-6 text-center"
        >
          <div class="mb-4">
            <div
              class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100"
            >
              <svg
                class="h-6 w-6 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
          </div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">Delete Job</h3>
          <p class="text-sm text-gray-500 mb-6">
            Are you sure you want to delete this job? This action cannot be
            undone.
          </p>
          <div class="flex justify-center space-x-3">
            <button
              @click="showDeleteConfirm = false"
              class="px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              @click="deleteJob"
              class="px-4 py-2 bg-red-600 text-white shadow-sm text-sm font-medium rounded-md hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
import { ref, reactive } from 'vue'

const clientName = ref("Jessica")
const showPostJobModal = ref(false)
const newJob = reactive({
  title: "",
  date: "",
  time: "",
  location: "",
  rate: 20,
  description: "",
  children: [{ name: "", age: "" }],
})

const jobs = ref([
  {
    id: 1,
    title: "After-School Nanny for 2 Children",
    date: "Mon, Wed, Fri", 
    time: "3:00 PM - 7:00 PM",
    location: "Kilimani, Nairobi",
    status: "Active",
    applicants: 5,
    rate: 800,
    children: [
      { name: "Emma", age: 8 },
      { name: "Noah", age: 6 },
    ],
  },
  {
    id: 2,
    title: "Weekend Babysitter Needed",
    date: "Saturday",
    time: "6:00 PM - 11:00 PM", 
    location: "Westlands, Nairobi",
    status: "In Progress",
    applicants: 3,
    rate: 700,
    children: [{ name: "Olivia", age: 4 }],
  },
  {
    id: 3,
    title: "Full-Time Summer Nanny",
    date: "Mon-Fri",
    time: "9:00 AM - 5:00 PM",
    location: "Karen, Nairobi", 
    status: "Completed",
    applicants: 12,
    rate: 1000,
    children: [
      { name: "Liam", age: 7 },
      { name: "Ava", age: 5 },
      { name: "Ethan", age: 3 },
    ],
  },
])

const recentActivity = ref([
  {
    name: "Emily Johnson",
    avatar: "https://randomuser.me/api/portraits/women/45.jpg",
    action: 'applied to your job "After-School Nanny for 2 Children"',
    time: "2 hours ago",
  },
  {
    name: "Michael Smith", 
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    action: 'sent you a message about "Weekend Babysitter Needed"',
    time: "Yesterday",
  },
  {
    name: "Sarah Williams",
    avatar: "https://randomuser.me/api/portraits/women/67.jpg", 
    action: 'completed her shift for "Full-Time Summer Nanny"',
    time: "2 days ago",
  },
])

const stats = reactive({
  activeJobs: 2,
  totalApplicants: 20,
  hiredNannies: 3,
  savedNannies: 5,
})

const selectedJob = ref(null)
const isEditing = ref(false)
const editedJob = ref(null)
const showDeleteConfirm = ref(false)

const addChild = () => {
  if (isEditing.value) {
    editedJob.value.children.push({ name: "", age: "" })
  } else {
    newJob.children.push({ name: "", age: "" })
  }
}

const removeChild = (index) => {
  if (isEditing.value) {
    if (editedJob.value.children.length > 1) {
      editedJob.value.children.splice(index, 1)
    }
  } else {
    if (newJob.children.length > 1) {
      newJob.children.splice(index, 1)
    }
  }
}

const submitJob = () => {
  // Here you would typically send the job data to your backend
  console.log("Submitting job:", newJob)

  // For demo purposes, add the job to the list
  const newJobId = jobs.value.length + 1
  const jobToAdd = {
    id: newJobId,
    title: newJob.title,
    date: new Date(newJob.date).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short", 
      day: "numeric",
    }),
    time: newJob.time,
    location: newJob.location,
    status: "Active",
    applicants: 0,
    rate: newJob.rate,
    children: [...newJob.children],
  }

  jobs.value.unshift(jobToAdd)
  stats.activeJobs += 1

  // Reset form and close modal
  Object.assign(newJob, {
    title: "",
    date: "",
    time: "",
    location: "",
    rate: 20,
    description: "",
    children: [{ name: "", age: "" }],
  })
  showPostJobModal.value = false

  // Show success message (in a real app)
  alert("Job posted successfully!")
}

const viewJobDetails = (job) => {
  selectedJob.value = job
  editedJob.value = null
  isEditing.value = false
}

const startEditing = () => {
  editedJob.value = JSON.parse(JSON.stringify(selectedJob.value))
  isEditing.value = true
}

const cancelEditing = () => {
  editedJob.value = null
  isEditing.value = false
}

const saveJobChanges = () => {
  // Update the job in the jobs array
  const index = jobs.value.findIndex(
    (job) => job.id === selectedJob.value.id
  )
  if (index !== -1) {
    jobs.value[index] = { ...editedJob.value }
    selectedJob.value = jobs.value[index]
  }
  isEditing.value = false
  editedJob.value = null
}

const confirmDelete = () => {
  showDeleteConfirm.value = true
}

const deleteJob = () => {
  const index = jobs.value.findIndex(
    (job) => job.id === selectedJob.value.id
  )
  if (index !== -1) {
    jobs.value.splice(index, 1)
  }
  showDeleteConfirm.value = false
  selectedJob.value = null
}

const closeJobModal = () => {
  selectedJob.value = null
  editedJob.value = null
  isEditing.value = false
  showDeleteConfirm.value = false
}

const handleJobClick = (job) => {
  viewJobDetails(job)
}
</script>
