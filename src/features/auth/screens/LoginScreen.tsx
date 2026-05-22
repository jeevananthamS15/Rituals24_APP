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
  Dimensions,
  Image,
  StatusBar,
} from 'react-native';
import { ShieldCheck } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../../app/navigation/types';

const { width, height } = Dimensions.get('window');
const BASE_W = 393;
const scale = (px: number) => (px / BASE_W) * width;
const CIRCLE_SIZE = scale(279);

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'> & {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
};

export const LoginScreen = ({ navigation, setIsAuthenticated }: Props) => {
  const [mobile, setMobile] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'mobile' | 'email'>('mobile');

  const isReady = mobile.length === 10 && !loading;

  const handleSendOTP = async () => {
    if (!isReady) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      console.log('OTP Sent');
    }, 1500);
  };

  const homeNavigate = () => setIsAuthenticated(true);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.headerBg}>
          <LinearGradient
            colors={['rgba(221,171,44,0.18)', 'rgba(43,0,10,0)']}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 0.37 }}
            style={[styles.ellipse, styles.ellipseTopRight]}
          />

          <LinearGradient
            colors={['rgba(221,171,44,0.18)', 'rgba(43,0,10,0)']}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 0.37 }}
            style={[styles.ellipse, styles.ellipseMiddleRight]}
          />

          <LinearGradient
            colors={['rgba(221,171,44,0.18)', 'rgba(43,0,10,0)']}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 0.37 }}
            style={[styles.ellipse, styles.ellipseTopLeft]}
          />

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.logoContainer}>
              <Image
                source={require('../../../../assets/images/logo.png')}
                resizeMode="contain"
                style={styles.logo}
              />
            </View>

            <View style={styles.card}>
              <Text style={styles.title}>Welcome Back</Text>

              <Text style={styles.subtitle}>
                Sign in to Book pandits, poojas, and temple darshan
              </Text>

              <View style={styles.segmentContainer}>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => setActiveTab('mobile')}
                  style={[styles.segmentButton, activeTab === 'mobile' && styles.segmentActive]}
                >
                  <Text style={[styles.segmentText, activeTab === 'mobile' && styles.segmentTextActive]}>
                    Mobile
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => setActiveTab('email')}
                  style={[styles.segmentButton, activeTab === 'email' && styles.segmentActive]}
                >
                  <Text style={[styles.segmentText, activeTab === 'email' && styles.segmentTextActive]}>
                    Email
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.inputWrapper}>
                <View style={styles.countrySection}>
                <Image source={require('../../../../assets/Login/flag.png')}  style={styles.flag}/>
                  <Text style={styles.countryCode}>+91</Text>
                </View>

                <View style={styles.inputDivider} />

                <TextInput
                  value={mobile}
                  onChangeText={setMobile}
                  keyboardType="phone-pad"
                  maxLength={10}
                  placeholder="Enter mobile number"
                  placeholderTextColor="#757575"
                  style={styles.input}
                />
              </View>

              <View style={styles.helperRow}>
                <Image source={require('../../../../assets/Login/lock.png')} style={styles.helperIcon}/>
                <Text style={styles.helperText}>
                  Secure OTP Verification. Your data is protected.
                </Text>
              </View>

              <TouchableOpacity
                activeOpacity={0.85}
                disabled={!isReady}
                onPress={handleSendOTP}
                style={[styles.otpButton, isReady && styles.otpButtonReady]}
              >
                <Text style={styles.otpButtonText}>
                  {loading ? 'Sending...' : 'Send OTP →'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.8} style={styles.createAccountRow}>
                <Text style={styles.createAccountText}>
                  New here?{' '}
                  <Text style={styles.createAccountLink}>Create Account</Text>
                </Text>
              </TouchableOpacity>

              <View style={styles.dividerRow}>
                <View style={styles.line} />
                <Text style={styles.orText}>or</Text>
                <View style={styles.line} />
              </View>

              <TouchableOpacity
                activeOpacity={0.9}
                style={styles.guestButton}
                onPress={homeNavigate}
              >
                <Text style={styles.guestButtonText}>Continue as Guest</Text>
              </TouchableOpacity>
              <View style={styles.socialRow}>
                <TouchableOpacity activeOpacity={0.9} style={styles.socialButton}>
                 <Image source={require('../../../../assets/Login/google.png')} style={styles.socialIcon}/>
                </TouchableOpacity>
             <TouchableOpacity activeOpacity={0.9} style={styles.socialButton}>
              <Image source={require('../../../../assets/Login/apple.png')} style={styles.socialIcon}/>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1 },

  safeArea: {
    flex: 1,
    backgroundColor: '#2B000A',
  },

  headerBg: {
    flex: 1,
    backgroundColor: '#2B000A',
  },

  ellipse: {
    position: 'absolute',
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
  },

  ellipseTopLeft: {
    left: scale(-197),
    top: scale(-75),
    transform: [{ rotate: '125.94deg' }],
  },

  ellipseTopRight: {
    left: scale(191),
    top: scale(-184),
    transform: [{ rotate: '-154.03deg' }],
  },

  ellipseMiddleRight: {
    left: scale(161),
    top: scale(131),
    transform: [{ rotate: '-3.88deg' }],
  },

  scrollContent: {
    flexGrow: 1,
  },

  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: scale(39),
    paddingBottom: scale(23),
  },

  logo: {
    width: scale(203),
    height: scale(176),
  },

  card: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: scale(20),
    paddingTop: scale(40),
    paddingBottom: Platform.OS === 'ios' ? 34 : 24,
    minHeight: scale(614),
  },

  title: {
    fontFamily: 'Lato-Bold',
    fontSize: 28,
    lineHeight: 36,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '400',
    color: '#000000',
    marginBottom: 20,
    maxWidth: scale(301),
  },

  segmentContainer: {
    height: 32,
    borderRadius: 100,
    backgroundColor: 'rgba(118,118,128,0.12)',
    flexDirection: 'row',
    padding: 2,
    gap: 4,
    marginBottom: 22,
  },

  segmentButton: {
    flex: 1,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },

  segmentActive: {
    backgroundColor: '#2B000A',
    borderRadius: 20,
  },

  segmentText: {
    fontSize: 13,
    fontWeight: '500',
    color: 'rgba(60,60,67,0.6)',
    letterSpacing: -0.08,
  },

  segmentTextActive: {
    fontWeight: '700',
    color: '#FFFFFF',
  },

  inputWrapper: {
    height: 42,
    borderRadius: 35,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    backgroundColor: '#F9F9F9',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 12,
    paddingRight: 12,
    marginBottom: 0,
  },

  countrySection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    width: 47,
  },

  flag: {
  width: scale(16),
  height: scale(16),
  resizeMode: 'contain',
},

  countryCode: {
    fontFamily: 'Lato',
    fontSize: 14,
    lineHeight: 22,
    color: '#757575',
    fontWeight: '400',
  },

  inputDivider: {
    width: 1,
    height: 22,
    backgroundColor: '#D9D9D9',
    marginHorizontal: 8,
  },

  input: {
    flex: 1,
    height: '100%',
    fontFamily: 'Lato',
    fontSize: 14,
    color: '#000000',
    paddingTop: 0,
    paddingBottom: 0,
  },

  helperRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 10,
    marginBottom: 16,
  },

 helperIcon: {
  width: scale(12),
  height: scale(12),
  resizeMode: 'contain',
},

  helperText: {
    fontFamily: 'Inter',
    fontSize: 10,
    lineHeight: 12,
    color: '#757575',
  },

  otpButton: {
    height: 42,
    borderRadius: 12,
    backgroundColor: '#A7A7A7',
    alignItems: 'center',
    justifyContent: 'center',
  },

  otpButtonReady: {
    backgroundColor: '#727272',
  },

  otpButtonText: {
    fontFamily: 'Lato',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 17,
    color: '#FFFFFF',
  },

  createAccountRow: {
    alignItems: 'center',
    marginTop: 16,
  },

  createAccountText: {
    fontFamily: 'Lato',
    fontSize: 12,
    lineHeight: 18,
    color: '#757575',
  },

  createAccountLink: {
    fontFamily: 'Lato',
    fontSize: 14,
    lineHeight: 22,
    color: '#2B000A',
    fontWeight: '400',
  },

  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#727272',
  },

  orText: {
    fontFamily: 'Lato',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 17,
    color: '#727272',
    marginHorizontal: 12,
  },

  guestButton: {
    height: 42,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2B000A',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },

  guestButtonText: {
    fontFamily: 'Lato',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 17,
    color: '#2B000A',
  },

  socialRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: scale(15),
    marginTop: 14,
  },

  socialButton: {
    flex: 1,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

socialIcon: {
  width: scale(20),
  height: scale(20),
  resizeMode: 'contain',
},
});