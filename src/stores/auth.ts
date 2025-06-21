import { defineStore } from "pinia";
import {
  authApi,
  type User,
  type LoginPayload,
  type SignupPayload,
} from "@/api/auth";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  token: {
    token: string | null;
  };
  loading: boolean;
  error: string | null;
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    user: null,
    isAuthenticated: false,
    token: null,
    loading: false,
    error: null,
  }),
  actions: {
    async login(payload: LoginPayload) {
      this.loading = true;
      this.error = null;

      try {
        const response = await authApi.login(payload);
        console.log(response);
        this.user = response.user;
        this.isAuthenticated = true;
        this.token = response.token;
        
        // Store token in localStorage
        localStorage.setItem("auth_token", response.token?.token);

        return true;
      } catch (error: any) {
        this.error =
          error.response?.data?.message ||
          "Failed to login. Please check your credentials.";
        return false;
      } finally {
        this.loading = false;
      }
    },
    async signup(userData: SignupPayload) {
      this.loading = true;
      this.error = null;

      try {
        const response = await authApi.signup(userData);
        console.log(response);

        this.user = response.user;
        this.isAuthenticated = true;
        this.token = response.token;

        localStorage.setItem("auth_token", response.token.token);

        return true;
      } catch (error: any) {
        this.error = error;
        return false;
      } finally {
        this.loading = false;
      }
    },
    async logout() {
      try {
        await authApi.logout();
      } catch (error) {
        console.error("Logout error:", error);
      } finally {
        this.user = null;
        this.isAuthenticated = false;
        this.token = null;
        localStorage.removeItem("auth_token");
      }
    },
    async checkAuth() {
      this.loading = true;
      try {
        const token = localStorage.getItem("auth_token");
        if (!token) {
          this.loading = false;
          return;
        }
        this.token = { token };
        const user = await authApi.getCurrentUser();
        this.user = user;
        this.isAuthenticated = true;
      } catch (error) {
        this.logout();
      } finally {
        this.loading = false;
      }
    },
    async refreshAuthToken() {
      this.loading = true;
      try {
        const { token } = await authApi.refreshToken();
        this.token = { token };
        localStorage.setItem("auth_token", token);
        return true;
      } catch (error) {
        this.logout();
        return false;
      } finally {
        this.loading = false;
      }
    },
    async updateProfile(userData: Partial<User>) {
      this.loading = true;
      this.error = null;

      try {
        const updatedUser = await authApi.updateProfile(userData);
        this.user = updatedUser;
        return true;
      } catch (error: any) {
        this.error =
          error.response?.data?.message || "Failed to update profile";
        return false;
      } finally {
        this.loading = false;
      }
    },
    async verifyEmail(token: string) {
      this.loading = true;
      this.error = null;

      try {
        const response = await authApi.verifyEmail(token);
        if (this.user) {
          this.user = { ...this.user, isVerified: true };
        }
        return response;
      } catch (error: any) {
        this.error = error.response?.data?.message || "Failed to verify email";
        return false;
      } finally {
        this.loading = false;
      }
    },
    async forgotPassword(email: string) {
      this.loading = true;
      this.error = null;

      try {
        return await authApi.forgotPassword(email);
      } catch (error: any) {
        this.error =
          error.response?.data?.message ||
          "Failed to process forgot password request";
        return false;
      } finally {
        this.loading = false;
      }
    },
    async resetPassword(token: string, password: string) {
      this.loading = true;
      this.error = null;

      try {
        return await authApi.resetPassword(token, password);
      } catch (error: any) {
        this.error =
          error.response?.data?.message || "Failed to reset password";
        return false;
      } finally {
        this.loading = false;
      }
    },
    async changePassword(currentPassword: string, newPassword: string) {
      this.loading = true;
      this.error = null;

      try {
        return await authApi.changePassword({ currentPassword, newPassword });
      } catch (error: any) {
        this.error =
          error.response?.data?.message || "Failed to change password";
        return false;
      } finally {
        this.loading = false;
      }
    },
  },
  getters: {
    isNanny: (state): boolean => state.user?.userType === "nanny",
    isClient: (state): boolean => state.user?.userType === "parent",
    userRole: (state): string | undefined => state.user?.userType,
    isLoading: (state): boolean => state.loading,
    hasError: (state): boolean => !!state.error,
    isVerified: (state): boolean => !!state.user?.isVerified,
  },
  persist: true,
});
