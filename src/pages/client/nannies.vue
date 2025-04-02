<template>
  <NuxtLayout name="client-layout">
    <div class="bg-pink-50 min-h-screen p-4 sm:p-6 lg:p-8">
      <!-- Header -->
      <div class="max-w-7xl mx-auto mb-6">
        <div class="bg-white rounded-xl shadow-md overflow-hidden">
          <div class="bg-pink p-4 text-white">
            <h1 class="text-2xl font-bold">Find Nannies Near You</h1>
          </div>
          <div class="p-4 flex flex-wrap items-center justify-between gap-4">
            <div class="flex items-center space-x-4 w-full md:w-auto">
              <div class="relative flex-grow md:max-w-md">
                <input
                  type="text"
                  placeholder="Enter your location"
                  class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink focus:border-pink"
                />
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
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
              </div>
              <button
                class="bg-pink text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors duration-150"
              >
                Search
              </button>
            </div>

            <div class="flex flex-wrap gap-2 w-full md:w-auto">
              <select
                class="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink focus:border-pink"
              >
                <option value="">Experience Level</option>
                <option value="beginner">Beginner (0-1 years)</option>
                <option value="intermediate">Intermediate (1-3 years)</option>
                <option value="experienced">Experienced (3+ years)</option>
              </select>

              <select
                class="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink focus:border-pink"
              >
                <option value="">Availability</option>
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="weekends">Weekends</option>
                <option value="evenings">Evenings</option>
              </select>

              <select
                class="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink focus:border-pink"
              >
                <option value="">Hourly Rate</option>
                <option value="15-20">$15-$20</option>
                <option value="20-25">$20-$25</option>
                <option value="25-30">$25-$30</option>
                <option value="30+">$30+</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Left Column - Nanny List -->
          <div
            class="bg-white rounded-xl shadow-md overflow-hidden h-[calc(100vh-12rem)] flex flex-col"
          >
            <div class="p-4 border-b border-gray-200">
              <h2 class="text-lg font-semibold text-gray-800">
                {{ nannies.length }} Nannies Available
              </h2>
            </div>

            <div class="overflow-y-auto flex-grow">
              <div
                v-for="nanny in nannies"
                :key="nanny.id"
                @click="selectNanny(nanny)"
                class="p-4 border-b border-gray-200 hover:bg-pink-50 cursor-pointer transition-colors duration-150"
                :class="{
                  'bg-pink-100': selectedNanny && selectedNanny.id === nanny.id,
                }"
              >
                <div class="flex items-start space-x-4">
                  <img
                    :src="nanny.avatar"
                    alt="Nanny profile"
                    class="w-16 h-16 rounded-full object-cover"
                  />
                  <div class="flex-1 min-w-0">
                    <div class="flex justify-between">
                      <h3 class="text-md font-medium text-gray-900">
                        {{ nanny.name }}
                      </h3>
                      <div class="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-4 w-4 text-yellow-400"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                          />
                        </svg>
                        <span class="ml-1 text-sm text-gray-600">{{
                          nanny.rating
                        }}</span>
                      </div>
                    </div>
                    <p class="text-sm text-gray-500 mt-1">{{ nanny.title }}</p>
                    <div class="mt-2 flex items-center text-sm text-gray-500">
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
                      {{ nanny.distance }} miles away
                    </div>
                    <div class="mt-2 flex items-center">
                      <span class="text-sm font-medium text-gray-900"
                        >${{ nanny.hourlyRate }}/hr</span
                      >
                      <span class="mx-2 text-gray-300">|</span>
                      <span class="text-sm text-gray-500"
                        >{{ nanny.experience }} years exp.</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column - Map and Nanny Details -->
          <div class="lg:col-span-2 space-y-6">
            <!-- Map -->
            <div class="bg-white rounded-xl shadow-md overflow-hidden">
              <div class="h-[400px] bg-gray-200 relative">
                <!-- This would be replaced with an actual map component -->
                <div class="absolute inset-0 ">
                  <div class="text-center">
                    <!-- <svg
                      v-if="!$refs.map"
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
                        d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                      />
                    </svg> -->
                    <Maps/>
                  </div>
                </div>

                <!-- Sample Nanny Markers -->
                <div
                  v-for="nanny in nannies"
                  :key="`marker-${nanny.id}`"
                  class="absolute w-8 h-8 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                  :style="`top: ${nanny.mapPosition.y}%; left: ${nanny.mapPosition.x}%`"
                  @click="selectNanny(nanny)"
                >
                  <div class="relative">
                    <div
                      class="absolute inset-0 bg-pink rounded-full opacity-20 animate-ping"
                    ></div>
                    <div
                      class="relative z-10 w-8 h-8 bg-white rounded-full border-2 border-pink overflow-hidden"
                    >
                      <img
                        :src="nanny.avatar"
                        class="w-full h-full object-cover"
                        :alt="nanny.name"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Selected Nanny Details -->
            <div
              v-if="selectedNanny"
              class="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <div class="p-6">
                <div class="flex flex-col md:flex-row md:items-start gap-6">
                  <div class="flex-shrink-0">
                    <img
                      :src="selectedNanny.avatar"
                      alt="Nanny profile"
                      class="w-32 h-32 rounded-full object-cover mx-auto md:mx-0"
                    />
                    <div
                      class="mt-4 flex justify-center md:justify-start space-x-2"
                    >
                      <button
                        class="bg-pink text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors duration-150"
                      >
                        Contact
                      </button>
                      <button
                        class="border border-pink text-pink px-4 py-2 rounded-lg hover:bg-pink-50 transition-colors duration-150"
                      >
                        Book
                      </button>
                    </div>
                  </div>

                  <div class="flex-1">
                    <div class="flex justify-between items-start">
                      <div>
                        <h2 class="text-2xl font-bold text-gray-900">
                          {{ selectedNanny.name }}
                        </h2>
                        <p class="text-gray-600">{{ selectedNanny.title }}</p>
                      </div>
                      <div
                        class="flex items-center bg-pink-100 px-3 py-1 rounded-full"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-5 w-5 text-yellow-400"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                          />
                        </svg>
                        <span class="ml-1 font-medium text-pink-800"
                          >{{ selectedNanny.rating }} ({{
                            selectedNanny.reviewCount
                          }}
                          reviews)</span
                        >
                      </div>
                    </div>

                    <div class="mt-4 grid grid-cols-2 gap-4">
                      <div class="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-5 w-5 text-gray-400 mr-2"
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
                        <span class="text-gray-700"
                          >{{ selectedNanny.experience }} years experience</span
                        >
                      </div>
                      <div class="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-5 w-5 text-gray-400 mr-2"
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
                        <span class="text-gray-700"
                          >${{ selectedNanny.hourlyRate }}/hour</span
                        >
                      </div>
                      <div class="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-5 w-5 text-gray-400 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                          />
                        </svg>
                        <span class="text-gray-700">Background checked</span>
                      </div>
                      <div class="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-5 w-5 text-gray-400 mr-2"
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
                        <span class="text-gray-700"
                          >{{ selectedNanny.age }} years old</span
                        >
                      </div>
                    </div>

                    <div class="mt-6">
                      <h3 class="text-lg font-medium text-gray-900">About</h3>
                      <p class="mt-2 text-gray-600">{{ selectedNanny.bio }}</p>
                    </div>

                    <div class="mt-6">
                      <h3 class="text-lg font-medium text-gray-900">
                        Skills & Qualifications
                      </h3>
                      <div class="mt-2 flex flex-wrap gap-2">
                        <span
                          v-for="(skill, index) in selectedNanny.skills"
                          :key="index"
                          class="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                        >
                          {{ skill }}
                        </span>
                      </div>
                    </div>

                    <div class="mt-6">
                      <h3 class="text-lg font-medium text-gray-900">
                        Availability
                      </h3>
                      <div class="mt-2 grid grid-cols-7 gap-2 text-center">
                        <div
                          v-for="(day, index) in [
                            'Mon',
                            'Tue',
                            'Wed',
                            'Thu',
                            'Fri',
                            'Sat',
                            'Sun',
                          ]"
                          :key="index"
                          class="p-2 rounded-md text-sm"
                          :class="
                            selectedNanny.availability.includes(day)
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-400'
                          "
                        >
                          {{ day }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- No Nanny Selected State -->
            <div
              v-if="!selectedNanny"
              class="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <div class="p-8 text-center">
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
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 class="mt-4 text-lg font-medium text-gray-900">
                  Select a Nanny
                </h3>
                <p class="mt-2 text-gray-600">
                  Click on a nanny from the list or map to view their detailed
                  profile
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script>
export default {
  data() {
    return {
      selectedNanny: null,
      nannies: [
        {
          id: 1,
          name: "Emma Johnson",
          title: "Experienced Childcare Professional",
          avatar: "https://randomuser.me/api/portraits/women/32.jpg",
          rating: 4.9,
          reviewCount: 48,
          distance: 1.2,
          hourlyRate: 25,
          experience: 5,
          age: 28,
          bio: "I'm a passionate childcare professional with over 5 years of experience working with children of all ages. I have a degree in Early Childhood Education and love creating fun, educational activities. I'm CPR certified and have my own reliable transportation.",
          skills: [
            "First Aid Certified",
            "Early Education",
            "Meal Preparation",
            "Homework Help",
            "Arts & Crafts",
          ],
          availability: ["Mon", "Tue", "Wed", "Thu", "Fri"],
          mapPosition: { x: 45, y: 35 },
        },
        {
          id: 2,
          name: "Sophia Martinez",
          title: "Nurturing Nanny & Former Teacher",
          avatar: "https://randomuser.me/api/portraits/women/44.jpg",
          rating: 4.7,
          reviewCount: 32,
          distance: 2.5,
          hourlyRate: 22,
          experience: 3,
          age: 26,
          bio: "Former elementary school teacher with a passion for helping children learn and grow. I specialize in creating a nurturing environment where children feel safe to explore and develop their unique personalities. I'm bilingual (English/Spanish) and can help with language learning.",
          skills: [
            "Bilingual",
            "Former Teacher",
            "Newborn Care",
            "Swimming",
            "Music",
          ],
          availability: ["Mon", "Wed", "Fri", "Sat"],
          mapPosition: { x: 65, y: 55 },
        },
        {
          id: 3,
          name: "Michael Wilson",
          title: "Energetic & Reliable Caregiver",
          avatar: "https://randomuser.me/api/portraits/men/32.jpg",
          rating: 4.8,
          reviewCount: 27,
          distance: 0.8,
          hourlyRate: 24,
          experience: 4,
          age: 30,
          bio: "I'm an energetic and reliable caregiver who loves outdoor activities and sports. With a background in physical education, I encourage active play and healthy habits. I'm great with school-age children and teens, and I'm comfortable with pets as well.",
          skills: [
            "Sports Coach",
            "Tutoring",
            "Special Needs Experience",
            "Driving",
            "Pet Friendly",
          ],
          availability: ["Tue", "Thu", "Sat", "Sun"],
          mapPosition: { x: 30, y: 40 },
        },
        {
          id: 4,
          name: "Olivia Taylor",
          title: "Gentle Infant & Toddler Specialist",
          avatar: "https://randomuser.me/api/portraits/women/67.jpg",
          rating: 5.0,
          reviewCount: 19,
          distance: 3.1,
          hourlyRate: 28,
          experience: 7,
          age: 35,
          bio: "Specialized in infant and toddler care with over 7 years of experience. I have extensive knowledge of early development milestones and create age-appropriate activities to stimulate growth. I'm patient, gentle, and dedicated to providing the best care for your little ones.",
          skills: [
            "Infant Care",
            "Sleep Training",
            "Potty Training",
            "Sign Language",
            "Developmental Activities",
          ],
          availability: ["Mon", "Tue", "Wed", "Thu", "Fri"],
          mapPosition: { x: 75, y: 25 },
        },
        {
          id: 5,
          name: "James Brown",
          title: "Fun & Educational After-School Nanny",
          avatar: "https://randomuser.me/api/portraits/men/55.jpg",
          rating: 4.6,
          reviewCount: 23,
          distance: 1.7,
          hourlyRate: 20,
          experience: 2,
          age: 24,
          bio: "College student majoring in Education who loves working with school-age children. I excel at making homework time fun and productive, and I'm skilled at explaining complex concepts in simple terms. I also enjoy outdoor activities, arts and crafts, and cooking healthy snacks.",
          skills: [
            "Homework Help",
            "STEM Activities",
            "Arts & Crafts",
            "Cooking",
            "Games & Sports",
          ],
          availability: ["Mon", "Wed", "Fri", "Sat", "Sun"],
          mapPosition: { x: 55, y: 65 },
        },
      ],
    };
  },
  methods: {
    selectNanny(nanny) {
      this.selectedNanny = nanny;
    },
  },
};
</script>
