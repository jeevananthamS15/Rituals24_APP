import React, {useState} from 'react';
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
import {SafeAreaView} from 'react-native-safe-area-context';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../../../app/navigation/types';

const BASE_WIDTH = 393;
const BASE_HEIGHT = 852;

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');
const isSmallDevice = SCREEN_WIDTH < 360;
const scaleW = (size: number) => (SCREEN_WIDTH / BASE_WIDTH) * size;

const scaleH = (size: number) => (SCREEN_HEIGHT / BASE_HEIGHT) * size;

const moderateScale = (size: number, factor = 0.5) =>
  size + (scaleW(size) - size) * factor;

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'> & {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
};

export const LoginScreen = ({navigation, setIsAuthenticated}: Props) => {
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
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.headerBg}>
          <Image
            source={require('../../../../assets/Login/Ellipse8.png')}
            style={styles.ellipseTopRight}
          />

          <Image
            source={require('../../../../assets/Login/Ellipse7.png')}
            style={styles.ellipseMiddleRight}
          />

          <Image
            source={require('../../../../assets/Login/Ellipse8.png')}
            style={styles.ellipseTopLeft}
          />

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled">
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
                  style={[
                    styles.segmentButton,
                    activeTab === 'mobile' && styles.segmentActive,
                  ]}>
                  <Text
                    style={[
                      styles.segmentText,
                      activeTab === 'mobile' && styles.segmentTextActive,
                    ]}>
                    Mobile
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => setActiveTab('email')}
                  style={[
                    styles.segmentButton,
                    activeTab === 'email' && styles.segmentActive,
                  ]}>
                  <Text
                    style={[
                      styles.segmentText,
                      activeTab === 'email' && styles.segmentTextActive,
                    ]}>
                    Email
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.inputWrapper}>
                <View style={styles.countrySection}>
                  <Image
                    source={require('../../../../assets/Login/flag.png')}
                    style={styles.flag}
                  />
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
                <Image
                  source={require('../../../../assets/Login/lock.png')}
                  style={styles.helperIcon}
                />
                <Text style={styles.helperText}>
                  Secure OTP Verification. Your data is protected.
                </Text>
              </View>

              <TouchableOpacity
                activeOpacity={0.85}
                disabled={!isReady}
                onPress={handleSendOTP}
                style={[styles.otpButton, isReady && styles.otpButtonReady]}>
                <Text style={styles.otpButtonText}>
                  {loading ? 'Sending...' : 'Send OTP →'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.createAccountRow}>
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
                onPress={homeNavigate}>
                <Text style={styles.guestButtonText}>Continue as Guest</Text>
              </TouchableOpacity>
              <View style={styles.socialRow}>
                <TouchableOpacity
                  activeOpacity={0.9}
                  style={styles.socialButton}>
                  <Image
                    source={require('../../../../assets/Login/google.png')}
                    style={styles.socialIcon}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.9}
                  style={styles.socialButton}>
                  <Image
                    source={require('../../../../assets/Login/apple.png')}
                    style={styles.socialIcon}
                  />
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
  flex: {flex: 1},

  safeArea: {
    flex: 1,
    backgroundColor: '#2B000A',
  },

  headerBg: {
    flex: 1,
    backgroundColor: '#2B000A',
  },

  ellipseTopLeft: {
    position: 'absolute',
    width: scaleW(279),
    height: scaleW(279),
    left: scaleW(-70),
    top: scaleW(-20),
    resizeMode: 'contain',
    transform: [{rotate: '-5.94deg'}],
  },

  ellipseTopRight: {
    position: 'absolute',
    width: scaleW(279),
    height: scaleW(279),
    right: scaleW(-106),
    top: scaleW(-125),
    resizeMode: 'contain',
    transform: [{rotate: '90deg'}],
  },

  ellipseMiddleRight: {
    position: 'absolute',
    width: scaleW(279),
    height: scaleW(279),
    right: scaleW(-70),
    top: scaleW(120),
    resizeMode: 'contain',
    transform: [{rotate: '-15.88deg'}],
  },

  scrollContent: {
    flexGrow: 1,
  },

  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: scaleH(39),
    paddingBottom: scaleH(23),
  },

  logo: {
  width: scaleW(300),
  height: scaleH(185),
},

  card: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderTopLeftRadius: moderateScale(40),
    borderTopRightRadius: moderateScale(40),
    paddingHorizontal: scaleW(20),
    paddingTop: scaleH(40),
    paddingBottom: Platform.OS === 'ios' ? scaleH(34) : scaleH(24),
    minHeight: SCREEN_HEIGHT * 0.72,
  },

  title: {
    fontFamily: 'Lato',
    fontSize: moderateScale(28),
    lineHeight: moderateScale(36),
    marginBottom: scaleH(8),
    fontWeight: '700',
    color: '#000000',
  },

  subtitle: {
    fontSize: moderateScale(14),
    fontFamily: 'Lato',
    lineHeight: moderateScale(22),
    fontWeight: '400',
    color: '#000000',
    marginBottom: scaleH(20),
    maxWidth: scaleW(301),
  },

  segmentContainer: {
    height: moderateScale(32),
    borderRadius: moderateScale(100),
    backgroundColor: 'rgba(118,118,128,0.12)',
    flexDirection: 'row',
    padding: moderateScale(2),
    gap: scaleW(4),
    marginBottom: scaleH(22),
  },

  segmentButton: {
    flex: 1,
    borderRadius: moderateScale(100),
    alignItems: 'center',
    justifyContent: 'center',
  },

  segmentActive: {
    backgroundColor: '#2B000A',
    borderRadius: moderateScale(20),
  },

  segmentText: {
    fontSize: moderateScale(13),
    fontWeight: '500',
    fontFamily: 'SFPro',
    color: 'rgba(60,60,67,0.6)',
    letterSpacing: -0.08,
  },

  segmentTextActive: {
    fontWeight: '700',
    color: '#FFFFFF',
  },

  inputWrapper: {
    height: moderateScale(42),
    borderRadius: moderateScale(35),
    borderWidth: 1,
    borderColor: '#D9D9D9',
    backgroundColor: '#F9F9F9',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: scaleW(12),
    paddingRight: scaleW(12),
    marginBottom: 0,
  },

  countrySection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scaleW(4),
    width: scaleW(47),
  },

  flag: {
    width: scaleW(16),
    height: scaleW(16),
    resizeMode: 'contain',
  },

  countryCode: {
    fontFamily: 'Lato',
    fontSize: moderateScale(14),
    lineHeight: moderateScale(22),
    color: '#757575',
    fontWeight: '400',
  },

  inputDivider: {
    width: 1,
    height: scaleH(22),
    marginHorizontal: scaleW(8),
    backgroundColor: '#D9D9D9',
  },

  input: {
    flex: 1,
    height: '100%',
    fontFamily: 'Lato',
    fontSize: moderateScale(14),
    color: '#000000',
    paddingTop: 0,
    paddingBottom: 0,
  },

  helperRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scaleW(4),
    marginTop: scaleH(10),
    marginBottom: scaleH(16),
  },

  helperIcon: {
    width: scaleW(12),
    height: scaleW(12),
    resizeMode: 'contain',
  },

  helperText: {
    fontFamily: 'Inter',
    fontSize: moderateScale(10),
    lineHeight: moderateScale(12),
    color: '#757575',
  },

  otpButton: {
    height: moderateScale(42),
    borderRadius: moderateScale(12),
    backgroundColor: '#A7A7A7',
    alignItems: 'center',
    justifyContent: 'center',
  },

  otpButtonReady: {
    backgroundColor: '#727272',
  },

  otpButtonText: {
    fontFamily: 'Lato',
    fontSize: moderateScale(14),
    fontWeight: '500',
    lineHeight: moderateScale(17),
    color: '#FFFFFF',
  },

  createAccountRow: {
    alignItems: 'center',
    marginTop: scaleH(16),
  },

  createAccountText: {
    fontFamily: 'Lato',
    fontSize: moderateScale(12),
    lineHeight: moderateScale(18),
    color: '#757575',
  },

  createAccountLink: {
    fontFamily: 'Lato',
    fontSize: moderateScale(14),
    lineHeight: moderateScale(22),
    color: '#2B000A',
    fontWeight: '400',
  },

  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: scaleH(20),
    marginBottom: scaleH(20),
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#727272',
  },

  orText: {
    fontFamily: 'Lato',
    fontSize: moderateScale(14),
    fontWeight: '500',
    lineHeight: moderateScale(17),
    color: '#727272',
    marginHorizontal: scaleW(12),
  },

  guestButton: {
    height: moderateScale(42),
    borderRadius: moderateScale(12),
    borderWidth: 1,
    borderColor: '#2B000A',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },

  guestButtonText: {
    fontFamily: 'Lato',
    fontSize: moderateScale(14),
    fontWeight: '500',
    lineHeight: moderateScale(17),
    color: '#2B000A',
  },

  socialRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: scaleW(15),
    marginTop: scaleH(9.5),
  },

  socialButton: {
    flex: 1,
    height: moderateScale(42),
    borderRadius: moderateScale(12),
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  socialIcon: {
    width: scaleW(20),
    height: scaleW(20),
    resizeMode: 'contain',
  },
});
