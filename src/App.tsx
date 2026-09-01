import React, { useState, useEffect, useCallback } from 'react';
import { Capacitor } from '@capacitor/core';
import { App as CapApp } from '@capacitor/app';
import { StatusBar, Style } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';

import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { TripProvider, useTrip } from './context/TripContext';
import { ChatProvider } from './context/ChatContext';
import { NotesProvider } from './context/NotesContext';
import { Navbar } from './components/layout/Navbar';
import { BottomNav } from './components/layout/BottomNav';
import { Footer } from './components/layout/Footer';
import { GlobalSearchModal } from './components/common/GlobalSearchModal';
import { AuthModal } from './components/auth/AuthModal';
import { TravelerConciergeModal } from './components/chat/TravelerConciergeModal';
import { PrivacyPolicyModal } from './components/common/PrivacyPolicyModal';

// Views
import { HomeView } from './views/HomeView';
import { ExploreView } from './views/ExploreView';
import { PlacesView } from './views/PlacesView';
import { PlaceDetailView } from './views/PlaceDetailView';
import { HotelsView } from './views/HotelsView';
import { FoodView } from './views/FoodView';
import { TransportView } from './views/TransportView';
import { ShoppingView } from './views/ShoppingView';
import { RideView } from './views/RideView';
import { TripPlannerView } from './views/TripPlannerView';
import { KeepNotesView } from './views/KeepNotesView';
import { FavoritesView } from './views/FavoritesView';
import { ProfileView } from './views/ProfileView';
import { AdminView } from './views/AdminView';

import { Place, Hotel, Restaurant } from './types';
import { CheckCircle2, ArrowLeft, RotateCcw } from 'lucide-react';

interface NavigationState {
  tab: string;
  selectedPlace: Place | null;
  selectedDistrictId?: string;
  searchInitialQuery?: string;
  label?: string;
}

const TAB_LABELS: Record<string, string> = {
  home: 'Home (হোম)',
  explore: 'Explore Districts (জেলাসমূহ)',
  places: 'Tourist Places (দর্শনীয় স্থান)',
  hotels: 'Hotels & Resorts (হোটেল ও রিসোর্ট)',
  transport: 'Transport & Local Vehicles (যানবাহন)',
  food: 'Famous Food (খাবার)',
  ride: 'Local Rides & Rentals (রাইড)',
  trips: 'Trip Planner (ভ্রমণ পরিকল্পনা)',
  notes: 'KEEP NOTES (নোট ও খরচের হিসাব)',
  favorites: 'Saved Favorites (সংরক্ষিত)',
  shopping: 'Local Crafts (কেনাকাটা)',
  profile: 'My Profile (প্রোফাইল)',
  admin: 'Admin Dashboard (অ্যাডমিন)'
};

const AppContent: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [selectedHotelModal, setSelectedHotelModal] = useState<Hotel | null>(null);
  const [selectedDistrictId, setSelectedDistrictId] = useState<string | undefined>(undefined);
  const [searchInitialQuery, setSearchInitialQuery] = useState<string>('');

  // Navigation History Stack for going back from anywhere
  const [historyStack, setHistoryStack] = useState<NavigationState[]>([]);

  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const { activeTrip, addPlaceToTrip } = useTrip();

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Push to history stack before state change
  const recordCurrentStateToHistory = useCallback(() => {
    const currentState: NavigationState = {
      tab: currentTab,
      selectedPlace,
      selectedDistrictId,
      searchInitialQuery,
      label: selectedPlace ? selectedPlace.name : (TAB_LABELS[currentTab] || currentTab)
    };

    setHistoryStack(prev => {
      // Don't duplicate top of stack if same tab and place
      const last = prev[prev.length - 1];
      if (last && last.tab === currentState.tab && last.selectedPlace?.id === currentState.selectedPlace?.id) {
        return prev;
      }
      return [...prev, currentState];
    });

    try {
      window.history.pushState({ tab: currentTab, placeId: selectedPlace?.id }, '');
    } catch (e) {
      // History API fallback
    }
  }, [currentTab, selectedPlace, selectedDistrictId, searchInitialQuery]);

  // Online / Offline Connectivity Monitor
  useEffect(() => {
    const handleOnline = () => {
      showToast('🟢 Connected to Online Server — Live Sync Active');
    };
    const handleOffline = () => {
      showToast('📶 Switched to Offline Mode — Using Local Cache');
    };
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Universal Back Handler
  const handleBack = useCallback(() => {
    if (isPrivacyOpen) {
      setIsPrivacyOpen(false);
      return;
    }
    if (isSearchOpen) {
      setIsSearchOpen(false);
      return;
    }
    if (isAuthOpen) {
      setIsAuthOpen(false);
      return;
    }
    if (selectedHotelModal) {
      setSelectedHotelModal(null);
      return;
    }
    if (selectedPlace) {
      setSelectedPlace(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (historyStack.length > 0) {
      const lastState = historyStack[historyStack.length - 1];
      setHistoryStack(prev => prev.slice(0, -1));
      
      setCurrentTab(lastState.tab);
      setSelectedPlace(lastState.selectedPlace);
      setSelectedDistrictId(lastState.selectedDistrictId);
      setSearchInitialQuery(lastState.searchInitialQuery || '');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      showToast(`Returned to ${lastState.label || lastState.tab}`);
    } else if (currentTab !== 'home') {
      setCurrentTab('home');
      setSelectedPlace(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [isPrivacyOpen, isSearchOpen, isAuthOpen, selectedHotelModal, selectedPlace, historyStack, currentTab]);

  // Native Android Platform Setup & Hardware Back Button
  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      try {
        StatusBar.setStyle({ style: Style.Dark }).catch(() => {});
        StatusBar.setBackgroundColor({ color: '#0f172a' }).catch(() => {});
        SplashScreen.hide().catch(() => {});
      } catch (e) {}

      const backListener = CapApp.addListener('backButton', () => {
        if (isPrivacyOpen) {
          setIsPrivacyOpen(false);
        } else if (isSearchOpen) {
          setIsSearchOpen(false);
        } else if (isAuthOpen) {
          setIsAuthOpen(false);
        } else if (selectedHotelModal) {
          setSelectedHotelModal(null);
        } else if (selectedPlace) {
          setSelectedPlace(null);
        } else if (historyStack.length > 0) {
          handleBack();
        } else if (currentTab !== 'home') {
          setCurrentTab('home');
        } else {
          CapApp.exitApp();
        }
      });

      return () => {
        backListener.then(sub => sub.remove()).catch(() => {});
      };
    }
  }, [isPrivacyOpen, isSearchOpen, isAuthOpen, selectedHotelModal, selectedPlace, historyStack, currentTab, handleBack]);

  // Listen to browser native back button
  useEffect(() => {
    const handlePopState = () => {
      handleBack();
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [handleBack]);

  const handleNavigateTab = (tab: string, filterData?: any) => {
    if (tab === currentTab && !selectedPlace && !filterData) return;
    recordCurrentStateToHistory();

    if (filterData?.search) {
      setSearchInitialQuery(filterData.search);
    }
    if (filterData?.districtId) {
      setSelectedDistrictId(filterData.districtId);
    }
    setSelectedPlace(null);
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectPlace = (place: Place) => {
    recordCurrentStateToHistory();
    setSelectedPlace(place);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectHotel = (hotel: Hotel) => {
    recordCurrentStateToHistory();
    setSelectedPlace(null);
    setSelectedHotelModal(hotel);
    setCurrentTab('hotels');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectRestaurant = (restaurant: Restaurant) => {
    recordCurrentStateToHistory();
    setCurrentTab('food');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToTrip = (place: Place) => {
    if (activeTrip) {
      addPlaceToTrip(activeTrip.id, place, 1);
      showToast(`Added ${place.name} to Day 1 of "${activeTrip.title}"!`);
    } else {
      showToast(`Please launch the Trip Planner to create an itinerary first.`);
      recordCurrentStateToHistory();
      setCurrentTab('trips');
    }
  };

  const previousPageLabel = historyStack.length > 0 
    ? historyStack[historyStack.length - 1].label || 'Previous Page'
    : currentTab !== 'home' ? 'Home' : null;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased">
      
      {/* Top Navigation */}
      <Navbar
        currentTab={selectedPlace ? 'places' : currentTab}
        setCurrentTab={(tab) => {
          handleNavigateTab(tab);
        }}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
      />

      {/* Universal Quick Back Breadcrumb Bar */}
      {(historyStack.length > 0 || selectedPlace !== null || currentTab !== 'home') && (
        <div className="bg-white/80 backdrop-blur-md border-b border-slate-200/80 sticky top-16 z-30 px-4 sm:px-6 py-2 transition-all">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-xs">
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-emerald-600 hover:text-white text-slate-800 font-bold transition-all shadow-xs active:scale-95 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              <span>Back to {previousPageLabel || 'Previous View'} (পেছনে যান)</span>
            </button>

            <div className="hidden sm:flex items-center gap-2 text-slate-400 font-semibold text-[11px]">
              <span>Current:</span>
              <span className="text-emerald-700 font-extrabold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                {selectedPlace ? selectedPlace.name : (TAB_LABELS[currentTab] || currentTab)}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 p-4 rounded-2xl bg-slate-900 text-white shadow-2xl border border-slate-700 flex items-center gap-3 animate-in slide-in-from-bottom-5 duration-200">
          <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0" />
          <span className="text-xs sm:text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Main View Area */}
      <main className="flex-1 pt-6 sm:pt-8">
        
        {/* If a place is selected, show PlaceDetailView regardless of tab */}
        {selectedPlace ? (
          <PlaceDetailView
            place={selectedPlace}
            onBack={handleBack}
            onSelectHotel={handleSelectHotel}
            onSelectRestaurant={handleSelectRestaurant}
            onAddToTrip={handleAddToTrip}
          />
        ) : (
          <>
            {currentTab === 'home' && (
              <HomeView
                onSelectPlace={handleSelectPlace}
                onSelectHotel={handleSelectHotel}
                onSelectRestaurant={handleSelectRestaurant}
                onNavigateTab={handleNavigateTab}
                onAddToTrip={handleAddToTrip}
              />
            )}

            {currentTab === 'explore' && (
              <ExploreView
                onSelectPlace={handleSelectPlace}
                onSelectHotel={handleSelectHotel}
                onSelectRestaurant={handleSelectRestaurant}
                onAddToTrip={handleAddToTrip}
                initialDistrictId={selectedDistrictId}
              />
            )}

            {currentTab === 'places' && (
              <PlacesView
                onSelectPlace={handleSelectPlace}
                onAddToTrip={handleAddToTrip}
                initialSearch={searchInitialQuery}
              />
            )}

            {currentTab === 'hotels' && (
              <HotelsView
                onSelectHotel={handleSelectHotel}
                selectedHotelModal={selectedHotelModal}
                onCloseModal={() => setSelectedHotelModal(null)}
              />
            )}

            {currentTab === 'food' && (
              <FoodView
                onSelectRestaurant={handleSelectRestaurant}
              />
            )}

            {currentTab === 'transport' && (
              <TransportView />
            )}

            {currentTab === 'shopping' && (
              <ShoppingView />
            )}

            {currentTab === 'ride' && (
              <RideView />
            )}

            {currentTab === 'trips' && (
              <TripPlannerView
                onSelectPlace={handleSelectPlace}
              />
            )}

            {currentTab === 'notes' && (
              <KeepNotesView />
            )}

            {currentTab === 'favorites' && (
              <FavoritesView
                onSelectPlace={handleSelectPlace}
                onSelectHotel={handleSelectHotel}
                onSelectRestaurant={handleSelectRestaurant}
                onAddToTrip={handleAddToTrip}
              />
            )}

            {currentTab === 'profile' && (
              <ProfileView
                onNavigateTab={handleNavigateTab}
                onOpenAuth={() => setIsAuthOpen(true)}
              />
            )}

            {currentTab === 'admin' && (
              <AdminView />
            )}
          </>
        )}

      </main>

      {/* Footer */}
      <Footer 
        onNavigate={handleNavigateTab} 
        onOpenPrivacy={() => setIsPrivacyOpen(true)}
      />

      {/* Mobile Bottom Navigation */}
      <BottomNav
        currentTab={currentTab}
        setCurrentTab={(tab) => {
          handleNavigateTab(tab);
        }}
      />

      {/* Global Instant Search Modal */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectPlace={handleSelectPlace}
        onSelectHotel={handleSelectHotel}
        onSelectRestaurant={handleSelectRestaurant}
        onNavigateTab={handleNavigateTab}
      />

      {/* Global Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />

      {/* Google Play Store Verified Privacy Policy & Terms Modal */}
      <PrivacyPolicyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />

      {/* Global Traveler Concierge & Chat Modal */}
      <TravelerConciergeModal />

    </div>
  );
};

export function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <FavoritesProvider>
          <TripProvider>
            <ChatProvider>
              <NotesProvider>
                <AppContent />
              </NotesProvider>
            </ChatProvider>
          </TripProvider>
        </FavoritesProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;

