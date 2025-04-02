<template>
  <NuxtLayout name="client-layout">
    <div class="bg-pink-50 min-h-screen p-4 sm:p-6 lg:p-8">
      <div class="max-w-7xl mx-auto">
        <!-- Header -->
        <div class="bg-white rounded-xl shadow-md overflow-hidden mb-6">
          <div class="bg-pink p-4 text-white">
            <h1 class="text-2xl font-bold">My Bookings</h1>
          </div>
          <div class="p-4 flex flex-wrap items-center justify-between gap-4">
            <div class="flex items-center space-x-4">
              <button
                @click="view = 'calendar'"
                class="px-4 py-2 rounded-lg transition-colors duration-150"
                :class="
                  view === 'calendar'
                    ? 'bg-pink-100 text-pink-700'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                "
              >
                <span class="flex items-center">
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
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  Calendar
                </span>
              </button>
              <button
                @click="view = 'list'"
                class="px-4 py-2 rounded-lg transition-colors duration-150"
                :class="
                  view === 'list'
                    ? 'bg-pink-100 text-pink-700'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                "
              >
                <span class="flex items-center">
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
                      d="M4 6h16M4 10h16M4 14h16M4 18h16"
                    />
                  </svg>
                  List
                </span>
              </button>
            </div>

            <div class="flex items-center space-x-2">
              <button
                class="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700"
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
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
              </button>
              <span class="text-gray-700 font-medium"
                >{{ currentMonthName }} {{ currentYear }}</span
              >
              <button
                class="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700"
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
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>
            </div>

            <div>
              <select
                v-model="statusFilter"
                class="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink focus:border-pink"
              >
                <option value="all">All Bookings</option>
                <option value="upcoming">Upcoming</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Calendar View -->
        <div
          v-if="view === 'calendar'"
          class="bg-white rounded-xl shadow-md overflow-hidden mb-6"
        >
          <div class="grid grid-cols-7 gap-px bg-gray-200">
            <div
              v-for="day in ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']"
              :key="day"
              class="bg-gray-100 p-2 text-center text-sm font-medium text-gray-700"
            >
              {{ day }}
            </div>

            <div
              v-for="(date, index) in calendarDays"
              :key="index"
              class="min-h-[100px] bg-white p-1 relative"
              :class="{
                'bg-pink-50': isToday(date),
                'text-gray-400': !isSameMonth(date),
              }"
            >
              <div class="text-right p-1">
                <span
                  class="text-sm inline-flex w-6 h-6 items-center justify-center rounded-full"
                  :class="{ 'bg-pink text-white': isToday(date) }"
                >
                  {{ date.getDate() }}
                </span>
              </div>

              <div class="overflow-y-auto max-h-[80px]">
                <div
                  v-for="booking in getBookingsForDate(formatDateString(date))"
                  :key="booking.id"
                  @click="selectBooking(booking)"
                  class="text-xs p-1 mb-1 rounded truncate cursor-pointer"
                  :class="getBookingColorClass(booking.status)"
                >
                  {{ booking.time }} - {{ booking.nannyName }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- List View -->
        <div v-if="view === 'list'" class="space-y-6">
          <template v-if="Object.keys(groupedBookings).length > 0">
            <div
              v-for="(bookings, date) in groupedBookings"
              :key="date"
              class="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <div class="bg-gray-50 p-4 border-b border-gray-200">
                <h2 class="text-lg font-medium text-gray-900">
                  {{ formatDate(date) }}
                </h2>
              </div>

              <div class="divide-y divide-gray-200">
                <div
                  v-for="booking in bookings"
                  :key="booking.id"
                  @click="selectBooking(booking)"
                  class="p-4 hover:bg-gray-50 cursor-pointer transition-colors duration-150"
                >
                  <div class="flex items-start justify-between">
                    <div class="flex items-start space-x-4">
                      <img
                        :src="booking.nannyAvatar"
                        alt="Nanny"
                        class="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h3 class="text-lg font-medium text-gray-900">
                          {{ booking.nannyName }}
                        </h3>
                        <div
                          class="mt-1 flex items-center text-sm text-gray-500"
                        >
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
                          {{ booking.time }}
                        </div>
                        <div
                          class="mt-1 flex items-center text-sm text-gray-500"
                        >
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
                          {{ booking.location }}
                        </div>
                        <div class="mt-2 flex items-center">
                          <span
                            class="px-2 py-1 text-xs rounded-full"
                            :class="getStatusBadgeClass(booking.status)"
                          >
                            {{ booking.status }}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div class="text-right">
                      <span class="text-lg font-medium text-gray-900"
                        >${{ booking.rate }}/hr</span
                      >
                      <p class="text-sm text-gray-500">
                        {{ booking.duration }} hours
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>

          <div
            v-else
            class="bg-white rounded-xl shadow-md overflow-hidden p-8 text-center"
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
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <h3 class="mt-4 text-lg font-medium text-gray-900">
              No bookings found
            </h3>
            <p class="mt-2 text-gray-600">
              You don't have any bookings matching your current filters.
            </p>
            <button
              class="mt-4 px-4 py-2 bg-pink text-white rounded-lg hover:bg-pink-700 transition-colors duration-150"
            >
              Find a Nanny
            </button>
          </div>
        </div>

        <!-- Booking Details Modal -->
        <div
          v-if="selectedBooking"
          class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        >
          <div
            class="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div
              class="bg-pink p-4 text-white flex justify-between items-center"
            >
              <h2 class="text-xl font-bold">Booking Details</h2>
              <button
                @click="selectedBooking = null"
                class="text-white hover:text-gray-200"
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

            <div class="p-6">
              <div class="flex items-center space-x-4 mb-6">
                <img
                  :src="selectedBooking.nannyAvatar"
                  alt="Nanny"
                  class="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 class="text-xl font-medium text-gray-900">
                    {{ selectedBooking.nannyName }}
                  </h3>
                  <div class="flex items-center mt-1">
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
                      selectedBooking.rating
                    }}</span>
                  </div>
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 class="text-sm font-medium text-gray-500 mb-1">
                    Date & Time
                  </h4>
                  <p class="text-gray-900">
                    {{ formatDate(selectedBooking.date) }}
                  </p>
                  <p class="text-gray-900">{{ selectedBooking.time }}</p>
                </div>

                <div>
                  <h4 class="text-sm font-medium text-gray-500 mb-1">
                    Location
                  </h4>
                  <p class="text-gray-900">{{ selectedBooking.location }}</p>
                </div>

                <div>
                  <h4 class="text-sm font-medium text-gray-500 mb-1">Status</h4>
                  <span
                    class="px-2 py-1 text-xs rounded-full"
                    :class="getStatusBadgeClass(selectedBooking.status)"
                  >
                    {{ selectedBooking.status }}
                  </span>
                </div>

                <div>
                  <h4 class="text-sm font-medium text-gray-500 mb-1">
                    Payment
                  </h4>
                  <p class="text-gray-900">
                    ${{ selectedBooking.rate }}/hr ×
                    {{ selectedBooking.duration }} hours
                  </p>
                  <p class="font-medium">
                    ${{ selectedBooking.rate * selectedBooking.duration }} total
                  </p>
                </div>
              </div>

              <div class="mb-6">
                <h4 class="text-sm font-medium text-gray-500 mb-1">Children</h4>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="(child, index) in selectedBooking.children"
                    :key="index"
                    class="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm"
                  >
                    {{ child.name }} ({{ child.age }})
                  </span>
                </div>
              </div>

              <div class="mb-6">
                <h4 class="text-sm font-medium text-gray-500 mb-1">
                  Special Instructions
                </h4>
                <p class="text-gray-900">
                  {{
                    selectedBooking.instructions ||
                    "No special instructions provided."
                  }}
                </p>
              </div>

              <div class="flex flex-wrap gap-3 justify-end">
                <button
                  v-if="selectedBooking.status === 'Upcoming'"
                  class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                >
                  Reschedule
                </button>
                <button
                  v-if="selectedBooking.status === 'Upcoming'"
                  class="px-4 py-2 border border-red-300 rounded-lg text-red-700 hover:bg-red-50 transition-colors duration-150"
                >
                  Cancel Booking
                </button>
                <button
                  v-if="selectedBooking.status === 'Completed'"
                  class="px-4 py-2 bg-pink text-white rounded-lg hover:bg-pink-700 transition-colors duration-150"
                >
                  Leave Review
                </button>
                <button
                  class="px-4 py-2 bg-pink text-white rounded-lg hover:bg-pink-700 transition-colors duration-150"
                >
                  Message Nanny
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

// View state
const view = ref("calendar");
const statusFilter = ref("all");
const selectedBooking = ref(null);

// Calendar state
const currentDate = ref(new Date());
const currentMonthName = computed(() => {
  return currentDate.value.toLocaleString("default", { month: "long" });
});
const currentYear = computed(() => {
  return currentDate.value.getFullYear();
});

// Generate calendar days
const calendarDays = computed(() => {
  const year = currentDate.value.getFullYear();
  const month = currentDate.value.getMonth();

  // First day of the month
  const firstDay = new Date(year, month, 1);
  // Last day of the month
  const lastDay = new Date(year, month + 1, 0);

  // Get the day of the week for the first day (0 = Sunday, 6 = Saturday)
  const firstDayOfWeek = firstDay.getDay();

  // Calculate days from previous month to show
  const daysFromPrevMonth = firstDayOfWeek;

  // Calculate total days to show (previous month days + current month days + next month days to fill grid)
  const totalDays = 42; // 6 rows of 7 days

  // Generate array of dates
  const days = [];

  // Add days from previous month
  const prevMonth = new Date(year, month, 0);
  const prevMonthDays = prevMonth.getDate();

  for (let i = prevMonthDays - daysFromPrevMonth + 1; i <= prevMonthDays; i++) {
    days.push(new Date(year, month - 1, i));
  }

  // Add days from current month
  for (let i = 1; i <= lastDay.getDate(); i++) {
    days.push(new Date(year, month, i));
  }

  // Add days from next month to fill the grid
  const remainingDays = totalDays - days.length;
  for (let i = 1; i <= remainingDays; i++) {
    days.push(new Date(year, month + 1, i));
  }

  return days;
});

// Sample bookings data
const bookings = ref([
  {
    id: 1,
    nannyName: "Emma Johnson",
    nannyAvatar: "https://randomuser.me/api/portraits/women/32.jpg",
    date: "2023-07-15",
    time: "9:00 AM - 1:00 PM",
    location: "123 Main St, Anytown",
    status: "Upcoming",
    rate: 25,
    duration: 4,
    rating: 4.9,
    children: [
      { name: "Sophia", age: "3 years" },
      { name: "Ethan", age: "5 years" },
    ],
    instructions:
      "Sophia has a peanut allergy. Ethan needs to practice reading for 30 minutes.",
  },
  {
    id: 2,
    nannyName: "Michael Wilson",
    nannyAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
    date: "2023-07-18",
    time: "3:00 PM - 7:00 PM",
    location: "123 Main St, Anytown",
    status: "Upcoming",
    rate: 22,
    duration: 4,
    rating: 4.7,
    children: [
      { name: "Sophia", age: "3 years" },
      { name: "Ethan", age: "5 years" },
    ],
    instructions: "Please help Ethan with his math homework.",
  },
  {
    id: 3,
    nannyName: "Sophia Martinez",
    nannyAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
    date: "2023-07-10",
    time: "10:00 AM - 4:00 PM",
    location: "123 Main St, Anytown",
    status: "Completed",
    rate: 24,
    duration: 6,
    rating: 4.8,
    children: [{ name: "Sophia", age: "3 years" }],
    instructions: "Sophia needs to nap from 1-3 PM.",
  },
  {
    id: 4,
    nannyName: "James Brown",
    nannyAvatar: "https://randomuser.me/api/portraits/men/55.jpg",
    date: "2023-07-05",
    time: "6:00 PM - 10:00 PM",
    location: "123 Main St, Anytown",
    status: "Completed",
    rate: 20,
    duration: 4,
    rating: 4.5,
    children: [
      { name: "Sophia", age: "3 years" },
      { name: "Ethan", age: "5 years" },
    ],
    instructions: "Bedtime is 8:30 PM for both children.",
  },
  {
    id: 5,
    nannyName: "Olivia Taylor",
    nannyAvatar: "https://randomuser.me/api/portraits/women/67.jpg",
    date: "2023-07-22",
    time: "9:00 AM - 5:00 PM",
    location: "123 Main St, Anytown",
    status: "Upcoming",
    rate: 28,
    duration: 8,
    rating: 5.0,
    children: [
      { name: "Sophia", age: "3 years" },
      { name: "Ethan", age: "5 years" },
    ],
    instructions: "Please take the kids to the park if weather permits.",
  },
  {
    id: 6,
    nannyName: "Emma Johnson",
    nannyAvatar: "https://randomuser.me/api/portraits/women/32.jpg",
    date: "2023-06-30",
    time: "2:00 PM - 6:00 PM",
    location: "123 Main St, Anytown",
    status: "Cancelled",
    rate: 25,
    duration: 4,
    rating: 4.9,
    children: [
      { name: "Sophia", age: "3 years" },
      { name: "Ethan", age: "5 years" },
    ],
    instructions: "",
  },
]);

// Filtered bookings based on status
const filteredBookings = computed(() => {
  if (statusFilter.value === "all") {
    return bookings.value;
  }
  return bookings.value.filter(
    (booking) => booking.status.toLowerCase() === statusFilter.value
  );
});

// Group bookings by date for list view
const groupedBookings = computed(() => {
  const grouped = {};

  filteredBookings.value.forEach((booking) => {
    if (!grouped[booking.date]) {
      grouped[booking.date] = [];
    }
    grouped[booking.date].push(booking);
  });

  // Sort by date
  return Object.keys(grouped)
    .sort()
    .reduce((obj, key) => {
      obj[key] = grouped[key];
      return obj;
    }, {});
});

// Helper functions
function formatDateString(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getBookingsForDate(dateString) {
  return filteredBookings.value.filter(
    (booking) => booking.date === dateString
  );
}

function formatDate(dateString) {
  const options = {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  return new Date(dateString).toLocaleDateString("en-US", options);
}

function isToday(date) {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

function isSameMonth(date) {
  return date.getMonth() === currentDate.value.getMonth();
}

function selectBooking(booking) {
  selectedBooking.value = booking;
}

function getBookingColorClass(status) {
  switch (status) {
    case "Upcoming":
      return "bg-green-100 text-green-800";
    case "Completed":
      return "bg-blue-100 text-blue-800";
    case "Cancelled":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

function getStatusBadgeClass(status) {
  switch (status) {
    case "Upcoming":
      return "bg-green-100 text-green-800";
    case "Completed":
      return "bg-blue-100 text-blue-800";
    case "Cancelled":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

// Initialize
onMounted(() => {
  // Any initialization code here
});
</script>
