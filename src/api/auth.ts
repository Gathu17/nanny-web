import { api } from '@/utils/request';

// Types for request payloads
export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignupPayload {
  email: string;
  name: string;
  password: string;
  userType?: 'nanny' | 'parent';
}

// Types for response data
export interface User {
  id?: string;
  email: string;
  name?: string;
  userType: 'nanny' | 'parent';
  isVerified?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthResponse {
  user: User;
  token: {
    token : string
  };
  message?: string;
}

// API endpoints
export const authApi = {
  async login(payload: LoginPayload): Promise<AuthResponse> {
    return api.post<AuthResponse>('/auth/login', payload);
  },

  async signup(payload: SignupPayload): Promise<AuthResponse> {
    return api.post<AuthResponse>('/auth/signup', payload);
  },

  async verifyEmail(token: string): Promise<{ message: string }> {
    return api.post<{ message: string }>('/auth/verify-email', { token });
  },

  async forgotPassword(email: string): Promise<{ message: string }> {
    return api.post<{ message: string }>('/auth/forgot-password', { email });
  },

  async resetPassword(token: string, password: string): Promise<{ message: string }> {
    return api.post<{ message: string }>('/auth/reset-password', { token, password });
  },

  async getCurrentUser(): Promise<User> {
    return api.get<User>('/auth/me');
  },

  async updateProfile(data: Partial<User>): Promise<User> {
    return api.put<User>('/auth/profile', data);
  },

  async changePassword(data: { currentPassword: string; newPassword: string }): Promise<{ message: string }> {
    return api.post<{ message: string }>('/auth/change-password', data);
  },

  async logout(): Promise<void> {
    return api.get('/auth/logout');
  },

  async refreshToken(): Promise<{ token: string }> {
    return api.post<{ token: string }>('/auth/refresh-token');
  }
};