import {
  defineEventHandler,
  getQuery,
  getMethod,
  readBody,
  createError,
} from "h3";

// Mock data
const mockJobs = [
  {
    id: "1",
    title: "Full-time Nanny",
    location: "Westlands, Nairobi",
    schedule: "Monday-Friday, 8AM-5PM",
    scheduleType: "Full-time",
    salary: "Ksh 45,000",
    requirements: "First Aid Certified, Experience with Toddlers",
    posted: "2 days ago",
    status: "new",
    saved: false,
    description:
      "Looking for a reliable full-time nanny for our 2-year-old twins.",
    familyId: "family1",
    familyName: "The Johnson Family",
    children: [
      { name: "Emma", age: "2 years" },
      { name: "Liam", age: "2 years" },
    ],
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "2",
    title: "Weekend Nanny",
    location: "Kilimani, Nairobi",
    schedule: "Saturday-Sunday, 9AM-6PM",
    scheduleType: "Weekends",
    salary: "Ksh 25,000",
    requirements: "Experience with Infants, Light Housekeeping",
    posted: "1 week ago",
    status: "new",
    saved: false,
    description: "Weekend care for our 6-month-old baby.",
    familyId: "family2",
    familyName: "The Kimani Family",
    children: [{ name: "Aisha", age: "6 months" }],
    createdAt: "2024-01-10T14:30:00Z",
    updatedAt: "2024-01-10T14:30:00Z",
  },
  {
    id: "3",
    title: "Part-time Nanny",
    location: "Lavington, Nairobi",
    schedule: "Monday-Wednesday, 2PM-7PM",
    scheduleType: "Part-time",
    salary: "Ksh 35,000",
    requirements: "CPR Certified, Cooking Skills",
    posted: "3 days ago",
    status: "new",
    saved: false,
    description: "After-school care and meal preparation for our 8-year-old.",
    familyId: "family3",
    familyName: "The Ochieng Family",
    children: [{ name: "David", age: "8 years" }],
    createdAt: "2024-01-14T09:15:00Z",
    updatedAt: "2024-01-14T09:15:00Z",
  },
  {
    id: "4",
    title: "Overnight Nanny",
    location: "Karen, Nairobi",
    schedule: "Night Shift, 10PM-6AM",
    scheduleType: "Overnight",
    salary: "Ksh 55,000",
    requirements: "Experience with Infants, Driver's License",
    posted: "5 days ago",
    status: "new",
    saved: false,
    description: "Overnight care for our newborn twins.",
    familyId: "family4",
    familyName: "The Patel Family",
    children: [
      { name: "Zara", age: "2 months" },
      { name: "Aiden", age: "2 months" },
    ],
    createdAt: "2024-01-12T16:45:00Z",
    updatedAt: "2024-01-12T16:45:00Z",
  },
  {
    id: "5",
    title: "Flexible Hours Nanny",
    location: "Runda, Nairobi",
    schedule: "Flexible Hours",
    scheduleType: "Flexible",
    salary: "Ksh 40,000",
    requirements: "Early Childhood Education, Experience with Special Needs",
    posted: "1 day ago",
    status: "new",
    saved: false,
    description: "Flexible care for our special needs child.",
    familyId: "family5",
    familyName: "The Wanjiku Family",
    children: [{ name: "Grace", age: "5 years" }],
    createdAt: "2024-01-16T11:20:00Z",
    updatedAt: "2024-01-16T11:20:00Z",
  },
];

const filterOptions = {
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

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const method = getMethod(event);

    if (method === "GET") {
      // Handle different endpoints
      const path = event.path || "";

      if (path.includes("/filter-options")) {
        return filterOptions;
      }

      if (path.includes("/stats")) {
        return {
          totalJobs: mockJobs.length,
          savedJobs: mockJobs.filter((job) => job.saved).length,
          appliedJobs: mockJobs.filter((job) => job.status === "applied")
            .length,
          newJobs: mockJobs.filter((job) => job.status === "new").length,
        };
      }

      if (path.includes("/saved")) {
        return {
          jobs: mockJobs.filter((job) => job.saved),
          total: mockJobs.filter((job) => job.saved).length,
          page: 1,
          limit: 10,
          totalPages: 1,
        };
      }

      if (path.includes("/applied")) {
        return {
          jobs: mockJobs.filter((job) => job.status === "applied"),
          total: mockJobs.filter((job) => job.status === "applied").length,
          page: 1,
          limit: 10,
          totalPages: 1,
        };
      }

      // Default jobs endpoint with filtering
      let filteredJobs = [...mockJobs];

      // Apply filters
      if (query.location) {
        const locations = Array.isArray(query.location)
          ? query.location
          : [query.location];
        filteredJobs = filteredJobs.filter((job) =>
          locations.includes(job.location)
        );
      }

      if (query.schedule) {
        const schedules = Array.isArray(query.schedule)
          ? query.schedule
          : [query.schedule];
        filteredJobs = filteredJobs.filter((job) =>
          schedules.includes(job.scheduleType)
        );
      }

      if (query.salary) {
        const salaryRanges = Array.isArray(query.salary)
          ? query.salary
          : [query.salary];
        filteredJobs = filteredJobs.filter((job) => {
          const jobSalary = parseInt(job.salary.replace(/\D/g, ""));
          return salaryRanges.some((range) => {
            const [min, max] = range.split("-");
            if (max) {
              return jobSalary >= parseInt(min) && jobSalary <= parseInt(max);
            }
            return jobSalary >= parseInt(min);
          });
        });
      }

      if (query.requirements) {
        const requirements = Array.isArray(query.requirements)
          ? query.requirements
          : [query.requirements];
        filteredJobs = filteredJobs.filter((job) =>
          requirements.every((req) =>
            job.requirements.toLowerCase().includes(req.toLowerCase())
          )
        );
      }

      if (query.search) {
        const searchTerm = query.search.toString().toLowerCase();
        filteredJobs = filteredJobs.filter(
          (job) =>
            job.title.toLowerCase().includes(searchTerm) ||
            job.location.toLowerCase().includes(searchTerm) ||
            job.requirements.toLowerCase().includes(searchTerm) ||
            job.schedule.toLowerCase().includes(searchTerm)
        );
      }

      if (query.status && query.status !== "all") {
        if (query.status === "saved") {
          filteredJobs = filteredJobs.filter((job) => job.saved);
        } else {
          filteredJobs = filteredJobs.filter(
            (job) => job.status === query.status
          );
        }
      }

      // Pagination
      const page = parseInt(query.page as string) || 1;
      const limit = parseInt(query.limit as string) || 10;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedJobs = filteredJobs.slice(startIndex, endIndex);

      return {
        jobs: paginatedJobs,
        total: filteredJobs.length,
        page,
        limit,
        totalPages: Math.ceil(filteredJobs.length / limit),
      };
    }

    if (method === "POST") {
      const body = await readBody(event);

      if (event.path?.includes("/apply")) {
        // Mock job application
        return {
          application: body,
          message: "Application submitted successfully!",
        };
      }

      if (event.path?.includes("/save")) {
        // Mock save/unsave job
        const jobId = event.path.split("/")[2];
        const job = mockJobs.find((j) => j.id === jobId);
        if (job) {
          job.saved = !job.saved;
          return {
            message: job.saved
              ? "Job saved successfully!"
              : "Job removed from saved jobs",
            saved: job.saved,
          };
        }
      }
    }

    return { message: "Endpoint not found" };
  } catch (error) {
    console.error("API Error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
  }
});
