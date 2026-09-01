import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Paperclip, 
  CheckCircle2, 
  Clock, 
  Compass, 
  Hotel as HotelIcon, 
  Car, 
  ShoppingBag, 
  Sparkles, 
  ChevronRight,
  ShieldCheck,
  Calendar,
  DollarSign,
  Users,
  MapPin,
  HelpCircle,
  Plus
} from 'lucide-react';
import { useChat } from '../../context/ChatContext';
import { useAuth } from '../../context/AuthContext';
import { useTrip } from '../../context/TripContext';
import { useFavorites } from '../../context/FavoritesContext';
import { InquiryCategory, TravelerChoicePayload } from '../../types';

export const TravelerConciergeModal: React.FC = () => {
  const { 
    inquiries, 
    activeInquiry, 
    activeInquiryId, 
    setActiveInquiryId, 
    unreadTravelerCount, 
    isTravelerChatOpen, 
    prefilledChoices, 
    openTravelerChat, 
    closeTravelerChat, 
    createInquiryWithChoices, 
    sendChatMessage, 
    markAsRead,
    notificationAlert
  } = useChat();

  const { user, isAdmin } = useAuth();
  const { activeTrip } = useTrip();
  const { favorites } = useFavorites();

  const [activeTab, setActiveTab] = useState<'chat' | 'new'>('chat');
  const [newSubject, setNewSubject] = useState('');
  const [newCategory, setNewCategory] = useState<InquiryCategory>('trip_planning');
  const [newMessage, setNewMessage] = useState('');
  const [attachedChoices, setAttachedChoices] = useState<TravelerChoicePayload | null>(null);
  const [replyText, setReplyText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Filter inquiries belonging to current traveler or demo
  const travelerInquiries = inquiries.filter(
    i => i.traveler_id === user?.id || i.traveler_email === user?.email || !user
  );

  useEffect(() => {
    if (prefilledChoices) {
      setAttachedChoices(prefilledChoices);
      setActiveTab('new');
      if (prefilledChoices.destination) {
        setNewSubject(`Custom Inquiry for ${prefilledChoices.destination}`);
      }
    }
  }, [prefilledChoices]);

  useEffect(() => {
    if (activeInquiry && isTravelerChatOpen) {
      markAsRead(activeInquiry.id, 'traveler');
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeInquiry, isTravelerChatOpen, markAsRead]);

  // Handle attaching active trip plan
  const handleAttachActiveTrip = () => {
    if (!activeTrip) return;
    const choices: TravelerChoicePayload = {
      destination: activeTrip.destination,
      district_name: activeTrip.destination,
      selected_places: activeTrip.places.map((p, idx) => ({
        id: p.place_id || p.id || `place-stop-${idx}`,
        name: p.place?.name || p.custom_title || `Day ${p.day_number} Attraction`,
        category: p.place?.category || 'Sightseeing'
      })),
      travel_dates: {
        start_date: activeTrip.start_date,
        end_date: activeTrip.end_date,
        duration_days: activeTrip.duration_days
      },
      budget_range: activeTrip.total_budget ? `৳${activeTrip.total_budget.toLocaleString()}` : undefined,
      special_notes: activeTrip.notes
    };
    setAttachedChoices(choices);
    setNewCategory('trip_planning');
    setNewSubject(`Custom ${activeTrip.duration_days}-Day Trip Plan for ${activeTrip.destination}`);
  };

  // Handle attaching saved specialties
  const handleAttachSpecialties = () => {
    const specialtyFavs = favorites.filter(f => f.item_type === 'specialty');
    if (specialtyFavs.length === 0) return;
    const choices: TravelerChoicePayload = {
      selected_specialties: specialtyFavs.map(f => {
        const d = f.item_data as any;
        return {
          id: d.id,
          name: d.name,
          category: d.category,
          price_range: d.price_range
        };
      }),
      special_notes: 'Please verify authenticity and assist with direct sourcing from artisan cooperatives.'
    };
    setAttachedChoices(choices);
    setNewCategory('specialty_order');
    setNewSubject(`Specialty Item Direct Sourcing Request (${specialtyFavs.length} items)`);
  };

  const handleCreateInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !newSubject.trim()) return;
    setIsSubmitting(true);
    try {
      const created = await createInquiryWithChoices(
        newSubject,
        newCategory,
        newMessage,
        attachedChoices || undefined
      );
      setNewSubject('');
      setNewMessage('');
      setAttachedChoices(null);
      setActiveInquiryId(created.id);
      setActiveTab('chat');
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !activeInquiryId) return;
    try {
      await sendChatMessage(activeInquiryId, replyText, 'traveler');
      setReplyText('');
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {/* Toast Alert when new message arrives */}
      {notificationAlert && (
        <div className="fixed top-20 right-4 z-50 max-w-sm bg-slate-900/95 text-white p-4 rounded-2xl shadow-2xl border border-brand-500/40 backdrop-blur-md animate-in slide-in-from-top-4 duration-200">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-brand-500/20 text-brand-400">
              <Sparkles className="w-5 h-5 animate-spin" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold text-brand-400">Live Support Notification</p>
              <p className="text-xs text-slate-200 mt-0.5 leading-relaxed">{notificationAlert}</p>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Button for Traveler (Accessible Anywhere) */}
      {!isAdmin && (
        <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40">
          <button
            onClick={() => openTravelerChat()}
            className="group relative flex items-center gap-2.5 px-4 py-3.5 bg-gradient-to-r from-brand-600 to-emerald-600 hover:from-brand-500 hover:to-emerald-500 text-white rounded-full shadow-lg shadow-brand-700/30 hover:shadow-xl hover:scale-105 transition-all"
            title="Chat with YEANA Concierge & Tour Admin"
          >
            <div className="relative">
              <MessageSquare className="w-5 h-5" />
              {unreadTravelerCount > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-rose-500 text-white text-[10px] font-black rounded-full flex items-center justify-center animate-bounce shadow-md">
                  {unreadTravelerCount}
                </span>
              )}
            </div>
            <span className="text-xs font-extrabold tracking-wide hidden sm:inline">
              Ask Concierge / Admin
            </span>
          </button>
        </div>
      )}

      {/* Modal Backdrop and Chat Window */}
      {isTravelerChatOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div 
            className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-[90vh] max-h-[720px] animate-in zoom-in-95 duration-150"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-slate-900 via-brand-950 to-slate-900 text-white p-4 sm:p-5 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-2xl bg-brand-600 flex items-center justify-center text-white shadow-md">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-slate-900 rounded-full"></span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-white">YEANA Tour Concierge & Admin</h3>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider bg-brand-500/20 text-brand-300 px-2 py-0.5 rounded-full border border-brand-500/30">
                      Live Support
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Send inquiries, share your custom trip choices, or request bookings
                  </p>
                </div>
              </div>

              <button
                onClick={closeTravelerChat}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Sub-Navigation Tabs */}
            <div className="flex border-b border-slate-100 bg-slate-50 px-4 pt-2 gap-2">
              <button
                onClick={() => setActiveTab('chat')}
                className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all border-b-2 flex items-center gap-2 ${
                  activeTab === 'chat'
                    ? 'bg-white text-brand-700 border-brand-600 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800 border-transparent'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span>My Conversations ({travelerInquiries.length})</span>
                {unreadTravelerCount > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-bold">
                    {unreadTravelerCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('new')}
                className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all border-b-2 flex items-center gap-2 ${
                  activeTab === 'new'
                    ? 'bg-white text-brand-700 border-brand-600 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800 border-transparent'
                }`}
              >
                <Plus className="w-4 h-4" />
                <span>New Request / Send Choices</span>
                {attachedChoices && (
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                )}
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-4 bg-slate-50/50">
              {activeTab === 'new' ? (
                /* NEW INQUIRY & CHOICE SUBMISSION FORM */
                <form onSubmit={handleCreateInquiry} className="space-y-4">
                  
                  {/* Category Pills */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2">
                      What is your request about?
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {[
                        { id: 'trip_planning', label: 'Trip Planning & Guide', icon: Compass },
                        { id: 'hotel_booking', label: 'Hotel & Resort Booking', icon: HotelIcon },
                        { id: 'ride_assistance', label: 'Chander Gari & Rides', icon: Car },
                        { id: 'specialty_order', label: 'Specialty Sourcing', icon: ShoppingBag },
                        { id: 'custom_package', label: 'VIP Custom Package', icon: Sparkles },
                        { id: 'general', label: 'General Help', icon: HelpCircle }
                      ].map(cat => {
                        const Icon = cat.icon;
                        const isSelected = newCategory === cat.id;
                        return (
                          <button
                            type="button"
                            key={cat.id}
                            onClick={() => setNewCategory(cat.id as InquiryCategory)}
                            className={`p-2.5 rounded-2xl border text-left text-xs font-semibold flex items-center gap-2 transition-all ${
                              isSelected 
                                ? 'bg-brand-50 border-brand-500 text-brand-800 shadow-xs' 
                                : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                            }`}
                          >
                            <Icon className={`w-4 h-4 ${isSelected ? 'text-brand-600' : 'text-slate-400'}`} />
                            <span className="truncate">{cat.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* One-Click Attach Choice Buttons */}
                  <div className="p-3.5 bg-brand-50/60 rounded-2xl border border-brand-100 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-brand-900 flex items-center gap-1.5">
                        <Paperclip className="w-3.5 h-3.5 text-brand-600" />
                        Attach Your Current Selections to Admin:
                      </span>
                      {attachedChoices && (
                        <button
                          type="button"
                          onClick={() => setAttachedChoices(null)}
                          className="text-[11px] font-bold text-rose-600 hover:underline"
                        >
                          Clear Attached Choices
                        </button>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {activeTrip && (
                        <button
                          type="button"
                          onClick={handleAttachActiveTrip}
                          className="px-3 py-1.5 rounded-xl bg-white border border-brand-200 text-xs font-bold text-brand-700 hover:bg-brand-100 flex items-center gap-1.5 shadow-xs transition-colors"
                        >
                          <Compass className="w-3.5 h-3.5 text-brand-600" />
                          <span>Attach Active Trip: {activeTrip.destination}</span>
                        </button>
                      )}

                      {favorites.some(f => f.item_type === 'specialty') && (
                        <button
                          type="button"
                          onClick={handleAttachSpecialties}
                          className="px-3 py-1.5 rounded-xl bg-white border border-brand-200 text-xs font-bold text-brand-700 hover:bg-brand-100 flex items-center gap-1.5 shadow-xs transition-colors"
                        >
                          <ShoppingBag className="w-3.5 h-3.5 text-brand-600" />
                          <span>Attach Saved Specialties ({favorites.filter(f => f.item_type === 'specialty').length})</span>
                        </button>
                      )}
                    </div>

                    {/* Attached Choices Preview Card */}
                    {attachedChoices && (
                      <div className="mt-2.5 p-3 bg-white rounded-xl border border-emerald-200 text-xs space-y-1.5">
                        <div className="flex items-center gap-1.5 text-emerald-800 font-bold">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Attached Traveler Choices Payload:</span>
                        </div>
                        {attachedChoices.destination && (
                          <p className="text-slate-700">
                            <strong>Destination:</strong> {attachedChoices.destination} ({attachedChoices.travel_dates?.duration_days || 3} Days)
                          </p>
                        )}
                        {attachedChoices.selected_places && attachedChoices.selected_places.length > 0 && (
                          <p className="text-slate-700">
                            <strong>Planned Spots:</strong> {attachedChoices.selected_places.map(p => p.name).join(', ')}
                          </p>
                        )}
                        {attachedChoices.selected_specialties && attachedChoices.selected_specialties.length > 0 && (
                          <p className="text-slate-700">
                            <strong>Specialties:</strong> {attachedChoices.selected_specialties.map(s => s.name).join(', ')}
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Subject / Topic
                    </label>
                    <input
                      type="text"
                      required
                      value={newSubject}
                      onChange={e => setNewSubject(e.target.value)}
                      placeholder="e.g. Custom 3-day Sylhet Tour & Guide assistance"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>

                  {/* Detailed Message */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Your Message / Special Instructions
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={newMessage}
                      onChange={e => setNewMessage(e.target.value)}
                      placeholder="Describe your travel dates, preferred transport, hotel tier, or specific questions for the YEANA Admin team..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white text-xs font-bold rounded-2xl shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'Sending Request...' : 'Send Request to Admin & Concierge'}</span>
                  </button>
                </form>
              ) : (
                /* CONVERSATION LIST / ACTIVE CHAT VIEW */
                <div className="h-full flex flex-col">
                  {travelerInquiries.length === 0 ? (
                    <div className="text-center py-12 space-y-3">
                      <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mx-auto">
                        <MessageSquare className="w-6 h-6" />
                      </div>
                      <p className="text-sm font-bold text-slate-800">No conversations yet</p>
                      <p className="text-xs text-slate-500 max-w-xs mx-auto">
                        Have questions about a destination, hotel, or need a customized quote? Send your choices to our team!
                      </p>
                      <button
                        onClick={() => setActiveTab('new')}
                        className="px-4 py-2 bg-brand-600 text-white rounded-xl text-xs font-bold"
                      >
                        Start New Conversation
                      </button>
                    </div>
                  ) : !activeInquiry ? (
                    /* Inquiry Picker List */
                    <div className="space-y-2.5">
                      <p className="text-xs font-bold text-slate-500 px-1">Select a conversation to view replies:</p>
                      {travelerInquiries.map(inq => (
                        <div
                          key={inq.id}
                          onClick={() => setActiveInquiryId(inq.id)}
                          className="p-3.5 bg-white rounded-2xl border border-slate-200 hover:border-brand-400 hover:shadow-md cursor-pointer transition-all flex items-center justify-between gap-3"
                        >
                          <div className="space-y-1 flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                                inq.status === 'confirmed' ? 'bg-emerald-100 text-emerald-800' :
                                inq.status === 'in_progress' ? 'bg-amber-100 text-amber-800' :
                                'bg-blue-100 text-blue-800'
                              }`}>
                                {inq.status.replace('_', ' ')}
                              </span>
                              <span className="text-[11px] text-slate-400">
                                {new Date(inq.updated_at).toLocaleDateString()}
                              </span>
                            </div>
                            <h4 className="text-xs font-bold text-slate-900 truncate">{inq.subject}</h4>
                            <p className="text-[11px] text-slate-500 truncate">{inq.last_message}</p>
                          </div>

                          <div className="flex items-center gap-2">
                            {inq.unread_for_traveler > 0 && (
                              <span className="px-2 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-bold animate-pulse">
                                {inq.unread_for_traveler} New
                              </span>
                            )}
                            <ChevronRight className="w-4 h-4 text-slate-400" />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    /* Active Chat Screen */
                    <div className="flex flex-col h-full space-y-3">
                      {/* Top Bar with Back to List */}
                      <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                        <button
                          onClick={() => setActiveInquiryId(null)}
                          className="text-xs font-bold text-brand-600 hover:underline flex items-center gap-1"
                        >
                          ← Back to All Inquiries
                        </button>

                        <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          activeInquiry.status === 'confirmed' ? 'bg-emerald-100 text-emerald-800' :
                          activeInquiry.status === 'in_progress' ? 'bg-amber-100 text-amber-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          Status: {activeInquiry.status.replace('_', ' ')}
                        </span>
                      </div>

                      {/* Attached Choice Summary Header */}
                      {activeInquiry.traveler_choices && (
                        <div className="p-3 bg-brand-50/80 rounded-2xl border border-brand-200 text-xs space-y-1">
                          <p className="font-bold text-brand-900">
                            🌟 Traveler Choices & Itinerary Shared with Admin:
                          </p>
                          {activeInquiry.traveler_choices.destination && (
                            <p className="text-slate-700">
                              📍 <strong>Destination:</strong> {activeInquiry.traveler_choices.destination}
                            </p>
                          )}
                          {activeInquiry.traveler_choices.selected_hotel && (
                            <p className="text-slate-700">
                              🏨 <strong>Hotel:</strong> {activeInquiry.traveler_choices.selected_hotel.name} ({activeInquiry.traveler_choices.selected_hotel.room_type})
                            </p>
                          )}
                          {activeInquiry.traveler_choices.selected_ride && (
                            <p className="text-slate-700">
                              🚗 <strong>Ride:</strong> {activeInquiry.traveler_choices.selected_ride.title}
                            </p>
                          )}
                        </div>
                      )}

                      {/* Message Thread */}
                      <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                        {activeInquiry.messages.map(msg => {
                          const isAdminSender = msg.sender_role === 'admin';
                          return (
                            <div
                              key={msg.id}
                              className={`flex gap-2.5 ${isAdminSender ? 'justify-start' : 'justify-end'}`}
                            >
                              {isAdminSender && (
                                <img
                                  src={msg.sender_avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'}
                                  alt="Admin"
                                  className="w-7 h-7 rounded-full object-cover ring-2 ring-brand-500/20 self-end"
                                />
                              )}
                              <div className={`max-w-[80%] p-3.5 rounded-2xl text-xs space-y-1 ${
                                isAdminSender 
                                  ? 'bg-white border border-slate-200 text-slate-800 shadow-xs' 
                                  : 'bg-brand-600 text-white rounded-br-none shadow-sm'
                              }`}>
                                <div className="flex items-center justify-between gap-3 text-[10px] opacity-75">
                                  <span className="font-bold">{msg.sender_name}</span>
                                  <span>{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                </div>
                                <p className="leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                              </div>
                            </div>
                          );
                        })}
                        <div ref={messagesEndRef} />
                      </div>

                      {/* Reply Form */}
                      <form onSubmit={handleSendReply} className="flex gap-2 pt-2 border-t border-slate-200">
                        <input
                          type="text"
                          value={replyText}
                          onChange={e => setReplyText(e.target.value)}
                          placeholder="Type a message to YEANA Admin..."
                          className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
                        />
                        <button
                          type="submit"
                          className="px-4 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>Send</span>
                        </button>
                      </form>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
