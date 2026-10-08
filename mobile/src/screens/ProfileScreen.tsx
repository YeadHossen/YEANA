import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import {
  User,
  ShieldCheck,
  Globe,
  Bell,
  Heart,
  Receipt,
  LogOut,
  ChevronRight,
  Sparkles,
} from 'lucide-react-native';

export const ProfileScreen = ({ navigation }: any) => {
  const { user, preferences, isAuthenticated, isAdmin, logout, updatePreferences } = useAuth();

  const handleToggleLanguage = async () => {
    const nextLang = preferences?.preferred_language === 'bn' ? 'en' : 'bn';
    await updatePreferences({ preferred_language: nextLang });
    Alert.alert('Language Updated', `Preferred language set to ${nextLang === 'bn' ? 'বাংলা' : 'English'}`);
  };

  if (!isAuthenticated || !user) {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <User size={52} color="#9CA3AF" />
        <Text style={styles.unauthTitle}>Welcome to YEANA</Text>
        <Text style={styles.unauthSubtitle}>Sign in to access your travel profile, favorites, and bookings.</Text>
        <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginBtnText}>Sign In / Register</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <Image
            source={{ uri: user.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150' }}
            style={styles.avatar}
          />
          <View style={styles.profileInfo}>
            <View style={styles.nameRow}>
              <Text style={styles.userName}>{user.full_name}</Text>
              {isAdmin && (
                <View style={styles.adminBadge}>
                  <Text style={styles.adminBadgeText}>ADMIN</Text>
                </View>
              )}
            </View>
            <Text style={styles.userEmail}>{user.email}</Text>
            {user.phone && <Text style={styles.userPhone}>{user.phone}</Text>}
          </View>
        </View>

        {/* Admin Console Entry (Only for DB-verified admins) */}
        {isAdmin && (
          <TouchableOpacity
            style={styles.adminCard}
            onPress={() => navigation.navigate('AdminDashboard')}
          >
            <View style={styles.adminIconBox}>
              <ShieldCheck size={22} color="#FFFFFF" />
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.adminCardTitle}>Database Admin Console</Text>
              <Text style={styles.adminCardSub}>Publish places, moderate reviews & verify bookings</Text>
            </View>
            <ChevronRight size={18} color="#94A3B8" />
          </TouchableOpacity>
        )}

        {/* Account Shortcuts */}
        <View style={styles.menuGroup}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate('Bookings')}
          >
            <Receipt size={20} color="#059669" />
            <Text style={styles.menuLabel}>My Electronic Bookings</Text>
            <ChevronRight size={18} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate('Favorites')}
          >
            <Heart size={20} color="#059669" />
            <Text style={styles.menuLabel}>Saved & Bookmarks</Text>
            <ChevronRight size={18} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate('TripPlanner')}
          >
            <Sparkles size={20} color="#059669" />
            <Text style={styles.menuLabel}>Smart Multi-Day Trip Planner</Text>
            <ChevronRight size={18} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        {/* Preferences */}
        <View style={styles.menuGroup}>
          <TouchableOpacity style={styles.menuItem} onPress={handleToggleLanguage}>
            <Globe size={20} color="#3B82F6" />
            <Text style={styles.menuLabel}>Language (ভাষা)</Text>
            <Text style={styles.menuValue}>
              {preferences?.preferred_language === 'bn' ? 'বাংলা (BN)' : 'English (EN)'}
            </Text>
          </TouchableOpacity>

          <View style={styles.menuItem}>
            <Bell size={20} color="#3B82F6" />
            <Text style={styles.menuLabel}>Push Notifications</Text>
            <Text style={styles.menuValue}>Enabled</Text>
          </View>
        </View>

        {/* Sign Out */}
        <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
          <LogOut size={18} color="#EF4444" />
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scroll: {
    padding: 16,
  },
  profileCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#E5E7EB',
  },
  profileInfo: {
    flex: 1,
    marginLeft: 14,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    fontSize: 17,
    fontWeight: '800',
    color: '#111827',
  },
  adminBadge: {
    backgroundColor: '#DC2626',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    marginLeft: 8,
  },
  adminBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
  },
  userEmail: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  userPhone: {
    fontSize: 12,
    color: '#059669',
    marginTop: 2,
  },
  adminCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 14,
    marginBottom: 16,
  },
  adminIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#059669',
    justifyContent: 'center',
    alignItems: 'center',
  },
  adminCardTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  adminCardSub: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 1,
  },
  menuGroup: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: '#F3F4F6',
  },
  menuLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    flex: 1,
    marginLeft: 12,
  },
  menuValue: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '500',
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEE2E2',
    paddingVertical: 13,
    borderRadius: 14,
    marginTop: 10,
  },
  logoutText: {
    color: '#EF4444',
    fontWeight: '700',
    fontSize: 14,
    marginLeft: 8,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#FFFFFF',
  },
  unauthTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111827',
    marginTop: 14,
  },
  unauthSubtitle: {
    fontSize: 13,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 20,
  },
  loginBtn: {
    backgroundColor: '#059669',
    paddingHorizontal: 26,
    paddingVertical: 12,
    borderRadius: 12,
  },
  loginBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
});
