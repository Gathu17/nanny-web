import { defineStore } from "pinia";
import {
  jobApi,
  type Job,
  type JobFilters,
  type JobApplication,
} from "@/api/job";

// Types
interface Location {
  lat: number;
  lng: number;
}

interface FilterOptions {
  locations: string[];
  schedules: string[];
  salaryRanges: Array<{ label: string; value: string }>;
  requirements: string[];
}

interface JobStats {
  totalJobs: number;
  savedJobs: number;
  appliedJobs: number;
  newJobs: number;
}

interface JobState {
  // Jobs data
  jobs: Job[];
  currentJob: Job | null;

  // Filter and search state
  searchQuery: string;
  activeFilter: "all" | "new" | "applied" | "saved";

  // Filter options
  filterOptions: FilterOptions;

  // Pagination
  currentPage: number;
  totalPages: number;
  totalJobs: number;
  itemsPerPage: number;

  // Loading and error states
  loading: boolean;
  loadingFilters: boolean;
  error: string | null;

  // Statistics
  stats: JobStats | null;

  // Selected filters
  selectedLocations: string[];
  selectedSchedules: string[];
  selectedSalaryRanges: string[];
  selectedRequirements: string[];
}

export const useJobStore = defineStore("job", {
  state: (): JobState => ({
    // Jobs data
    jobs: [],
    currentJob: null,

    // Filter and search state
    searchQuery: "",
    activeFilter: "all",

    // Filter options
    filterOptions: {
      locations: [],
      schedules: [],
      salaryRanges: [],
      requirements: [],
    },

    // Pagination
    currentPage: 1,
    totalPages: 1,
    totalJobs: 0,
    itemsPerPage: 10,

    // Loading and error states
    loading: false,
    loadingFilters: false,
    error: null,

    // Statistics
    stats: null,

    // Selected filters
    selectedLocations: [],
    selectedSchedules: [],
    selectedSalaryRanges: [],
    selectedRequirements: [],
  }),

  getters: {
    // Job getters
    getJobById: (state) => (id: string) => {
      return state.jobs.find((job) => job.id === id);
    },

    getSavedJobs: (state) => (userId: string) => {
      return state.jobs.filter(
        (job) =>
          job.savedByUsers &&
          job.savedByUsers.some((user) => user.id === userId)
      );
    },

    getAppliedJobs: (state) => {
      return state.jobs.filter((job) => job.status === "applied");
    },

    getNewJobs: (state) => {
      return state.jobs.filter((job) => job.status === "new");
    },

    // Filter getters
    isFiltering: (state) => {
      return (
        state.selectedLocations.length > 0 ||
        state.selectedSchedules.length > 0 ||
        state.selectedSalaryRanges.length > 0 ||
        state.selectedRequirements.length > 0 ||
        state.searchQuery.trim() !== ""
      );
    },

    hasActiveFilters: (state) => {
      return (
        state.selectedLocations.length > 0 ||
        state.selectedSchedules.length > 0 ||
        state.selectedSalaryRanges.length > 0 ||
        state.selectedRequirements.length > 0 ||
        state.searchQuery.trim() !== "" ||
        state.activeFilter !== "all"
      );
    },

    // Loading getters
    isLoading: (state) => state.loading,
    isLoadingFilters: (state) => state.loadingFilters,
    hasError: (state) => !!state.error,

    // Pagination getters
    canGoNext: (state) => state.currentPage < state.totalPages,
    canGoPrevious: (state) => state.currentPage > 1,

    // Computed filters for API
    computedFilters: (state) => {
      const filters: JobFilters = {};

      if (state.selectedLocations.length > 0) {
        filters.location = state.selectedLocations;
      }
      if (state.selectedSchedules.length > 0) {
        filters.schedule = state.selectedSchedules;
      }
      if (state.selectedSalaryRanges.length > 0) {
        filters.salary = state.selectedSalaryRanges;
      }
      if (state.selectedRequirements.length > 0) {
        filters.requirements = state.selectedRequirements;
      }
      if (state.searchQuery.trim()) {
        filters.search = state.searchQuery.trim();
      }
      if (state.activeFilter !== "all") {
        filters.status = state.activeFilter;
      }

      return filters;
    },

    // Filter option getters
    getLocations: (state) => state.filterOptions.locations,
    getSchedules: (state) => state.filterOptions.schedules,
    getSalaryRanges: (state) => state.filterOptions.salaryRanges,
    getRequirements: (state) => state.filterOptions.requirements,

    // Selected filter getters
    getSelectedLocations: (state) => state.selectedLocations,
    getSelectedSchedules: (state) => state.selectedSchedules,
    getSelectedSalaryRanges: (state) => state.selectedSalaryRanges,
    getSelectedRequirements: (state) => state.selectedRequirements,

    // Active filter getter
    getActiveFilter: (state) => state.activeFilter,
    getSearchQuery: (state) => state.searchQuery,
  },

  actions: {
    // Initialize store
    async initialize() {
      await Promise.all([
        this.loadFilterOptions(),
        this.loadJobs(),
        // this.loadStats(),
      ]);
    },

    // Load jobs with current filters
    async loadJobs() {
      this.loading = true;
      this.error = null;

      try {
        const response = await jobApi.getJobs(
          this.computedFilters,
          this.currentPage,
          this.itemsPerPage
        );
        console.log(response);
        this.jobs = response;
        // this.totalJobs = response.total;
        // this.totalPages = response.totalPages;
        // this.currentPage = response.page;
      } catch (error) {
        console.error("Error fetching jobs:", error);
        this.error =
          error instanceof Error ? error.message : "Failed to load jobs";
        // Fallback to empty array
        this.jobs = [];
      } finally {
        this.loading = false;
        console.log(this.loading);
      }
    },

    // Load filter options
    async loadFilterOptions() {
      this.loading = true;

      try {
        const options = await jobApi.getFilterOptions();
        this.filterOptions = options;
      } catch (error) {
        console.error("Error loading filter options:", error);
        // Fallback to default options
        this.filterOptions = {
          locations: [
            "Westlands, Nairobi",
            "Kilimani, Nairobi",
            "Lavington, Nairobi",
            "Karen, Nairobi",
            "Kileleshwa, Nairobi",
            "Runda, Nairobi",
          ],
          schedules: [
            "Full-time",
            "Part-time",
            "Weekends",
            "Evenings",
            "Overnight",
            "Flexible",
          ],
          salaryRanges: [
            { label: "Under Ksh 20,000", value: "0-20000" },
            { label: "Ksh 20,000 - 40,000", value: "20000-40000" },
            { label: "Ksh 40,000 - 60,000", value: "40000-60000" },
            { label: "Ksh 60,000 - 80,000", value: "60000-80000" },
            { label: "Ksh 80,000+", value: "80000-999999" },
          ],
          requirements: [
            "First Aid Certified",
            "CPR Certified",
            "Early Childhood Education",
            "Experience with Infants",
            "Experience with Toddlers",
            "Experience with Special Needs",
            "Driver's License",
            "Cooking Skills",
            "Light Housekeeping",
          ],
        };
      } finally {
        this.loading = false;
      }
    },

    // Load job statistics
    async loadStats() {
      try {
        this.stats = await jobApi.getJobStats();
      } catch (error) {
        console.error("Error loading job stats:", error);
        this.stats = null;
      }
    },

    // Get single job
    async getJob(id: string) {
      try {
        const response = await jobApi.getJob(id);
        this.currentJob = response.job;
        return response.job;
      } catch (error) {
        console.error("Error fetching job:", error);
        throw error;
      }
    },

    // Apply for a job
    async applyForJob(jobId: string, application: Partial<JobApplication>) {
      try {
        const response = await jobApi.applyForJob({
          jobId,
          nannyId: "current-user-id", // This should come from auth store
          ...application,
        });

        const job = this.jobs.find((j) => j.id === jobId);
        if (job) {
          job.status = "applied";
        }

        return response;
      } catch (error) {
        console.error("Error applying for job:", error);
        throw error;
      }
    },

    // Toggle save job
    async toggleSaveJob(jobId: string) {
      try {
        const response = await jobApi.toggleSaveJob(jobId);

        // Update job in store
        const job = this.jobs.find((j) => j.id === jobId);
        if (job) {
          job.saved = response.saved;
        }

        return response;
      } catch (error) {
        console.error("Error toggling save job:", error);
        throw error;
      }
    },

    // Filter actions
    setSearchQuery(query: string) {
      this.searchQuery = query;
      this.currentPage = 1;
      this.loadJobs();
    },

    setActiveFilter(filter: "all" | "new" | "applied" | "saved") {
      this.activeFilter = filter;
      this.currentPage = 1;
      this.loadJobs();
    },

    // Location filters
    addLocationFilter(location: string) {
      if (!this.selectedLocations.includes(location)) {
        this.selectedLocations.push(location);
        this.currentPage = 1;
        this.loadJobs();
      }
    },

    removeLocationFilter(location: string) {
      this.selectedLocations = this.selectedLocations.filter(
        (loc) => loc !== location
      );
      this.currentPage = 1;
      this.loadJobs();
    },

    // Schedule filters
    addScheduleFilter(schedule: string) {
      if (!this.selectedSchedules.includes(schedule)) {
        this.selectedSchedules.push(schedule);
        this.currentPage = 1;
        this.loadJobs();
      }
    },

    removeScheduleFilter(schedule: string) {
      this.selectedSchedules = this.selectedSchedules.filter(
        (sch) => sch !== schedule
      );
      this.currentPage = 1;
      this.loadJobs();
    },

    // Salary filters
    addSalaryFilter(salary: string) {
      if (!this.selectedSalaryRanges.includes(salary)) {
        this.selectedSalaryRanges.push(salary);
        this.currentPage = 1;
        this.loadJobs();
      }
    },

    removeSalaryFilter(salary: string) {
      this.selectedSalaryRanges = this.selectedSalaryRanges.filter(
        (sal) => sal !== salary
      );
      this.currentPage = 1;
      this.loadJobs();
    },

    // Requirement filters
    addRequirementFilter(requirement: string) {
      if (!this.selectedRequirements.includes(requirement)) {
        this.selectedRequirements.push(requirement);
        this.currentPage = 1;
        this.loadJobs();
      }
    },

    removeRequirementFilter(requirement: string) {
      this.selectedRequirements = this.selectedRequirements.filter(
        (req) => req !== requirement
      );
      this.currentPage = 1;
      this.loadJobs();
    },

    // Clear all filters
    clearAllFilters() {
      this.selectedLocations = [];
      this.selectedSchedules = [];
      this.selectedSalaryRanges = [];
      this.selectedRequirements = [];
      this.searchQuery = "";
      this.activeFilter = "all";
      this.currentPage = 1;
      this.loadJobs();
    },

    // Pagination actions
    nextPage() {
      if (this.canGoNext) {
        this.currentPage++;
        this.loadJobs();
      }
    },

    previousPage() {
      if (this.canGoPrevious) {
        this.currentPage--;
        this.loadJobs();
      }
    },

    goToPage(page: number) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        this.loadJobs();
      }
    },

    // Utility actions
    clearError() {
      this.error = null;
    },

    // Legacy methods for backward compatibility
    async fetchAllJobs() {
      await this.loadJobs();
    },

    async fetchNearbyJobs(userLocation: Location) {
      // This could be enhanced to use actual location-based filtering
      await this.loadJobs();
    },

    calculateDistance(
      lat1: number,
      lon1: number,
      lat2: number,
      lon2: number
    ): number {
      const R = 6371; // Radius of the earth in km
      const dLat = this.deg2rad(lat2 - lat1);
      const dLon = this.deg2rad(lon2 - lon1);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(this.deg2rad(lat1)) *
          Math.cos(this.deg2rad(lat2)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c; // Distance in km
      return distance;
    },

    deg2rad(deg: number): number {
      return deg * (Math.PI / 180);
    },
  },
});
