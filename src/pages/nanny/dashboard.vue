<template>
 <NuxtLayout name="nanny-layout">
 <div className="min-h-screen bg-gray-50">

      <div className="max-w-7xl mx-auto px-4 py-8">
        <!-- {/* Search and Filter Section */} -->
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
            <div className="flex-1 relative mb-4 md:mb-0">
              <!-- <Search className="absolute left-3 top-3 text-gray-400" /> -->
              <input
                type="text"
                placeholder="Search jobs..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex space-x-2">
              <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center">
                <!-- <MapPin className="w-4 h-4 mr-2" /> -->
                Location
              </button>
              <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                Schedule
              </button>
              <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center">
                <!-- <DollarSign className="w-4 h-4 mr-2" /> -->
                Salary
              </button>
              <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center">
                <!-- <Filter className="w-4 h-4 mr-2" /> -->
                More
              </button>
            </div>
          </div>
        </div>

        <!-- {/* Job Listings */} -->
        <div className="space-y-4">
          <!-- {/* Filter Tabs */} -->
          <div className="flex space-x-4 mb-6">
            <button
              :class="[
                'px-4 py-2 rounded-lg',
                activeFilter === 'all' ? 'bg-pink text-white' : 'bg-white text-gray-600'
              ]"
              @click="setActiveFilter('all')"
            >
              All Jobs
            </button>
            <button
              :class="[
                'px-4 py-2 rounded-lg',
                activeFilter === 'new' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600'
              ]"
              @click="setActiveFilter('new')"
            >
              New
            </button>
            <button
              class="px-4 py-2 rounded-lg "
              @click="setActiveFilter('applied')"
            >
              Applied
            </button>
          </div>

          <!-- {/* Job Cards */} -->
          <div v-for="job in jobs" :key="job.id" class="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
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
              <button class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                Save
              </button>
              <button class="px-4 py-2 bg-pink text-white rounded-lg hover:bg-blue-700">
                Quick Apply
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
<script lang="ts" setup>
import {ref} from 'vue'
const jobs = [
    {
      id: 1,
      title: "Full-time Nanny for 2 Children",
      location: "Brooklyn, NY",
      schedule: "Mon-Fri, 8AM-6PM",
      salary: "$25-30/hr",
      requirements: "3+ years experience, First Aid Certified",
      posted: "2 days ago",
      status: "new"
    },
    {
      id: 2,
      title: "Part-time After School Care",
      location: "Manhattan, NY",
      schedule: "Mon-Thu, 3PM-7PM",
      salary: "$28/hr",
      requirements: "Driver's License Required",
      posted: "1 day ago",
      status: "new"
    },
    {
      id: 3,
      title: "Weekend Babysitter",
      location: "Queens, NY",
      schedule: "Sat-Sun, Flexible Hours",
      salary: "$22-25/hr",
      requirements: "Experience with infants",
      posted: "5 days ago",
      status: "applied"
    }
  ];


const activeFilter = ref('all')
const setActiveFilter = (string: string) => {
  // activeFilter.value = string
}


</script>