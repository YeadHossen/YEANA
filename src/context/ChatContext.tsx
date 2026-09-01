import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { TravelerInquiry, ChatMessage, InquiryCategory, InquiryStatus, TravelerChoicePayload } from '../types';
import { DataService } from '../services/dataService';
import { useAuth } from './AuthContext';

interface ChatContextType {
  inquiries: TravelerInquiry[];
  activeInquiry: TravelerInquiry | null;
  activeInquiryId: string | null;
  setActiveInquiryId: (id: string | null) => void;
  unreadAdminCount: number;
  unreadTravelerCount: number;
  isTravelerChatOpen: boolean;
  prefilledChoices: TravelerChoicePayload | null;
  notificationAlert: string | null;
  openTravelerChat: (choices?: TravelerChoicePayload, initialSubject?: string, initialCategory?: InquiryCategory) => void;
  closeTravelerChat: () => void;
  refreshInquiries: () => Promise<void>;
  createInquiryWithChoices: (
    subject: string,
    category: InquiryCategory,
    initialMessage: string,
    choices?: TravelerChoicePayload
  ) => Promise<TravelerInquiry>;
  sendChatMessage: (
    inquiryId: string,
    messageText: string,
    senderRole: 'traveler' | 'admin',
    attachmentType?: 'choices' | 'quote' | 'status_update' | 'general',
    attachmentData?: TravelerChoicePayload
  ) => Promise<ChatMessage>;
  updateStatus: (inquiryId: string, status: InquiryStatus, adminNotes?: string) => Promise<void>;
  markAsRead: (inquiryId: string, forRole: 'admin' | 'traveler') => Promise<void>;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user, isAdmin } = useAuth();
  const [inquiries, setInquiries] = useState<TravelerInquiry[]>([]);
  const [activeInquiryId, setActiveInquiryId] = useState<string | null>(null);
  const [unreadAdminCount, setUnreadAdminCount] = useState<number>(0);
  const [unreadTravelerCount, setUnreadTravelerCount] = useState<number>(0);
  const [isTravelerChatOpen, setIsTravelerChatOpen] = useState<boolean>(false);
  const [prefilledChoices, setPrefilledChoices] = useState<TravelerChoicePayload | null>(null);
  const [notificationAlert, setNotificationAlert] = useState<string | null>(null);

  const refreshInquiries = useCallback(async () => {
    try {
      const data = await DataService.getInquiries();
      setInquiries(data);
      const adminUnread = await DataService.getUnreadInquiryCount('admin');
      const travelerUnread = await DataService.getUnreadInquiryCount('traveler');
      setUnreadAdminCount(adminUnread);
      setUnreadTravelerCount(travelerUnread);
    } catch (err) {
      console.error('Error refreshing inquiries:', err);
    }
  }, []);

  useEffect(() => {
    refreshInquiries();

    // Listen to custom event when inquiries update across components/tabs
    const handleUpdate = (e: any) => {
      refreshInquiries();
      if (e.detail) {
        const item = e.detail as TravelerInquiry;
        if (isAdmin && item.unread_for_admin > 0) {
          setNotificationAlert(`🔔 New request from ${item.traveler_name}: "${item.subject}"`);
          setTimeout(() => setNotificationAlert(null), 5000);
        } else if (!isAdmin && item.unread_for_traveler > 0) {
          setNotificationAlert(`💬 New message from YEANA Concierge: "${item.last_message}"`);
          setTimeout(() => setNotificationAlert(null), 5000);
        }
      }
    };

    window.addEventListener('yeana:inquiries_updated', handleUpdate);
    return () => {
      window.removeEventListener('yeana:inquiries_updated', handleUpdate);
    };
  }, [refreshInquiries, isAdmin]);

  const activeInquiry = inquiries.find(i => i.id === activeInquiryId) || null;

  const openTravelerChat = (
    choices?: TravelerChoicePayload,
    _initialSubject?: string,
    _initialCategory?: InquiryCategory
  ) => {
    if (choices) {
      setPrefilledChoices(choices);
    }
    setIsTravelerChatOpen(true);
  };

  const closeTravelerChat = () => {
    setIsTravelerChatOpen(false);
  };

  const createInquiryWithChoices = async (
    subject: string,
    category: InquiryCategory,
    initialMessage: string,
    choices?: TravelerChoicePayload
  ): Promise<TravelerInquiry> => {
    const travelerId = user?.id || 'usr-traveler-guest';
    const travelerName = user?.full_name || 'Guest Traveler';
    const travelerEmail = user?.email || 'traveler@yeana.bd';
    const travelerPhone = user?.phone || '+880 1700-000000';
    const travelerAvatar = user?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150';

    const newInquiry = await DataService.createInquiry({
      traveler_id: travelerId,
      traveler_name: travelerName,
      traveler_email: travelerEmail,
      traveler_phone: travelerPhone,
      traveler_avatar: travelerAvatar,
      subject,
      category,
      initial_message: initialMessage,
      traveler_choices: choices || prefilledChoices || undefined
    });

    await refreshInquiries();
    setActiveInquiryId(newInquiry.id);
    setPrefilledChoices(null);
    return newInquiry;
  };

  const sendChatMessage = async (
    inquiryId: string,
    messageText: string,
    senderRole: 'traveler' | 'admin',
    attachmentType?: 'choices' | 'quote' | 'status_update' | 'general',
    attachmentData?: TravelerChoicePayload
  ): Promise<ChatMessage> => {
    const senderId = user?.id || (senderRole === 'admin' ? 'usr-admin-01' : 'usr-traveler-01');
    const senderName = user?.full_name || (senderRole === 'admin' ? 'YEANA Admin' : 'Traveler');
    const senderAvatar = user?.avatar_url;

    const newMsg = await DataService.sendMessage(
      inquiryId,
      messageText,
      senderRole,
      senderName,
      senderId,
      senderAvatar,
      attachmentType,
      attachmentData
    );

    await refreshInquiries();
    return newMsg;
  };

  const updateStatus = async (inquiryId: string, status: InquiryStatus, adminNotes?: string) => {
    await DataService.updateInquiryStatus(inquiryId, status, adminNotes);
    await refreshInquiries();
  };

  const markAsRead = async (inquiryId: string, forRole: 'admin' | 'traveler') => {
    await DataService.markInquiryRead(inquiryId, forRole);
    await refreshInquiries();
  };

  return (
    <ChatContext.Provider
      value={{
        inquiries,
        activeInquiry,
        activeInquiryId,
        setActiveInquiryId,
        unreadAdminCount,
        unreadTravelerCount,
        isTravelerChatOpen,
        prefilledChoices,
        notificationAlert,
        openTravelerChat,
        closeTravelerChat,
        refreshInquiries,
        createInquiryWithChoices,
        sendChatMessage,
        updateStatus,
        markAsRead
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
