import { api } from './client'

export interface ChatUser { id: string; full_name: string; avatar_url?: string; email: string }
export interface Conversation {
  id: string
  participants: ChatUser[]
  last_message?: string
  last_message_at?: string
  unread_count: number
}
export interface Message {
  id: string
  conversation_id: string
  sender_id: string
  sender?: ChatUser
  content: string
  message_type: 'text' | 'media'
  file_url?: string
  created_at: string
  is_read: boolean
}

export const chatApi = {
  searchUsers: (query: string) => api.get<ChatUser[]>(`/chat/users/search?query=${encodeURIComponent(query)}`),
  listConversations: () => api.get<Conversation[]>('/chat/conversations'),
  createConversation: (participantId: string) => api.post<Conversation>('/chat/conversations', { participant_id: participantId }),
  getMessages: (conversationId: string) => api.get<Message[]>(`/chat/conversations/${conversationId}/messages`),
  sendMessage: (conversationId: string, content: string) => api.post<Message>('/chat/messages', { conversation_id: conversationId, content, message_type: 'text' }),
  markRead: (conversationId: string) => api.post(`/chat/conversations/${conversationId}/mark-read`, {}),
  unreadCount: () => api.get<{ count: number }>('/chat/unread-count'),
}
