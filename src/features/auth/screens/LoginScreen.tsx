import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { theme } from '../../../theme';
import { AppButton } from '../../../components/ui/AppButton';
import { AuthStackParamList } from '../../../app/navigation/types';
// import { useAuthStore } from '../store/authStore';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export const LoginScreen: React.FC<Props> = () => {
  const [mobile, setMobile] = useState('');
  const [loading, setLoading] = useState(false);
  // const login = useAuthStore(state => state.login);
  // const continueAsGuest = useAuthStore(state => state.continueAsGuest);
  const login = () => {};
const continueAsGuest = () => {};

  const handleSendOTP = async () => {
    if (mobile.length !== 10) return;
    setLoading(true);
    // Simulate OTP send
    setTimeout(() => {
      setLoading(false);
      // login(mobile, 'Amit'); // In production: navigate to OTP screen
      console.log('OTP Sent');
    }, 1500);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logoEmoji}>🔱</Text>
          <Text style={styles.appName}>Rituals24</Text>
          <Text style={styles.tagline}>Your Sacred Journey, Simplified</Text>
        </View>

        {/* Card */}
        <View style={styles.card}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>
            Sign in to book pandits, poojas, and temple darshan
          </Text>

          {/* Tabs */}
          <View style={styles.tabs}>
            <View style={[styles.tab, styles.tabActive]}>
              <Text style={styles.tabActiveText}>Mobile</Text>
            </View>
            <View style={styles.tab}>
              <Text style={styles.tabText}>Email</Text>
            </View>
          </View>

          {/* Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.dialCode}>+91</Text>
            <View style={styles.divider} />
            <TextInput
              style={styles.input}
              placeholder="Enter mobile number"
              placeholderTextColor={theme.colors.textMuted}
              keyboardType="phone-pad"
              maxLength={10}
              value={mobile}
              onChangeText={setMobile}
            />
          </View>

          <Text style={styles.secureNote}>
            🔒 Secure OTP Verification. Your data is protected.
          </Text>

          <AppButton
            title="Send OTP"
            onPress={handleSendOTP}
            loading={loading}
            disabled={mobile.length !== 10}
          />

          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.orText}>or</Text>
            <View style={styles.dividerLine} />
          </View>

          <AppButton
            title="Continue as Guest"
            onPress={continueAsGuest}
            variant="outline"
          />

          <TouchableOpacity style={styles.createAccount}>
            <Text style={styles.createAccountText}>
              New here?{' '}
              <Text style={styles.createAccountLink}>Create Account</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary,
  },
  scroll: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  header: {
    alignItems: 'center',
    paddingVertical: theme.spacing.xxxl,
    paddingTop: theme.spacing.xxxl + theme.spacing.xl,
  },
  logoEmoji: {
    fontSize: 48,
    marginBottom: theme.spacing.sm,
  },
  appName: {
    ...theme.typography.displayLg,
    color: theme.colors.gold,
    marginBottom: theme.spacing.xs,
  },
  tagline: {
    ...theme.typography.bodyMd,
    color: 'rgba(255,255,255,0.8)',
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderTopLeftRadius: theme.radii.xxl,
    borderTopRightRadius: theme.radii.xxl,
    padding: theme.spacing.xl,
    paddingBottom: theme.spacing.xxxl,
    gap: theme.spacing.md,
  },
  title: {
    ...theme.typography.h1,
    color: theme.colors.textPrimary,
    textAlign: 'center',
  },
  subtitle: {
    ...theme.typography.bodyMd,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surfaceElevated,
    borderRadius: theme.radii.sm,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: theme.spacing.sm,
    alignItems: 'center',
    borderRadius: theme.radii.sm - 2,
  },
  tabActive: {
    backgroundColor: theme.colors.surface,
    ...theme.shadows.sm,
  },
  tabActiveText: {
    ...theme.typography.labelMd,
    color: theme.colors.primary,
    fontWeight: '700',
  },
  tabText: {
    ...theme.typography.labelMd,
    color: theme.colors.textMuted,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: theme.colors.border,
    borderRadius: theme.radii.md,
    paddingHorizontal: theme.spacing.md,
    height: 52,
  },
  dialCode: {
    ...theme.typography.bodyMd,
    color: theme.colors.textPrimary,
    fontWeight: '600',
  },
  divider: {
    width: 1,
    height: 20,
    backgroundColor: theme.colors.border,
    marginHorizontal: theme.spacing.md,
  },
  input: {
    flex: 1,
    ...theme.typography.bodyMd,
    color: theme.colors.textPrimary,
  },
  secureNote: {
    ...theme.typography.caption,
    color: theme.colors.textMuted,
    textAlign: 'center',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: theme.colors.border,
  },
  orText: {
    ...theme.typography.caption,
    color: theme.colors.textMuted,
  },
  createAccount: {
    alignItems: 'center',
  },
  createAccountText: {
    ...theme.typography.bodyMd,
    color: theme.colors.textSecondary,
  },
  createAccountLink: {
    color: theme.colors.primary,
    fontWeight: '700',
  },
});