import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { FavoriteItem, FavoriteType } from '../types';
import { INITIAL_PLACES, INITIAL_HOTELS, INITIAL_RESTAURANTS } from '../data/seedData';

interface FavoritesContextType {
  favorites: FavoriteItem[];
  isFavorite: (itemType: FavoriteType, itemId: string) => boolean;
  toggleFavorite: (itemType: FavoriteType, itemId: string, itemData: any) => void;
  removeFavorite: (itemType: FavoriteType, itemId: string) => void;
  clearAllFavorites: () => void;
  downloadOfflinePackage: () => boolean;
  isOfflineReady: boolean;
}

const STORAGE_KEY = 'yeana_favorites';
const OFFLINE_FLAG_KEY = 'yeana_offline_ready';

const INITIAL_FAVORITES: FavoriteItem[] = [
  {
    id: 'fav-1',
    item_type: 'place',
    item_id: 'place-jaflong',
    item_data: INITIAL_PLACES[0],
    created_at: new Date().toISOString()
  },
  {
    id: 'fav-2',
    item_type: 'hotel',
    item_id: 'hotel-noorjahan',
    item_data: INITIAL_HOTELS[0],
    created_at: new Date().toISOString()
  },
  {
    id: 'fav-3',
    item_type: 'restaurant',
    item_id: 'rest-panshi',
    item_data: INITIAL_RESTAURANTS[0],
    created_at: new Date().toISOString()
  }
];

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_FAVORITES;
    } catch {
      return INITIAL_FAVORITES;
    }
  });

  const [isOfflineReady, setIsOfflineReady] = useState<boolean>(() => {
    return localStorage.getItem(OFFLINE_FLAG_KEY) === 'true';
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const isFavorite = (itemType: FavoriteType, itemId: string): boolean => {
    return favorites.some(f => f.item_type === itemType && f.item_id === itemId);
  };

  const toggleFavorite = (itemType: FavoriteType, itemId: string, itemData: any) => {
    if (isFavorite(itemType, itemId)) {
      removeFavorite(itemType, itemId);
    } else {
      const newItem: FavoriteItem = {
        id: `fav-${Date.now()}`,
        item_type: itemType,
        item_id: itemId,
        item_data: itemData,
        created_at: new Date().toISOString()
      };
      setFavorites(prev => [newItem, ...prev]);
    }
  };

  const removeFavorite = (itemType: FavoriteType, itemId: string) => {
    setFavorites(prev => prev.filter(f => !(f.item_type === itemType && f.item_id === itemId)));
  };

  const clearAllFavorites = () => {
    setFavorites([]);
  };

  const downloadOfflinePackage = (): boolean => {
    try {
      // Package core destination guides, emergency contacts & routes into offline cache
      localStorage.setItem('yeana_offline_places', JSON.stringify(INITIAL_PLACES));
      localStorage.setItem('yeana_offline_hotels', JSON.stringify(INITIAL_HOTELS));
      localStorage.setItem('yeana_offline_restaurants', JSON.stringify(INITIAL_RESTAURANTS));
      localStorage.setItem(OFFLINE_FLAG_KEY, 'true');
      setIsOfflineReady(true);
      return true;
    } catch (err) {
      console.error('Failed to download offline package:', err);
      return false;
    }
  };

  return (
    <FavoritesContext.Provider value={{
      favorites,
      isFavorite,
      toggleFavorite,
      removeFavorite,
      clearAllFavorites,
      downloadOfflinePackage,
      isOfflineReady
    }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
