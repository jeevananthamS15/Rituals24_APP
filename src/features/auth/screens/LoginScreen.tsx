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
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../../app/navigation/types';


const { width, height } = Dimensions.get('window');

type Props = NativeStackScreenProps<
  AuthStackParamList,
  'Login'
> & {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
};

export const LoginScreen  = ({navigation,setIsAuthenticated,}:Props) => {
  const [mobile, setMobile] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'mobile' | 'email'>('mobile');


  const handleSendOTP = async () => {
    if (mobile.length !== 10) return;

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      console.log('OTP Sent');
    }, 1500);
  };

  const homeNavigate = () => {
  setIsAuthenticated(true);
};

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <LinearGradient
          colors={['#2B0008', '#4A0012', '#5B1A10']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={styles.headerGradient}
        >
       

          <View style={[styles.circle, styles.circleTopLeft]} />
          <View style={[styles.circle, styles.circleTopRight]} />
          <View style={[styles.circle, styles.circleMiddleRight]} />

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
                Sign in to book pandits, poojas, and temple darshan
              </Text>


              <View style={styles.segmentContainer}>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => setActiveTab('mobile')}
                  style={[
                    styles.segmentButton,
                    activeTab === 'mobile' && styles.segmentActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.segmentText,
                      activeTab === 'mobile' && styles.segmentTextActive,
                    ]}
                  >
                    Mobile
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => setActiveTab('email')}
                  style={[
                    styles.segmentButton,
                    activeTab === 'email' && styles.segmentActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.segmentText,
                      activeTab === 'email' && styles.segmentTextActive,
                    ]}
                  >
                    Email
                  </Text>
                </TouchableOpacity>
              </View>


              <View style={styles.inputWrapper}>
                <View style={styles.countrySection}>
                  <Text style={styles.flag}>🇮🇳</Text>

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
                <Text style={styles.helperIcon}>🔒</Text>

                <Text style={styles.helperText}>
                  Secure OTP Verification. Your data is protected.
                </Text>
              </View>

             

              <TouchableOpacity
                activeOpacity={0.9}
                disabled={mobile.length !== 10 || loading}
                onPress={handleSendOTP}
                style={[
                  styles.otpButton,
                  mobile.length === 10 && styles.otpButtonActive,
                ]}
              >
                <Text style={styles.otpButtonText}>
                  {loading ? 'Sending...' : 'Send OTP →'}
                </Text>
              </TouchableOpacity>

            

              <TouchableOpacity activeOpacity={0.8}>
                <Text style={styles.createAccountText}>
                  New here?{' '}
                  <Text style={styles.createAccountLink}>
                    Create Account
                  </Text>
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
                <Text style={styles.guestButtonText}>
                  Continue as Guest
                </Text>
              </TouchableOpacity>

          

              <View style={styles.socialRow}>
                <TouchableOpacity
                  activeOpacity={0.9}
                  style={styles.socialButton}

                >
                  <Text style={styles.socialIcon}>G</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.9}
                  style={styles.socialButton}
                >
                  <Text style={styles.appleIcon}></Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </LinearGradient>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const CIRCLE_SIZE = width * 0.72;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#2B0008',
  },

  container: {
    flex: 1,
    backgroundColor: '#2B0008',
  },

  headerGradient: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
  },



  circle: {
    position: 'absolute',
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    borderWidth: 28,
    borderColor: 'rgba(221,171,44,0.12)',
  },

  circleTopLeft: {
    top: -75,
    left: -197,
  },

  circleTopRight: {
    top: -185,
    right: -118,
  },

  circleMiddleRight: {
    top: 130,
    right: -122,
  },


  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: height * 0.035,
    paddingBottom: height * 0.03,
  },

  logo: {
    width: width * 0.52,
    height: width * 0.45,
  },

 

  card: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 20,
    paddingTop: 34,
    paddingBottom: Platform.OS === 'ios' ? 34 : 28,
    minHeight: height * 0.68,
  },

  title: {
    fontSize: 28,
    lineHeight: 36,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 12,
  },

  subtitle: {
    width: '86%',
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '400',
    color: '#4B4B4B',
    marginBottom: 28,
  },



  segmentContainer: {
    width: '100%',
    height: 32,
    borderRadius: 100,
    backgroundColor: 'rgba(118,118,128,0.12)',
    flexDirection: 'row',
    padding: 2,
    marginBottom: 26,
  },

  segmentButton: {
    flex: 1,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },

  segmentActive: {
    backgroundColor: '#2B000A',
  },

  segmentText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#757575',
  },

  segmentTextActive: {
    color: '#FFFFFF',
  },



  inputWrapper: {
    width: '100%',
    height: 52,
    borderRadius: 35,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    backgroundColor: '#F9F9F9',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },

  countrySection: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  flag: {
    fontSize: 16,
    marginRight: 6,
  },

  countryCode: {
    fontSize: 14,
    color: '#000000',
    fontWeight: '500',
  },

  inputDivider: {
    width: 1,
    height: 22,
    backgroundColor: '#D9D9D9',
    marginHorizontal: 12,
  },

  input: {
    flex: 1,
    height: '100%',
    fontSize: 14,
    color: '#000000',
    paddingTop: 0,
    paddingBottom: 0,
  },

 

  helperRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 18,
  },

  helperIcon: {
    fontSize: 11,
    marginRight: 4,
  },

  helperText: {
    fontSize: 11,
    color: '#757575',
    lineHeight: 14,
  },



  otpButton: {
    width: '100%',
    height: 42,
    borderRadius: 12,
    backgroundColor: '#A7A7A7',
    alignItems: 'center',
    justifyContent: 'center',
  },

  otpButtonActive: {
    backgroundColor: '#727272',
  },

  otpButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
  },



  createAccountText: {
    textAlign: 'center',
    marginTop: 18,
    fontSize: 12,
    color: '#757575',
    lineHeight: 18,
  },

  createAccountLink: {
    fontSize: 14,
    color: '#2B000A',
    fontWeight: '500',
  },



  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 24,
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#C7C7C7',
  },

  orText: {
    marginHorizontal: 12,
    fontSize: 14,
    fontWeight: '500',
    color: '#727272',
  },



  guestButton: {
    width: '100%',
    height: 42,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2B000A',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },

  guestButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2B000A',
  },



  socialRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 14,
  },

  socialButton: {
    width: '48%',
    height: 42,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  socialIcon: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
  },

  appleIcon: {
    fontSize: 22,
    color: '#000000',
  },
});