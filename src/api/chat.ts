import { api } from "@/utils/request";
import {type User} from "@/api/auth"

// Message type
export interface Message {
  id: string;
  senderId: string;
  content: string;
  read_status: boolean;
  createdAt: string;
  sender: User
}

// Chat type
export interface Chat {
  id: string;
  parent: {
    id: string;
    name: string;
    avatar?: string;
  };
  nanny: {
    id: string;
    name: string;
    avatar?: string;
  };
  messages: Message[],
  date: string;
  status: string;
}

export const chatApi = {
  // Fetch all chats
  async getChats(): Promise<{ chats: Chat[] }> {
    return api.get("/chats");
  },

  // Fetch messages for a chat
  async getMessages(chatId: string): Promise<{ messages: Message[] }> {
    return api.get(`/chats/${chatId}/messages`);
  },

  // Send a message in a chat
  async sendMessage(
    chatId: string,
    message: string
  ): Promise<{ message: string }> {
    return api.post(`/chats/${chatId}/messages`, { message });
  },
};
