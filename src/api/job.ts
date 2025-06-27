import { api } from "@/utils/request";

// Types for job data
export interface Job {
  id: string;
  title: string;
  location: string;
  schedule: {
    days: string;
    hours: string;
  };
  scheduleType?:
    | "Full-time"
    | "Part-time"
    | "Weekends"
    | "Evenings"
    | "Overnight"
    | "Flexible";
  salary: string;
  salaryRange: string;
  requirements: string[];
  posted: string;
  status: string;
  saved: boolean;
  savedByUsers?: Array<{
    id: string;
    name?: string;
  }>;
  description?: string;
  familyId?: string;
  familyName?: string;
  children?: Array<{
    name: string;
    age: string;
  }>;
  createdAt?: string;
  updatedAt?: string;
}

// Types for job filters
export interface JobFilters {
  location?: string[];
  schedule?: string[];
  salary?: string[];
  requirements?: string[];
  search?: string;
  status?: "all" | "new" | "applied" | "saved";
}

// Types for job application
export interface JobApplication {
  jobId: string;
  nannyId: string;
  message?: string;
  proposedRate?: number;
  availability?: string;
}

// Types for API responses
export interface JobsResponse {
  jobs: Job[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface JobResponse {
  job: Job;
  message?: string;
}

export interface ApplicationResponse {
  application: JobApplication;
  message: string;
}

// API endpoints
export const jobApi = {
  // Get all jobs with optional filters
  async getJobs(
    filters?: JobFilters,
    page: number = 1,
    limit: number = 10
  ): Promise<Job[]> {
    return api.get(`/jobs`);
  },

  // Get a single job by ID
  async getJob(id: string): Promise<JobResponse> {
    return api.get<JobResponse>(`/jobs/${id}`);
  },

  // Apply for a job
  async applyForJob(application: JobApplication): Promise<ApplicationResponse> {
    return api.post<ApplicationResponse>("/jobs/apply", application);
  },

  // Save/unsave a job
  async toggleSaveJob(
    jobId: string
  ): Promise<{ message: string; saved: boolean }> {
    return api.post<{ message: string; saved: boolean }>(`/jobs/toggle-save`, {
      jobId,
    });
  },

  // Get saved jobs
  async getSavedJobs(): Promise<JobsResponse> {
    return api.get<JobsResponse>("/jobs/saved");
  },

  // Get applied jobs
  async getAppliedJobs(): Promise<JobsResponse> {
    return api.get<JobsResponse>("/jobs/applied");
  },

  // Get job statistics
  async getJobStats(): Promise<{
    totalJobs: number;
    savedJobs: number;
    appliedJobs: number;
    newJobs: number;
  }> {
    return api.get<{
      totalJobs: number;
      savedJobs: number;
      appliedJobs: number;
      newJobs: number;
    }>("/jobs/stats");
  },

  // Get filter options
  async getFilterOptions(): Promise<{
    locations: string[];
    schedules: string[];
    salaryRanges: Array<{ label: string; value: string }>;
    requirements: string[];
  }> {
    return api.get<{
      locations: string[];
      schedules: string[];
      salaryRanges: Array<{ label: string; value: string }>;
      requirements: string[];
    }>("/jobs/filter-options");
  },
};
