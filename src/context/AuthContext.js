import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 앱 시작 시 자동로그인 정보 로딩
  useEffect(() => {
    const loadAuth = async () => {
      try {
        const savedUser = await AsyncStorage.getItem('AUTH_USER');
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } finally {
        setLoading(false);
      }
    };

    loadAuth();
  }, []);

  // 🔹 로그인
  const login = async (userInfo, autoLogin) => {
    setUser(userInfo);

    if (autoLogin) {
      await AsyncStorage.setItem('AUTH_USER', JSON.stringify(userInfo));
      await AsyncStorage.setItem(
        'AUTH_CREDENTIAL',
        JSON.stringify({
          email: userInfo.email,
          name: userInfo.name,
          ncnm: userInfo.ncnm,
          cdma_no: userInfo.cdma_no,
          pwd: userInfo.pwd,
        }),
      );
    }
  };

  // 🔹 로그아웃
  const logout = async () => {
    setUser(null);
    await AsyncStorage.multiRemove(['AUTH_USER', 'AUTH_CREDENTIAL']);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
