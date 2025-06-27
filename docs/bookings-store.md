# Bookings Store Documentation

## Overview

The bookings store is a comprehensive Pinia store that manages all booking-related state and operations in the nanny application. It provides a centralized way to handle booking data, filtering, pagination, and calendar functionality.

## Features

- **CRUD Operations**: Create, read, update, and delete bookings
- **Status Management**: Accept, decline, cancel, and complete bookings
- **Filtering & Search**: Filter by status, date range, client, nanny, and search queries
- **Calendar Integration**: Full calendar view with booking display
- **Pagination**: Server-side pagination support
- **Statistics**: Booking statistics and earnings tracking
- **Real-time Updates**: Automatic store updates when bookings change

## API Structure

### Types

```typescript
interface Booking {
  id: string;
  client: {
    id: string;
    name: string;
    email: string;
    phone: string;
    avatar?: string;
  };
  nanny: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  status: "pending" | "confirmed" | "completed" | "cancelled" | "declined";
  payment: number;
  children: Child[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

interface BookingStats {
  total: number;
  pending: number;
  confirmed: number;
  completed: number;
  cancelled: number;
  declined: number;
  totalEarnings: number;
  thisMonthEarnings: number;
}
```

## Usage

### Basic Setup

```vue
<script setup>
import { useBookingsStore } from "@/stores/bookings";

const bookingsStore = useBookingsStore();

// Initialize the store
onMounted(async () => {
  await bookingsStore.initialize();
});
</script>
```

### Loading Bookings

```typescript
// Load all bookings
await bookingsStore.loadBookings();

// Load with filters
bookingsStore.setActiveFilter("pending");
bookingsStore.setSearchQuery("John");
await bookingsStore.loadBookings();
```

### Filtering

```typescript
// Set active filter
bookingsStore.setActiveFilter("confirmed");

// Add status filters
bookingsStore.addStatusFilter("pending");
bookingsStore.addStatusFilter("confirmed");

// Set date range
bookingsStore.setDateRange("2024-01-01", "2024-01-31");

// Clear all filters
bookingsStore.clearAllFilters();
```

### Booking Actions

```typescript
// Accept a booking
await bookingsStore.acceptBooking(bookingId);

// Decline a booking
await bookingsStore.declineBooking(bookingId, "Reason for declining");

// Cancel a booking
await bookingsStore.cancelBooking(bookingId, "Reason for cancellation");

// Complete a booking
await bookingsStore.completeBooking(bookingId);

// Update a booking
await bookingsStore.updateBooking(bookingId, {
  startTime: "10:00 AM",
  endTime: "2:00 PM",
  notes: "Updated notes",
});
```

### Calendar Integration

```typescript
// Navigate months
bookingsStore.nextMonth();
bookingsStore.previousMonth();

// Set specific month
bookingsStore.setCurrentMonth(new Date("2024-01-01"));

// Access calendar days
const calendarDays = bookingsStore.calendarDays;
```

### Getters

```typescript
// Get bookings by status
const pendingBookings = bookingsStore.getPendingBookings;
const confirmedBookings = bookingsStore.getConfirmedBookings;
const completedBookings = bookingsStore.getCompletedBookings;

// Get upcoming and past bookings
const upcomingBookings = bookingsStore.getUpcomingBookings;
const pastBookings = bookingsStore.getPastBookings;

// Check loading states
const isLoading = bookingsStore.isLoading;
const hasError = bookingsStore.hasError;

// Access statistics
const stats = bookingsStore.stats;
```

## State Management

### State Structure

```typescript
interface BookingState {
  // Bookings data
  bookings: Booking[];
  currentBooking: Booking | null;
  selectedBooking: Booking | null;

  // Filter and search state
  searchQuery: string;
  activeFilter:
    | "all"
    | "pending"
    | "confirmed"
    | "completed"
    | "cancelled"
    | "declined";
  viewMode: "calendar" | "list";

  // Date filtering
  selectedDate: string | null;
  dateRange: {
    start: string | null;
    end: string | null;
  };

  // Pagination
  currentPage: number;
  totalPages: number;
  totalBookings: number;
  itemsPerPage: number;

  // Loading and error states
  loading: boolean;
  loadingStats: boolean;
  error: string | null;

  // Statistics
  stats: BookingStats | null;

  // Selected filters
  selectedStatuses: string[];
  selectedClients: string[];
  selectedNannies: string[];

  // Calendar state
  currentMonth: Date;
  calendarDays: Array<{
    date: number;
    isCurrentMonth: boolean;
    isToday: boolean;
    fullDate: Date;
    bookings: Booking[];
  }>;
}
```

## API Endpoints

The store uses the following API endpoints:

- `GET /bookings` - Get all bookings with filters
- `GET /bookings/:id` - Get a single booking
- `POST /bookings` - Create a new booking
- `PUT /bookings/:id` - Update a booking
- `DELETE /bookings/:id` - Delete a booking
- `POST /bookings/:id/accept` - Accept a booking
- `POST /bookings/:id/decline` - Decline a booking
- `POST /bookings/:id/cancel` - Cancel a booking
- `POST /bookings/:id/complete` - Complete a booking
- `GET /bookings/stats` - Get booking statistics
- `GET /bookings/date-range` - Get bookings by date range
- `GET /bookings/upcoming` - Get upcoming bookings
- `GET /bookings/past` - Get past bookings
- `POST /bookings/:id/message` - Send message
- `GET /bookings/:id/messages` - Get booking messages

## Error Handling

The store includes comprehensive error handling:

```typescript
// Check for errors
if (bookingsStore.hasError) {
  console.error(bookingsStore.error);
}

// Clear errors
bookingsStore.clearError();
```

## Loading States

```typescript
// Check loading states
if (bookingsStore.isLoading) {
  // Show loading spinner
}

if (bookingsStore.isLoadingStats) {
  // Show stats loading state
}
```

## Example Components

### Basic Bookings List

```vue
<template>
  <div>
    <div v-if="bookingsStore.isLoading">Loading...</div>
    <div v-else>
      <div v-for="booking in bookingsStore.bookings" :key="booking.id">
        <h3>{{ booking.client.name }}</h3>
        <p>{{ booking.date }} - {{ booking.startTime }}</p>
        <span :class="bookingsStore.getStatusBadgeClass(booking.status)">
          {{ booking.status }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useBookingsStore } from "@/stores/bookings";

const bookingsStore = useBookingsStore();

onMounted(async () => {
  await bookingsStore.initialize();
});
</script>
```

### Calendar View

```vue
<template>
  <div class="calendar">
    <div class="calendar-header">
      <button @click="bookingsStore.previousMonth()">Previous</button>
      <span>{{ bookingsStore.currentMonthYear }}</span>
      <button @click="bookingsStore.nextMonth()">Next</button>
    </div>

    <div class="calendar-grid">
      <div v-for="day in bookingsStore.calendarDays" :key="day.date">
        <div class="day-number">{{ day.date }}</div>
        <div
          v-for="booking in day.bookings"
          :key="booking.id"
          @click="bookingsStore.selectBooking(booking)"
          :class="bookingsStore.getBookingColorClass(booking.status)"
        >
          {{ booking.startTime }} - {{ booking.client.name }}
        </div>
      </div>
    </div>
  </div>
</template>
```

## Best Practices

1. **Always initialize the store** when using it in components
2. **Handle loading states** to provide good UX
3. **Use error handling** to catch and display errors
4. **Clear filters** when switching between different views
5. **Use computed properties** for filtered data when possible
6. **Update the store** after successful API calls
7. **Use the provided utility methods** for formatting and styling

## Integration with Existing Code

The bookings store is designed to work seamlessly with the existing nanny application. It follows the same patterns as the auth and job stores, making it easy to integrate into existing components.

The store automatically handles:

- Authentication tokens
- API error handling
- Loading states
- Real-time updates
- Calendar generation
- Filter management

This makes it easy to replace hardcoded booking data with real API calls while maintaining the existing UI structure.
