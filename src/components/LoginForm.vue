<template>
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-300 to-purple-600 p-4">
      <div class="bg-white rounded-xl shadow-2xl w-full max-w-md p-8 transform transition-all duration-300 hover:scale-[1.02]">
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
          <p class="text-gray-600">Please sign in to continue</p>
        </div>
  
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div class="space-y-2">
            <label class="text-sm font-medium text-gray-700 block">Email</label>
            <div class="relative">
              <input 
                v-model="state.email"
                type="email"
                class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
                :class="{ 'border-red-500': emailError }"
                placeholder="Enter your email"
                required
              >
            </div>
            <p v-if="emailError" class="text-red-500 text-sm mt-1">{{ emailError }}</p>
          </div>
  
          <div class="space-y-2">
            <label class="text-sm font-medium text-gray-700 block">Password</label>
            <div class="relative">
              <input 
                v-model="state.password"
                :type="showPassword ? 'text' : 'password'"
                class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
                :class="{ 'border-red-500': passwordError }"
                placeholder="Enter your password"
                required
              >
              <button 
                @click.prevent="showPassword = !showPassword"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {{ showPassword ? '🙈' : '👁️' }}
              </button>
            </div>
            <p v-if="passwordError" class="text-red-500 text-sm mt-1">{{ passwordError }}</p>
          </div>
  
          <div class="flex items-center justify-between">
            <label class="flex items-center">
              <input type="checkbox" v-model="state.rememberMe" class="rounded text-blue-500 focus:ring-blue-500">
              <span class="ml-2 text-sm text-gray-600">Remember me</span>
            </label>
            <a href="#" class="text-sm text-blue-500 hover:text-blue-600 transition-colors">Forgot password?</a>
          </div>
  
          <button 
            type="submit"
            :disabled="loading"
            class="w-full bg-pink/80 text-white py-3 rounded-lg hover:bg-pink focus:ring-4 focus:ring-blue-200 transition-all duration-200 relative overflow-hidden"
          >
            <span :class="{ 'opacity-0': loading }">Sign In</span>
            <div v-if="loading" class="absolute inset-0 flex items-center justify-center">
              <div class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          </button>
        </form>
  
        <div class="mt-6 text-center">
          <p class="text-gray-600">
            Don't have an account? 
            <a href="/auth/signup" class="text-blue-500 hover:text-blue-600 transition-colors">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  </template>
  
<script setup lang="ts">
import { ref, reactive , computed, watch} from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

    export interface LoginInput {
        email: string
        password: string
        rememberMe: boolean
    }
    const state = reactive<LoginInput>({
        email: '',
        password: '',
        rememberMe: false
    })
    const emailError = ref<string>('')
    const passwordError = ref<string>('')
    const showPassword = ref<boolean>(false)
    const loading = ref<boolean>(false)
    const router = useRouter()
    const authStore = useAuthStore()
    onMounted(() => {
      
    })
    // 
    
      const validateEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        // if (!this.email) {
        //   this.emailError = 'Email is required'
        //   return false
        // }
        // if (!emailRegex.test(this.email)) {
        //   this.emailError = 'Please enter a valid email'
        //   return false
        // }
        // this.emailError = ''
        // return true
      }
      const validatePassword = () => {
        // if (!this.password) {
        //   this.passwordError = 'Password is required'
        //   return false
        // }
        // if (this.password.length < 6) {
        //   this.passwordError = 'Password must be at least 6 characters'
        //   return false
        // }
        // this.passwordError = ''
        // return true
      }
      async function handleSubmit() {
        authStore.login(state).then(() => {
          if (authStore.isClient) {
            router.push('/client/dashboard')
          } else if (authStore.isNanny) {
            router.push('/nanny/dashboard')
          }
        })
        // if(state.email === 'admin@gmail.com' && state.password === 'admin'){
        //     router.push('/client/dashboard')
        // }else{
        //    router.push('/nanny/dashboard')
        // }
        // const isEmailValid = this.validateEmail()
        // const isPasswordValid = this.validatePassword()
  
        // if (!isEmailValid || !isPasswordValid) {
        //   return
        // }
  
        // this.loading = true
        
        // // Simulate API call
        // try {
        //   await new Promise(resolve => setTimeout(resolve, 1500))
        //   // Handle successful login here
        //   console.log('Login successful')
        // } catch (error) {
        //   console.error('Login failed:', error)
        // } finally {
        //   this.loading = false
        // }
      }
  </script>