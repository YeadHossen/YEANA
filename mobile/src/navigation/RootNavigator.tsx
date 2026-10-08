import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/HomeScreen';
import { ExploreScreen } from '../screens/ExploreScreen';
import { HotelsScreen } from '../screens/HotelsScreen';
import { FoodScreen } from '../screens/FoodScreen';
import { BookingsScreen } from '../screens/BookingsScreen';
import { DestinationDetailScreen } from '../screens/DestinationDetailScreen';
import { TransportScreen } from '../screens/TransportScreen';
import { FavoritesScreen } from '../screens/FavoritesScreen';
import { TripPlannerScreen } from '../screens/TripPlannerScreen';
import { AdminDashboardScreen } from '../screens/AdminDashboardScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { AIChatScreen } from '../screens/AIChatScreen';
import { AIHistoryScreen } from '../screens/AIHistoryScreen';
import { Compass, Search, Building2, Utensils, Receipt, Sparkles } from 'lucide-react-native';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#059669',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#F3F4F6',
          height: 60,
          paddingBottom: 8,
          paddingTop: 6,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Explore',
          tabBarIcon: ({ color, size }) => <Compass color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="ExploreTab"
        component={ExploreScreen}
        options={{
          tabBarLabel: '64 Zilas',
          tabBarIcon: ({ color, size }) => <Search color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="HotelsTab"
        component={HotelsScreen}
        options={{
          tabBarLabel: 'Hotels',
          tabBarIcon: ({ color, size }) => <Building2 color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="FoodTab"
        component={FoodScreen}
        options={{
          tabBarLabel: 'Food',
          tabBarIcon: ({ color, size }) => <Utensils color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="BookingsTab"
        component={BookingsScreen}
        options={{
          tabBarLabel: 'Bookings',
          tabBarIcon: ({ color, size }) => <Receipt color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
}

export function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="Main" component={BottomTabNavigator} />
      <Stack.Screen name="DestinationDetail" component={DestinationDetailScreen} />
      <Stack.Screen name="Transport" component={TransportScreen} />
      <Stack.Screen name="Favorites" component={FavoritesScreen} />
      <Stack.Screen name="TripPlanner" component={TripPlannerScreen} />
      <Stack.Screen name="AdminDashboard" component={AdminDashboardScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="AIChat" component={AIChatScreen} />
      <Stack.Screen name="AIHistory" component={AIHistoryScreen} />
    </Stack.Navigator>
  );
}
