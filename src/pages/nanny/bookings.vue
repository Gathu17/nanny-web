<template>
  <NuxtLayout name="nanny-layout">
    <div class="bg-pink-50 min-h-screen p-4 sm:p-6 lg:p-8">
      <div class="max-w-6xl mx-auto">
        <!-- Header -->
        <div class="bg-white rounded-xl shadow-md overflow-hidden mb-6">
          <div class="bg-pink-600 p-4 text-white">
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
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <span class="text-gray-700 font-medium">{{
                currentMonthYear
              }}</span>
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
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
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
              v-for="day in weekDays"
              :key="day"
              class="bg-gray-100 p-3 text-center text-sm font-medium text-gray-700"
            >
              {{ day }}
            </div>

            <div
              v-for="(day, index) in calendarDays"
              :key="index"
              class="min-h-[120px] bg-white p-2 relative"
              :class="{ 'bg-gray-50': !day.isCurrentMonth }"
            >
              <div
                class="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs"
                :class="{
                  'bg-pink-600 text-white': day.isToday,
                  'text-gray-400': !day.isCurrentMonth && !day.isToday,
                  'text-gray-700': day.isCurrentMonth && !day.isToday,
                }"
              >
                {{ day.date }}
              </div>

              <div class="mt-6 space-y-1">
                <div
                  v-for="booking in day.bookings"
                  :key="booking.id"
                  class="text-xs p-1 rounded truncate cursor-pointer"
                  :class="getBookingColorClass(booking.status)"
                  @click="selectBooking(booking)"
                >
                  {{ booking.startTime }} - {{ booking.client }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- List View -->
        <div v-if="view === 'list'" class="space-y-4">
          <div
            v-for="(group, date) in groupedBookings"
            :key="date"
            class="bg-white rounded-xl shadow-md overflow-hidden"
          >
            <div class="bg-gray-50 p-3 border-b border-gray-200">
              <h2 class="font-medium text-gray-700">{{ formatDate(date) }}</h2>
            </div>

            <div class="divide-y divide-gray-100">
              <div
                v-for="booking in group"
                :key="booking.id"
                class="p-4 hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
                @click="selectBooking(booking)"
              >
                <div class="flex items-start justify-between">
                  <div class="flex items-start space-x-3">
                    <img
                      :src="booking.clientAvatar"
                      alt="Client"
                      class="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <h3 class="font-medium text-gray-900">
                        {{ booking.client }}
                      </h3>
                      <div class="flex items-center text-sm text-gray-500 mt-1">
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
                        {{ booking.startTime }} - {{ booking.endTime }}
                      </div>
                      <div class="flex items-center text-sm text-gray-500 mt-1">
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
                    </div>
                  </div>
                  <div>
                    <span
                      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                      :class="getStatusBadgeClass(booking.status)"
                    >
                      {{ booking.status }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Booking Details Modal -->
        <div
          v-if="selectedBooking"
          class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        >
          <div
            class="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
          >
            <div class="p-6">
              <div class="flex justify-between items-start">
                <h2 class="text-xl font-bold text-gray-900">Booking Details</h2>
                <button
                  @click="selectedBooking = null"
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

              <div class="mt-4 space-y-4">
                <div class="flex items-center">
                  <img
                    :src="selectedBooking.clientAvatar"
                    alt="Client"
                    class="w-16 h-16 rounded-full object-cover"
                  />
                  <div class="ml-4">
                    <h3 class="font-medium text-lg">
                      {{ selectedBooking.client }}
                    </h3>
                    <p class="text-gray-500">
                      {{ selectedBooking.clientPhone }}
                    </p>
                  </div>
                </div>

                <div class="bg-gray-50 p-4 rounded-lg space-y-3">
                  <div class="flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5 text-gray-500 mr-3"
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
                    <div>
                      <p class="text-sm text-gray-500">Date</p>
                      <p class="font-medium">
                        {{ formatDate(selectedBooking.date) }}
                      </p>
                    </div>
                  </div>

                  <div class="flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5 text-gray-500 mr-3"
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
                    <div>
                      <p class="text-sm text-gray-500">Time</p>
                      <p class="font-medium">
                        {{ selectedBooking.startTime }} -
                        {{ selectedBooking.endTime }}
                      </p>
                    </div>
                  </div>

                  <div class="flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5 text-gray-500 mr-3"
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
                    <div>
                      <p class="text-sm text-gray-500">Location</p>
                      <p class="font-medium">{{ selectedBooking.location }}</p>
                    </div>
                  </div>

                  <div class="flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5 text-gray-500 mr-3"
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
                    <div>
                      <p class="text-sm text-gray-500">Payment</p>
                      <p class="font-medium">${{ selectedBooking.payment }}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 class="font-medium text-gray-700 mb-2">Children</h4>
                  <div class="space-y-2">
                    <div
                      v-for="(child, index) in selectedBooking.children"
                      :key="index"
                      class="flex items-center p-3 bg-gray-50 rounded-lg"
                    >
                      <div
                        class="w-8 h-8 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center mr-3"
                      >
                        {{ child.name.charAt(0) }}
                      </div>
                      <div>
                        <p class="font-medium">{{ child.name }}</p>
                        <p class="text-sm text-gray-500">
                          {{ child.age }} years old
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div v-if="selectedBooking.notes">
                  <h4 class="font-medium text-gray-700 mb-2">Notes</h4>
                  <p class="text-gray-600 bg-gray-50 p-3 rounded-lg">
                    {{ selectedBooking.notes }}
                  </p>
                </div>
              </div>

              <div class="mt-6 flex space-x-3">
                <button
                  v-if="selectedBooking.status === 'Pending'"
                  class="flex-1 bg-pink-600 text-white py-2 px-4 rounded-lg hover:bg-pink-700 transition-colors duration-150"
                >
                  Accept
                </button>
                <button
                  v-if="selectedBooking.status === 'Pending'"
                  class="flex-1 bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-150"
                >
                  Decline
                </button>
                <button
                  v-if="selectedBooking.status === 'Confirmed'"
                  class="flex-1 bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-150"
                >
                  Cancel
                </button>
                <button
                  class="flex-1 bg-white border border-pink-300 text-pink-600 py-2 px-4 rounded-lg hover:bg-pink-50 transition-colors duration-150"
                >
                  Message Client
                </button>
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
      view: "calendar",
      selectedBooking: null,
      weekDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      currentDate: new Date(),
      bookings: [
        {
          id: 1,
          client: "Sarah Johnson",
          clientAvatar: "https://randomuser.me/api/portraits/women/12.jpg",
          clientPhone: "(555) 123-4567",
          date: "2023-06-15",
          startTime: "9:00 AM",
          endTime: "3:00 PM",
          location: "123 Main St, Anytown",
          status: "Confirmed",
          payment: 120,
          children: [
            { name: "Ethan", age: 4 },
            { name: "Olivia", age: 2 },
          ],
          notes:
            "Ethan has a peanut allergy. Please make sure to check all food labels.",
        },
        {
          id: 2,
          client: "Michael Thompson",
          clientAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
          clientPhone: "(555) 987-6543",
          date: "2023-06-16",
          startTime: "2:00 PM",
          endTime: "6:00 PM",
          location: "456 Oak Ave, Somewhere",
          status: "Pending",
          payment: 80,
          children: [{ name: "Emma", age: 5 }],
          notes:
            "Emma loves to draw. There are art supplies in the second drawer of her desk.",
        },
        {
          id: 3,
          client: "Jennifer Davis",
          clientAvatar: "https://randomuser.me/api/portraits/women/65.jpg",
          clientPhone: "(555) 456-7890",
          date: "2023-06-17",
          startTime: "10:00 AM",
          endTime: "4:00 PM",
          location: "789 Pine St, Elsewhere",
          status: "Confirmed",
          payment: 120,
          children: [
            { name: "Aiden", age: 3 },
            { name: "Sophia", age: 3 },
          ],
          notes:
            "The twins nap from 1-3 PM. They each have their own favorite stuffed animal for naptime.",
        },
        {
          id: 4,
          client: "David Wilson",
          clientAvatar: "https://randomuser.me/api/portraits/men/45.jpg",
          clientPhone: "(555) 234-5678",
          date: "2023-06-18",
          startTime: "6:00 PM",
          endTime: "10:00 PM",
          location: "101 Elm St, Nowhere",
          status: "Completed",
          payment: 80,
          children: [
            { name: "Noah", age: 6 },
            { name: "Ava", age: 4 },
          ],
          notes:
            "Bedtime is 8:30 PM for Ava and 9:00 PM for Noah. They both need to brush their teeth before bed.",
        },
        {
          id: 5,
          client: "Lisa Brown",
          clientAvatar: "https://randomuser.me/api/portraits/women/33.jpg",
          clientPhone: "(555) 876-5432",
          date: "2023-06-20",
          startTime: "8:00 AM",
          endTime: "5:00 PM",
          location: "202 Maple Ave, Anytown",
          status: "Pending",
          payment: 180,
          children: [{ name: "Liam", age: 1 }],
          notes:
            "Liam is still on formula. Instructions for preparation are on the fridge.",
        },
      ],
    };
  },
  computed: {
    currentMonthYear() {
      const options = { month: "long", year: "numeric" };
      return this.currentDate.toLocaleDateString("en-US", options);
    },
    calendarDays() {
      const year = this.currentDate.getFullYear();
      const month = this.currentDate.getMonth();

      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);

      const daysInMonth = lastDay.getDate();
      const startingDayOfWeek = firstDay.getDay();

      const today = new Date();
      const isToday = (date) => {
        return (
          date.getDate() === today.getDate() &&
          date.getMonth() === today.getMonth() &&
          date.getFullYear() === today.getFullYear()
        );
      };

      // Previous month days to fill the first week
      const previousMonthDays = [];
      if (startingDayOfWeek > 0) {
        const prevMonth = new Date(year, month, 0);
        const prevMonthDaysCount = prevMonth.getDate();

        for (let i = startingDayOfWeek - 1; i >= 0; i--) {
          const date = new Date(year, month - 1, prevMonthDaysCount - i);
          previousMonthDays.push({
            date: prevMonthDaysCount - i,
            isCurrentMonth: false,
            isToday: isToday(date),
            fullDate: date,
            bookings: this.getBookingsForDate(this.formatDateString(date)),
          });
        }
      }

      // Current month days
      const currentMonthDays = [];
      for (let i = 1; i <= daysInMonth; i++) {
        const date = new Date(year, month, i);
        currentMonthDays.push({
          date: i,
          isCurrentMonth: true,
          isToday: isToday(date),
          fullDate: date,
          bookings: this.getBookingsForDate(this.formatDateString(date)),
        });
      }

      // Next month days to fill the last week
      const nextMonthDays = [];
      const totalDays = previousMonthDays.length + currentMonthDays.length;
      const remainingDays = 42 - totalDays; // 6 rows of 7 days

      for (let i = 1; i <= remainingDays; i++) {
        const date = new Date(year, month + 1, i);
        nextMonthDays.push({
          date: i,
          isCurrentMonth: false,
          isToday: isToday(date),
          fullDate: date,
          bookings: this.getBookingsForDate(this.formatDateString(date)),
        });
      }

      return [...previousMonthDays, ...currentMonthDays, ...nextMonthDays];
    },
    groupedBookings() {
      const grouped = {};

      this.bookings.forEach((booking) => {
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
    },
  },
  methods: {
    formatDateString(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    },
    getBookingsForDate(dateString) {
      return this.bookings.filter((booking) => booking.date === dateString);
    },
    formatDate(dateString) {
      const options = {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      };
      return new Date(dateString).toLocaleDateString("en-US", options);
    },
    selectBooking(booking) {
      this.selectedBooking = booking;
    },
    getBookingColorClass(status) {
      switch (status) {
        case "Confirmed":
          return "bg-green-100 text-green-800";
        case "Pending":
          return "bg-yellow-100 text-yellow-800";
        case "Completed":
          return "bg-blue-100 text-blue-800";
        case "Cancelled":
          return "bg-red-100 text-red-800";
        default:
          return "bg-gray-100 text-gray-800";
      }
    },
    getStatusBadgeClass(status) {
      switch (status) {
        case "Confirmed":
          return "bg-green-100 text-green-800";
        case "Pending":
          return "bg-yellow-100 text-yellow-800";
        case "Completed":
          return "bg-blue-100 text-blue-800";
        case "Cancelled":
          return "bg-red-100 text-red-800";
        default:
          return "bg-gray-100 text-gray-800";
      }
    },
  },
};
</script>
