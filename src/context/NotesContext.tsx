import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  TravelExpense, 
  TravelNote, 
  ChecklistItem, 
  ExpenseCategory, 
  PaymentMethod,
  NoteCategory,
  NoteColor
} from '../types';

interface NotesContextType {
  expenses: TravelExpense[];
  notes: TravelNote[];
  budgetGoal: number;
  totalExpenses: number;
  remainingBudget: number;
  budgetPercentage: number;
  addExpense: (expense: Omit<TravelExpense, 'id' | 'created_at'>) => void;
  updateExpense: (id: string, updated: Partial<TravelExpense>) => void;
  deleteExpense: (id: string) => void;
  clearExpenses: () => void;
  addNote: (note: Omit<TravelNote, 'id' | 'created_at' | 'updated_at'>) => void;
  updateNote: (id: string, updated: Partial<TravelNote>) => void;
  deleteNote: (id: string) => void;
  toggleChecklistItem: (noteId: string, itemId: string) => void;
  addChecklistItem: (noteId: string, text: string) => void;
  removeChecklistItem: (noteId: string, itemId: string) => void;
  pinNote: (id: string) => void;
  setBudgetGoal: (goal: number) => void;
  loadSampleData: () => void;
  exportToWhatsAppText: () => string;
}

const STORAGE_KEYS = {
  EXPENSES: 'yeana_travel_expenses',
  NOTES: 'yeana_travel_notes',
  BUDGET: 'yeana_travel_budget_goal',
};

// Realistic authentic Bangladesh travel starter seed data
const SAMPLE_EXPENSES: TravelExpense[] = [
  {
    id: 'exp-1',
    title: 'Chander Gari Safari Rental (Dighinala to Sajek)',
    amount: 9500,
    category: 'transport',
    date: new Date(Date.now() - 2 * 86400000).toISOString().split('T')[0],
    time: '09:30 AM',
    payment_method: 'cash',
    payer_name: 'Tanvir',
    split_count: 5,
    location: 'Khagrachhari - Sajek',
    notes: 'Includes army escort convoy return fare and driver allowance',
    created_at: new Date(Date.now() - 2 * 86400000).toISOString()
  },
  {
    id: 'exp-2',
    title: 'Cloud View Wooden Eco-Cottage (2 Nights)',
    amount: 7200,
    category: 'hotel',
    date: new Date(Date.now() - 2 * 86400000).toISOString().split('T')[0],
    time: '01:00 PM',
    payment_method: 'bkash',
    payer_name: 'Yead',
    split_count: 5,
    location: 'Ruilui Para, Sajek',
    notes: 'Valley cloud balcony view room booked via advance',
    created_at: new Date(Date.now() - 2 * 86400000).toISOString()
  },
  {
    id: 'exp-3',
    title: 'Traditional Bamboo Chicken Dinner & Sticky Rice',
    amount: 1850,
    category: 'food',
    date: new Date(Date.now() - 1 * 86400000).toISOString().split('T')[0],
    time: '08:45 PM',
    payment_method: 'cash',
    payer_name: 'Fahim',
    split_count: 5,
    location: 'Indigenous Food Corner, Sajek',
    notes: '2 bamboo chickens + local mountain herbs salad',
    created_at: new Date(Date.now() - 1 * 86400000).toISOString()
  },
  {
    id: 'exp-4',
    title: 'Helipad Sunrise Entry & Hot Tea with Ginger',
    amount: 250,
    category: 'activities',
    date: new Date().toISOString().split('T')[0],
    time: '05:45 AM',
    payment_method: 'cash',
    payer_name: 'Self',
    split_count: 1,
    location: 'Sajek Helipad 2',
    notes: 'Morning tea with organic mountain ginger',
    created_at: new Date().toISOString()
  },
  {
    id: 'exp-5',
    title: 'Handmade Tribal Shawls & Souvenirs for Family',
    amount: 2100,
    category: 'shopping',
    date: new Date().toISOString().split('T')[0],
    time: '03:15 PM',
    payment_method: 'nagad',
    payer_name: 'Self',
    split_count: 1,
    location: 'Konglak Para Bazaar',
    notes: 'Authentic handmade woven mufflers and bamboo crafts',
    created_at: new Date().toISOString()
  }
];

const SAMPLE_NOTES: TravelNote[] = [
  {
    id: 'note-1',
    title: 'Sajek Tour Checklist & Essentials',
    content: 'Ensure all national ID cards are photocopied for Army Checkpost verification at Baghaihat and Dighinala.',
    category: 'packing',
    color: 'emerald',
    is_pinned: true,
    has_checklist: true,
    checklist_items: [
      { id: 'c1', text: 'Original NID & 3 sets of photocopies', completed: true },
      { id: 'c2', text: 'Power banks (electricity is solar/generator powered)', completed: true },
      { id: 'c3', text: 'Teletalk / Robi SIM for hill connectivity', completed: true },
      { id: 'c4', text: 'Odomos / Mosquito repellent cream', completed: false },
      { id: 'c5', text: 'Warm windcheater jacket for chilly hill morning', completed: false },
      { id: 'c6', text: 'Motion sickness & first-aid medicines', completed: true }
    ],
    location_tag: 'Sajek Valley',
    created_at: new Date(Date.now() - 3 * 86400000).toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'note-2',
    title: 'Emergency Contact Numbers & Army Escort Times',
    content: 'Morning Army Escort: 10:30 AM | Afternoon Escort: 03:00 PM\nBaghaihat Army Camp: +880 1769-312345\nTourist Police Sajek Desk: +880 1320-222222\nJeep Association Master: +880 1819-000000',
    category: 'emergency',
    color: 'rose',
    is_pinned: true,
    has_checklist: false,
    checklist_items: [],
    location_tag: 'Dighinala / Sajek',
    created_at: new Date(Date.now() - 4 * 86400000).toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'note-3',
    title: 'Must-Try Dishes & Secret Sunset Points',
    content: '1. Bamboo shoot duck curry at Ruilui Para.\n2. Fresh papaya shake at Konglak top.\n3. Sunset view from Helipad 1 behind Kasalang resort.\n4. Stargazing and Milky Way photography from Konglak Peak at 2:00 AM.',
    category: 'food',
    color: 'amber',
    is_pinned: false,
    has_checklist: false,
    checklist_items: [],
    location_tag: 'Konglak & Ruilui',
    created_at: new Date(Date.now() - 1 * 86400000).toISOString(),
    updated_at: new Date().toISOString()
  }
];

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export const NotesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [expenses, setExpenses] = useState<TravelExpense[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.EXPENSES);
      return saved ? JSON.parse(saved) : SAMPLE_EXPENSES;
    } catch {
      return SAMPLE_EXPENSES;
    }
  });

  const [notes, setNotes] = useState<TravelNote[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.NOTES);
      return saved ? JSON.parse(saved) : SAMPLE_NOTES;
    } catch {
      return SAMPLE_NOTES;
    }
  });

  const [budgetGoal, setBudgetGoal] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BUDGET);
      return saved ? Number(saved) : 25000;
    } catch {
      return 25000;
    }
  });

  // Save to LocalStorage on changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.EXPENSES, JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BUDGET, budgetGoal.toString());
  }, [budgetGoal]);

  // Derived budget metrics
  const totalExpenses = expenses.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
  const remainingBudget = Math.max(0, budgetGoal - totalExpenses);
  const budgetPercentage = budgetGoal > 0 ? Math.min(100, Math.round((totalExpenses / budgetGoal) * 100)) : 0;

  // Expense CRUD
  const addExpense = (expenseData: Omit<TravelExpense, 'id' | 'created_at'>) => {
    const newExpense: TravelExpense = {
      ...expenseData,
      id: `exp-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      created_at: new Date().toISOString()
    };
    setExpenses(prev => [newExpense, ...prev]);
  };

  const updateExpense = (id: string, updated: Partial<TravelExpense>) => {
    setExpenses(prev => prev.map(exp => exp.id === id ? { ...exp, ...updated } : exp));
  };

  const deleteExpense = (id: string) => {
    setExpenses(prev => prev.filter(exp => exp.id !== id));
  };

  const clearExpenses = () => {
    setExpenses([]);
  };

  // Notes CRUD
  const addNote = (noteData: Omit<TravelNote, 'id' | 'created_at' | 'updated_at'>) => {
    const newNote: TravelNote = {
      ...noteData,
      id: `note-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    setNotes(prev => [newNote, ...prev]);
  };

  const updateNote = (id: string, updated: Partial<TravelNote>) => {
    setNotes(prev => prev.map(n => n.id === id ? { ...n, ...updated, updated_at: new Date().toISOString() } : n));
  };

  const deleteNote = (id: string) => {
    setNotes(prev => prev.filter(n => n.id !== id));
  };

  const toggleChecklistItem = (noteId: string, itemId: string) => {
    setNotes(prev => prev.map(n => {
      if (n.id !== noteId) return n;
      const updatedChecklist = (n.checklist_items || []).map(item => 
        item.id === itemId ? { ...item, completed: !item.completed } : item
      );
      return { ...n, checklist_items: updatedChecklist, updated_at: new Date().toISOString() };
    }));
  };

  const addChecklistItem = (noteId: string, text: string) => {
    if (!text.trim()) return;
    setNotes(prev => prev.map(n => {
      if (n.id !== noteId) return n;
      const newItem: ChecklistItem = {
        id: `chk-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
        text: text.trim(),
        completed: false
      };
      return { 
        ...n, 
        has_checklist: true,
        checklist_items: [...(n.checklist_items || []), newItem], 
        updated_at: new Date().toISOString() 
      };
    }));
  };

  const removeChecklistItem = (noteId: string, itemId: string) => {
    setNotes(prev => prev.map(n => {
      if (n.id !== noteId) return n;
      const updatedChecklist = (n.checklist_items || []).filter(item => item.id !== itemId);
      return { 
        ...n, 
        checklist_items: updatedChecklist, 
        updated_at: new Date().toISOString() 
      };
    }));
  };

  const pinNote = (id: string) => {
    setNotes(prev => prev.map(n => n.id === id ? { ...n, is_pinned: !n.is_pinned } : n));
  };

  const loadSampleData = () => {
    setExpenses(SAMPLE_EXPENSES);
    setNotes(SAMPLE_NOTES);
    setBudgetGoal(25000);
  };

  // WhatsApp / Clipboard summary formatter
  const exportToWhatsAppText = (): string => {
    const dateStr = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    
    // Calculate category breakdown
    const catTotals: Record<string, number> = {};
    expenses.forEach(e => {
      catTotals[e.category] = (catTotals[e.category] || 0) + e.amount;
    });

    const categoryLines = Object.entries(catTotals)
      .map(([cat, amt]) => `• ${cat.toUpperCase()}: ৳ ${amt.toLocaleString()}`)
      .join('\n');

    const expenseList = expenses.slice(0, 10).map((e, idx) => 
      `${idx + 1}. ${e.title} - ৳ ${e.amount.toLocaleString()} (${e.payment_method.toUpperCase()})`
    ).join('\n');

    return `🎒 *YEANA Traveler Cost & Notes Summary*
📅 Date: ${dateStr}

💰 *BUDGET OVERVIEW:*
• Target Budget: ৳ ${budgetGoal.toLocaleString()}
• Total Spent: ৳ ${totalExpenses.toLocaleString()}
• Remaining Balance: ৳ ${remainingBudget.toLocaleString()}
• Budget Used: ${budgetPercentage}%

📊 *CATEGORY BREAKDOWN:*
${categoryLines || 'No expenses logged'}

📝 *RECENT EXPENSE ENTRIES:*
${expenseList || 'No entries'}

📌 *IMPORTANT NOTES COUNT:* ${notes.length} note(s) saved.
Generated with YEANA — Bangladesh Travel Companion`;
  };

  return (
    <NotesContext.Provider value={{
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
    }}>
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error('useNotes must be used within a NotesProvider');
  }
  return context;
};
