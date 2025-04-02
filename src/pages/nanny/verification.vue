<template>
  <div
    class="min-h-screen w-full bg-gradient-to-br from-pink/10 to-purple/10 flex items-center justify-center"
  >
    <div class="w-[90vw] md:w-[600px] bg-white rounded-lg shadow-lg p-8">
      <div v-if="isLoading" class="flex justify-center items-center h-full w-full bg-white z-10">
        <NannyLoader />
      </div>
      <div v-else>
        <div class="text-center mb-8">
          <h2 class="text-2xl font-bold text-gray-800">Identity Verification</h2>
          <p class="text-gray-600 mt-2">
          Complete verification to start finding jobs
        </p>
      </div>

      <div class="space-y-6">
        <div class="bg-blue-50 rounded-lg p-6">
          <h3 class="font-semibold text-blue-900 mb-4">What you'll need:</h3>
          <ul class="space-y-3">
            <li class="flex items-center text-blue-800">
              <span class="bg-blue-200 p-2 rounded-full mr-3">
                <font-awesome-icon :icon="['fas', 'id-card']" />
              </span>
              Valid Government ID (Passport, Driver's License or National ID)
            </li>
            <li class="flex items-center text-blue-800">
              <span class="bg-blue-200 p-2 rounded-full mr-3">
                <font-awesome-icon :icon="['fas', 'mobile']" />
              </span>
              Smartphone with camera for ID scan and selfie
            </li>
            <li class="flex items-center text-blue-800">
              <span class="bg-blue-200 p-2 rounded-full mr-3">
                <font-awesome-icon :icon="['fas', 'clock']" />
              </span>
              About 5 minutes of your time
            </li>
          </ul>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="bg-gray-50 p-4 rounded-lg text-center">
            <div
              class="bg-gray-200 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
            >
              <span class="text-gray-600">1</span>
            </div>
            <h4 class="font-medium">Upload ID</h4>
            <p class="text-sm text-gray-500">Front and back photos</p>
          </div>
          <div class="bg-gray-50 p-4 rounded-lg text-center">
            <div
              class="bg-gray-200 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
            >
              <span class="text-gray-600">2</span>
            </div>
            <h4 class="font-medium">Take Selfie</h4>
            <p class="text-sm text-gray-500">For face matching</p>
          </div>
          <div class="bg-gray-50 p-4 rounded-lg text-center">
            <div
              class="bg-gray-200 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
            >
              <span class="text-gray-600">3</span>
            </div>
            <h4 class="font-medium">Verify</h4>
            <p class="text-sm text-gray-500">Quick review process</p>
          </div>
        </div>

        <button
          class="w-full bg-pink hover:bg-pink/80 text-white py-3 rounded-lg font-medium transition-colors"
          @click="showCamera = true"
        >
          Start Verification
        </button>

        <p class="text-center text-sm text-gray-500">
          Your data is encrypted and securely stored following industry
          standards
        </p>
      </div>
    </div>

    <!-- Camera Modal -->
    <div
      v-if="showCamera"
      class="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-lg shadow-xl w-[90vw] max-w-lg p-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-bold text-gray-800">
            Take a photo of your ID
          </h3>
          <button
            @click="closeCamera"
            class="text-gray-500 hover:text-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div
          class="relative bg-black rounded-lg overflow-hidden mb-4 aspect-video"
        >
          <video
            ref="videoRef"
            autoplay
            playsinline
            class="w-full h-full object-cover"
          ></video>

          <div
            v-if="!stream"
            class="absolute inset-0 flex items-center justify-center"
          >
            <div class="text-white text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-12 w-12 mx-auto mb-2 animate-pulse"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
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
              <p>Loading camera...</p>
            </div>
          </div>
        </div>

        <div class="flex gap-4">
          <button
            @click="capturePhoto"
            class="flex-1 bg-pink hover:bg-pink/80 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
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
            Capture Photo
          </button>
          <button
            @click="closeCamera"
            class="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from "vue";
import NannyLoader from "~/components/common/NannyLoader.vue";

const videoRef = ref<HTMLVideoElement | null>(null);
const stream = ref<MediaStream | null>(null);
const showCamera = ref<boolean>(false);
const capturedImage = ref<string | null>(null);
const canvasRef = ref<HTMLCanvasElement | null>(null);
const cameraError = ref<string | null>(null);
const isLoading = ref<boolean>(false);
const router = useRouter();


async function openCamera(): Promise<void> {
  try {
    const mediaStream = await navigator.mediaDevices.getUserMedia({
      video: true, // Simplified video constraints
      audio: false,
    });
    stream.value = mediaStream;

    if (videoRef.value) {
      videoRef.value.srcObject = mediaStream;
      await videoRef.value.play(); // Ensure video starts playing
    }
    showCamera.value = true;
  } catch (error) {
    console.error("Error accessing camera:", error);
  }
}

function closeCamera(): void {
  stopCamera();
  showCamera.value = false;
}

function stopCamera(): void {
  if (stream.value) {
    stream.value.getTracks().forEach((track) => track.stop());
    stream.value = null;
  }
  if (videoRef.value) {
    videoRef.value.srcObject = null;
  }
}

function capturePhoto(): void {
  isLoading.value = true;
  showCamera.value = false;
  setTimeout(() => {
    router.push('/nanny/dashboard');
  }, 2000);
  if (!videoRef.value || !stream.value) return;

  // Create a canvas element
  const canvas = document.createElement("canvas");
  canvas.width = videoRef.value.videoWidth;
  canvas.height = videoRef.value.videoHeight;

  // Draw the current video frame to the canvas
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.drawImage(videoRef.value, 0, 0, canvas.width, canvas.height);

    // Convert canvas to data URL
    capturedImage.value = canvas.toDataURL("image/jpeg");

    // Here you would typically upload the image or process it further
    console.log("Photo captured!");

    // Close camera after capturing
    closeCamera();
  }
}

// Watch for showCamera changes to open camera when modal is shown
watch(showCamera, (newValue) => {
  if (newValue) {
    openCamera();
  }
});

// Clean up on component unmount
onUnmounted(() => {
  stopCamera();
});
</script>
