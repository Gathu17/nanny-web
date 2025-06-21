<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-300 to-purple-600 p-4">
    <div class="bg-white rounded-xl shadow-2xl w-full max-w-md p-8 transform transition-all duration-300 hover:scale-[1.02]">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">Welcome</h1>
        <p class="text-gray-600">Please sign up to continue</p>
      </div>

      <Form @submit="handleSubmit" v-slot="{ errors, isValidating }" :validation-schema="schema" class="space-y-6">
        <div class="space-y-2">
          <label class="text-sm font-medium text-gray-700 block">Name</label>
          <div class="relative">
            <Field
              name="name"
              type="text"
              v-slot="{ field, errorMessage }"
            >
              <input 
                v-bind="field"
                type="text"
                class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
                :class="{ 'border-red-500': errorMessage }"
                placeholder="Enter your name"
              >
              <span class="text-red-500 text-sm mt-1" v-if="errorMessage">{{ errorMessage }}</span>
            </Field>
          </div>
        </div>

        <div class="space-y-2">
          <label class="text-sm font-medium text-gray-700 block">Email</label>
          <div class="relative">
            <Field
              name="email"
              type="email"
              v-slot="{ field, errorMessage }"
            >
              <input 
                v-bind="field"
                type="email"
                class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
                :class="{ 'border-red-500': errorMessage }"
                placeholder="Enter your email"
              >
              <span class="text-red-500 text-sm mt-1" v-if="errorMessage">{{ errorMessage }}</span>
            </Field>
          </div>
        </div>

        <div class="space-y-2">
          <label class="text-sm font-medium text-gray-700 block">Password</label>
          <div class="relative">
            <Field
              name="password"
              v-slot="{ field, errorMessage }"
            >
              <input 
                v-bind="field"
                :type="showPassword ? 'text' : 'password'"
                class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
                :class="{ 'border-red-500': errorMessage }"
                placeholder="Enter your password"
              >
              <span class="text-red-500 text-sm mt-1" v-if="errorMessage">{{ errorMessage }}</span>
              <button 
                @click.prevent="showPassword = !showPassword"
                class="absolute right-3 top-[40%] transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {{ showPassword ? '🙈' : '👁️' }}
              </button>
            </Field>
          </div>
        </div>

        <div class="space-y-2">
          <label class="text-sm font-medium text-gray-700 block">Confirm Password</label>
          <div class="relative">
            <Field
              name="confirmPassword"
              v-slot="{ field, errorMessage }"
            >
              <input 
                v-bind="field"
                :type="showPassword ? 'text' : 'password'"
                class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
                :class="{ 'border-red-500': errorMessage }"
                placeholder="Confirm your password"
              >
              <span class="text-red-500 text-sm mt-1" v-if="errorMessage">{{ errorMessage }}</span>
            </Field>
          </div>
        </div>

        <div class="flex items-center justify-between">
          <label class="flex items-center">
            <Field
              name="rememberMe"
              type="checkbox"
              v-slot="{ field }"
            >
              <input 
                type="checkbox"
                v-bind="field"
                class="rounded text-blue-500 focus:ring-blue-500"
              >
            </Field>
            <span class="ml-2 text-sm text-gray-600">Remember me</span>
          </label>
        </div>

        <button 
          type="submit"
          class="w-full bg-pink text-white py-3 rounded-lg  focus:ring-4 focus:ring-blue-200 transition-all duration-200 relative overflow-hidden"
          :class="{ 'bg-green-500': isValidating }"
          >
          <span :class="{ 'opacity-0 text-green-700': isValidating }">Sign Up</span>

          <div v-if="isValidating" class="absolute inset-0 flex items-center justify-center">
            <div class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        </button>
      </Form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Form, Field } from 'vee-validate'
import * as yup from 'yup'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
// import { showToast } from '@/utils/toast'

const router = useRouter()
const route = useRoute()
const showPassword = ref(false)
const authStore = useAuthStore()

const userType = computed({
  get() {
    return route.query.role ?? ''
  },
  set(role) {
    router.replace({ query: { role } })
  }
})

const schema = yup.object({
  name: yup
    .string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must not exceed 50 characters'),
  
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email'),
  
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[^\w]/, 'Password must contain at least one symbol'),
  
  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password')], 'Passwords must match'),
  
  rememberMe: yup
    .boolean()
    .default(false)
})


async function handleSubmit(values: any) {
  const {confirmPassword, ...data} = values;
  
  data['userType'] = userType.value

  const result = await authStore.signup(data);
  if (result) {
    if(authStore.user.userType == "nanny"){
      navigateTo('/nanny/onboarding')
    } else {
      navigateTo('/client/dashboard')
    }
    } else {
      // Handle signup failure
      console.error('Signup failed:', authStore.error);
    }
  
}
  </script>
