<template>
  <footer class="bg-gradient-to-r from-[#FF6B6B] to-[#FF8E8E] text-white py-12">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
        <!-- Logo and Description -->
        <div class="footer-brand">
          <h3 class="text-2xl font-bold mb-4">Nanny App</h3>
          <p class="text-white/80 text-sm leading-relaxed">
            Your trusted platform to find reliable nannies for your kids. We
            connect families with verified caregivers across Kenya.
          </p>
        </div>

        <!-- Quick Links -->
        <div class="footer-links">
          <h4 class="text-xl font-bold mb-6">Quick Links</h4>
          <ul class="space-y-3">
            <li>
              <a
                href="/about"
                class="text-white/80 hover:text-white transition-colors duration-300 flex items-center"
              >
                <font-awesome-icon
                  :icon="['fas', 'chevron-right']"
                  class="w-3 h-3 mr-2"
                />
                About Us
              </a>
            </li>
            <li>
              <a
                href="/contact"
                class="text-white/80 hover:text-white transition-colors duration-300 flex items-center"
              >
                <font-awesome-icon
                  :icon="['fas', 'chevron-right']"
                  class="w-3 h-3 mr-2"
                />
                Contact Us
              </a>
            </li>
            <li>
              <a
                href="/terms"
                class="text-white/80 hover:text-white transition-colors duration-300 flex items-center"
              >
                <font-awesome-icon
                  :icon="['fas', 'chevron-right']"
                  class="w-3 h-3 mr-2"
                />
                Terms & Conditions
              </a>
            </li>
            <li>
              <a
                href="/privacy"
                class="text-white/80 hover:text-white transition-colors duration-300 flex items-center"
              >
                <font-awesome-icon
                  :icon="['fas', 'chevron-right']"
                  class="w-3 h-3 mr-2"
                />
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        <!-- Social Media Links -->
        <div class="footer-social">
          <h4 class="text-xl font-bold mb-6">Follow Us</h4>
          <div class="flex space-x-6">
            <a
              href="https://facebook.com"
              class="text-white/80 hover:text-white transition-colors duration-300 transform hover:scale-110"
            >
              <font-awesome-icon :icon="['fab', 'facebook']" class="w-8 h-8" />
            </a>
            <a
              href="https://twitter.com"
              class="text-white/80 hover:text-white transition-colors duration-300 transform hover:scale-110"
            >
              <font-awesome-icon :icon="['fab', 'twitter']" class="w-8 h-8" />
            </a>
            <a
              href="https://instagram.com"
              class="text-white/80 hover:text-white transition-colors duration-300 transform hover:scale-110"
            >
              <font-awesome-icon :icon="['fab', 'instagram']" class="w-8 h-8" />
            </a>
          </div>
        </div>
      </div>

      <!-- Copyright -->
      <div
        class="mt-12 pt-8 border-t border-white/20 text-center text-white/80"
      >
        <p>&copy; 2024 Nanny App. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.container {
  max-width: 1280px;
  margin: 0 auto;
}
</style>
