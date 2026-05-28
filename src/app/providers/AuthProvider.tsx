import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

type UserType = {
  id: string;
  name: string;
  email: string;
  role: string;
   phoneNumber?: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  onboardingSeen: boolean;
  user: UserType | null;

  login: (token: string, userData: UserType) => Promise<void>;

  logout: () => Promise<void>;

  completeOnboarding: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const [onboardingSeen, setOnboardingSeen] = useState(false);

  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    restoreSession();
  }, []);

  const restoreSession = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem('access_token');

      const onboarding = await AsyncStorage.getItem('onboarding_seen');

      const storedUser = await AsyncStorage.getItem('user_data');

      setIsAuthenticated(!!token);

      setOnboardingSeen(onboarding === 'true');

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.log('Restore Session Error', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (token: string, userData: UserType) => {
    try {
      await AsyncStorage.setItem('access_token', token);

      await AsyncStorage.setItem('user_data', JSON.stringify(userData));

      setUser(userData);

      setIsAuthenticated(true);
    } catch (error) {
      console.log('Login Error', error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('access_token');

      await AsyncStorage.removeItem('user_data');

      setUser(null);

      setIsAuthenticated(false);
    } catch (error) {
      console.log('Logout Error', error);
    }
  };

  const completeOnboarding = async () => {
    try {
      await AsyncStorage.setItem('onboarding_seen', 'true');

      setOnboardingSeen(true);
    } catch (error) {
      console.log('Onboarding Error', error);
    }
  };

  const value = useMemo(
    () => ({
      isAuthenticated,
      isLoading,
      onboardingSeen,
      user,
      login,
      logout,
      completeOnboarding,
    }),
    [isAuthenticated, isLoading, onboardingSeen, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
