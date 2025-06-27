import { defineStore } from "pinia";
import {
  authApi,
  type User,
  type LoginPayload,
  type SignupPayload,
} from "@/api/auth";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

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
        toast.success("Login successful!");
        return true;
      } catch (error: any) {
        this.error =
          error.response?.data?.message ||
          "Failed to login. Please check your credentials.";
        toast.error(this.error);
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
        toast.success("Signup successful! Welcome!");

        return true;
      } catch (error: any) {
        console.log(error)
        this.error = error.response?.data?.message || "Failed to sign up.";
        toast.error(this.error);
        return false;
      } finally {
        this.loading = false;
      }
    },
    async logout() {
      try {
        await authApi.logout();
        toast.success("Logged out successfully.");
      } catch (error) {
        console.error("Logout error:", error);
        toast.error("Logout failed.");
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
        toast.success("Profile updated successfully.");
        return true;
      } catch (error: any) {
        this.error =
          error.response?.data?.message || "Failed to update profile";
        toast.error(this.error);
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
        toast.success("Email verified successfully!");
        return response;
      } catch (error: any) {
        this.error = error.response?.data?.message || "Failed to verify email";
        toast.error(this.error);
        return false;
      } finally {
        this.loading = false;
      }
    },
    async forgotPassword(email: string) {
      this.loading = true;
      this.error = null;

      try {
        const res = await authApi.forgotPassword(email);
        toast.success(res.message || "Password reset email sent.");
        return res;
      } catch (error: any) {
        this.error =
          error.response?.data?.message ||
          "Failed to process forgot password request";
        toast.error(this.error);
        return false;
      } finally {
        this.loading = false;
      }
    },
    async resetPassword(token: string, password: string) {
      this.loading = true;
      this.error = null;

      try {
        const res = await authApi.resetPassword(token, password);
        toast.success(res.message || "Password reset successful.");
        return res;
      } catch (error: any) {
        this.error =
          error.response?.data?.message || "Failed to reset password";
        toast.error(this.error);
        return false;
      } finally {
        this.loading = false;
      }
    },
    async changePassword(currentPassword: string, newPassword: string) {
      this.loading = true;
      this.error = null;

      try {
        const res = await authApi.changePassword({
          currentPassword,
          newPassword,
        });
        toast.success(res.message || "Password changed successfully.");
        return res;
      } catch (error: any) {
        this.error =
          error.response?.data?.message || "Failed to change password";
        toast.error(this.error);
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
