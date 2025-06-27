<template>
  <div class="bg-white rounded-lg shadow-md p-6">
    <h2 class="text-xl font-bold mb-4">Bookings Store Example</h2>

    <!-- Stats Section -->
    <div
      v-if="bookingsStore.stats"
      class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"
    >
      <div class="bg-blue-50 p-4 rounded-lg">
        <h3 class="text-sm font-medium text-blue-600">Total Bookings</h3>
        <p class="text-2xl font-bold text-blue-900">
          {{ bookingsStore.stats.total }}
        </p>
      </div>
      <div class="bg-yellow-50 p-4 rounded-lg">
        <h3 class="text-sm font-medium text-yellow-600">Pending</h3>
        <p class="text-2xl font-bold text-yellow-900">
          {{ bookingsStore.stats.pending }}
        </p>
      </div>
      <div class="bg-green-50 p-4 rounded-lg">
        <h3 class="text-sm font-medium text-green-600">Confirmed</h3>
        <p class="text-2xl font-bold text-green-900">
          {{ bookingsStore.stats.confirmed }}
        </p>
      </div>
      <div class="bg-purple-50 p-4 rounded-lg">
        <h3 class="text-sm font-medium text-purple-600">Total Earnings</h3>
        <p class="text-2xl font-bold text-purple-900">
          ${{ bookingsStore.stats.totalEarnings }}
        </p>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="flex flex-wrap gap-2 mb-6">
      <button
        @click="bookingsStore.setActiveFilter('all')"
        class="px-3 py-1 rounded-full text-sm"
        :class="
          bookingsStore.getActiveFilter === 'all'
            ? 'bg-pink-600 text-white'
            : 'bg-gray-100 text-gray-700'
        "
      >
        All ({{ bookingsStore.bookings.length }})
      </button>
      <button
        @click="bookingsStore.setActiveFilter('pending')"
        class="px-3 py-1 rounded-full text-sm"
        :class="
          bookingsStore.getActiveFilter === 'pending'
            ? 'bg-pink-600 text-white'
            : 'bg-gray-100 text-gray-700'
        "
      >
        Pending ({{ bookingsStore.getPendingBookings.length }})
      </button>
      <button
        @click="bookingsStore.setActiveFilter('confirmed')"
        class="px-3 py-1 rounded-full text-sm"
        :class="
          bookingsStore.getActiveFilter === 'confirmed'
            ? 'bg-pink-600 text-white'
            : 'bg-gray-100 text-gray-700'
        "
      >
        Confirmed ({{ bookingsStore.getConfirmedBookings.length }})
      </button>
      <button
        @click="bookingsStore.setActiveFilter('completed')"
        class="px-3 py-1 rounded-full text-sm"
        :class="
          bookingsStore.getActiveFilter === 'completed'
            ? 'bg-pink-600 text-white'
            : 'bg-gray-100 text-gray-700'
        "
      >
        Completed ({{ bookingsStore.getCompletedBookings.length }})
      </button>
    </div>

    <!-- Search -->
    <div class="mb-6">
      <input
        v-model="searchQuery"
        @input="handleSearch"
        type="text"
        placeholder="Search bookings..."
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
      />
    </div>

    <!-- Bookings List -->
    <div class="space-y-3">
      <div
        v-for="booking in filteredBookings"
        :key="booking.id"
        class="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
        @click="bookingsStore.selectBooking(booking)"
      >
        <div class="flex justify-between items-start">
          <div>
            <h3 class="font-medium text-gray-900">{{ booking.client.name }}</h3>
            <p class="text-sm text-gray-500">
              {{ booking.date }} • {{ booking.startTime }} -
              {{ booking.endTime }}
            </p>
            <p class="text-sm text-gray-500">{{ booking.location }}</p>
          </div>
          <div class="flex flex-col items-end">
            <span
              class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mb-2"
              :class="bookingsStore.getStatusBadgeClass(booking.status)"
            >
              {{ booking.status }}
            </span>
            <p class="text-sm font-medium text-gray-900">
              ${{ booking.payment }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="bookingsStore.isLoading" class="text-center py-8">
      <div
        class="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-600 mx-auto"
      ></div>
      <p class="text-gray-500 mt-2">Loading bookings...</p>
    </div>

    <!-- Empty State -->
    <div v-else-if="filteredBookings.length === 0" class="text-center py-8">
      <svg
        class="mx-auto h-12 w-12 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
        />
      </svg>
      <h3 class="mt-2 text-sm font-medium text-gray-900">No bookings found</h3>
      <p class="mt-1 text-sm text-gray-500">
        Try adjusting your search or filters.
      </p>
    </div>

    <!-- Booking Details Modal -->
    <div
      v-if="bookingsStore.getSelectedBooking"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <div class="bg-white rounded-xl shadow-xl max-w-md w-full">
        <div class="p-6">
          <div class="flex justify-between items-start mb-4">
            <h2 class="text-xl font-bold text-gray-900">Booking Details</h2>
            <button
              @click="bookingsStore.clearSelectedBooking()"
              class="text-gray-400 hover:text-gray-500"
            >
              <svg
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

          <div class="space-y-3">
            <div>
              <p class="text-sm text-gray-500">Client</p>
              <p class="font-medium">
                {{ bookingsStore.getSelectedBooking?.client.name }}
              </p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Date & Time</p>
              <p class="font-medium">
                {{
                  bookingsStore.formatDate(
                    bookingsStore.getSelectedBooking?.date || ""
                  )
                }}
              </p>
              <p class="text-sm">
                {{ bookingsStore.getSelectedBooking?.startTime }} -
                {{ bookingsStore.getSelectedBooking?.endTime }}
              </p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Location</p>
              <p class="font-medium">
                {{ bookingsStore.getSelectedBooking?.location }}
              </p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Payment</p>
              <p class="font-medium">
                ${{ bookingsStore.getSelectedBooking?.payment }}
              </p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Status</p>
              <span
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                :class="
                  bookingsStore.getStatusBadgeClass(
                    bookingsStore.getSelectedBooking?.status || ''
                  )
                "
              >
                {{ bookingsStore.getSelectedBooking?.status }}
              </span>
            </div>
          </div>

          <div class="mt-6 flex space-x-3">
            <button
              v-if="bookingsStore.getSelectedBooking?.status === 'pending'"
              @click="handleAcceptBooking"
              class="flex-1 bg-pink-600 text-white py-2 px-4 rounded-lg hover:bg-pink-700 transition-colors duration-150"
              :disabled="bookingsStore.isLoading"
            >
              {{ bookingsStore.isLoading ? "Accepting..." : "Accept" }}
            </button>
            <button
              v-if="bookingsStore.getSelectedBooking?.status === 'pending'"
              @click="handleDeclineBooking"
              class="flex-1 bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-150"
              :disabled="bookingsStore.isLoading"
            >
              {{ bookingsStore.isLoading ? "Declining..." : "Decline" }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useBookingsStore } from "@/stores/bookings";

// Initialize the bookings store
const bookingsStore = useBookingsStore();

// Local search query
const searchQuery = ref("");

// Computed filtered bookings
const filteredBookings = computed(() => {
  if (!searchQuery.value.trim()) {
    return bookingsStore.bookings;
  }

  const query = searchQuery.value.toLowerCase();
  return bookingsStore.bookings.filter(
    (booking) =>
      booking.client.name.toLowerCase().includes(query) ||
      booking.location.toLowerCase().includes(query) ||
      booking.status.toLowerCase().includes(query)
  );
});

// Handle search
const handleSearch = () => {
  // Debounce search if needed
  bookingsStore.setSearchQuery(searchQuery.value);
};

// Handle booking actions
const handleAcceptBooking = async () => {
  if (bookingsStore.getSelectedBooking) {
    const success = await bookingsStore.acceptBooking(
      bookingsStore.getSelectedBooking.id
    );
    if (success) {
      bookingsStore.clearSelectedBooking();
    }
  }
};

const handleDeclineBooking = async () => {
  if (bookingsStore.getSelectedBooking) {
    const success = await bookingsStore.declineBooking(
      bookingsStore.getSelectedBooking.id
    );
    if (success) {
      bookingsStore.clearSelectedBooking();
    }
  }
};

// Load bookings when component mounts
onMounted(async () => {
  await bookingsStore.initialize();
});
</script>
