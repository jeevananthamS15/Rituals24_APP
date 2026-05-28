// SignupScreen.tsx

import React, {useMemo, useState} from 'react';
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
  Alert,
  ActivityIndicator,
} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../../../app/navigation/types';
import {useAuth} from '../../../app/providers/AuthProvider';
import {signupApi} from '../../../services/auth.api';

const BASE_WIDTH = 393;
const BASE_HEIGHT = 852;

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const scaleW = (size: number) => (SCREEN_WIDTH / BASE_WIDTH) * size;
const scaleH = (size: number) => (SCREEN_HEIGHT / BASE_HEIGHT) * size;

const moderateScale = (size: number, factor = 0.5) =>
  size + (scaleW(size) - size) * factor;

type Props = NativeStackScreenProps<AuthStackParamList, 'Signup'>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const SignupScreen = ({navigation}: Props) => {
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [fullNameError, setFullNameError] = useState('');
  const [mobileError, setMobileError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const {login} = useAuth();
  // ---------------- VALIDATIONS ----------------

  const validateFullName = (value: string) => {
    if (!value.trim()) {
      return 'Full name is required';
    }

    if (value.trim().length < 3) {
      return 'Minimum 3 characters required';
    }

    return '';
  };

  const validateMobile = (value: string) => {
    if (!value.trim()) {
      return 'Mobile number is required';
    }

    if (!/^[6-9]\d{9}$/.test(value)) {
      return 'Enter valid mobile number';
    }

    return '';
  };

  const validateEmail = (value: string) => {
    if (!value.trim()) {
      return 'Email is required';
    }

    if (!EMAIL_REGEX.test(value.trim())) {
      return 'Enter valid email address';
    }

    return '';
  };

  const validatePassword = (value: string) => {
    if (!value.trim()) {
      return 'Password is required';
    }

    if (value.length < 6) {
      return 'Minimum 6 characters required';
    }

    return '';
  };

  // ---------------- INPUT HANDLERS ----------------

  const handleNameChange = (value: string) => {
    setFullName(value);

    if (fullNameError) {
      setFullNameError(validateFullName(value));
    }
  };

  const handleMobileChange = (value: string) => {
    const sanitized = value.replace(/[^0-9]/g, '');

    setMobile(sanitized);

    if (mobileError) {
      setMobileError(validateMobile(sanitized));
    }
  };

  const handleEmailChange = (value: string) => {
    const sanitized = value.toLowerCase();

    setEmail(sanitized);

    if (emailError) {
      setEmailError(validateEmail(sanitized));
    }
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);

    if (passwordError) {
      setPasswordError(validatePassword(value));
    }
  };

  // ---------------- FORM READY ----------------

  const isReady = useMemo(() => {
    return (
      fullName.trim().length >= 3 &&
      /^[6-9]\d{9}$/.test(mobile) &&
      EMAIL_REGEX.test(email) &&
      password.length >= 6 &&
      !loading
    );
  }, [fullName, mobile, email, password, loading]);

  // ---------------- SUBMIT ----------------

  const handleCreateAccount = async () => {
    const nameValidation = validateFullName(fullName);
    const mobileValidation = validateMobile(mobile);
    const emailValidation = validateEmail(email);
    const passwordValidation = validatePassword(password);

    setFullNameError(nameValidation);
    setMobileError(mobileValidation);
    setEmailError(emailValidation);
    setPasswordError(passwordValidation);

    if (
      nameValidation ||
      mobileValidation ||
      emailValidation ||
      passwordValidation
    ) {
      return;
    }

    try {
      setLoading(true);

      const payload = {
        name: fullName.trim(),
        phoneNumber: mobile,
        email: email.trim().toLowerCase(),
        address: address.trim(),
        password,
      };

      console.log('Signup Payload:', payload);

      const response = await signupApi(payload);

      console.log('Signup Success:', response);

      const token = response?.result?.token;

      if (!token) {
        throw new Error('Token not found after signup');
      }
      console.log(response.result.user);

      // ✅ login user (this triggers navigation automatically)
      await login(token, response.result.user);
    } catch (error: any) {
      console.log('Signup Error:', error?.response?.data || error);

      Alert.alert(
        'Signup Failed',
        error?.response?.data?.message ||
          'Something went wrong. Please try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  // ---------------- GPS ----------------

  const handleUseGPS = async () => {
    try {
      Alert.alert('Coming Soon', 'GPS address feature will be added soon.');
    } catch (error) {
      console.log('GPS Error:', error);
    }
  };

  // ---------------- SOCIAL LOGIN ----------------

  const handleGoogleSignup = async () => {
    try {
      console.log('Google Signup');
    } catch (error) {
      console.log(error);
    }
  };

  const handleAppleSignup = async () => {
    try {
      console.log('Apple Signup');
    } catch (error) {
      console.log(error);
    }
  };

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
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.scrollContent}>
            <View style={styles.logoContainer}>
              <Image
                source={require('../../../../assets/images/logo.png')}
                resizeMode="contain"
                style={styles.logo}
              />
            </View>

            <View style={styles.card}>
              <Text style={styles.title}>Create Account</Text>

              <Text style={styles.subtitle}>
                Join 5 Lakhs + devotees on Rituals24
              </Text>

              {/* FULL NAME */}

              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Full Name</Text>

                <View
                  style={[
                    styles.inputWrapper,
                    fullNameError && styles.inputErrorBorder,
                  ]}>
                  <TextInput
                    value={fullName}
                    onChangeText={handleNameChange}
                    placeholder="Jayaraman"
                    placeholderTextColor="#757575"
                    style={styles.input}
                    autoCapitalize="words"
                    autoCorrect={false}
                  />
                </View>

                {!!fullNameError && (
                  <Text style={styles.errorText}>{fullNameError}</Text>
                )}
              </View>

              {/* MOBILE */}

              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Mobile Number</Text>

                <View
                  style={[
                    styles.inputWrapper,
                    mobileError && styles.inputErrorBorder,
                  ]}>
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
                    onChangeText={handleMobileChange}
                    keyboardType="number-pad"
                    maxLength={10}
                    placeholder="Enter mobile number"
                    placeholderTextColor="#757575"
                    style={styles.input}
                  />
                </View>

                {!!mobileError && (
                  <Text style={styles.errorText}>{mobileError}</Text>
                )}
              </View>

              {/* EMAIL */}

              <View style={styles.fieldGroup}>
                <Text style={styles.label}>E-Mail</Text>

                <View
                  style={[
                    styles.inputWrapper,
                    emailError && styles.inputErrorBorder,
                  ]}>
                  <TextInput
                    value={email}
                    onChangeText={handleEmailChange}
                    placeholder="jayaram@gmail.com"
                    placeholderTextColor="#757575"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={styles.input}
                  />
                </View>

                {!!emailError && (
                  <Text style={styles.errorText}>{emailError}</Text>
                )}
              </View>

              {/* PASSWORD */}

              {/* PASSWORD */}

              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Password</Text>

                <View
                  style={[
                    styles.inputWrapper,
                    passwordError && styles.inputErrorBorder,
                  ]}>
                  <TextInput
                    value={password}
                    onChangeText={handlePasswordChange}
                    placeholder="Enter password"
                    placeholderTextColor="#757575"
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    style={styles.input}
                  />

                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.eyeButton}
                    onPress={() => setShowPassword(prev => !prev)}>
                    <Image
                      source={
                        showPassword
                          ? require('../../../../assets/Login/open-eye.png')
                          : require('../../../../assets/Login/eye.png')
                      }
                      style={styles.eyeIcon}
                    />
                  </TouchableOpacity>
                </View>

                {!!passwordError && (
                  <Text style={styles.errorText}>{passwordError}</Text>
                )}
              </View>

              {/* ADDRESS */}

              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Address (Optional)</Text>

                <View style={styles.inputWrapper}>
                  <TextInput
                    value={address}
                    onChangeText={setAddress}
                    placeholder="Floor no 2, Raja Street, Delhi"
                    placeholderTextColor="#757575"
                    style={styles.input}
                  />
                </View>

                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={handleUseGPS}
                  style={styles.gpsButton}>
                  {/* <Text style={styles.gpsIcon}>📍</Text> */}

                  <Text style={styles.gpsText}>Use GPS</Text>
                </TouchableOpacity>
              </View>

              {/* CREATE ACCOUNT */}

              <TouchableOpacity
                activeOpacity={0.9}
                disabled={!isReady}
                onPress={handleCreateAccount}
                style={[
                  styles.createButton,
                  isReady && styles.createButtonReady,
                ]}>
                {loading ? (
                  <ActivityIndicator color="#FFFFFF" size="small" />
                ) : (
                  <Text style={styles.createButtonText}>Create Account</Text>
                )}
              </TouchableOpacity>

              {/* LOGIN */}

              <View style={styles.signinRow}>
                <Text style={styles.signinText}>Already have an account?</Text>

                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => navigation.navigate('Login')}>
                  <Text style={styles.signinLink}> Sign In</Text>
                </TouchableOpacity>
              </View>

              {/* DIVIDER */}

              <View style={styles.dividerRow}>
                <View style={styles.line} />

                <Text style={styles.orText}>or</Text>

                <View style={styles.line} />
              </View>

              {/* SOCIAL */}

              <View style={styles.socialRow}>
                <TouchableOpacity
                  activeOpacity={0.9}
                  style={styles.socialButton}
                  onPress={handleGoogleSignup}>
                  <Image
                    source={require('../../../../assets/Login/google.png')}
                    style={styles.socialIcon}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.9}
                  style={styles.socialButton}
                  onPress={handleAppleSignup}>
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
  flex: {
    flex: 1,
  },

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
    transform: [{rotate: '5.94deg'}],
  },

  ellipseTopRight: {
    position: 'absolute',
    width: scaleW(279),
    height: scaleW(279),
    right: scaleW(-106),
    top: scaleW(-105),
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
    fontWeight: '700',
    color: '#000000',
    marginBottom: scaleH(8),
  },

  subtitle: {
    fontFamily: 'Lato',
    fontSize: moderateScale(14),
    lineHeight: moderateScale(22),
    fontWeight: '400',
    color: '#000000',
    marginBottom: scaleH(20),
  },

  fieldGroup: {
    marginBottom: scaleH(14),
  },

  label: {
    fontFamily: 'Lato',
    fontSize: moderateScale(12),
    lineHeight: moderateScale(18),
    fontWeight: '700',
    color: '#000000',
    marginBottom: scaleH(8),
  },

  inputWrapper: {
    height: moderateScale(42),
    borderRadius: moderateScale(35),
    borderWidth: 1,
    borderColor: '#D9D9D9',
    backgroundColor: '#F9F9F9',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: scaleW(16),
    paddingRight: scaleW(12),
    width: '100%',
  },
  eyeButton: {
    padding: scaleW(4),
    justifyContent: 'center',
    alignItems: 'center',
  },

  eyeIcon: {
    width: scaleW(18),
    height: scaleW(18),
    resizeMode: 'contain',
    tintColor: '#757575',
  },

  inputErrorBorder: {
    borderColor: '#D92D20',
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

  errorText: {
    marginTop: scaleH(6),
    marginLeft: scaleW(4),
    color: '#D92D20',
    fontSize: moderateScale(11),
    fontFamily: 'Lato',
  },

  countrySection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scaleW(4),
  },

  flag: {
    width: scaleW(18),
    height: scaleW(18),
    resizeMode: 'contain',
  },

  countryCode: {
    fontFamily: 'Lato',
    fontSize: moderateScale(14),
    color: '#757575',
  },

  inputDivider: {
    width: 1,
    height: scaleH(22),
    marginHorizontal: scaleW(8),
    backgroundColor: '#D9D9D9',
  },

  gpsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginTop: scaleH(6),
    paddingHorizontal: scaleW(10),
    paddingVertical: scaleH(5),
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: moderateScale(29),
    backgroundColor: '#F1F1F1',
    gap: scaleW(4),
  },

  gpsIcon: {
    fontSize: moderateScale(12),
  },

  gpsText: {
    fontFamily: 'Inter',
    fontSize: moderateScale(10),
    color: '#757575',
  },

  createButton: {
    height: moderateScale(42),
    borderRadius: moderateScale(12),
    backgroundColor: '#A7A7A7',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: scaleH(16),
  },

  createButtonReady: {
    backgroundColor: '#2B000A',
  },

  createButtonText: {
    fontFamily: 'Lato',
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: '#FFFFFF',
  },

  signinRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: scaleH(16),
  },

  signinText: {
    fontFamily: 'Lato',
    fontSize: moderateScale(12),
    color: '#757575',
  },

  signinLink: {
    fontFamily: 'Lato',
    fontSize: moderateScale(14),
    fontWeight: '700',
    color: '#2B000A',
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
    color: '#727272',
    marginHorizontal: scaleW(12),
  },

  socialRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: scaleW(15),
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
