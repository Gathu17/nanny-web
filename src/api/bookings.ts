import { api } from "@/utils/request";

// Types for booking data
export interface Child {
  id?: string;
  name: string;
  age: number;
  specialNeeds?: string;
}

export interface Booking {
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

export interface CreateBookingPayload {
  clientId: string;
  nannyId: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  payment: number;
  children: Omit<Child, "id">[];
  notes?: string;
}

export interface UpdateBookingPayload {
  date?: string;
  startTime?: string;
  endTime?: string;
  location?: string;
  payment?: number;
  children?: Child[];
  notes?: string;
}

export interface BookingFilters {
  status?: string[];
  dateFrom?: string;
  dateTo?: string;
  clientId?: string;
  nannyId?: string;
  search?: string;
}

export interface BookingStats {
  total: number;
  pending: number;
  confirmed: number;
  completed: number;
  cancelled: number;
  declined: number;
  totalEarnings: number;
  thisMonthEarnings: number;
}

// API endpoints
export const bookingsApi = {
  // Get all bookings with filters
  async getBookings(filters?: BookingFilters): Promise<{
    bookings: Booking[];
    total: number;
    page: number;
    limit: number;
  }> {
    return api.get("/bookings", { params: filters });
  },

  // Get a single booking by ID
  async getBooking(id: string): Promise<Booking> {
    return api.get<Booking>(`/bookings/${id}`);
  },

  // Create a new booking
  async createBooking(payload: CreateBookingPayload): Promise<Booking> {
    return api.post<Booking>("/bookings", payload);
  },

  // Update a booking
  async updateBooking(
    id: string,
    payload: UpdateBookingPayload
  ): Promise<Booking> {
    return api.put<Booking>(`/bookings/${id}`, payload);
  },

  // Delete a booking
  async deleteBooking(id: string): Promise<{ message: string }> {
    return api.delete<{ message: string }>(`/bookings/${id}`);
  },

  // Accept a booking (nanny action)
  async acceptBooking(id: string): Promise<Booking> {
    return api.post<Booking>(`/bookings/${id}/accept`);
  },

  // Decline a booking (nanny action)
  async declineBooking(id: string, reason?: string): Promise<Booking> {
    return api.post<Booking>(`/bookings/${id}/decline`, { reason });
  },

  // Cancel a booking
  async cancelBooking(id: string, reason?: string): Promise<Booking> {
    return api.post<Booking>(`/bookings/${id}/cancel`, { reason });
  },

  // Complete a booking
  async completeBooking(id: string): Promise<Booking> {
    return api.post<Booking>(`/bookings/${id}/complete`);
  },

  // Get booking statistics
  async getBookingStats(): Promise<BookingStats> {
    return api.get<BookingStats>("/bookings/stats");
  },

  // Get bookings for a specific date range
  async getBookingsByDateRange(
    startDate: string,
    endDate: string
  ): Promise<Booking[]> {
    return api.get<Booking[]>("/bookings/date-range", {
      params: { startDate, endDate },
    });
  },

  // Get upcoming bookings
  async getUpcomingBookings(limit?: number): Promise<Booking[]> {
    return api.get<Booking[]>("/bookings/upcoming", {
      params: { limit },
    });
  },

  // Get past bookings
  async getPastBookings(limit?: number): Promise<Booking[]> {
    return api.get<Booking[]>("/bookings/past", {
      params: { limit },
    });
  },

  // Send message to client/nanny
  async sendMessage(
    bookingId: string,
    message: string
  ): Promise<{ message: string }> {
    return api.post<{ message: string }>(`/bookings/${bookingId}/message`, {
      message,
    });
  },

  // Get booking messages
  async getBookingMessages(bookingId: string): Promise<{
    messages: Array<{
      id: string;
      senderId: string;
      senderName: string;
      message: string;
      createdAt: string;
    }>;
  }> {
    return api.get(`/bookings/${bookingId}/messages`);
  },
};
