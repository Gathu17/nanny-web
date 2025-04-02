<template>
  <NuxtLayout name="client-layout">
    <div class="bg-pink-50 min-h-screen p-4 sm:p-6 lg:p-8">
      <div
        class="max-w-7xl mx-auto bg-white rounded-xl shadow-md overflow-hidden"
      >
        <div class="bg-pink p-4 text-white">
          <h1 class="text-2xl font-bold">Messages</h1>
        </div>

        <div class="flex h-[calc(100vh-12rem)]">
          <!-- Conversation List -->
          <div class="w-1/3 border-r border-gray-200 overflow-y-auto">
            <div class="p-4 border-b border-gray-200">
              <div class="relative">
                <input
                  type="text"
                  placeholder="Search conversations..."
                  v-model="searchQuery"
                  class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink focus:border-pink"
                />
                <div class="absolute left-3 top-2.5 text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <div
                v-for="conversation in filteredConversations"
                :key="conversation.id"
                @click="selectConversation(conversation)"
                class="p-4 border-b border-gray-200 hover:bg-pink-50 cursor-pointer transition-colors duration-150"
                :class="{
                  'bg-pink-100':
                    selectedConversation &&
                    selectedConversation.id === conversation.id,
                }"
              >
                <div class="flex items-center space-x-3">
                  <div class="relative">
                    <img
                      :src="conversation.avatar"
                      alt="Nanny profile"
                      class="w-12 h-12 rounded-full object-cover"
                    />
                    <div
                      v-if="conversation.online"
                      class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"
                    ></div>
                  </div>
                  <div class="flex-1 min-w-0">
                    <div class="flex justify-between">
                      <h3 class="text-sm font-medium text-gray-900 truncate">
                        {{ conversation.name }}
                      </h3>
                      <span class="text-xs text-gray-500">{{
                        formatTime(conversation.lastMessageTime)
                      }}</span>
                    </div>
                    <p class="text-sm text-gray-500 truncate">
                      {{ conversation.lastMessage }}
                    </p>
                  </div>
                  <div
                    v-if="conversation.unread"
                    class="w-2 h-2 bg-pink rounded-full"
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Chat Area -->
          <div class="flex-1 flex flex-col">
            <div v-if="selectedConversation" class="flex-1 flex flex-col">
              <!-- Chat Header -->
              <div
                class="p-4 border-b border-gray-200 flex items-center justify-between"
              >
                <div class="flex items-center space-x-3">
                  <div class="relative">
                    <img
                      :src="selectedConversation.avatar"
                      alt="Nanny profile"
                      class="w-10 h-10 rounded-full object-cover"
                    />
                    <div
                      v-if="selectedConversation.online"
                      class="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"
                    ></div>
                  </div>
                  <div>
                    <h3 class="text-sm font-medium text-gray-900">
                      {{ selectedConversation.name }}
                    </h3>
                    <p class="text-xs text-gray-500">
                      {{
                        selectedConversation.online
                          ? "Online"
                          : "Last seen " +
                            formatTime(selectedConversation.lastSeen)
                      }}
                    </p>
                  </div>
                </div>
                <div class="flex items-center space-x-2">
                  <button
                    class="p-2 rounded-full hover:bg-gray-100 text-gray-500"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </button>
                  <button
                    class="p-2 rounded-full hover:bg-gray-100 text-gray-500"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <!-- Messages -->
              <div ref="messagesContainer" class="flex-1 p-4 overflow-y-auto">
                <div
                  v-for="(message, index) in selectedConversation.messages"
                  :key="index"
                  class="mb-4"
                >
                  <div
                    class="flex"
                    :class="{ 'justify-end': message.sender === 'client' }"
                  >
                    <div
                      class="max-w-xs md:max-w-md lg:max-w-lg rounded-lg px-4 py-2 break-words"
                      :class="
                        message.sender === 'client'
                          ? 'bg-pink text-white rounded-br-none'
                          : 'bg-gray-100 text-gray-800 rounded-bl-none'
                      "
                    >
                      <p>{{ message.text }}</p>
                      <p
                        class="text-xs mt-1 text-right"
                        :class="
                          message.sender === 'client'
                            ? 'text-pink-100'
                            : 'text-gray-500'
                        "
                      >
                        {{ formatMessageTime(message.time) }}
                      </p>
                    </div>
                  </div>
                </div>
                <div v-if="isTyping" class="flex mb-4">
                  <div
                    class="bg-gray-100 text-gray-800 rounded-lg rounded-bl-none px-4 py-2"
                  >
                    <div class="flex space-x-1">
                      <div
                        class="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                      ></div>
                      <div
                        class="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                        style="animation-delay: 0.2s"
                      ></div>
                      <div
                        class="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                        style="animation-delay: 0.4s"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Message Input -->
              <div class="p-4 border-t border-gray-200">
                <div class="flex items-end space-x-2">
                  <button
                    class="p-2 rounded-full hover:bg-gray-100 text-gray-500"
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
                        d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                      />
                    </svg>
                  </button>
                  <div class="flex-1 relative">
                    <textarea
                      v-model="newMessage"
                      @keydown.enter.prevent="sendMessage"
                      placeholder="Type a message..."
                      class="w-full border border-gray-300 rounded-lg pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-pink focus:border-pink resize-none"
                      rows="1"
                    ></textarea>
                    <button
                      class="absolute right-2 bottom-2 p-1 rounded-full hover:bg-gray-100 text-gray-500"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </button>
                  </div>
                  <button
                    @click="sendMessage"
                    :disabled="!newMessage.trim()"
                    class="p-2 rounded-full bg-pink text-white disabled:opacity-50 disabled:cursor-not-allowed"
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
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <!-- No Conversation Selected -->
            <div
              v-if="!selectedConversation"
              class="flex-1 flex items-center justify-center bg-gray-50"
            >
              <div class="text-center p-6">
                <div
                  class="mx-auto w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-8 w-8 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    />
                  </svg>
                </div>
                <h3 class="mt-4 text-lg font-medium text-gray-900">
                  Your Messages
                </h3>
                <p class="mt-2 text-gray-500">
                  Select a conversation to start chatting
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: "",
      selectedConversation: null,
      newMessage: "",
      isTyping: false,
      conversations: [
        {
          id: 1,
          name: "Emma Johnson",
          avatar: "https://randomuser.me/api/portraits/women/32.jpg",
          lastMessage: "I'm available this weekend if you still need a sitter!",
          lastMessageTime: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
          unread: true,
          online: true,
          lastSeen: null,
          messages: [
            {
              sender: "nanny",
              text: "Hi there! I saw your job posting for a weekend babysitter. I'd love to help out!",
              time: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
            },
            {
              sender: "client",
              text: "Hi Emma! Thanks for reaching out. We're looking for someone this Saturday from 6-10pm. Would you be available?",
              time: new Date(Date.now() - 23 * 60 * 60 * 1000),
            },
            {
              sender: "nanny",
              text: "Yes, I'm free on Saturday evening. I'd be happy to help out with your children. How old are they?",
              time: new Date(Date.now() - 22 * 60 * 60 * 1000),
            },
            {
              sender: "client",
              text: "Great! We have two kids - Emma is 5 and Noah is 3. They're pretty easy-going and usually in bed by 8pm.",
              time: new Date(Date.now() - 20 * 60 * 60 * 1000),
            },
            {
              sender: "nanny",
              text: "I'm available this weekend if you still need a sitter!",
              time: new Date(Date.now() - 15 * 60 * 1000),
            },
          ],
        },
        {
          id: 2,
          name: "Sophia Martinez",
          avatar: "https://randomuser.me/api/portraits/women/44.jpg",
          lastMessage:
            "The kids had a great time today! We made cookies and finished the science project.",
          lastMessageTime: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
          unread: false,
          online: false,
          lastSeen: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
          messages: [
            {
              sender: "nanny",
              text: "Good morning! Just confirming our appointment for today at 2pm.",
              time: new Date(Date.now() - 8 * 60 * 60 * 1000),
            },
            {
              sender: "client",
              text: "Good morning Sophia! Yes, 2pm works perfectly. The kids are excited to see you again.",
              time: new Date(Date.now() - 7.5 * 60 * 60 * 1000),
            },
            {
              sender: "nanny",
              text: "Great! I've planned some fun activities for them. See you soon!",
              time: new Date(Date.now() - 7 * 60 * 60 * 1000),
            },
            {
              sender: "nanny",
              text: "The kids had a great time today! We made cookies and finished the science project.",
              time: new Date(Date.now() - 3 * 60 * 60 * 1000),
            },
          ],
        },
        {
          id: 3,
          name: "Michael Wilson",
          avatar: "https://randomuser.me/api/portraits/men/32.jpg",
          lastMessage: "I can start next Monday. Would 9am work for you?",
          lastMessageTime: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
          unread: false,
          online: true,
          lastSeen: null,
          messages: [
            {
              sender: "client",
              text: "Hi Michael, I'm interested in hiring you for regular weekday care for my son. Are you available for full-time work?",
              time: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
            },
            {
              sender: "nanny",
              text: "Hello! Yes, I'm currently looking for a full-time position. I'd be happy to discuss details about your needs.",
              time: new Date(Date.now() - 2.5 * 24 * 60 * 60 * 1000),
            },
            {
              sender: "client",
              text: "Great! We need someone Monday through Friday, 9am-5pm. When would you be able to start?",
              time: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
            },
            {
              sender: "nanny",
              text: "I can start next Monday. Would 9am work for you?",
              time: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
            },
          ],
        },
        {
          id: 4,
          name: "Olivia Taylor",
          avatar: "https://randomuser.me/api/portraits/women/67.jpg",
          lastMessage:
            "Thank you for the opportunity, but I've accepted another position. Best of luck finding a great nanny!",
          lastMessageTime: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
          unread: false,
          online: false,
          lastSeen: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
          messages: [
            {
              sender: "client",
              text: "Hi Olivia, I saw your profile and I'm impressed with your experience with infants. We have a 6-month-old and are looking for part-time help.",
              time: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
            },
            {
              sender: "nanny",
              text: "Thank you for reaching out! I love working with infants. Could you tell me more about the schedule you're looking for?",
              time: new Date(Date.now() - 6.5 * 24 * 60 * 60 * 1000),
            },
            {
              sender: "client",
              text: "We're looking for help on Tuesdays and Thursdays, from 10am to 4pm. Would that work with your schedule?",
              time: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
            },
            {
              sender: "nanny",
              text: "Thank you for the opportunity, but I've accepted another position. Best of luck finding a great nanny!",
              time: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
            },
          ],
        },
      ],
    };
  },
  computed: {
    filteredConversations() {
      if (!this.searchQuery) return this.conversations;

      const query = this.searchQuery.toLowerCase();
      return this.conversations.filter(
        (conversation) =>
          conversation.name.toLowerCase().includes(query) ||
          conversation.lastMessage.toLowerCase().includes(query)
      );
    },
  },
  methods: {
    selectConversation(conversation) {
      this.selectedConversation = conversation;

      // Mark as read when selected
      if (conversation.unread) {
        conversation.unread = false;
      }

      // Scroll to bottom of messages
      this.$nextTick(() => {
        this.scrollToBottom();
      });
    },
    sendMessage() {
      if (!this.newMessage.trim() || !this.selectedConversation) return;

      // Add message to conversation
      this.selectedConversation.messages.push({
        sender: "client",
        text: this.newMessage,
        time: new Date(),
      });

      // Update last message
      this.selectedConversation.lastMessage = this.newMessage;
      this.selectedConversation.lastMessageTime = new Date();

      // Clear input
      this.newMessage = "";

      // Scroll to bottom
      this.$nextTick(() => {
        this.scrollToBottom();
      });

      // Simulate nanny typing and response
      this.simulateResponse();
    },
    simulateResponse() {
      // Show typing indicator
      this.isTyping = true;

      // Random response time between 1-3 seconds
      const responseTime = Math.floor(Math.random() * 2000) + 1000;

      setTimeout(() => {
        this.isTyping = false;

        // Only respond if conversation is still selected
        if (this.selectedConversation) {
          const responses = [
            "That sounds great!",
            "I'll be available then.",
            "Perfect, looking forward to it!",
            "I can definitely help with that.",
            "Let me check my schedule and get back to you soon.",
          ];

          const randomResponse =
            responses[Math.floor(Math.random() * responses.length)];

          // Add response
          this.selectedConversation.messages.push({
            sender: "nanny",
            text: randomResponse,
            time: new Date(),
          });

          // Update last message
          this.selectedConversation.lastMessage = randomResponse;
          this.selectedConversation.lastMessageTime = new Date();

          // Scroll to bottom
          this.$nextTick(() => {
            this.scrollToBottom();
          });
        }
      }, responseTime);
    },
    scrollToBottom() {
      if (this.$refs.messagesContainer) {
        this.$refs.messagesContainer.scrollTop =
          this.$refs.messagesContainer.scrollHeight;
      }
    },
    formatMessageTime(date) {
      if (!date) return "";

      const hours = date.getHours();
      const minutes = date.getMinutes();
      return `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}`;
    },
    formatTime(date) {
      if (!date) return "";

      const now = new Date();
      const diff = now - date;

      // Less than a minute
      if (diff < 60 * 1000) {
        return "Just now";
      }

      // Less than an hour
      if (diff < 60 * 60 * 1000) {
        const minutes = Math.floor(diff / (60 * 1000));
        return `${minutes}m ago`;
      }

      // Less than a day
      if (diff < 24 * 60 * 60 * 1000) {
        const hours = Math.floor(diff / (60 * 60 * 1000));
        return `${hours}h ago`;
      }

      // Less than a week
      if (diff < 7 * 24 * 60 * 60 * 1000) {
        const days = Math.floor(diff / (24 * 60 * 60 * 1000));
        return `${days}d ago`;
      }

      // Format as date
      return date.toLocaleDateString();
    },
  },
  mounted() {
    // Select the first conversation by default
    if (this.conversations.length > 0) {
      this.selectConversation(this.conversations[0]);
    }
  },
};
</script>
