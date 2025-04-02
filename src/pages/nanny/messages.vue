<template>
  <NuxtLayout name="nanny-layout">
    <div class="bg-pink-50 min-h-screen p-4 sm:p-6 lg:p-8">
      <div
        class="max-w-6xl mx-auto bg-white rounded-xl shadow-md overflow-hidden"
      >
        <div class="bg-pink-600 p-4 text-white">
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
                  class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
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
                      alt="Client Avatar"
                      class="w-12 h-12 rounded-full object-cover"
                    />
                    <div
                      v-if="conversation.unread"
                      class="absolute -top-1 -right-1 w-4 h-4 bg-pink-500 rounded-full border-2 border-white"
                    ></div>
                  </div>
                  <div class="flex-1 min-w-0">
                    <div class="flex justify-between items-baseline">
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
                </div>
              </div>
            </div>
          </div>

          <!-- Message Content -->
          <div class="w-2/3 flex flex-col">
            <div v-if="selectedConversation" class="flex-1 flex flex-col">
              <!-- Conversation Header -->
              <div
                class="p-4 border-b border-gray-200 flex items-center justify-between bg-gray-50"
              >
                <div class="flex items-center space-x-3">
                  <img
                    :src="selectedConversation.avatar"
                    alt="Client Avatar"
                    class="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h3 class="font-medium text-gray-900">
                      {{ selectedConversation.name }}
                    </h3>
                    <p class="text-xs text-gray-500">
                      {{
                        selectedConversation.isOnline
                          ? "Online"
                          : "Last seen " +
                            formatTime(selectedConversation.lastSeen)
                      }}
                    </p>
                  </div>
                </div>
                <div>
                  <button class="text-gray-500 hover:text-pink-600">
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
              <div class="flex-1 p-4 overflow-y-auto" ref="messagesContainer">
                <div
                  v-for="(message, index) in selectedConversation.messages"
                  :key="index"
                  class="mb-4"
                >
                  <div
                    class="flex"
                    :class="{ 'justify-end': message.sender === 'nanny' }"
                  >
                    <div
                      class="max-w-xs sm:max-w-md px-4 py-2 rounded-lg"
                      :class="{
                        'bg-pink-100 text-gray-800': message.sender === 'nanny',
                        'bg-gray-100 text-gray-800': message.sender !== 'nanny',
                      }"
                    >
                      <p>{{ message.text }}</p>
                      <p class="text-xs text-gray-500 text-right mt-1">
                        {{ formatTime(message.time) }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Message Input -->
              <div class="p-4 border-t border-gray-200">
                <form @submit.prevent="sendMessage" class="flex space-x-2">
                  <input
                    type="text"
                    v-model="newMessage"
                    placeholder="Type a message..."
                    class="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                  <button
                    type="submit"
                    class="bg-pink-600 text-white rounded-lg px-4 py-2 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 transition-colors duration-150"
                    :disabled="!newMessage.trim()"
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
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                  </button>
                </form>
              </div>
            </div>

            <!-- No Conversation Selected -->
            <div
              v-else
              class="flex-1 flex items-center justify-center bg-gray-50"
            >
              <div class="text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-16 w-16 mx-auto text-gray-400"
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
                <h3 class="mt-2 text-lg font-medium text-gray-900">
                  No conversation selected
                </h3>
                <p class="mt-1 text-sm text-gray-500">
                  Choose a conversation from the list to start messaging
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
      newMessage: "",
      selectedConversation: null,
      conversations: [
        {
          id: 1,
          name: "Sarah Johnson",
          avatar: "https://randomuser.me/api/portraits/women/12.jpg",
          lastMessage: "What time can you come on Friday?",
          lastMessageTime: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
          unread: true,
          isOnline: true,
          messages: [
            {
              sender: "client",
              text: "Hi there! I'm looking for a nanny for my 2-year-old son next week.",
              time: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
            },
            {
              sender: "nanny",
              text: "Hello! I'd be happy to help. What days and times are you looking for?",
              time: new Date(Date.now() - 1000 * 60 * 60 * 1.5), // 1.5 hours ago
            },
            {
              sender: "client",
              text: "I need someone on Monday, Wednesday, and Friday from 9am to 3pm.",
              time: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
            },
            {
              sender: "nanny",
              text: "That works for me! I'm available on those days.",
              time: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
            },
            {
              sender: "client",
              text: "Great! What time can you come on Friday?",
              time: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
            },
          ],
        },
        {
          id: 2,
          name: "Michael Thompson",
          avatar: "https://randomuser.me/api/portraits/men/32.jpg",
          lastMessage: "Thanks for taking care of Emma yesterday!",
          lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
          unread: false,
          isOnline: false,
          lastSeen: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
          messages: [
            {
              sender: "client",
              text: "Hi, are you available for an emergency booking tomorrow?",
              time: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
            },
            {
              sender: "nanny",
              text: "Yes, I can help out. What time do you need me?",
              time: new Date(Date.now() - 1000 * 60 * 60 * 23), // 23 hours ago
            },
            {
              sender: "client",
              text: "From 2pm to 6pm if possible. My daughter Emma is 4 years old.",
              time: new Date(Date.now() - 1000 * 60 * 60 * 22), // 22 hours ago
            },
            {
              sender: "nanny",
              text: "That works for me. I'll be there at 2pm sharp.",
              time: new Date(Date.now() - 1000 * 60 * 60 * 21), // 21 hours ago
            },
            {
              sender: "client",
              text: "Thanks for taking care of Emma yesterday!",
              time: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
            },
          ],
        },
        {
          id: 3,
          name: "Jennifer Davis",
          avatar: "https://randomuser.me/api/portraits/women/65.jpg",
          lastMessage: "Can we schedule a video call to discuss details?",
          lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
          unread: true,
          isOnline: true,
          messages: [
            {
              sender: "client",
              text: "Hello, I'm looking for a regular nanny for my twins.",
              time: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
            },
            {
              sender: "nanny",
              text: "Hi Jennifer! I have experience with twins. How old are they?",
              time: new Date(Date.now() - 1000 * 60 * 60 * 47), // 47 hours ago
            },
            {
              sender: "client",
              text: "They're 3 years old. We need someone 3 days a week.",
              time: new Date(Date.now() - 1000 * 60 * 60 * 36), // 36 hours ago
            },
            {
              sender: "nanny",
              text: "I can definitely help with that. Which days were you thinking?",
              time: new Date(Date.now() - 1000 * 60 * 60 * 24), // 24 hours ago
            },
            {
              sender: "client",
              text: "Can we schedule a video call to discuss details?",
              time: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
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
      if (conversation.unread) {
        conversation.unread = false;
      }
      this.$nextTick(() => {
        this.scrollToBottom();
      });
    },
    sendMessage() {
      if (!this.newMessage.trim() || !this.selectedConversation) return;

      const message = {
        sender: "nanny",
        text: this.newMessage,
        time: new Date(),
      };

      this.selectedConversation.messages.push(message);
      this.selectedConversation.lastMessage = this.newMessage;
      this.selectedConversation.lastMessageTime = new Date();
      this.newMessage = "";

      this.$nextTick(() => {
        this.scrollToBottom();
      });
    },
    scrollToBottom() {
      if (this.$refs.messagesContainer) {
        this.$refs.messagesContainer.scrollTop =
          this.$refs.messagesContainer.scrollHeight;
      }
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
