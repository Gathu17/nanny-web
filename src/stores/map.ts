import { defineStore } from "pinia";

interface Location {
  lat: number;
  lng: number;
}

interface MapState {
  userLocation: Location | null;
  searchRadius: number;
  isLocationPermissionGranted: boolean;
}

export const useMapStore = defineStore("map", {
  state: (): MapState => ({
    userLocation: null,
    searchRadius: 10, // in kilometers
    isLocationPermissionGranted: false,
  }),

  actions: {
    setUserLocation(location: Location) {
      this.userLocation = location;
    },

    setSearchRadius(radius: number) {
      this.searchRadius = radius;
    },

    setLocationPermission(granted: boolean) {
      this.isLocationPermissionGranted = granted;
    },

    async requestLocationPermission() {
      try {
        const result = await navigator.permissions.query({
          name: "geolocation",
        });
        this.isLocationPermissionGranted = result.state === "granted";
        return this.isLocationPermissionGranted;
      } catch (error) {
        console.error("Error requesting location permission:", error);
        return false;
      }
    },
  },

  getters: {
    hasLocation: (state) => !!state.userLocation,
  },
});
