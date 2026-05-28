// LoginScreen.tsx

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
  ActivityIndicator,
  Alert,
} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';

import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {AuthStackParamList} from '../../../app/navigation/types';

import {useAuth} from '../../../app/providers/AuthProvider';
import {loginApi} from '../../../services/auth.api';
const BASE_WIDTH = 393;
const BASE_HEIGHT = 852;

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const scaleW = (size: number) => (SCREEN_WIDTH / BASE_WIDTH) * size;

const scaleH = (size: number) => (SCREEN_HEIGHT / BASE_HEIGHT) * size;

const moderateScale = (size: number, factor = 0.5) =>
  size + (scaleW(size) - size) * factor;

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const LoginScreen = ({navigation}: Props) => {
  const {login} = useAuth();

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState('');

  // ---------------- EMAIL ----------------

  const handleEmailChange = (value: string) => {
    const sanitized = value.trim().toLowerCase();

    setEmail(sanitized);

    if (error) {
      setError('');
    }
  };

  // ---------------- PASSWORD ----------------

  const handlePasswordChange = (value: string) => {
    setPassword(value);

    if (error) {
      setError('');
    }
  };

  // ---------------- VALIDATION ----------------

  const isReady = useMemo(() => {
    return EMAIL_REGEX.test(email) && password.trim().length > 0 && !loading;
  }, [email, password, loading]);

  // ---------------- LOGIN ----------------

  const handleLogin = async () => {
    if (!isReady) {
      return;
    }

    try {
      setLoading(true);

      setError('');

      const payload = {
        email: email.trim().toLowerCase(),
        password: password.trim(),
      };

      console.log('Login Payload:', payload);

      const response = await loginApi(payload);
      const token = response?.result?.token;


      if (!token) {
        throw new Error('Token not found');
      }

    console.log(response.result.user);
      await login(token, response.result.user);

      // RootNavigator automatically moves to MainNavigator
    } catch (err) {
      console.log('LOGIN ERROR:', err);

      setError('Invalid email or password');

      Alert.alert('Login Failed', 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  // ---------------- GUEST LOGIN ----------------

  const handleGuestLogin = async () => {
    try {
      setLoading(true);

       await login('guest_token', {
      id: 'guest',
      name: 'Guest User',
      email: '',
      role: 'guest',
    });
    } catch (error) {
      console.log('Guest Login Error:', error);

      Alert.alert('Error', 'Unable to continue as guest');
    } finally {
      setLoading(false);
    }
  };

  // ---------------- SOCIAL LOGIN ----------------

  const handleGoogleLogin = async () => {
    try {
      console.log('Google Login');
    } catch (error) {
      console.log(error);
    }
  };

  const handleAppleLogin = async () => {
    try {
      console.log('Apple Login');
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
        <View style={styles.container}>
          {/* Background Ellipses */}

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
            bounces={false}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.scrollContent}>
            {/* Logo */}

            <View style={styles.logoContainer}>
              <Image
                source={require('../../../../assets/images/logo.png')}
                resizeMode="contain"
                style={styles.logo}
              />
            </View>

            {/* Card */}

            <View style={styles.card}>
              <Text style={styles.title}>Welcome Back</Text>

              <Text style={styles.subtitle}>
                Sign in to Book pandits, poojas, and temple darshan
              </Text>

              {/* Email */}

              <View style={styles.fieldGroup}>
                <Text style={styles.label}>E-Mail</Text>

                <View
                  style={[
                    styles.inputWrapper,
                    error && styles.inputErrorBorder,
                  ]}>
                  <TextInput
                    value={email}
                    onChangeText={handleEmailChange}
                    placeholder="example@gmail.com"
                    placeholderTextColor="#757575"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={styles.input}
                    returnKeyType="next"
                  />
                </View>
              </View>

              {/* Password */}

              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Password</Text>

                <View
                  style={[
                    styles.inputWrapper,
                    error && styles.inputErrorBorder,
                  ]}>
                  <TextInput
                    value={password}
                    onChangeText={handlePasswordChange}
                    placeholder="Enter your password"
                    placeholderTextColor="#757575"
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={styles.input}
                    returnKeyType="done"
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

                {!!error && <Text style={styles.errorText}>{error}</Text>}
              </View>

              {/* Forgot Password */}

              <TouchableOpacity activeOpacity={0.8} style={styles.forgotRow}>
                <Text style={styles.forgotText}>Forgot Password?</Text>
              </TouchableOpacity>

              {/* Login Button */}

              <TouchableOpacity
                activeOpacity={0.9}
                disabled={!isReady}
                onPress={handleLogin}
                style={[
                  styles.loginButton,
                  isReady && styles.loginButtonActive,
                ]}>
                {loading ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={styles.loginButtonText}>Sign In →</Text>
                )}
              </TouchableOpacity>

              {/* Create Account */}

              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.createAccountRow}
                onPress={() => navigation.navigate('Signup')}>
                <Text style={styles.createAccountText}>
                  New here?{' '}
                  <Text style={styles.createAccountLink}>Create Account</Text>
                </Text>
              </TouchableOpacity>

              {/* Divider */}

              <View style={styles.dividerRow}>
                <View style={styles.line} />

                <Text style={styles.orText}>or</Text>

                <View style={styles.line} />
              </View>

              {/* Guest Login */}

              <TouchableOpacity
                activeOpacity={0.9}
                style={styles.guestButton}
                onPress={handleGuestLogin}>
                <Text style={styles.guestButtonText}>Continue as Guest</Text>
              </TouchableOpacity>

              {/* Social Login */}

              <View style={styles.socialRow}>
                <TouchableOpacity
                  activeOpacity={0.9}
                  style={styles.socialButton}
                  onPress={handleGoogleLogin}>
                  <Image
                    source={require('../../../../assets/Login/google.png')}
                    style={styles.socialIcon}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.9}
                  style={styles.socialButton}
                  onPress={handleAppleLogin}>
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

  container: {
    flex: 1,
    backgroundColor: '#2B000A',
  },

  scrollContent: {
    flexGrow: 1,
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

  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: scaleH(40),
    paddingBottom: scaleH(24),
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
    marginBottom: scaleH(24),
    maxWidth: scaleW(301),
  },

  fieldGroup: {
    marginBottom: scaleH(16),
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
    paddingVertical: 0,
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

  errorText: {
    marginTop: scaleH(6),
    marginLeft: scaleW(4),
    color: '#D92D20',
    fontSize: moderateScale(11),
    fontFamily: 'Lato',
  },

  forgotRow: {
    alignSelf: 'flex-end',
    marginBottom: scaleH(20),
  },

  forgotText: {
    fontFamily: 'Lato',
    fontSize: moderateScale(12),
    lineHeight: moderateScale(18),
    color: '#2B000A',
  },

  loginButton: {
    height: moderateScale(42),
    borderRadius: moderateScale(12),
    backgroundColor: '#A7A7A7',
    alignItems: 'center',
    justifyContent: 'center',
  },

  loginButtonActive: {
    backgroundColor: '#2B000A',
  },

  loginButtonText: {
    fontFamily: 'Lato',
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: '#FFFFFF',
  },

  createAccountRow: {
    alignItems: 'center',
    marginTop: scaleH(16),
  },

  createAccountText: {
    fontFamily: 'Lato',
    fontSize: moderateScale(12),
    color: '#757575',
  },

  createAccountLink: {
    fontFamily: 'Lato',
    fontSize: moderateScale(14),
    color: '#2B000A',
    fontWeight: '700',
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

  guestButton: {
    height: moderateScale(42),
    borderRadius: moderateScale(12),
    borderWidth: 1,
    borderColor: '#2B000A',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: scaleH(10),
  },

  guestButtonText: {
    fontFamily: 'Lato',
    fontSize: moderateScale(14),
    fontWeight: '500',
    color: '#2B000A',
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
