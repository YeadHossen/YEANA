import React, { useState, useMemo } from 'react';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Pin, 
  PinOff, 
  CheckCircle2, 
  Circle, 
  Share2, 
  Sparkles, 
  Search, 
  Filter, 
  Receipt, 
  FileText, 
  Users, 
  CheckSquare, 
  DollarSign, 
  TrendingUp, 
  CreditCard, 
  Wallet, 
  Smartphone, 
  MapPin, 
  Calendar, 
  Utensils, 
  Bus, 
  Hotel, 
  ShoppingBag, 
  Ticket, 
  Car, 
  AlertCircle, 
  HeartHandshake, 
  Package, 
  Copy, 
  ArrowRight,
  ShieldCheck,
  RotateCcw,
  Tag,
  Clock,
  X
} from 'lucide-react';
import { useNotes } from '../context/NotesContext';
import { useLanguage } from '../context/LanguageContext';
import { 
  TravelExpense, 
  TravelNote, 
  ExpenseCategory, 
  PaymentMethod, 
  NoteCategory, 
  NoteColor 
} from '../types';

export const KeepNotesView: React.FC = () => {
  const { t, language } = useLanguage();
  const { 
    expenses, 
    notes, 
    budgetGoal, 
    totalExpenses, 
    remainingBudget, 
    budgetPercentage,
    addExpense,
    updateExpense,
    deleteExpense,
    clearExpenses,
    addNote,
    updateNote,
    deleteNote,
    toggleChecklistItem,
    addChecklistItem,
    removeChecklistItem,
    pinNote,
    setBudgetGoal,
    loadSampleData,
    exportToWhatsAppText
  } = useNotes();

  // Active sub-tab
  const [activeTab, setActiveTab] = useState<'expenses' | 'notes' | 'split' | 'checklists'>('expenses');

  // Search & Filter state
  const [expenseSearch, setExpenseSearch] = useState('');
  const [selectedExpenseCat, setSelectedExpenseCat] = useState<string>('all');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('all');
  
  const [noteSearch, setNoteSearch] = useState('');
  const [selectedNoteCat, setSelectedNoteCat] = useState<string>('all');

  // Toast / Copy notification
  const [toast, setToast] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // Modals state
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [editingExpenseId, setEditingExpenseId] = useState<string | null>(null);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false);
  const [tempBudgetInput, setTempBudgetInput] = useState<string>(budgetGoal.toString());

  // Expense Form state
  const [expTitle, setExpTitle] = useState('');
  const [expAmount, setExpAmount] = useState('');
  const [expCategory, setExpCategory] = useState<ExpenseCategory>('food');
  const [expPaymentMethod, setExpPaymentMethod] = useState<PaymentMethod>('cash');
  const [expDate, setExpDate] = useState(new Date().toISOString().split('T')[0]);
  const [expTime, setExpTime] = useState('12:00 PM');
  const [expPayer, setExpPayer] = useState('');
  const [expSplitCount, setExpSplitCount] = useState('1');
  const [expLocation, setExpLocation] = useState('');
  const [expNotes, setExpNotes] = useState('');

  // Note Form state
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [noteCategory, setNoteCategory] = useState<NoteCategory>('general');
  const [noteColor, setNoteColor] = useState<NoteColor>('emerald');
  const [noteIsPinned, setNoteIsPinned] = useState(false);
  const [noteLocation, setNoteLocation] = useState('');
  const [noteChecklistDraft, setNoteChecklistDraft] = useState<string[]>([]);
  const [newChecklistInput, setNewChecklistInput] = useState('');

  // Group Split state
  const [groupMembers, setGroupMembers] = useState<{ id: string; name: string; paid: number }[]>([
    { id: '1', name: 'Tanvir', paid: 9500 },
    { id: '2', name: 'Yead', paid: 7200 },
    { id: '3', name: 'Fahim', paid: 1850 },
    { id: '4', name: 'Rakib', paid: 0 },
    { id: '5', name: 'Shuvo', paid: 2350 }
  ]);
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberPaid, setNewMemberPaid] = useState('');

  // Category definitions with icons and colors
  const CATEGORIES: Record<ExpenseCategory, { label: string; labelBn: string; icon: any; color: string; bg: string }> = {
    food: { label: 'Food & Dining', labelBn: 'খাবার ও রেস্তোরাঁ', icon: Utensils, color: 'text-amber-600', bg: 'bg-amber-50 border-amber-200' },
    transport: { label: 'Transport & Fares', labelBn: 'যাতায়াত ও ভাড়া', icon: Bus, color: 'text-sky-600', bg: 'bg-sky-50 border-sky-200' },
    hotel: { label: 'Hotels & Stay', labelBn: 'হোটেল ও রিসোর্ট', icon: Hotel, color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-200' },
    shopping: { label: 'Shopping & Crafts', labelBn: 'কেনাকাটা ও হস্তশিল্প', icon: ShoppingBag, color: 'text-purple-600', bg: 'bg-purple-50 border-purple-200' },
    activities: { label: 'Sightseeing & Tickets', labelBn: 'দর্শনীয় স্থান ও টিকিট', icon: Ticket, color: 'text-rose-600', bg: 'bg-rose-50 border-rose-200' },
    ride: { label: 'Local Rides & Jeeps', labelBn: 'লোকাল রাইড ও জিপ', icon: Car, color: 'text-teal-600', bg: 'bg-teal-50 border-teal-200' },
    emergency: { label: 'Emergency & Medical', labelBn: 'জরুরি ও ওষুধপত্র', icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50 border-red-200' },
    tips: { label: 'Tips & Guide Fees', labelBn: 'বখশিস ও গাইড ফি', icon: HeartHandshake, color: 'text-indigo-600', bg: 'bg-indigo-50 border-indigo-200' },
    other: { label: 'Miscellaneous', labelBn: 'অন্যান্য খরচ', icon: Package, color: 'text-slate-600', bg: 'bg-slate-50 border-slate-200' }
  };

  const NOTE_CATEGORIES: Record<NoteCategory, { label: string; labelBn: string; icon: any }> = {
    general: { label: 'General Notes', labelBn: 'সাধারণ নোট', icon: FileText },
    packing: { label: 'Packing Checklist', labelBn: 'প্যাকিং তালিকা', icon: CheckSquare },
    places: { label: 'Places to Visit', labelBn: 'দর্শনীয় স্থান', icon: MapPin },
    food: { label: 'Food Wishlist', labelBn: 'খাবারের তালিকা', icon: Utensils },
    emergency: { label: 'Emergency Hotlines', labelBn: 'জরুরি নম্বর', icon: AlertCircle },
    tips: { label: 'Travel Tips & Advice', labelBn: 'পরামর্শ ও সতর্কতা', icon: ShieldCheck },
    diary: { label: 'Travel Diary & Memories', labelBn: 'ভ্রমণ ডায়েরি', icon: Sparkles }
  };

  const COLOR_STYLES: Record<NoteColor, { cardBg: string; border: string; badge: string }> = {
    emerald: { cardBg: 'bg-emerald-50/70', border: 'border-emerald-200/80', badge: 'bg-emerald-100 text-emerald-800' },
    sky: { cardBg: 'bg-sky-50/70', border: 'border-sky-200/80', badge: 'bg-sky-100 text-sky-800' },
    amber: { cardBg: 'bg-amber-50/70', border: 'border-amber-200/80', badge: 'bg-amber-100 text-amber-800' },
    rose: { cardBg: 'bg-rose-50/70', border: 'border-rose-200/80', badge: 'bg-rose-100 text-rose-800' },
    purple: { cardBg: 'bg-purple-50/70', border: 'border-purple-200/80', badge: 'bg-purple-100 text-purple-800' },
    slate: { cardBg: 'bg-slate-50/80', border: 'border-slate-200/80', badge: 'bg-slate-200 text-slate-800' }
  };

  // Filtered Expenses
  const filteredExpenses = useMemo(() => {
    return expenses.filter(exp => {
      const matchesSearch = exp.title.toLowerCase().includes(expenseSearch.toLowerCase()) ||
                            (exp.notes && exp.notes.toLowerCase().includes(expenseSearch.toLowerCase())) ||
                            (exp.payer_name && exp.payer_name.toLowerCase().includes(expenseSearch.toLowerCase())) ||
                            (exp.location && exp.location.toLowerCase().includes(expenseSearch.toLowerCase()));
      const matchesCat = selectedExpenseCat === 'all' || exp.category === selectedExpenseCat;
      const matchesPay = selectedPaymentMethod === 'all' || exp.payment_method === selectedPaymentMethod;
      return matchesSearch && matchesCat && matchesPay;
    });
  }, [expenses, expenseSearch, selectedExpenseCat, selectedPaymentMethod]);

  // Filtered Notes
  const filteredNotes = useMemo(() => {
    return notes
      .filter(note => {
        const matchesSearch = note.title.toLowerCase().includes(noteSearch.toLowerCase()) ||
                              note.content.toLowerCase().includes(noteSearch.toLowerCase()) ||
                              (note.location_tag && note.location_tag.toLowerCase().includes(noteSearch.toLowerCase()));
        const matchesCat = selectedNoteCat === 'all' || note.category === selectedNoteCat;
        return matchesSearch && matchesCat;
      })
      .sort((a, b) => (b.is_pinned ? 1 : 0) - (a.is_pinned ? 1 : 0));
  }, [notes, noteSearch, selectedNoteCat]);

  // Expenses Category Breakdown
  const categoryBreakdown = useMemo(() => {
    const totals: Record<string, number> = {};
    expenses.forEach(e => {
      totals[e.category] = (totals[e.category] || 0) + e.amount;
    });
    return totals;
  }, [expenses]);

  // Quick Expense Actions
  const handleOpenAddExpense = () => {
    setEditingExpenseId(null);
    setExpTitle('');
    setExpAmount('');
    setExpCategory('food');
    setExpPaymentMethod('cash');
    setExpDate(new Date().toISOString().split('T')[0]);
    setExpTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    setExpPayer('');
    setExpSplitCount('1');
    setExpLocation('');
    setExpNotes('');
    setIsExpenseModalOpen(true);
  };

  const handleOpenEditExpense = (exp: TravelExpense) => {
    setEditingExpenseId(exp.id);
    setExpTitle(exp.title);
    setExpAmount(exp.amount.toString());
    setExpCategory(exp.category);
    setExpPaymentMethod(exp.payment_method);
    setExpDate(exp.date);
    setExpTime(exp.time || '');
    setExpPayer(exp.payer_name || '');
    setExpSplitCount((exp.split_count || 1).toString());
    setExpLocation(exp.location || '');
    setExpNotes(exp.notes || '');
    setIsExpenseModalOpen(true);
  };

  const handleSaveExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expTitle.trim() || !expAmount) return;

    const expensePayload = {
      title: expTitle.trim(),
      amount: Math.max(0, Number(expAmount) || 0),
      category: expCategory,
      payment_method: expPaymentMethod,
      date: expDate,
      time: expTime,
      payer_name: expPayer.trim() || 'Self',
      split_count: Math.max(1, Number(expSplitCount) || 1),
      location: expLocation.trim(),
      notes: expNotes.trim()
    };

    if (editingExpenseId) {
      updateExpense(editingExpenseId, expensePayload);
      showToast('Expense updated successfully! (খরচ আপডেট হয়েছে)');
    } else {
      addExpense(expensePayload);
      showToast(`Added ৳ ${expensePayload.amount.toLocaleString()} to expenses! (খরচ যুক্ত হয়েছে)`);
    }

    setIsExpenseModalOpen(false);
  };

  // Quick Note Actions
  const handleOpenAddNote = (presetCategory?: NoteCategory) => {
    setEditingNoteId(null);
    setNoteTitle('');
    setNoteContent('');
    setNoteCategory(presetCategory || 'general');
    setNoteColor('emerald');
    setNoteIsPinned(false);
    setNoteLocation('');
    setNoteChecklistDraft([]);
    setNewChecklistInput('');
    setIsNoteModalOpen(true);
  };

  const handleOpenEditNote = (note: TravelNote) => {
    setEditingNoteId(note.id);
    setNoteTitle(note.title);
    setNoteContent(note.content);
    setNoteCategory(note.category);
    setNoteColor(note.color);
    setNoteIsPinned(note.is_pinned);
    setNoteLocation(note.location_tag || '');
    setNoteChecklistDraft((note.checklist_items || []).map(i => i.text));
    setIsNoteModalOpen(true);
  };

  const handleSaveNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteTitle.trim()) return;

    const checklistItems = noteChecklistDraft.map((text, idx) => ({
      id: `chk-${Date.now()}-${idx}`,
      text,
      completed: false
    }));

    const notePayload = {
      title: noteTitle.trim(),
      content: noteContent.trim(),
      category: noteCategory,
      color: noteColor,
      is_pinned: noteIsPinned,
      has_checklist: checklistItems.length > 0,
      checklist_items: checklistItems,
      location_tag: noteLocation.trim()
    };

    if (editingNoteId) {
      updateNote(editingNoteId, notePayload);
      showToast('Note updated! (নোট সংরক্ষিত হয়েছে)');
    } else {
      addNote(notePayload);
      showToast('New note created! (নতুন নোট যুক্ত হয়েছে)');
    }

    setIsNoteModalOpen(false);
  };

  const handleCopyWhatsApp = () => {
    const text = exportToWhatsAppText();
    navigator.clipboard.writeText(text);
    showToast('📋 Copied formatted tour summary to clipboard for WhatsApp!');
  };

  // Preset Template Loader
  const handleLoadTemplate = (templateType: string) => {
    if (templateType === 'packing') {
      addNote({
        title: '🎒 Bangladesh Tour Packing Checklist',
        content: 'Essential gear for travel across hills, rivers, and beaches in Bangladesh.',
        category: 'packing',
        color: 'sky',
        is_pinned: true,
        has_checklist: true,
        checklist_items: [
          { id: 't1', text: 'Original NID / Passport & copies', completed: false },
          { id: 't2', text: 'Power bank 20,000 mAh & charging cables', completed: false },
          { id: 't3', text: 'Emergency medicines (Paracetamol, ORS, Gastric)', completed: false },
          { id: 't4', text: 'Waterproof bag / rain cover', completed: false },
          { id: 't5', text: 'Trekking sandals / comfortable shoes', completed: false },
          { id: 't6', text: 'Hand sanitizer, wet wipes & tissues', completed: false },
          { id: 't7', text: 'Cash in small BDT notes (৳50, ৳100, ৳500)', completed: false }
        ],
        location_tag: 'Travel Essentials'
      });
      showToast('Packing checklist template added!');
    } else if (templateType === 'emergency') {
      addNote({
        title: '🚨 Bangladesh Traveler Helplines & Numbers',
        content: 'National Emergency: 999\nTourist Police 24/7 Helpline: +880 1320-222222\nBangladesh Railway Ticket Support: 131\nFire Service: 16163\nAmbulance Hotline: 199',
        category: 'emergency',
        color: 'rose',
        is_pinned: true,
        has_checklist: false,
        checklist_items: [],
        location_tag: 'All Bangladesh'
      });
      showToast('Emergency hotlines template added!');
    } else if (templateType === 'food') {
      addNote({
        title: '🍜 Regional Food Wishlist',
        content: '1. Old Dhaka: Nanna Biryani & Beauty Lassi\n2. Sylhet: Shatkora Beef Curry & 7-Layer Tea\n3. Chattogram: Mezban Gosht & Kala Bhuna\n4. Bogura: Authentic Kheer Doi\n5. Cox’s Bazar: Fresh Coral fish & Loitta fry',
        category: 'food',
        color: 'amber',
        is_pinned: false,
        has_checklist: true,
        checklist_items: [
          { id: 'f1', text: 'Old Dhaka Authentic Kacchi', completed: false },
          { id: 'f2', text: 'Mezban Beef in Chattogram', completed: false },
          { id: 'f3', text: 'Bamboo Chicken in Sajek', completed: false },
          { id: 'f4', text: 'Fresh Hilsa fish at Mawa Ghat', completed: false }
        ],
        location_tag: 'Famous BD Foods'
      });
      showToast('Food wishlist template added!');
    }
  };

  // Group Split Calculations
  const groupTotalPaid = groupMembers.reduce((sum, m) => sum + (Number(m.paid) || 0), 0);
  const groupPerPersonShare = groupMembers.length > 0 ? Math.round(groupTotalPaid / groupMembers.length) : 0;

  const handleAddGroupMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberName.trim()) return;
    setGroupMembers(prev => [
      ...prev,
      {
        id: `gm-${Date.now()}`,
        name: newMemberName.trim(),
        paid: Math.max(0, Number(newMemberPaid) || 0)
      }
    ]);
    setNewMemberName('');
    setNewMemberPaid('');
    showToast('Group member added!');
  };

  const handleRemoveGroupMember = (id: string) => {
    setGroupMembers(prev => prev.filter(m => m.id !== id));
  };

  const handleCopyGroupSplitWhatsApp = () => {
    const lines = groupMembers.map(m => {
      const balance = m.paid - groupPerPersonShare;
      const status = balance > 0 
        ? `🟢 Will RECEIVE ৳ ${balance.toLocaleString()}` 
        : balance < 0 
        ? `🔴 Needs to PAY ৳ ${Math.abs(balance).toLocaleString()}` 
        : `⚪ Settled (৳ 0)`;
      return `• ${m.name}: Paid ৳ ${m.paid.toLocaleString()} ➔ ${status}`;
    }).join('\n');

    const message = `👥 *YEANA Group Tour Cost Settlement*
💰 Total Group Spend: ৳ ${groupTotalPaid.toLocaleString()}
👥 Total Travelers: ${groupMembers.length}
⚖️ Equal Share Per Person: ৳ ${groupPerPersonShare.toLocaleString()}

📊 *WHO PAID & WHO OWES:*
${lines}

Generated via YEANA Keep Notes`;

    navigator.clipboard.writeText(message);
    showToast('Group split breakdown copied to clipboard!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-6 pb-28">
      
      {/* Toast Alert */}
      {toast && (
        <div className="fixed top-20 right-4 sm:right-8 z-50 p-4 rounded-2xl bg-slate-900/95 text-white shadow-2xl border border-slate-700 flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs sm:text-sm font-semibold">{toast}</span>
        </div>
      )}

      {/* Header Banner & Live Budget Overview */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 text-white p-6 sm:p-8 shadow-2xl border border-slate-800">
        
        {/* Glow ambient decorations */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-sky-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          
          {/* Title and Description */}
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-bold border border-emerald-400/30 flex items-center gap-1.5 shadow-xs">
                <Receipt className="w-3.5 h-3.5" />
                <span>Traveler Expenses & Notes Hub (নোট ও খরচ)</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[10px] font-mono border border-slate-700">
                Offline Auto-Save ⚡
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white font-sans">
              {t('notes.title')}
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {t('notes.subtitle')}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 w-full lg:w-auto">
            <button
              onClick={handleOpenAddExpense}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-xs sm:text-sm font-extrabold shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>{t('notes.add_expense')}</span>
            </button>

            <button
              onClick={() => handleOpenAddNote()}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold border border-white/20 backdrop-blur-md transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <FileText className="w-4 h-4 text-sky-400" />
              <span>{t('notes.add_note')}</span>
            </button>

            <button
              onClick={handleCopyWhatsApp}
              className="p-2.5 rounded-2xl bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 border border-emerald-500/40 transition-all flex items-center justify-center gap-1.5 text-xs font-bold"
              title="Copy formatted summary to share on WhatsApp"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">WhatsApp Share</span>
            </button>

            <button
              onClick={loadSampleData}
              className="p-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-all flex items-center justify-center gap-1 text-xs"
              title="Load realistic Sajek Valley Tour sample expenses and notes"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">Demo Tour</span>
            </button>
          </div>

        </div>

        {/* Budget Metrics Cards Bar */}
        <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-4 mt-6 pt-6 border-t border-slate-800/80">
          
          {/* Target Budget */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md relative group">
            <div className="flex items-center justify-between text-slate-400 text-[11px] font-bold">
              <span>{t('notes.budget_target')}</span>
              <button 
                onClick={() => setIsBudgetModalOpen(true)}
                className="text-emerald-400 hover:text-emerald-300 text-[10px] font-mono underline"
              >
                Edit
              </button>
            </div>
            <p className="text-lg sm:text-2xl font-black text-white font-mono mt-1">
              ৳ {budgetGoal.toLocaleString()}
            </p>
            <p className="text-[10px] text-slate-400">Total planned trip allowance</p>
          </div>

          {/* Total Spent */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
            <div className="flex items-center justify-between text-slate-400 text-[11px] font-bold">
              <span>{t('notes.total_spent')}</span>
              <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <p className="text-lg sm:text-2xl font-black text-amber-300 font-mono mt-1">
              ৳ {totalExpenses.toLocaleString()}
            </p>
            <p className="text-[10px] text-slate-400">{expenses.length} expense transactions</p>
          </div>

          {/* Remaining Balance */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
            <div className="flex items-center justify-between text-slate-400 text-[11px] font-bold">
              <span>{t('notes.balance_left')}</span>
              <Wallet className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <p className={`text-lg sm:text-2xl font-black font-mono mt-1 ${remainingBudget > 0 ? 'text-emerald-300' : 'text-rose-400'}`}>
              ৳ {remainingBudget.toLocaleString()}
            </p>
            <p className="text-[10px] text-slate-400">
              {remainingBudget > 0 ? 'Available balance' : '⚠️ Over budget limit!'}
            </p>
          </div>

          {/* Saved Notes Count */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
            <div className="flex items-center justify-between text-slate-400 text-[11px] font-bold">
              <span>Saved Notes & Checklists</span>
              <CheckSquare className="w-3.5 h-3.5 text-sky-400" />
            </div>
            <p className="text-lg sm:text-2xl font-black text-sky-300 font-mono mt-1">
              {notes.length}
            </p>
            <p className="text-[10px] text-slate-400">
              {notes.filter(n => n.is_pinned).length} pinned to top
            </p>
          </div>

        </div>

        {/* Budget Progress Bar */}
        <div className="relative z-10 mt-4 space-y-1.5">
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-300">
            <span>Budget Utilization</span>
            <span className={budgetPercentage > 90 ? 'text-rose-400' : budgetPercentage > 75 ? 'text-amber-400' : 'text-emerald-400'}>
              {budgetPercentage}% used
            </span>
          </div>
          <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden p-0.5 border border-slate-700">
            <div 
              className={`h-full rounded-full transition-all duration-500 ${
                budgetPercentage > 90 
                  ? 'bg-gradient-to-r from-rose-500 to-red-600' 
                  : budgetPercentage > 75 
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500' 
                  : 'bg-gradient-to-r from-emerald-400 to-teal-500'
              }`}
              style={{ width: `${Math.min(100, budgetPercentage)}%` }}
            />
          </div>
        </div>

      </div>

      {/* Main Navigation Tabs */}
      <div className="flex items-center gap-1.5 sm:gap-2 p-1.5 rounded-2xl bg-slate-200/70 border border-slate-200 backdrop-blur-md overflow-x-auto scrollbar-none">
        
        <button
          onClick={() => setActiveTab('expenses')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'expenses'
              ? 'bg-white text-emerald-800 shadow-sm border border-emerald-100 scale-102'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
          }`}
        >
          <Receipt className={`w-4 h-4 ${activeTab === 'expenses' ? 'text-emerald-600' : 'text-slate-500'}`} />
          <span>{t('notes.tab_expenses')} ({expenses.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('notes')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'notes'
              ? 'bg-white text-emerald-800 shadow-sm border border-emerald-100 scale-102'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
          }`}
        >
          <FileText className={`w-4 h-4 ${activeTab === 'notes' ? 'text-emerald-600' : 'text-slate-500'}`} />
          <span>{t('notes.tab_notes')} ({notes.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('split')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'split'
              ? 'bg-white text-emerald-800 shadow-sm border border-emerald-100 scale-102'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
          }`}
        >
          <Users className={`w-4 h-4 ${activeTab === 'split' ? 'text-emerald-600' : 'text-slate-500'}`} />
          <span>{t('notes.tab_split')} (গ্রুপ হিসাব)</span>
        </button>

        <button
          onClick={() => setActiveTab('checklists')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'checklists'
              ? 'bg-white text-emerald-800 shadow-sm border border-emerald-100 scale-102'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
          }`}
        >
          <CheckSquare className={`w-4 h-4 ${activeTab === 'checklists' ? 'text-emerald-600' : 'text-slate-500'}`} />
          <span>{t('notes.tab_checklists')}</span>
        </button>

      </div>

      {/* ========================================================================= */}
      {/* TAB 1: EXPENSES & COST TRACKER */}
      {/* ========================================================================= */}
      {activeTab === 'expenses' && (
        <div className="space-y-6">
          
          {/* Category Summary Pills Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {Object.entries(CATEGORIES).map(([catKey, catInfo]) => {
              const Icon = catInfo.icon;
              const catTotal = categoryBreakdown[catKey] || 0;
              const isSelected = selectedExpenseCat === catKey;

              return (
                <div
                  key={catKey}
                  onClick={() => setSelectedExpenseCat(isSelected ? 'all' : catKey)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer select-none ${
                    isSelected 
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-md scale-102' 
                      : `${catInfo.bg} hover:border-slate-300 hover:shadow-xs`
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : catInfo.color}`} />
                    <span className={`text-[11px] font-mono font-bold ${isSelected ? 'text-emerald-100' : 'text-slate-500'}`}>
                      ৳ {catTotal.toLocaleString()}
                    </span>
                  </div>
                  <p className={`text-xs font-bold mt-1.5 truncate ${isSelected ? 'text-white' : 'text-slate-800'}`}>
                    {language === 'bn' ? catInfo.labelBn : catInfo.label}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Search, Payment Filter & Quick Action Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs">
            
            {/* Search */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={expenseSearch}
                onChange={(e) => setExpenseSearch(e.target.value)}
                placeholder="Search expense by title, location, notes, or payer..."
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
              {expenseSearch && (
                <button 
                  onClick={() => setExpenseSearch('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Payment Method Filter */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              <span className="text-[11px] font-bold text-slate-400 whitespace-nowrap">Payment:</span>
              {['all', 'cash', 'bkash', 'nagad', 'card'].map((method) => (
                <button
                  key={method}
                  onClick={() => setSelectedPaymentMethod(method)}
                  className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold capitalize transition-all whitespace-nowrap ${
                    selectedPaymentMethod === method
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {method === 'all' ? 'All' : method}
                </button>
              ))}
            </div>

            {/* Clear all expenses if any */}
            {expenses.length > 0 && (
              <button
                onClick={() => {
                  if (confirm('Are you sure you want to clear all logged expenses? (সব খরচ মুছে ফেলতে চান?)')) {
                    clearExpenses();
                    showToast('All expenses cleared.');
                  }
                }}
                className="px-3 py-1.5 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 text-[11px] font-bold transition-colors whitespace-nowrap"
              >
                Clear All
              </button>
            )}

          </div>

          {/* Expense Entries List */}
          {filteredExpenses.length === 0 ? (
            <div className="text-center py-16 px-4 bg-white rounded-3xl border border-slate-200/80 shadow-card space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                <Receipt className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-800">No Expenses Found</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  {expenseSearch || selectedExpenseCat !== 'all' || selectedPaymentMethod !== 'all'
                    ? 'Try clearing the search or category filters.'
                    : t('notes.empty_expenses')}
                </p>
              </div>
              <button
                onClick={handleOpenAddExpense}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20"
              >
                + Add First Expense (খরচ যোগ করুন)
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredExpenses.map(exp => {
                const catInfo = CATEGORIES[exp.category] || CATEGORIES.other;
                const Icon = catInfo.icon;

                return (
                  <div
                    key={exp.id}
                    className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-emerald-200 shadow-card transition-all hover:shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
                  >
                    
                    {/* Left details */}
                    <div className="flex items-start gap-3.5 flex-1 min-w-0">
                      
                      {/* Icon */}
                      <div className={`w-11 h-11 rounded-2xl ${catInfo.bg} flex items-center justify-center shrink-0 shadow-2xs`}>
                        <Icon className={`w-5 h-5 ${catInfo.color}`} />
                      </div>

                      {/* Main info */}
                      <div className="space-y-1 min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="text-sm sm:text-base font-black text-slate-900 truncate">
                            {exp.title}
                          </h4>
                          <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${catInfo.bg} ${catInfo.color}`}>
                            {language === 'bn' ? catInfo.labelBn : catInfo.label}
                          </span>
                        </div>

                        {/* Sub details: Date, Location, Payment, Payer, Split */}
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                          <span className="flex items-center gap-1 font-mono text-[11px]">
                            <Calendar className="w-3 h-3 text-slate-400" />
                            {exp.date} {exp.time && `• ${exp.time}`}
                          </span>

                          {exp.location && (
                            <span className="flex items-center gap-1 text-[11px]">
                              <MapPin className="w-3 h-3 text-emerald-600" />
                              {exp.location}
                            </span>
                          )}

                          <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-mono uppercase font-bold">
                            💳 {exp.payment_method}
                          </span>

                          {exp.payer_name && exp.payer_name !== 'Self' && (
                            <span className="text-[11px] text-slate-600 font-semibold">
                              Paid by: <strong className="text-slate-800">{exp.payer_name}</strong>
                            </span>
                          )}

                          {exp.split_count && exp.split_count > 1 && (
                            <span className="px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-bold">
                              Split ÷ {exp.split_count} (৳ {Math.round(exp.amount / exp.split_count).toLocaleString()}/person)
                            </span>
                          )}
                        </div>

                        {exp.notes && (
                          <p className="text-xs text-slate-600 bg-slate-50/80 p-2 rounded-xl border border-slate-100 mt-1 italic">
                            "{exp.notes}"
                          </p>
                        )}
                      </div>

                    </div>

                    {/* Right Amount & Actions */}
                    <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                      <div className="text-right">
                        <p className="text-lg sm:text-xl font-black text-slate-900 font-mono">
                          ৳ {exp.amount.toLocaleString()}
                        </p>
                      </div>

                      <div className="flex items-center gap-1 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleOpenEditExpense(exp)}
                          className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors"
                          title="Edit expense"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Delete "${exp.title}"?`)) {
                              deleteExpense(exp.id);
                              showToast('Expense removed.');
                            }
                          }}
                          className="p-1.5 rounded-lg hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-colors"
                          title="Delete expense"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          )}

        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: TRAVEL NOTES & DIGITAL DIARY */}
      {/* ========================================================================= */}
      {activeTab === 'notes' && (
        <div className="space-y-6">
          
          {/* Quick Note Templates Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-sky-50 border border-emerald-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="space-y-0.5">
              <p className="text-xs font-extrabold text-emerald-900 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>Instant Travel Note Templates (রেডিমেড টেমপ্লেট)</span>
              </p>
              <p className="text-[11px] text-emerald-800/80">
                Click to add pre-formatted lists for packing, safety hotlines, or food wishlists.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => handleLoadTemplate('packing')}
                className="px-3 py-1.5 rounded-xl bg-white hover:bg-emerald-600 hover:text-white text-emerald-800 text-xs font-bold border border-emerald-200 shadow-xs transition-all flex items-center gap-1.5"
              >
                <CheckSquare className="w-3.5 h-3.5" />
                <span>Packing List</span>
              </button>

              <button
                onClick={() => handleLoadTemplate('emergency')}
                className="px-3 py-1.5 rounded-xl bg-white hover:bg-rose-600 hover:text-white text-rose-800 text-xs font-bold border border-rose-200 shadow-xs transition-all flex items-center gap-1.5"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Helplines</span>
              </button>

              <button
                onClick={() => handleLoadTemplate('food')}
                className="px-3 py-1.5 rounded-xl bg-white hover:bg-amber-600 hover:text-white text-amber-800 text-xs font-bold border border-amber-200 shadow-xs transition-all flex items-center gap-1.5"
              >
                <Utensils className="w-3.5 h-3.5" />
                <span>Food Wishlist</span>
              </button>
            </div>
          </div>

          {/* Search and Category Filter */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs">
            
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={noteSearch}
                onChange={(e) => setNoteSearch(e.target.value)}
                placeholder="Search travel notes, checklists, memories, or locations..."
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
              {noteSearch && (
                <button 
                  onClick={() => setNoteSearch('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              <span className="text-[11px] font-bold text-slate-400 whitespace-nowrap">Category:</span>
              <button
                onClick={() => setSelectedNoteCat('all')}
                className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all whitespace-nowrap ${
                  selectedNoteCat === 'all'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                All Notes
              </button>
              {Object.entries(NOTE_CATEGORIES).map(([catKey, catVal]) => (
                <button
                  key={catKey}
                  onClick={() => setSelectedNoteCat(catKey)}
                  className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all whitespace-nowrap ${
                    selectedNoteCat === catKey
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {catVal.label}
                </button>
              ))}
            </div>

          </div>

          {/* Notes Card Grid */}
          {filteredNotes.length === 0 ? (
            <div className="text-center py-16 px-4 bg-white rounded-3xl border border-slate-200/80 shadow-card space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center mx-auto">
                <FileText className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-800">No Travel Notes Found</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  {noteSearch || selectedNoteCat !== 'all'
                    ? 'Try clearing the search query or category filter.'
                    : t('notes.empty_notes')}
                </p>
              </div>
              <button
                onClick={() => handleOpenAddNote()}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20"
              >
                + Create First Note (নোট লিখুন)
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredNotes.map(note => {
                const colorStyle = COLOR_STYLES[note.color] || COLOR_STYLES.emerald;
                const catInfo = NOTE_CATEGORIES[note.category] || NOTE_CATEGORIES.general;
                const checklistTotal = note.checklist_items?.length || 0;
                const checklistDone = note.checklist_items?.filter(i => i.completed).length || 0;

                return (
                  <div
                    key={note.id}
                    className={`rounded-3xl p-5 border ${colorStyle.border} ${colorStyle.cardBg} backdrop-blur-md shadow-card transition-all hover:shadow-lg flex flex-col justify-between space-y-4 relative group`}
                  >
                    
                    {/* Top Note Header */}
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        
                        {/* Title & Pin Icon */}
                        <div className="flex items-start gap-1.5 flex-1">
                          {note.is_pinned && (
                            <span className="p-1 rounded-md bg-amber-100 text-amber-700 shadow-2xs shrink-0" title="Pinned note">
                              <Pin className="w-3.5 h-3.5 fill-amber-600 text-amber-600" />
                            </span>
                          )}
                          <h4 className="text-sm font-black text-slate-900 leading-snug">
                            {note.title}
                          </h4>
                        </div>

                        {/* Pin / Edit / Delete Actions */}
                        <div className="flex items-center gap-0.5 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                          <button
                            onClick={() => pinNote(note.id)}
                            className="p-1.5 rounded-lg hover:bg-white/80 text-slate-500 hover:text-amber-600"
                            title={note.is_pinned ? 'Unpin' : 'Pin note to top'}
                          >
                            {note.is_pinned ? <PinOff className="w-3.5 h-3.5" /> : <Pin className="w-3.5 h-3.5" />}
                          </button>
                          <button
                            onClick={() => handleOpenEditNote(note)}
                            className="p-1.5 rounded-lg hover:bg-white/80 text-slate-500 hover:text-slate-900"
                            title="Edit note"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Delete note "${note.title}"?`)) {
                                deleteNote(note.id);
                                showToast('Note removed.');
                              }
                            }}
                            className="p-1.5 rounded-lg hover:bg-white/80 text-slate-400 hover:text-rose-600"
                            title="Delete note"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                      </div>

                      {/* Category and Location Badges */}
                      <div className="flex flex-wrap items-center gap-1.5 text-[10px]">
                        <span className={`px-2 py-0.5 rounded-md font-bold ${colorStyle.badge}`}>
                          {catInfo.label}
                        </span>
                        {note.location_tag && (
                          <span className="px-2 py-0.5 rounded-md bg-white/80 text-slate-700 font-semibold border border-slate-200/60 flex items-center gap-1">
                            <MapPin className="w-2.5 h-2.5 text-emerald-600" />
                            {note.location_tag}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Note Content Text */}
                    {note.content && (
                      <p className="text-xs text-slate-700 whitespace-pre-line leading-relaxed">
                        {note.content}
                      </p>
                    )}

                    {/* Interactive Checklist Items (if present) */}
                    {note.checklist_items && note.checklist_items.length > 0 && (
                      <div className="space-y-2 pt-2 border-t border-slate-200/60">
                        <div className="flex items-center justify-between text-[11px] font-bold text-slate-700">
                          <span className="flex items-center gap-1">
                            <CheckSquare className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Checklist ({checklistDone}/{checklistTotal})</span>
                          </span>
                          <span className="text-emerald-700 font-mono">
                            {Math.round((checklistDone / checklistTotal) * 100)}%
                          </span>
                        </div>

                        <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                          {note.checklist_items.map(item => (
                            <div 
                              key={item.id}
                              onClick={() => toggleChecklistItem(note.id, item.id)}
                              className={`flex items-start gap-2 p-1.5 rounded-xl cursor-pointer select-none transition-colors ${
                                item.completed ? 'bg-emerald-100/40 text-slate-500 line-through' : 'bg-white/80 hover:bg-white text-slate-800'
                              }`}
                            >
                              {item.completed ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                              ) : (
                                <Circle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                              )}
                              <span className="text-xs leading-tight">{item.text}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Note Footer timestamp */}
                    <div className="pt-2 border-t border-slate-200/50 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                      <span>{new Date(note.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</span>
                      <span className="capitalize">{note.category}</span>
                    </div>

                  </div>
                );
              })}
            </div>
          )}

        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: GROUP TRIP SPLITTER */}
      {/* ========================================================================= */}
      {activeTab === 'split' && (
        <div className="space-y-6">
          
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-card space-y-6">
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                    <Users className="w-4 h-4" />
                  </div>
                  <h3 className="text-lg font-black text-slate-900">
                    Group Tour Expense Calculator (গ্রুপ খরচের ভাগ ও হিসাব)
                  </h3>
                </div>
                <p className="text-xs text-slate-500">
                  Easily divide tour expenses between friends/family and calculate who pays or receives what.
                </p>
              </div>

              <button
                onClick={handleCopyGroupSplitWhatsApp}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-emerald-600/20 active:scale-95"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Copy WhatsApp Breakdown</span>
              </button>
            </div>

            {/* Split Metrics Banner */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200">
                <p className="text-xs font-bold text-purple-700">Total Group Spending</p>
                <p className="text-2xl font-black text-purple-950 font-mono mt-1">
                  ৳ {groupTotalPaid.toLocaleString()}
                </p>
                <p className="text-[10px] text-purple-600 mt-0.5">Sum of all contributions</p>
              </div>

              <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200">
                <p className="text-xs font-bold text-sky-700">Total Travelers in Group</p>
                <p className="text-2xl font-black text-sky-950 font-mono mt-1">
                  {groupMembers.length} Persons
                </p>
                <p className="text-[10px] text-sky-600 mt-0.5">Equal split members</p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                <p className="text-xs font-bold text-emerald-700">Equal Share Per Person</p>
                <p className="text-2xl font-black text-emerald-950 font-mono mt-1">
                  ৳ {groupPerPersonShare.toLocaleString()}
                </p>
                <p className="text-[10px] text-emerald-600 mt-0.5">Target contribution per person</p>
              </div>

            </div>

            {/* Add Member Form */}
            <form onSubmit={handleAddGroupMember} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center gap-3">
              <div className="flex-1 w-full">
                <input
                  type="text"
                  value={newMemberName}
                  onChange={(e) => setNewMemberName(e.target.value)}
                  placeholder="Traveler Name (e.g. Mahir, Nabila)..."
                  className="w-full p-2.5 rounded-xl bg-white border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  required
                />
              </div>

              <div className="w-full sm:w-48">
                <input
                  type="number"
                  value={newMemberPaid}
                  onChange={(e) => setNewMemberPaid(e.target.value)}
                  placeholder="Amount Paid (৳ BDT)..."
                  className="w-full p-2.5 rounded-xl bg-white border border-slate-200 text-xs font-mono font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold whitespace-nowrap shadow-xs"
              >
                + Add Member
              </button>
            </form>

            {/* Members Settlement List */}
            <div className="space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-700">
                Individual Breakdown & Settlements (কে কত পাবে বা দিবে)
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {groupMembers.map(m => {
                  const balance = m.paid - groupPerPersonShare;
                  const isOwed = balance > 0;
                  const isDebt = balance < 0;

                  return (
                    <div 
                      key={m.id}
                      className={`p-4 rounded-2xl border flex items-center justify-between gap-3 ${
                        isOwed 
                          ? 'bg-emerald-50/70 border-emerald-200' 
                          : isDebt 
                          ? 'bg-rose-50/70 border-rose-200' 
                          : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-black text-slate-900">{m.name}</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600">
                            Paid: ৳ {m.paid.toLocaleString()}
                          </span>
                        </div>

                        <p className="text-xs font-bold">
                          {isOwed && (
                            <span className="text-emerald-700">
                              🟢 Will RECEIVE: ৳ {balance.toLocaleString()}
                            </span>
                          )}
                          {isDebt && (
                            <span className="text-rose-700">
                              🔴 Needs to PAY: ৳ {Math.abs(balance).toLocaleString()}
                            </span>
                          )}
                          {!isOwed && !isDebt && (
                            <span className="text-slate-600">
                              ⚪ Exactly settled (৳ 0 balance)
                            </span>
                          )}
                        </p>
                      </div>

                      <button
                        onClick={() => handleRemoveGroupMember(m.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-white"
                        title="Remove member"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>

            </div>

          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: PACKING & CHECKLISTS OVERVIEW */}
      {/* ========================================================================= */}
      {activeTab === 'checklists' && (
        <div className="space-y-6">
          
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-card space-y-6">
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
              <div className="space-y-1">
                <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <CheckSquare className="w-5 h-5 text-emerald-600" />
                  <span>Travel Checklists & Packing Central</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Track all your to-dos, essentials, and packing items across your tour notes in one unified view.
                </p>
              </div>

              <button
                onClick={() => handleOpenAddNote('packing')}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-emerald-600/20"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Create Checklist</span>
              </button>
            </div>

            {/* Active Checklists Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {notes.filter(n => n.checklist_items && n.checklist_items.length > 0).map(note => {
                const total = note.checklist_items.length;
                const completed = note.checklist_items.filter(i => i.completed).length;
                const percent = Math.round((completed / total) * 100);

                return (
                  <div 
                    key={note.id}
                    className="p-5 rounded-2xl bg-slate-50/90 border border-slate-200 hover:border-emerald-300 transition-all space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-slate-900">{note.title}</h4>
                      <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                        {completed}/{total} ({percent}%)
                      </span>
                    </div>

                    {/* Mini Progress */}
                    <div className="w-full h-1.5 rounded-full bg-slate-200 overflow-hidden">
                      <div 
                        className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                        style={{ width: `${percent}%` }}
                      />
                    </div>

                    <div className="space-y-1.5 pt-1">
                      {note.checklist_items.map(item => (
                        <div
                          key={item.id}
                          onClick={() => toggleChecklistItem(note.id, item.id)}
                          className={`flex items-center gap-2 p-2 rounded-xl cursor-pointer transition-colors ${
                            item.completed 
                              ? 'bg-emerald-50/60 text-slate-400 line-through' 
                              : 'bg-white text-slate-800 shadow-2xs hover:bg-emerald-50/30'
                          }`}
                        >
                          {item.completed ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          ) : (
                            <Circle className="w-4 h-4 text-slate-400 shrink-0" />
                          )}
                          <span className="text-xs">{item.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: ADD / EDIT EXPENSE */}
      {/* ========================================================================= */}
      {isExpenseModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-100 space-y-5 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Receipt className="w-4 h-4" />
                </div>
                <h3 className="text-base font-black text-slate-900">
                  {editingExpenseId ? 'Edit Travel Expense' : 'Log New Expense (খরচের হিসাব)'}
                </h3>
              </div>
              <button 
                onClick={() => setIsExpenseModalOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveExpense} className="space-y-4">
              
              {/* Title */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Expense Title / Item Name *
                </label>
                <input
                  type="text"
                  value={expTitle}
                  onChange={(e) => setExpTitle(e.target.value)}
                  placeholder="e.g. Sajek Chander Gari, Hotel Booking, Bamboo Chicken..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  required
                />
              </div>

              {/* Amount & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Amount (৳ BDT) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-bold font-mono">৳</span>
                    <input
                      type="number"
                      value={expAmount}
                      onChange={(e) => setExpAmount(e.target.value)}
                      placeholder="e.g. 2500"
                      className="w-full pl-8 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs font-mono font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Category *
                  </label>
                  <select
                    value={expCategory}
                    onChange={(e) => setExpCategory(e.target.value as ExpenseCategory)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  >
                    {Object.entries(CATEGORIES).map(([catKey, catVal]) => (
                      <option key={catKey} value={catKey}>
                        {catVal.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Payment Method & Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Payment Method
                  </label>
                  <select
                    value={expPaymentMethod}
                    onChange={(e) => setExpPaymentMethod(e.target.value as PaymentMethod)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  >
                    <option value="cash">Cash (নগদ)</option>
                    <option value="bkash">bKash (বিকাশ)</option>
                    <option value="nagad">Nagad (নগদ)</option>
                    <option value="card">Debit/Credit Card</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    value={expDate}
                    onChange={(e) => setExpDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>
              </div>

              {/* Payer & Split Count */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Paid By (Traveler Name)
                  </label>
                  <input
                    type="text"
                    value={expPayer}
                    onChange={(e) => setExpPayer(e.target.value)}
                    placeholder="Self or Friend's Name"
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Split Among (Persons)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={expSplitCount}
                    onChange={(e) => setExpSplitCount(e.target.value)}
                    placeholder="1"
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-mono font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Location / District
                </label>
                <input
                  type="text"
                  value={expLocation}
                  onChange={(e) => setExpLocation(e.target.value)}
                  placeholder="e.g. Sajek Valley, Cox's Bazar, Sreemangal..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Remarks / Notes
                </label>
                <textarea
                  value={expNotes}
                  onChange={(e) => setExpNotes(e.target.value)}
                  placeholder="Add any specific details, receipt info, or notes..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  rows={2}
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsExpenseModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20"
                >
                  {editingExpenseId ? 'Save Changes' : 'Save Expense'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: ADD / EDIT NOTE */}
      {/* ========================================================================= */}
      {isNoteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-100 space-y-5 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center">
                  <FileText className="w-4 h-4" />
                </div>
                <h3 className="text-base font-black text-slate-900">
                  {editingNoteId ? 'Edit Travel Note' : 'Create Travel Note & Checklist'}
                </h3>
              </div>
              <button 
                onClick={() => setIsNoteModalOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveNote} className="space-y-4">
              
              {/* Title */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Note Title *
                </label>
                <input
                  type="text"
                  value={noteTitle}
                  onChange={(e) => setNoteTitle(e.target.value)}
                  placeholder="e.g. Packing Checklist, Emergency Contacts, Secret Sunset Spot..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  required
                />
              </div>

              {/* Category & Color */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Category
                  </label>
                  <select
                    value={noteCategory}
                    onChange={(e) => setNoteCategory(e.target.value as NoteCategory)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  >
                    {Object.entries(NOTE_CATEGORIES).map(([catKey, catVal]) => (
                      <option key={catKey} value={catKey}>
                        {catVal.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Color Theme
                  </label>
                  <select
                    value={noteColor}
                    onChange={(e) => setNoteColor(e.target.value as NoteColor)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  >
                    <option value="emerald">Emerald Green (সবুজ)</option>
                    <option value="sky">Sky Blue (আকাশি)</option>
                    <option value="amber">Warm Amber (হলুদ)</option>
                    <option value="rose">Rose Pink (গোলাপি)</option>
                    <option value="purple">Purple (বেগুনি)</option>
                    <option value="slate">Cool Slate (ধূসর)</option>
                  </select>
                </div>
              </div>

              {/* Pinned & Location Tag */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Location Tag
                  </label>
                  <input
                    type="text"
                    value={noteLocation}
                    onChange={(e) => setNoteLocation(e.target.value)}
                    placeholder="e.g. Sajek, Sylhet, Srimangal..."
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>

                <div className="pt-4">
                  <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-bold text-slate-800">
                    <input
                      type="checkbox"
                      checked={noteIsPinned}
                      onChange={(e) => setNoteIsPinned(e.target.checked)}
                      className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                    />
                    <span>Pin to top (উপরে পিন করুন)</span>
                  </label>
                </div>
              </div>

              {/* Note Content */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Note Content / Thoughts
                </label>
                <textarea
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  placeholder="Write your travel advice, memories, timings, or details here..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  rows={3}
                />
              </div>

              {/* Checklist Items Builder */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <label className="block text-xs font-bold text-slate-700">
                  Interactive Checklist Items (ঐচ্ছিক চেকলিস্ট)
                </label>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newChecklistInput}
                    onChange={(e) => setNewChecklistInput(e.target.value)}
                    placeholder="Add checklist item (e.g. Power bank, NID copy)..."
                    className="flex-1 p-2 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        if (newChecklistInput.trim()) {
                          setNoteChecklistDraft(prev => [...prev, newChecklistInput.trim()]);
                          setNewChecklistInput('');
                        }
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (newChecklistInput.trim()) {
                        setNoteChecklistDraft(prev => [...prev, newChecklistInput.trim()]);
                        setNewChecklistInput('');
                      }
                    }}
                    className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold"
                  >
                    + Add Item
                  </button>
                </div>

                {noteChecklistDraft.length > 0 && (
                  <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                    {noteChecklistDraft.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-1.5 bg-slate-50 rounded-lg text-xs">
                        <span className="text-slate-700 truncate">• {item}</span>
                        <button
                          type="button"
                          onClick={() => setNoteChecklistDraft(prev => prev.filter((_, i) => i !== idx))}
                          className="text-slate-400 hover:text-rose-600 p-1"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit Buttons */}
              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsNoteModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20"
                >
                  {editingNoteId ? 'Save Changes' : 'Create Note'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: EDIT BUDGET GOAL */}
      {/* ========================================================================= */}
      {isBudgetModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl border border-slate-100 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-1">
              <h3 className="text-base font-black text-slate-900">Set Tour Budget Goal</h3>
              <p className="text-xs text-slate-500">
                Enter your total estimated trip budget in Bangladeshi Taka (৳ BDT).
              </p>
            </div>

            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-bold font-mono">৳</span>
              <input
                type="number"
                value={tempBudgetInput}
                onChange={(e) => setTempBudgetInput(e.target.value)}
                placeholder="25000"
                className="w-full pl-8 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm font-mono font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setIsBudgetModalOpen(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const val = Math.max(0, Number(tempBudgetInput) || 0);
                  setBudgetGoal(val);
                  setIsBudgetModalOpen(false);
                  showToast(`Budget target set to ৳ ${val.toLocaleString()}`);
                }}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20"
              >
                Update Budget
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default KeepNotesView;
