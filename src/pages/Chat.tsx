import { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Send, Search, ArrowRight, MessageCircle, Loader2, Plus, X } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { chatApi, type Conversation, type Message, type ChatUser } from '../api/chat'

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'עכשיו'
  if (mins < 60) return `לפני ${mins} דק׳`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `לפני ${hrs} שע׳`
  return new Date(dateStr).toLocaleDateString('he-IL', { day: 'numeric', month: 'short' })
}

function getOtherParticipant(conv: Conversation, userId: string): ChatUser | undefined {
  return conv.participants.find(p => p.id !== userId)
}

function Initials({ name, size = 'md' }: { name: string; size?: 'sm' | 'md' | 'lg' }) {
  const sz = size === 'sm' ? 'w-8 h-8 text-[11px]' : size === 'lg' ? 'w-12 h-12 text-[16px]' : 'w-10 h-10 text-[13px]'
  return (
    <div className={`${sz} rounded-full bg-gradient-to-br from-[#1e40af] to-[#2563eb] flex items-center justify-center text-white font-bold flex-shrink-0`}>
      {name?.charAt(0)?.toUpperCase() ?? '?'}
    </div>
  )
}

function NewConversationModal({ onClose, currentUserId }: { onClose: () => void; currentUserId: string }) {
  const [search, setSearch] = useState('')
  const qc = useQueryClient()
  const navigate = useNavigate()

  const { data: users = [], isLoading } = useQuery({
    queryKey: ['chatSearch', search],
    queryFn: () => chatApi.searchUsers(search),
    enabled: search.length > 1,
  })

  const { mutate: startConv } = useMutation({
    mutationFn: (userId: string) => chatApi.createConversation(userId),
    onSuccess: (conv) => {
      qc.invalidateQueries({ queryKey: ['conversations'] })
      navigate(`/chat/${conv.id}`)
      onClose()
    },
  })

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40" onClick={onClose}>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm" onClick={e => e.stopPropagation()} dir="rtl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h3 className="font-bold text-[16px] text-[#1e1b4b]">שיחה חדשה</h3>
          <button onClick={onClose} className="text-[#9ca3af] hover:text-[#374151]"><X size={18} /></button>
        </div>
        <div className="p-4">
          <div className="relative mb-3">
            <Search size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9ca3af]" />
            <input
              autoFocus type="text" placeholder="חפשו משתמש..."
              value={search} onChange={e => setSearch(e.target.value)}
              className="w-full border border-[#e5e7eb] rounded-xl pr-9 pl-4 py-2.5 text-[14px] focus:outline-none focus:border-[#1e40af]"
            />
          </div>
          {isLoading && <div className="flex justify-center py-4"><Loader2 size={20} className="animate-spin text-[#1e40af]" /></div>}
          <div className="space-y-1 max-h-56 overflow-y-auto">
            {users.filter(u => u.id !== currentUserId).map(u => (
              <button key={u.id} onClick={() => startConv(u.id)}
                className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#F8FAFF] transition-colors text-right">
                <Initials name={u.full_name} size="sm" />
                <div className="min-w-0">
                  <p className="text-[14px] font-semibold text-[#1e1b4b] truncate">{u.full_name}</p>
                  <p className="text-[12px] text-[#6b7280] truncate">{u.email}</p>
                </div>
              </button>
            ))}
            {search.length > 1 && !isLoading && users.length === 0 && (
              <p className="text-center text-[13px] text-[#9ca3af] py-4">לא נמצאו משתמשים</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function ConversationView({ convId, userId }: { convId: string; userId: string }) {
  const qc = useQueryClient()
  const [text, setText] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)

  const { data: messages = [], isLoading } = useQuery({
    queryKey: ['messages', convId],
    queryFn: () => chatApi.getMessages(convId),
    refetchInterval: 5000,
  })

  useEffect(() => {
    chatApi.markRead(convId).catch(() => {})
  }, [convId])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const { mutate: send, isPending } = useMutation({
    mutationFn: (content: string) => chatApi.sendMessage(convId, content),
    onSuccess: () => {
      setText('')
      qc.invalidateQueries({ queryKey: ['messages', convId] })
      qc.invalidateQueries({ queryKey: ['conversations'] })
    },
  })

  const handleSend = () => {
    const content = text.trim()
    if (!content || isPending) return
    send(content)
  }

  if (isLoading) return <div className="flex-1 flex items-center justify-center"><Loader2 size={24} className="animate-spin text-[#1e40af]" /></div>

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-[#9ca3af]">
            <MessageCircle size={40} className="mb-2 opacity-30" />
            <p className="text-[14px]">התחל שיחה חדשה</p>
          </div>
        )}
        {messages.map((msg: Message) => {
          const mine = msg.sender_id === userId
          return (
            <div key={msg.id} className={`flex ${mine ? 'justify-start' : 'justify-end'}`}>
              <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-[14px] leading-relaxed ${
                mine
                  ? 'bg-[#1e40af] text-white rounded-tr-sm'
                  : 'bg-[#F3F4F6] text-[#1f2937] rounded-tl-sm'
              }`}>
                {msg.content}
                <span className={`block text-[10px] mt-1 ${mine ? 'text-white/60' : 'text-[#9ca3af]'}`}>
                  {new Date(msg.created_at).toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          )
        })}
        <div ref={bottomRef} />
      </div>

      <div className="border-t border-[#e5e7eb] p-3 flex gap-2 items-end bg-white">
        <button onClick={handleSend} disabled={!text.trim() || isPending}
          className="w-10 h-10 rounded-xl bg-[#1e40af] flex items-center justify-center text-white hover:bg-[#1c3a9e] transition-colors disabled:opacity-40 flex-shrink-0">
          {isPending ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
        </button>
        <textarea
          value={text} onChange={e => setText(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() } }}
          placeholder="כתבו הודעה..."
          rows={1}
          className="flex-1 border border-[#e5e7eb] rounded-xl px-4 py-2.5 text-[14px] text-[#374151] resize-none focus:outline-none focus:border-[#1e40af]"
          dir="auto"
        />
      </div>
    </div>
  )
}

export default function Chat() {
  const { user, loading } = useAuth()
  const navigate = useNavigate()
  const { id: convId } = useParams<{ id?: string }>()
  const [showNew, setShowNew] = useState(false)

  const { data: conversations = [], isLoading } = useQuery({
    queryKey: ['conversations'],
    queryFn: chatApi.listConversations,
    enabled: !!user,
    refetchInterval: 10000,
  })

  useEffect(() => {
    if (!loading && !user) navigate('/login')
  }, [user, loading, navigate])

  if (loading || !user) return null

  const selectedConv = conversations.find(c => c.id === convId)
  const otherUser = selectedConv ? getOtherParticipant(selectedConv, user.id) : null

  return (
    <div dir="rtl" className="h-screen flex overflow-hidden bg-[#F8FAFF]">
      {/* Sidebar */}
      <div className={`${convId ? 'hidden md:flex' : 'flex'} flex-col w-full md:w-80 bg-white border-l border-[#e5e7eb] flex-shrink-0`}>
        <div className="flex items-center justify-between px-4 py-4 border-b border-[#e5e7eb]">
          <h2 className="text-[17px] font-black text-[#1e1b4b]">הודעות</h2>
          <button onClick={() => setShowNew(true)}
            className="w-8 h-8 rounded-xl bg-[#1e40af] flex items-center justify-center text-white hover:bg-[#1c3a9e] transition-colors">
            <Plus size={16} />
          </button>
        </div>

        {isLoading ? (
          <div className="flex-1 flex items-center justify-center"><Loader2 size={24} className="animate-spin text-[#1e40af]" /></div>
        ) : conversations.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-[#9ca3af] p-6 text-center">
            <MessageCircle size={40} className="mb-3 opacity-30" />
            <p className="text-[14px] font-medium">אין שיחות עדיין</p>
            <p className="text-[12px] mt-1">לחצו + להתחלת שיחה חדשה</p>
          </div>
        ) : (
          <div className="overflow-y-auto flex-1">
            {conversations.map(conv => {
              const other = getOtherParticipant(conv, user.id)
              if (!other) return null
              return (
                <Link key={conv.id} to={`/chat/${conv.id}`}
                  className={`flex items-center gap-3 px-4 py-3.5 hover:bg-[#F8FAFF] transition-colors border-b border-[#f3f4f6] ${convId === conv.id ? 'bg-[#EEF2FF]' : ''}`}>
                  <Initials name={other.full_name} size="md" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-[14px] font-semibold text-[#1e1b4b] truncate">{other.full_name}</span>
                      {conv.last_message_at && <span className="text-[11px] text-[#9ca3af] flex-shrink-0 mr-1">{timeAgo(conv.last_message_at)}</span>}
                    </div>
                    <p className="text-[12px] text-[#6b7280] truncate mt-0.5">{conv.last_message ?? 'אין הודעות'}</p>
                  </div>
                  {conv.unread_count > 0 && (
                    <span className="w-5 h-5 rounded-full bg-[#1e40af] text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                      {conv.unread_count > 9 ? '9+' : conv.unread_count}
                    </span>
                  )}
                </Link>
              )
            })}
          </div>
        )}
      </div>

      {/* Main area */}
      <div className={`${convId ? 'flex' : 'hidden md:flex'} flex-1 flex-col overflow-hidden`}>
        {convId && selectedConv ? (
          <>
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[#e5e7eb] bg-white">
              <Link to="/chat" className="md:hidden text-[#6b7280] hover:text-[#374151] ml-1">
                <ArrowRight size={20} />
              </Link>
              {otherUser && <Initials name={otherUser.full_name} size="sm" />}
              <div>
                <p className="text-[15px] font-bold text-[#1e1b4b]">{otherUser?.full_name}</p>
                <p className="text-[12px] text-[#6b7280]">{otherUser?.email}</p>
              </div>
            </div>
            <ConversationView convId={convId} userId={user.id} />
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-[#9ca3af]">
            <MessageCircle size={56} className="mb-4 opacity-20" />
            <p className="text-[16px] font-medium">בחרו שיחה להתחלה</p>
            <p className="text-[13px] mt-1">או לחצו + לשיחה חדשה</p>
          </div>
        )}
      </div>

      {showNew && <NewConversationModal onClose={() => setShowNew(false)} currentUserId={user.id} />}
    </div>
  )
}
