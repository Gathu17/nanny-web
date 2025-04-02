import { defineStore } from "pinia";

interface Location {
  lat: number;
  lng: number;
}

interface Job {
  id: number;
  title: string;
  location: string;
  coordinates: Location;
  distance?: string;
  salary: string;
  schedule: string;
  requirements: string[];
  posted: string;
}

interface JobState {
  jobs: Job[];
  nearbyJobs: Job[];
  loading: boolean;
  error: string | null;
}

export const useJobStore = defineStore("job", {
  state: (): JobState => ({
    jobs: [],
    nearbyJobs: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchAllJobs() {
      this.loading = true;
      this.error = null;

      try {
        // In a real app, this would be an API call
        // Simulating API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock data
        this.jobs = [
          {
            id: 1,
            title: "After School Nanny",
            location: "123 Main St, New York",
            coordinates: { lat: 40.7128, lng: -74.006 },
            salary: "$25-30/hr",
            schedule: "Mon-Fri, 3-6pm",
            requirements: ["Driver's License", "First Aid Certified"],
            posted: "2 days ago",
          },
          {
            id: 2,
            title: "Weekend Babysitter",
            location: "456 Park Ave, New York",
            coordinates: { lat: 40.7112, lng: -73.9976 },
            salary: "$20-25/hr",
            schedule: "Sat-Sun, flexible hours",
            requirements: ["Experience with infants", "References"],
            posted: "1 week ago",
          },
          // Add more mock jobs as needed
        ];
      } catch (error) {
        console.error("Error fetching jobs:", error);
        this.error = "Failed to load jobs. Please try again.";
      } finally {
        this.loading = false;
      }
    },

    async fetchNearbyJobs(userLocation: Location) {
      this.loading = true;
      this.error = null;

      try {
        // First, make sure we have all jobs
        if (this.jobs.length === 0) {
          await this.fetchAllJobs();
        }

        // Calculate distance and filter nearby jobs
        // In a real app, this would be done server-side
        this.nearbyJobs = this.jobs.map((job) => {
          // Calculate mock distance
          const distance = this.calculateDistance(
            userLocation.lat,
            userLocation.lng,
            job.coordinates.lat,
            job.coordinates.lng
          );

          return {
            ...job,
            distance: `${distance.toFixed(1)} km`,
          };
        });

        // Sort by distance
        this.nearbyJobs.sort((a, b) => {
          return parseFloat(a.distance!) - parseFloat(b.distance!);
        });
      } catch (error) {
        console.error("Error fetching nearby jobs:", error);
        this.error = "Failed to load nearby jobs. Please try again.";
      } finally {
        this.loading = false;
      }
    },

    // Haversine formula to calculate distance between two coordinates
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

  getters: {
    getJobById: (state) => (id: number) => {
      return state.jobs.find((job) => job.id === id);
    },
    isLoading: (state) => state.loading,
    hasError: (state) => !!state.error,
  },
});
