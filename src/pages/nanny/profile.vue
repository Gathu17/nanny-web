<template>
  <NuxtLayout name="nanny-layout">
  <div class="min-h-screen bg-pink-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      <div class="bg-pink-600 p-4 text-white">
        <h1 class="text-2xl font-bold text-center">My Profile</h1>
      </div>

      <div class="p-6">
        <!-- Profile Picture Section -->
        <div class="flex flex-col items-center mb-8">
          <div class="relative w-32 h-32 mb-4">
            <img
              :src="
                nanny.profilePic ||
                'https://via.placeholder.com/128?text=Upload+Photo'
              "
              alt="Profile Picture"
              class="w-full h-full object-cover rounded-full border-4 border-pink-200"
            />
            <label
              for="profile-pic"
              class="absolute bottom-0 right-0 bg-white hover:bg-gray-100 text-white p-2 rounded-full cursor-pointer shadow-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#EC4899"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </label>
            <input
              type="file"
              id="profile-pic"
              @change="onFileChange"
              class="hidden"
              accept="image/*"
            />
          </div>
          <p class="text-sm text-gray-500">
            Click the camera icon to update your photo
          </p>
        </div>

        <form @submit.prevent="updateProfile" class="space-y-6">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700"
              >Full Name</label
            >
            <input
              type="text"
              id="name"
              v-model="nanny.name"
              required
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-pink-500 focus:border-pink-500"
            />
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-gray-700"
              >Email Address</label
            >
            <input
              type="email"
              id="email"
              v-model="nanny.email"
              required
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-pink-500 focus:border-pink-500"
            />
          </div>

          <div>
            <label for="phone" class="block text-sm font-medium text-gray-700"
              >Phone Number</label
            >
            <input
              type="tel"
              id="phone"
              v-model="nanny.phone"
              required
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-pink-500 focus:border-pink-500"
            />
          </div>

          <div>
            <label for="bio" class="block text-sm font-medium text-gray-700"
              >About Me</label
            >
            <textarea
              id="bio"
              v-model="nanny.bio"
              rows="4"
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-pink-500 focus:border-pink-500"
              placeholder="Tell families about yourself, your experience, and your childcare philosophy..."
            ></textarea>
          </div>

          <div>
            <label
              for="experience"
              class="block text-sm font-medium text-gray-700"
              >Years of Experience</label
            >
            <input
              type="number"
              id="experience"
              v-model="nanny.experience"
              min="0"
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-pink-500 focus:border-pink-500"
            />
          </div>

          <div class="flex justify-end">
            <button
              type="submit"
              class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition duration-150 ease-in-out"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  </NuxtLayout>
</template>

<script>
export default {
  data() {
    return {
      nanny: {
        name: "",
        email: "",
        phone: "",
        profilePic: null,
        bio: "",
        experience: 0,
      },
    };
  },
  methods: {
    updateProfile() {
      // Logic to update the profile
      console.log("Profile updated:", this.nanny);
      // Show success message
      alert("Profile updated successfully!");
    },
    onFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.nanny.profilePic = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
  },
};
</script>

<style scoped>
.profile-page {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input[type="text"],
input[type="email"],
input[type="tel"],
input[type="file"] {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

button {
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
