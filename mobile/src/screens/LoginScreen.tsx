import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { Compass, Mail, Lock, User, ArrowLeft } from 'lucide-react-native';

export const LoginScreen = ({ navigation }: any) => {
  const { login, signup, isLoading } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async () => {
    setErrorMessage('');
    if (!email.trim() || !password.trim()) {
      setErrorMessage('Please fill in both email and password.');
      return;
    }

    if (isSignUp && !fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    if (isSignUp) {
      const res = await signup(email.trim(), password, fullName.trim());
      if (res.success) {
        Alert.alert(
          'Account Created',
          'Welcome to YEANA! Your account has been registered.',
          [{ text: 'Continue', onPress: () => navigation.goBack() }]
        );
      } else {
        setErrorMessage(res.error || 'Registration failed');
      }
    } else {
      const res = await login(email.trim(), password);
      if (res.success) {
        navigation.goBack();
      } else {
        setErrorMessage(res.error || 'Invalid credentials');
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scroll}>
          {/* Back Button */}
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <ArrowLeft size={22} color="#1F2937" />
          </TouchableOpacity>

          {/* Logo & Intro */}
          <View style={styles.header}>
            <View style={styles.iconCircle}>
              <Compass size={36} color="#FFFFFF" />
            </View>
            <Text style={styles.title}>YEANA</Text>
            <Text style={styles.subtitle}>
              {isSignUp
                ? 'Create an account to start exploring Bangladesh'
                : 'Welcome back! Sign in to continue'}
            </Text>
          </View>

          {/* Error Message */}
          {errorMessage.length > 0 && (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>{errorMessage}</Text>
            </View>
          )}

          {/* Input Fields */}
          <View style={styles.form}>
            {isSignUp && (
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Full Name</Text>
                <View style={styles.inputWrapper}>
                  <User size={18} color="#6B7280" />
                  <TextInput
                    style={styles.input}
                    placeholder="e.g. Tanvir Ahmed"
                    placeholderTextColor="#9CA3AF"
                    value={fullName}
                    onChangeText={setFullName}
                  />
                </View>
              </View>
            )}

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email Address</Text>
              <View style={styles.inputWrapper}>
                <Mail size={18} color="#6B7280" />
                <TextInput
                  style={styles.input}
                  placeholder="name@example.com"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.inputWrapper}>
                <Lock size={18} color="#6B7280" />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your secure password"
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                />
              </View>
            </View>

            <TouchableOpacity
              style={styles.submitBtn}
              onPress={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Text style={styles.submitBtnText}>
                  {isSignUp ? 'Create Account' : 'Sign In with Supabase'}
                </Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.switchModeBtn}
              onPress={() => {
                setIsSignUp(!isSignUp);
                setErrorMessage('');
              }}
            >
              <Text style={styles.switchModeText}>
                {isSignUp
                  ? 'Already have an account? Sign In'
                  : "Don't have an account? Sign Up"}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scroll: {
    padding: 24,
    justifyContent: 'center',
    minHeight: '100%',
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 28,
  },
  iconCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#059669',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  title: {
    fontSize: 26,
    fontWeight: '900',
    color: '#111827',
    letterSpacing: 1.5,
  },
  subtitle: {
    fontSize: 13,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 6,
    paddingHorizontal: 20,
  },
  errorBox: {
    backgroundColor: '#FEE2E2',
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
  },
  errorText: {
    color: '#DC2626',
    fontSize: 13,
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 6,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 48,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: '#111827',
  },
  submitBtn: {
    backgroundColor: '#059669',
    borderRadius: 12,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#059669',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 3,
  },
  submitBtnText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 15,
  },
  switchModeBtn: {
    alignItems: 'center',
    marginTop: 18,
    padding: 6,
  },
  switchModeText: {
    color: '#059669',
    fontSize: 13,
    fontWeight: '600',
  },
});
