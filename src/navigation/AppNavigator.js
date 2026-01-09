import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import ProfileScreen from '../screens/ProfileScreen';
import UserListScreen from '../screens/UserListScreen';
import UserInfoScreen from '../screens/UserInfoScreen';
import A from '../screens/A';
import SignInScreen from '../screens/SignInScreen';
import FindEmailScreen from '../screens/FindEmailScreen';
import FindPasswordScreen from '../screens/FindPasswordScreen';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        /* ---------- 헤더 ---------- */
        headerShown: false, // true | false
        headerTitle: 'G-Travel',
        headerTitleAlign: 'center', // 'left' | 'center'
        headerTintColor: '#ffffff',
        headerStyle: {
          backgroundColor: '#222222',
        },
        headerTitleStyle: {
          fontSize: 18,
          fontWeight: 'bold',
        },
        /* ---------- 화면 공통 ---------- */
        contentStyle: {
          backgroundColor: '#ffffff',
        },
        /* ---------- 뒤로가기 ---------- */
        headerBackTitleVisible: false, // iOS
        headerBackVisible: true,
        /* ---------- 애니메이션 ---------- */
        animation: 'slide_from_right', // 'none' 'fade' 'slide_from_right' 'slide_from_left' 'slide_from_bottom' 'flip'
        animationDuration: 300,
        /* ---------- 제스처 ---------- */
        gestureEnabled: true,
        gestureDirection: 'horizontal', // 'horizontal' | 'vertical'
        /* ---------- 프레젠테이션 ---------- */
        presentation: 'card', // 'card' 'modal' 'fullScreenModal' 'transparentModal'
        /* ---------- 상태바 (iOS 중심) ---------- */
        statusBarStyle: 'dark', // 'light' | 'dark'
        statusBarHidden: false,
        statusBarAnimation: 'fade',
        /* ---------- Android ---------- */
        navigationBarColor: '#222222',
        navigationBarHidden: false,
        /* ---------- 화면 전환 시 ---------- */
        freezeOnBlur: false,
        /* ---------- 방향 ---------- */
        orientation: 'portrait', // 'portrait' 'landscape' 'all'
        /* ---------- 키보드 ---------- */
        keyboardHandlingEnabled: true,
        /* ---------- Safe Area ---------- */
        safeAreaInsets: {
          top: 0,
          bottom: 0,
        },
      }}
    >
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="FindEmail" component={FindEmailScreen} />
      <Stack.Screen name="FindPassword" component={FindPasswordScreen} />
      <Stack.Screen name="UserList" component={UserListScreen} />
      <Stack.Screen name="A" component={A} />
      <Stack.Screen name="UserInfo" component={UserInfoScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Detail" component={DetailScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
}

export default AppNavigator;
