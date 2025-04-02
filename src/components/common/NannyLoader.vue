<template>
  <div class="loader-container" :class="{ 'full-page': fullPage }">
    <div class="loader">
      <div class="cradle">
        <div class="baby"></div>
      </div>
      <div class="rattle">
        <div class="rattle-handle"></div>
        <div class="rattle-head"></div>
      </div>
      <p v-if="message" class="loader-message">{{ message }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  message: {
    type: String,
    default: "Loading...",
  },
  fullPage: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped>
.loader-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}

.full-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.9);
  z-index: 50;
}

.loader {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.cradle {
  width: 80px;
  height: 40px;
  background: #f8bbd0;
  border-radius: 50% 50% 0 0;
  position: relative;
  animation: rock 2s ease-in-out infinite;
  transform-origin: center bottom;
}

.baby {
  position: absolute;
  width: 30px;
  height: 30px;
  background: #ffcdd2;
  border-radius: 50%;
  top: -5px;
  left: 25px;
  animation: bounce 2s ease-in-out infinite;
}

.rattle {
  position: relative;
  animation: shake 0.5s ease-in-out infinite alternate;
}

.rattle-handle {
  width: 8px;
  height: 40px;
  background: #ec407a;
  border-radius: 4px;
}

.rattle-head {
  position: absolute;
  top: -15px;
  left: -11px;
  width: 30px;
  height: 30px;
  background: #f48fb1;
  border-radius: 50%;
  border: 4px dotted #ec407a;
}

.loader-message {
  font-size: 1rem;
  color: #ec407a;
  font-weight: 500;
  margin-top: 0.5rem;
}

@keyframes rock {
  0%,
  100% {
    transform: rotate(-10deg);
  }
  50% {
    transform: rotate(10deg);
  }
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes shake {
  0% {
    transform: rotate(-5deg);
  }
  100% {
    transform: rotate(5deg);
  }
}
</style>
