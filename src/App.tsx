import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { TripProvider, useTrip } from './context/TripContext';
import { Navbar } from './components/layout/Navbar';
import { BottomNav } from './components/layout/BottomNav';
import { Footer } from './components/layout/Footer';
import { GlobalSearchModal } from './components/common/GlobalSearchModal';
import { AuthModal } from './components/auth/AuthModal';

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
import { FavoritesView } from './views/FavoritesView';
import { ProfileView } from './views/ProfileView';
import { AdminView } from './views/AdminView';

import { Place, Hotel, Restaurant } from './types';
import { CheckCircle2 } from 'lucide-react';

const AppContent: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [selectedHotelModal, setSelectedHotelModal] = useState<Hotel | null>(null);
  const [selectedDistrictId, setSelectedDistrictId] = useState<string | undefined>(undefined);
  const [searchInitialQuery, setSearchInitialQuery] = useState<string>('');

  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const { activeTrip, addPlaceToTrip } = useTrip();

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleNavigateTab = (tab: string, filterData?: any) => {
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
    setSelectedPlace(place);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectHotel = (hotel: Hotel) => {
    setSelectedHotelModal(hotel);
  };

  const handleSelectRestaurant = (restaurant: Restaurant) => {
    setCurrentTab('food');
  };

  const handleAddToTrip = (place: Place) => {
    if (activeTrip) {
      addPlaceToTrip(activeTrip.id, place, 1);
      showToast(`Added ${place.name} to Day 1 of "${activeTrip.title}"!`);
    } else {
      showToast(`Please launch the Trip Planner to create an itinerary first.`);
      setCurrentTab('trips');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased">
      
      {/* Top Navigation */}
      <Navbar
        currentTab={selectedPlace ? 'places' : currentTab}
        setCurrentTab={(tab) => {
          setSelectedPlace(null);
          setCurrentTab(tab);
        }}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
      />

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
            onBack={() => setSelectedPlace(null)}
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
      <Footer onNavigate={handleNavigateTab} />

      {/* Mobile Bottom Navigation */}
      <BottomNav
        currentTab={currentTab}
        setCurrentTab={(tab) => {
          setSelectedPlace(null);
          setCurrentTab(tab);
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

    </div>
  );
};

export function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <FavoritesProvider>
          <TripProvider>
            <AppContent />
          </TripProvider>
        </FavoritesProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
