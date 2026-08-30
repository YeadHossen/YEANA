import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  MapPin, 
  Plus, 
  Trash2, 
  DollarSign, 
  CheckCircle2, 
  Compass, 
  Clock, 
  Sparkles, 
  Download, 
  Share2, 
  ChevronRight,
  Layers,
  ArrowRight,
  HelpCircle
} from 'lucide-react';
import { useTrip } from '../context/TripContext';
import { useLanguage } from '../context/LanguageContext';
import { useFavorites } from '../context/FavoritesContext';
import { Place, District, TripBudget } from '../types';
import { DataService } from '../services/dataService';

interface TripPlannerViewProps {
  onSelectPlace: (place: Place) => void;
}

export const TripPlannerView: React.FC<TripPlannerViewProps> = ({ onSelectPlace }) => {
  const { t, language } = useLanguage();
  const { trips, activeTrip, setActiveTrip, createTrip, addCustomStopToTrip, removeTripPlace, updateTripBudget, deleteTrip } = useTrip();
  const { downloadOfflinePackage, isOfflineReady } = useFavorites();
  
  const [districts, setDistricts] = useState<District[]>([]);
  const [places, setPlaces] = useState<Place[]>([]);
  const [isCreatingTrip, setIsCreatingTrip] = useState<boolean>(false);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);

  // New Trip form state
  const [newTitle, setNewTitle] = useState<string>('');
  const [newDestination, setNewDestination] = useState<string>('Sylhet');
  const [newStartDate, setNewStartDate] = useState<string>('2026-10-15');
  const [newEndDate, setNewEndDate] = useState<string>('2026-10-18');
  const [newDuration, setNewDuration] = useState<number>(3);

  // Add stop modal/inline state
  const [addingStopDay, setAddingStopDay] = useState<number | null>(null);
  const [stopTitle, setStopTitle] = useState<string>('');
  const [stopTimeSlot, setStopTimeSlot] = useState<string>('Morning (09:00 AM)');
  const [stopNotes, setStopNotes] = useState<string>('');

  useEffect(() => {
    async function loadData() {
      const [d, p] = await Promise.all([
        DataService.getDistricts(),
        DataService.getPlaces()
      ]);
      setDistricts(d);
      setPlaces(p);
    }
    loadData();
  }, []);

  const handleCreateTripSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    createTrip({
      title: newTitle,
      destination: newDestination,
      start_date: newStartDate,
      end_date: newEndDate,
      duration_days: newDuration,
      budget: {
        transport: 2000,
        hotel: 3000,
        food: 1500,
        activities: 500,
        shopping: 1000,
        ride: 1000,
        other: 500
      },
      total_budget: 9500
    });

    setIsCreatingTrip(false);
    setNewTitle('');
  };

  const handleAddStopSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeTrip || addingStopDay === null || !stopTitle.trim()) return;

    addCustomStopToTrip(activeTrip.id, stopTitle, addingStopDay, stopTimeSlot, stopNotes);
    setStopTitle('');
    setStopNotes('');
    setAddingStopDay(null);
  };

  const handleBudgetChange = (category: keyof TripBudget, value: number) => {
    if (!activeTrip) return;
    const updatedBudget = {
      ...activeTrip.budget,
      [category]: value
    };
    updateTripBudget(activeTrip.id, updatedBudget);
  };

  const handleOfflineDownload = () => {
    downloadOfflinePackage();
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8 pb-20">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-brand-700">
            <Calendar className="w-4 h-4 text-brand-600" />
            <span>Itinerary & Budget Creator</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 font-sans">
            Personalized Trip Planner
          </h1>
          <p className="text-sm text-slate-500 max-w-2xl leading-relaxed">
            Create multi-day itineraries for Bangladesh, organize places per day, estimate total budget, and save for offline exploration.
          </p>
        </div>

        <button
          onClick={() => setIsCreatingTrip(true)}
          className="px-5 py-2.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-brand-700/20 transition-all flex items-center gap-2 self-start md:self-auto active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>New Trip Itinerary</span>
        </button>
      </div>

      {/* Trips Selector Tabs */}
      {trips.length > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 scrollbar-none">
          {trips.map(t => {
            const isActive = activeTrip?.id === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTrip(t)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                  isActive 
                    ? 'bg-slate-900 text-white shadow-sm' 
                    : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                }`}
              >
                <span>{t.title}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-md ${isActive ? 'bg-slate-800 text-teal-300' : 'bg-slate-100 text-slate-600'}`}>
                  {t.duration_days} Days
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* CREATE NEW TRIP MODAL */}
      {isCreatingTrip && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-1 border-b border-slate-100 pb-4">
              <h3 className="text-xl font-black text-slate-900 font-sans">Create New Trip Itinerary</h3>
              <p className="text-xs text-slate-500">Enter your destination and travel dates to start planning.</p>
            </div>

            <form onSubmit={handleCreateTripSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Trip Name</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Sylhet Monsoon Tour, Sajek Valley Cloud Trek"
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Destination District</label>
                  <select
                    value={newDestination}
                    onChange={(e) => setNewDestination(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-slate-50"
                  >
                    {districts.map(d => (
                      <option key={d.id} value={d.name}>{d.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Duration (Days)</label>
                  <input
                    type="number"
                    min="1"
                    max="14"
                    value={newDuration}
                    onChange={(e) => setNewDuration(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Start Date</label>
                  <input
                    type="date"
                    value={newStartDate}
                    onChange={(e) => setNewStartDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">End Date</label>
                  <input
                    type="date"
                    value={newEndDate}
                    onChange={(e) => setNewEndDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsCreatingTrip(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-md shadow-brand-700/20"
                >
                  Create Plan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ACTIVE TRIP DETAILS & ITINERARY BUILDER */}
      {activeTrip ? (
        <div className="space-y-8">
          
          {/* Trip Summary Card */}
          <div className="bg-gradient-to-r from-slate-900 to-brand-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            <div className="space-y-2 z-10">
              <span className="px-3 py-1 rounded-full bg-brand-500/30 text-teal-300 border border-brand-400/30 text-xs font-bold">
                📍 {activeTrip.destination}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black font-sans">{activeTrip.title}</h2>
              <p className="text-xs text-slate-300">
                🗓️ {activeTrip.start_date} to {activeTrip.end_date} • <span className="font-bold text-white">{activeTrip.duration_days} Days Itinerary</span>
              </p>
              {activeTrip.notes && (
                <p className="text-xs text-slate-300 bg-white/10 p-2.5 rounded-xl max-w-xl">
                  💡 {activeTrip.notes}
                </p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 z-10">
              <button
                onClick={handleOfflineDownload}
                className="px-4 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-bold shadow-md transition-all flex items-center justify-center gap-1.5"
              >
                <Download className="w-4 h-4" />
                <span>{downloadSuccess ? 'Downloaded for Offline ✓' : 'Download for Offline'}</span>
              </button>

              <button
                onClick={() => {
                  if (confirm('Delete this trip itinerary?')) {
                    deleteTrip(activeTrip.id);
                  }
                }}
                className="p-2.5 rounded-xl bg-white/10 hover:bg-rose-500 text-white text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
                title="Delete Trip"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* MAIN TWO COLUMNS: Days Itinerary (7 cols) & Real-time Budget Estimator (5 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* 1. DAYS ITINERARY (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-900 font-sans">
                  Daily Itinerary Schedule
                </h3>
                <span className="text-xs text-slate-500">
                  {activeTrip.places.length} activities scheduled
                </span>
              </div>

              {/* Loop through each Day */}
              {Array.from({ length: activeTrip.duration_days }, (_, i) => i + 1).map(dayNum => {
                const dayPlaces = activeTrip.places.filter(p => p.day_number === dayNum);

                return (
                  <div key={dayNum} className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-card space-y-4">
                    
                    {/* Day Header */}
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-brand-600 text-white font-black text-xs flex items-center justify-center">
                          D{dayNum}
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-900">
                            Day {dayNum} Schedule
                          </h4>
                          <p className="text-[10px] text-slate-400">
                            {dayPlaces.length} stops planned
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => setAddingStopDay(dayNum)}
                        className="px-3 py-1.5 rounded-xl bg-brand-50 hover:bg-brand-100 text-brand-700 text-xs font-bold flex items-center gap-1 transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Stop</span>
                      </button>
                    </div>

                    {/* Inline Add Stop Form */}
                    {addingStopDay === dayNum && (
                      <form onSubmit={handleAddStopSubmit} className="bg-slate-50 p-4 rounded-2xl border border-brand-200 space-y-3 animate-in fade-in duration-150">
                        <p className="text-xs font-bold text-slate-800">Add Destination / Stop to Day {dayNum}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <input
                            type="text"
                            value={stopTitle}
                            onChange={(e) => setStopTitle(e.target.value)}
                            placeholder="e.g. Jaflong Dauki River, Ratargul Boat"
                            className="p-2 rounded-xl border border-slate-200 bg-white text-xs"
                            required
                            autoFocus
                          />
                          <select
                            value={stopTimeSlot}
                            onChange={(e) => setStopTimeSlot(e.target.value)}
                            className="p-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold"
                          >
                            <option value="Morning (08:30 AM)">Morning (08:30 AM)</option>
                            <option value="Afternoon (01:00 PM)">Afternoon (01:00 PM)</option>
                            <option value="Sunset / Evening (04:30 PM)">Sunset / Evening (04:30 PM)</option>
                            <option value="Dinner (08:00 PM)">Dinner & Night Walk (08:00 PM)</option>
                          </select>
                        </div>
                        <input
                          type="text"
                          value={stopNotes}
                          onChange={(e) => setStopNotes(e.target.value)}
                          placeholder="Quick note (e.g. 'Rent engine boat from ghat 1, bring sunglasses')"
                          className="w-full p-2 rounded-xl border border-slate-200 bg-white text-xs"
                        />
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => setAddingStopDay(null)}
                            className="px-3 py-1 rounded-lg text-xs font-bold text-slate-500 hover:bg-slate-200"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-4 py-1 rounded-lg bg-brand-600 text-white text-xs font-bold"
                          >
                            Save Stop
                          </button>
                        </div>
                      </form>
                    )}

                    {/* Stops List */}
                    <div className="space-y-2.5">
                      {dayPlaces.length > 0 ? (
                        dayPlaces.map((item, idx) => (
                          <div
                            key={item.id}
                            className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-all flex items-start justify-between gap-3 group"
                          >
                            <div className="flex items-start gap-3">
                              <div className="w-6 h-6 rounded-full bg-white border border-slate-200 text-slate-700 text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                                {idx + 1}
                              </div>

                              <div className="space-y-0.5">
                                <span className="text-[10px] font-extrabold uppercase text-brand-700 bg-brand-100 px-2 py-0.5 rounded">
                                  {item.time_slot || 'Morning'}
                                </span>
                                <h5 className="text-sm font-bold text-slate-900">
                                  {item.custom_title || item.place?.name}
                                </h5>
                                {item.notes && (
                                  <p className="text-xs text-slate-500 leading-relaxed">
                                    {item.notes}
                                  </p>
                                )}
                              </div>
                            </div>

                            <button
                              onClick={() => removeTripPlace(activeTrip.id, item.id)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 opacity-0 group-hover:opacity-100 transition-all shrink-0"
                              title="Remove Stop"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-6 text-xs text-slate-400 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                          No places added yet for Day {dayNum}. Click "+ Add Stop" above.
                        </div>
                      )}
                    </div>

                  </div>
                );
              })}

            </div>

            {/* 2. REAL-TIME BUDGET ESTIMATOR (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card space-y-6 sticky top-24">
                
                <div className="border-b border-slate-100 pb-4 space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-900 font-sans">
                      Trip Cost Estimator
                    </h3>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-lg">
                      BDT (৳)
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Adjust spending estimates to calculate your total tour budget.
                  </p>
                </div>

                {/* Editable Category Sliders / Inputs */}
                <div className="space-y-3.5 text-xs">
                  
                  {[
                    { key: 'transport', label: 'Transport (Bus/Train/Fuel)', val: activeTrip.budget.transport },
                    { key: 'hotel', label: 'Hotel & Resorts', val: activeTrip.budget.hotel },
                    { key: 'food', label: 'Food & Dining', val: activeTrip.budget.food },
                    { key: 'activities', label: 'Entry Fees & Boat Rides', val: activeTrip.budget.activities },
                    { key: 'shopping', label: 'Souvenirs & Shopping', val: activeTrip.budget.shopping },
                    { key: 'ride', label: 'Vehicle / Bike Rentals', val: activeTrip.budget.ride },
                    { key: 'other', label: 'Emergency Buffer', val: activeTrip.budget.other },
                  ].map(cat => (
                    <div key={cat.key} className="flex items-center justify-between gap-3">
                      <span className="text-slate-600 font-semibold truncate">{cat.label}</span>
                      <div className="flex items-center gap-1 shrink-0">
                        <span className="text-slate-400 font-bold">৳</span>
                        <input
                          type="number"
                          step="100"
                          value={cat.val}
                          onChange={(e) => handleBudgetChange(cat.key as any, Number(e.target.value) || 0)}
                          className="w-24 p-1.5 rounded-xl border border-slate-200 bg-slate-50 text-right font-mono font-bold text-slate-900 text-xs focus:outline-none focus:ring-1 focus:ring-brand-500"
                        />
                      </div>
                    </div>
                  ))}

                </div>

                {/* Total Budget Card */}
                <div className="p-4 rounded-2xl bg-gradient-to-br from-brand-900 to-slate-900 text-white space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-brand-200 font-bold uppercase tracking-wider">
                      Total Estimated Budget
                    </span>
                    <Sparkles className="w-4 h-4 text-brand-400" />
                  </div>
                  <p className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-teal-300">
                    ৳{activeTrip.total_budget.toLocaleString()}
                  </p>
                  <p className="text-[11px] text-slate-300">
                    ≈ ৳{(Math.round(activeTrip.total_budget / activeTrip.duration_days)).toLocaleString()} per day
                  </p>
                </div>

                {/* Travel Tip Banner */}
                <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs space-y-1">
                  <p className="font-bold flex items-center gap-1">
                    💡 Student & Budget Tip:
                  </p>
                  <p className="text-[11px] leading-relaxed">
                    Sharing 4x4 Chander Gari in Sajek (৳4,500/day) or taking the Cox's Bazar Express sleeper coach drastically lowers individual expenses.
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 space-y-3">
          <Calendar className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No Trips Created Yet</h3>
          <p className="text-xs text-slate-500">Click "New Trip Itinerary" above to start your first travel plan.</p>
        </div>
      )}

    </div>
  );
};
