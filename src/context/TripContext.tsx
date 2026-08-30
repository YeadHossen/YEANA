import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Trip, TripPlace, Place, TripBudget } from '../types';
import { SAMPLE_TRIP, INITIAL_PLACES } from '../data/seedData';
import { isSupabaseConfigured, supabase } from '../lib/supabase';

interface TripContextType {
  trips: Trip[];
  activeTrip: Trip | null;
  setActiveTrip: (trip: Trip | null) => void;
  createTrip: (tripData: Omit<Trip, 'id' | 'created_at' | 'places'>) => Trip;
  addPlaceToTrip: (tripId: string, place: Place, dayNumber: number, timeSlot?: string, notes?: string) => void;
  addCustomStopToTrip: (tripId: string, title: string, dayNumber: number, timeSlot?: string, notes?: string) => void;
  removeTripPlace: (tripId: string, tripPlaceId: string) => void;
  updateTripBudget: (tripId: string, budget: TripBudget) => void;
  deleteTrip: (tripId: string) => void;
}

const STORAGE_KEY = 'yeana_user_trips';

const TripContext = createContext<TripContextType | undefined>(undefined);

export const TripProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [trips, setTrips] = useState<Trip[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [SAMPLE_TRIP];
    } catch {
      return [SAMPLE_TRIP];
    }
  });

  const [activeTrip, setActiveTrip] = useState<Trip | null>(() => {
    return trips[0] || null;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trips));
  }, [trips]);

  const createTrip = (tripData: Omit<Trip, 'id' | 'created_at' | 'places'>): Trip => {
    const newTrip: Trip = {
      ...tripData,
      id: `trip-${Date.now()}`,
      places: [],
      created_at: new Date().toISOString()
    };
    setTrips(prev => [newTrip, ...prev]);
    setActiveTrip(newTrip);
    return newTrip;
  };

  const addPlaceToTrip = (tripId: string, place: Place, dayNumber: number, timeSlot?: string, notes?: string) => {
    setTrips(prev => prev.map(trip => {
      if (trip.id !== tripId) return trip;
      const dayPlaces = trip.places.filter(p => p.day_number === dayNumber);
      const newPlaceItem: TripPlace = {
        id: `tp-${Date.now()}`,
        trip_id: tripId,
        place_id: place.id,
        place: place,
        custom_title: place.name,
        day_number: dayNumber,
        order_index: dayPlaces.length + 1,
        time_slot: timeSlot || 'Morning',
        notes: notes || place.short_description
      };
      const updatedPlaces = [...trip.places, newPlaceItem];
      const updatedTrip = { ...trip, places: updatedPlaces };
      if (activeTrip?.id === tripId) {
        setActiveTrip(updatedTrip);
      }
      return updatedTrip;
    }));
  };

  const addCustomStopToTrip = (tripId: string, title: string, dayNumber: number, timeSlot?: string, notes?: string) => {
    setTrips(prev => prev.map(trip => {
      if (trip.id !== tripId) return trip;
      const dayPlaces = trip.places.filter(p => p.day_number === dayNumber);
      const newPlaceItem: TripPlace = {
        id: `tp-${Date.now()}`,
        trip_id: tripId,
        custom_title: title,
        day_number: dayNumber,
        order_index: dayPlaces.length + 1,
        time_slot: timeSlot || 'Afternoon',
        notes: notes || ''
      };
      const updatedPlaces = [...trip.places, newPlaceItem];
      const updatedTrip = { ...trip, places: updatedPlaces };
      if (activeTrip?.id === tripId) {
        setActiveTrip(updatedTrip);
      }
      return updatedTrip;
    }));
  };

  const removeTripPlace = (tripId: string, tripPlaceId: string) => {
    setTrips(prev => prev.map(trip => {
      if (trip.id !== tripId) return trip;
      const updatedPlaces = trip.places.filter(p => p.id !== tripPlaceId);
      const updatedTrip = { ...trip, places: updatedPlaces };
      if (activeTrip?.id === tripId) {
        setActiveTrip(updatedTrip);
      }
      return updatedTrip;
    }));
  };

  const updateTripBudget = (tripId: string, budget: TripBudget) => {
    const total = Object.values(budget).reduce((acc, val) => acc + (Number(val) || 0), 0);
    setTrips(prev => prev.map(trip => {
      if (trip.id !== tripId) return trip;
      const updatedTrip = { ...trip, budget, total_budget: total };
      if (activeTrip?.id === tripId) {
        setActiveTrip(updatedTrip);
      }
      return updatedTrip;
    }));
  };

  const deleteTrip = (tripId: string) => {
    setTrips(prev => {
      const remaining = prev.filter(t => t.id !== tripId);
      if (activeTrip?.id === tripId) {
        setActiveTrip(remaining[0] || null);
      }
      return remaining;
    });
  };

  return (
    <TripContext.Provider value={{
      trips,
      activeTrip,
      setActiveTrip,
      createTrip,
      addPlaceToTrip,
      addCustomStopToTrip,
      removeTripPlace,
      updateTripBudget,
      deleteTrip
    }}>
      {children}
    </TripContext.Provider>
  );
};

export const useTrip = () => {
  const context = useContext(TripContext);
  if (!context) {
    throw new Error('useTrip must be used within a TripProvider');
  }
  return context;
};
