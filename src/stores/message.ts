import { defineStore } from "pinia";
import { chatApi, type Chat, type Message } from "@/api/chat";

// Removed local Message and Chat type definitions to avoid conflicts

interface MessageState {
  messages: Message[];
  chats: Chat[];
  loading: boolean;
  loadingChats: boolean;
  error: string | null;
  chatsError: string | null;
}

export const useMessageStore = defineStore("message", {
  state: (): MessageState => ({
    messages: [],
    chats: [],
    loading: false,
    loadingChats: false,
    error: null,
    chatsError: null,
  }),
  actions: {
    async fetchMessages(chatId: string) {
      this.loading = true;
      this.error = null;
      try {
        const res = await chatApi.getMessages(chatId);
        this.messages = res.messages;
      } catch (error: any) {
        this.error = error.response?.data?.message || "Failed to load messages";
      } finally {
        this.loading = false;
      }
    },
    async sendMessage(chatId: string, message: string) {
      this.loading = true;
      this.error = null;
      try {
        await chatApi.sendMessage(chatId, message);
        // Optionally, refetch messages after sending
        await this.fetchMessages(chatId);
      } catch (error: any) {
        this.error = error.response?.data?.message || "Failed to send message";
      } finally {
        this.loading = false;
      }
    },
    async fetchChats() {
      this.loadingChats = true;
      this.chatsError = null;
      try {
        const res = await chatApi.getChats();
        const formattedChats = []
        res.chats.map((chat) => {
            formattedChats.push({
                id: chat.id,
                name: chat.parent.name,
                avatar: "",
                lastMessage: chat.messages[chat.messages.length - 1].content,
                lastMessageTime: chat.messages[chat.messages.length - 1].createdAt,
                unread: chat.messages[chat.messages.length - 1].read_status,
                messages: chat.messages.map((message) => ({
                    sender: message.sender.userType,
                    text: message.content,
                    time: message.createdAt
                }))
            })
        })
        console.log(formattedChats)
        this.chats = formattedChats;
      } catch (error: any) {
        this.chatsError =
          error.response?.data?.message || "Failed to load chats";
      } finally {
        this.loadingChats = false;
      }
    },
    clearMessages() {
      this.messages = [];
    },
    clearChats() {
      this.chats = [];
    },
    clearError() {
      this.error = null;
      this.chatsError = null;
    },
  },
});
