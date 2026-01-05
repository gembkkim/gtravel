import React, { useEffect, useRef } from 'react';
import {
  View,
  Animated,
  TouchableWithoutFeedback,
  Dimensions,
  Platform,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styles from '../styles/rpGlobal';

const SCREEN_WIDTH = Dimensions.get('window').width;
const MENU_WIDTH = SCREEN_WIDTH * 0.66;

const RpSideMenu = ({ visible, onClose, children }) => {
  const translateX = useRef(new Animated.Value(MENU_WIDTH)).current;
  const insets = useSafeAreaInsets();

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: visible ? 0 : MENU_WIDTH,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  if (!visible) return null;

  /** ✅ 핵심: Android + iOS 노치 보정 */
  const paddingTop =
    Platform.OS === 'android' ? StatusBar.currentHeight || 0 : insets.top;

  return (
    <View style={styles.sideMenuOverlay}>
      {/* 반투명 배경 */}
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.sideMenuBackdrop} />
      </TouchableWithoutFeedback>

      {/* 메뉴 */}
      <Animated.View
        style={[
          styles.sideMenuContainer,
          {
            transform: [{ translateX }],
            paddingTop, // ⭐⭐⭐ 핵심
          },
        ]}
      >
        {children}
      </Animated.View>
    </View>
  );
};

export default RpSideMenu;
