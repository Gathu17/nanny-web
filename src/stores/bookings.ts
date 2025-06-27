import { defineStore } from "pinia";
import {
  bookingsApi,
  type Booking,
  type CreateBookingPayload,
  type UpdateBookingPayload,
  type BookingFilters,
  type BookingStats,
} from "@/api/bookings";

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

export const useBookingsStore = defineStore("bookings", {
  state: (): BookingState => ({
    // Bookings data
    bookings: [],
    currentBooking: null,
    selectedBooking: null,

    // Filter and search state
    searchQuery: "",
    activeFilter: "all",
    viewMode: "calendar",

    // Date filtering
    selectedDate: null,
    dateRange: {
      start: null,
      end: null,
    },

    // Pagination
    currentPage: 1,
    totalPages: 1,
    totalBookings: 0,
    itemsPerPage: 10,

    // Loading and error states
    loading: false,
    loadingStats: false,
    error: null,

    // Statistics
    stats: null,

    // Selected filters
    selectedStatuses: [],
    selectedClients: [],
    selectedNannies: [],

    // Calendar state
    currentMonth: new Date(),
    calendarDays: [],
  }),

  getters: {
    // Booking getters
    getBookingById: (state) => (id: string) => {
      return state.bookings.find((booking) => booking.id === id);
    },

    getBookingsByStatus: (state) => (status: string) => {
      return state.bookings.filter((booking) => booking.status === status);
    },

    getPendingBookings: (state) => {
      return state.bookings.filter((booking) => booking.status === "pending");
    },

    getConfirmedBookings: (state) => {
      return state.bookings.filter((booking) => booking.status === "confirmed");
    },

    getCompletedBookings: (state) => {
      return state.bookings.filter((booking) => booking.status === "completed");
    },

    getCancelledBookings: (state) => {
      return state.bookings.filter((booking) => booking.status === "cancelled");
    },

    getDeclinedBookings: (state) => {
      return state.bookings.filter((booking) => booking.status === "declined");
    },

    getUpcomingBookings: (state) => {
      const today = new Date();
      return state.bookings.filter((booking) => {
        const bookingDate = new Date(booking.date);
        return (
          bookingDate >= today &&
          booking.status !== "cancelled" &&
          booking.status !== "declined"
        );
      });
    },

    getPastBookings: (state) => {
      const today = new Date();
      return state.bookings.filter((booking) => {
        const bookingDate = new Date(booking.date);
        return bookingDate < today;
      });
    },

    // Filter getters
    isFiltering: (state) => {
      return (
        state.selectedStatuses.length > 0 ||
        state.selectedClients.length > 0 ||
        state.selectedNannies.length > 0 ||
        state.searchQuery.trim() !== "" ||
        state.selectedDate !== null ||
        state.dateRange.start !== null ||
        state.dateRange.end !== null ||
        state.activeFilter !== "all"
      );
    },

    hasActiveFilters: (state) => {
      return (
        state.selectedStatuses.length > 0 ||
        state.selectedClients.length > 0 ||
        state.selectedNannies.length > 0 ||
        state.searchQuery.trim() !== "" ||
        state.selectedDate !== null ||
        state.dateRange.start !== null ||
        state.dateRange.end !== null ||
        state.activeFilter !== "all"
      );
    },

    // Loading getters
    isLoading: (state) => state.loading,
    isLoadingStats: (state) => state.loadingStats,
    hasError: (state) => !!state.error,

    // Pagination getters
    canGoNext: (state) => state.currentPage < state.totalPages,
    canGoPrevious: (state) => state.currentPage > 1,

    // Computed filters for API
    computedFilters: (state) => {
      const filters: BookingFilters = {};

      if (state.selectedStatuses.length > 0) {
        filters.status = state.selectedStatuses;
      }
      if (state.selectedClients.length > 0) {
        filters.clientId = state.selectedClients.join(",");
      }
      if (state.selectedNannies.length > 0) {
        filters.nannyId = state.selectedNannies.join(",");
      }
      if (state.searchQuery.trim()) {
        filters.search = state.searchQuery.trim();
      }
      if (state.dateRange.start) {
        filters.dateFrom = state.dateRange.start;
      }
      if (state.dateRange.end) {
        filters.dateTo = state.dateRange.end;
      }

      return filters;
    },

    // Calendar getters
    currentMonthYear: (state) => {
      const options = { month: "long", year: "numeric" };
      return state.currentMonth.toLocaleDateString("en-US", options);
    },

    weekDays: () => ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],

    // Grouped bookings for list view
    groupedBookings: (state) => {
      const grouped: Record<string, Booking[]> = {};

      state.bookings.forEach((booking) => {
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

    // Selected booking getters
    getSelectedBooking: (state) => state.selectedBooking,
    getCurrentBooking: (state) => state.currentBooking,

    // View mode getters
    getViewMode: (state) => state.viewMode,
    getActiveFilter: (state) => state.activeFilter,
    getSearchQuery: (state) => state.searchQuery,
  },

  actions: {
    // Initialize store
    async initialize() {
      await Promise.all([this.loadBookings(), this.loadStats()]);
    },

    // Load bookings with filters
    async loadBookings() {
      this.loading = true;
      this.error = null;

      try {
        const response = await bookingsApi.getBookings({
          ...this.computedFilters,
          page: this.currentPage,
          limit: this.itemsPerPage,
        });

        this.bookings = response.bookings;
        this.totalBookings = response.total;
        this.totalPages = Math.ceil(response.total / this.itemsPerPage);
        this.generateCalendarDays();
      } catch (error: any) {
        this.error = error.response?.data?.message || "Failed to load bookings";
        console.error("Error loading bookings:", error);
      } finally {
        this.loading = false;
      }
    },

    // Load booking statistics
    async loadStats() {
      this.loadingStats = true;

      try {
        this.stats = await bookingsApi.getBookingStats();
      } catch (error: any) {
        console.error("Error loading booking stats:", error);
      } finally {
        this.loadingStats = false;
      }
    },

    // Get a single booking
    async getBooking(id: string) {
      this.loading = true;
      this.error = null;

      try {
        const booking = await bookingsApi.getBooking(id);
        this.currentBooking = booking;
        return booking;
      } catch (error: any) {
        this.error = error.response?.data?.message || "Failed to load booking";
        return null;
      } finally {
        this.loading = false;
      }
    },

    // Create a new booking
    async createBooking(payload: CreateBookingPayload) {
      this.loading = true;
      this.error = null;

      try {
        const booking = await bookingsApi.createBooking(payload);
        this.bookings.unshift(booking);
        this.generateCalendarDays();
        return booking;
      } catch (error: any) {
        this.error =
          error.response?.data?.message || "Failed to create booking";
        return null;
      } finally {
        this.loading = false;
      }
    },

    // Update a booking
    async updateBooking(id: string, payload: UpdateBookingPayload) {
      this.loading = true;
      this.error = null;

      try {
        const updatedBooking = await bookingsApi.updateBooking(id, payload);

        // Update in bookings array
        const index = this.bookings.findIndex((b) => b.id === id);
        if (index !== -1) {
          this.bookings[index] = updatedBooking;
        }

        // Update current booking if it's the same
        if (this.currentBooking?.id === id) {
          this.currentBooking = updatedBooking;
        }

        // Update selected booking if it's the same
        if (this.selectedBooking?.id === id) {
          this.selectedBooking = updatedBooking;
        }

        this.generateCalendarDays();
        return updatedBooking;
      } catch (error: any) {
        this.error =
          error.response?.data?.message || "Failed to update booking";
        return null;
      } finally {
        this.loading = false;
      }
    },

    // Delete a booking
    async deleteBooking(id: string) {
      this.loading = true;
      this.error = null;

      try {
        await bookingsApi.deleteBooking(id);

        // Remove from bookings array
        this.bookings = this.bookings.filter((b) => b.id !== id);

        // Clear current/selected booking if it's the same
        if (this.currentBooking?.id === id) {
          this.currentBooking = null;
        }
        if (this.selectedBooking?.id === id) {
          this.selectedBooking = null;
        }

        this.generateCalendarDays();
        return true;
      } catch (error: any) {
        this.error =
          error.response?.data?.message || "Failed to delete booking";
        return false;
      } finally {
        this.loading = false;
      }
    },

    // Accept a booking (nanny action)
    async acceptBooking(id: string) {
      this.loading = true;
      this.error = null;

      try {
        const updatedBooking = await bookingsApi.acceptBooking(id);
        this.updateBookingInStore(updatedBooking);
        this.generateCalendarDays();
        return updatedBooking;
      } catch (error: any) {
        this.error =
          error.response?.data?.message || "Failed to accept booking";
        return null;
      } finally {
        this.loading = false;
      }
    },

    // Decline a booking (nanny action)
    async declineBooking(id: string, reason?: string) {
      this.loading = true;
      this.error = null;

      try {
        const updatedBooking = await bookingsApi.declineBooking(id, reason);
        this.updateBookingInStore(updatedBooking);
        this.generateCalendarDays();
        return updatedBooking;
      } catch (error: any) {
        this.error =
          error.response?.data?.message || "Failed to decline booking";
        return null;
      } finally {
        this.loading = false;
      }
    },

    // Cancel a booking
    async cancelBooking(id: string, reason?: string) {
      this.loading = true;
      this.error = null;

      try {
        const updatedBooking = await bookingsApi.cancelBooking(id, reason);
        this.updateBookingInStore(updatedBooking);
        this.generateCalendarDays();
        return updatedBooking;
      } catch (error: any) {
        this.error =
          error.response?.data?.message || "Failed to cancel booking";
        return null;
      } finally {
        this.loading = false;
      }
    },

    // Complete a booking
    async completeBooking(id: string) {
      this.loading = true;
      this.error = null;

      try {
        const updatedBooking = await bookingsApi.completeBooking(id);
        this.updateBookingInStore(updatedBooking);
        this.generateCalendarDays();
        return updatedBooking;
      } catch (error: any) {
        this.error =
          error.response?.data?.message || "Failed to complete booking";
        return null;
      } finally {
        this.loading = false;
      }
    },

    // Send message
    async sendMessage(bookingId: string, message: string) {
      try {
        return await bookingsApi.sendMessage(bookingId, message);
      } catch (error: any) {
        this.error = error.response?.data?.message || "Failed to send message";
        return null;
      }
    },

    // Get booking messages
    async getBookingMessages(bookingId: string) {
      try {
        return await bookingsApi.getBookingMessages(bookingId);
      } catch (error: any) {
        this.error = error.response?.data?.message || "Failed to load messages";
        return null;
      }
    },

    // Filter actions
    setSearchQuery(query: string) {
      this.searchQuery = query;
      this.currentPage = 1;
      this.loadBookings();
    },

    setActiveFilter(
      filter:
        | "all"
        | "pending"
        | "confirmed"
        | "completed"
        | "cancelled"
        | "declined"
    ) {
      this.activeFilter = filter;
      this.currentPage = 1;
      this.loadBookings();
    },

    setViewMode(mode: "calendar" | "list") {
      this.viewMode = mode;
    },

    addStatusFilter(status: string) {
      if (!this.selectedStatuses.includes(status)) {
        this.selectedStatuses.push(status);
        this.currentPage = 1;
        this.loadBookings();
      }
    },

    removeStatusFilter(status: string) {
      this.selectedStatuses = this.selectedStatuses.filter((s) => s !== status);
      this.currentPage = 1;
      this.loadBookings();
    },

    addClientFilter(clientId: string) {
      if (!this.selectedClients.includes(clientId)) {
        this.selectedClients.push(clientId);
        this.currentPage = 1;
        this.loadBookings();
      }
    },

    removeClientFilter(clientId: string) {
      this.selectedClients = this.selectedClients.filter((c) => c !== clientId);
      this.currentPage = 1;
      this.loadBookings();
    },

    addNannyFilter(nannyId: string) {
      if (!this.selectedNannies.includes(nannyId)) {
        this.selectedNannies.push(nannyId);
        this.currentPage = 1;
        this.loadBookings();
      }
    },

    removeNannyFilter(nannyId: string) {
      this.selectedNannies = this.selectedNannies.filter((n) => n !== nannyId);
      this.currentPage = 1;
      this.loadBookings();
    },

    setDateRange(start: string | null, end: string | null) {
      this.dateRange.start = start;
      this.dateRange.end = end;
      this.currentPage = 1;
      this.loadBookings();
    },

    setSelectedDate(date: string | null) {
      this.selectedDate = date;
      this.currentPage = 1;
      this.loadBookings();
    },

    clearAllFilters() {
      this.searchQuery = "";
      this.activeFilter = "all";
      this.selectedStatuses = [];
      this.selectedClients = [];
      this.selectedNannies = [];
      this.selectedDate = null;
      this.dateRange = { start: null, end: null };
      this.currentPage = 1;
      this.loadBookings();
    },

    // Pagination actions
    nextPage() {
      if (this.canGoNext) {
        this.currentPage++;
        this.loadBookings();
      }
    },

    previousPage() {
      if (this.canGoPrevious) {
        this.currentPage--;
        this.loadBookings();
      }
    },

    goToPage(page: number) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        this.loadBookings();
      }
    },

    // Calendar actions
    setCurrentMonth(date: Date) {
      this.currentMonth = date;
      this.generateCalendarDays();
    },

    nextMonth() {
      const nextMonth = new Date(this.currentMonth);
      nextMonth.setMonth(nextMonth.getMonth() + 1);
      this.setCurrentMonth(nextMonth);
    },

    previousMonth() {
      const prevMonth = new Date(this.currentMonth);
      prevMonth.setMonth(prevMonth.getMonth() - 1);
      this.setCurrentMonth(prevMonth);
    },

    generateCalendarDays() {
      const year = this.currentMonth.getFullYear();
      const month = this.currentMonth.getMonth();

      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);

      const daysInMonth = lastDay.getDate();
      const startingDayOfWeek = firstDay.getDay();

      const today = new Date();
      const isToday = (date: Date) => {
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

      this.calendarDays = [
        ...previousMonthDays,
        ...currentMonthDays,
        ...nextMonthDays,
      ];
    },

    // Utility methods
    formatDateString(date: Date): string {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    },

    getBookingsForDate(dateString: string): Booking[] {
      return this.bookings.filter((booking) => booking.date === dateString);
    },

    formatDate(dateString: string): string {
      const options = {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      };
      return new Date(dateString).toLocaleDateString("en-US", options);
    },

    selectBooking(booking: Booking) {
      this.selectedBooking = booking;
    },

    clearSelectedBooking() {
      this.selectedBooking = null;
    },

    updateBookingInStore(updatedBooking: Booking) {
      // Update in bookings array
      const index = this.bookings.findIndex((b) => b.id === updatedBooking.id);
      if (index !== -1) {
        this.bookings[index] = updatedBooking;
      }

      // Update current booking if it's the same
      if (this.currentBooking?.id === updatedBooking.id) {
        this.currentBooking = updatedBooking;
      }

      // Update selected booking if it's the same
      if (this.selectedBooking?.id === updatedBooking.id) {
        this.selectedBooking = updatedBooking;
      }
    },

    clearError() {
      this.error = null;
    },

    // Color classes for booking status
    getBookingColorClass(status: string): string {
      switch (status) {
        case "confirmed":
          return "bg-green-100 text-green-800";
        case "pending":
          return "bg-yellow-100 text-yellow-800";
        case "completed":
          return "bg-blue-100 text-blue-800";
        case "cancelled":
        case "declined":
          return "bg-red-100 text-red-800";
        default:
          return "bg-gray-100 text-gray-800";
      }
    },

    getStatusBadgeClass(status: string): string {
      switch (status) {
        case "confirmed":
          return "bg-green-100 text-green-800";
        case "pending":
          return "bg-yellow-100 text-yellow-800";
        case "completed":
          return "bg-blue-100 text-blue-800";
        case "cancelled":
        case "declined":
          return "bg-red-100 text-red-800";
        default:
          return "bg-gray-100 text-gray-800";
      }
    },
  },
});
