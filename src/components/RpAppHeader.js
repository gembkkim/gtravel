import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from '../styles/rpGlobal';

const RpAppHeader = ({
  title,
  showBack = false, // 기본값: false (홈 화면용)
  onBackPress,
  showMenu = true, // 메뉴도 옵션화 (확장성)
  onMenuPress,
}) => {
  return (
    <View style={styles.appHeaderContainer}>
      {/* Left (Back) */}
      <View style={styles.headerSide}>
        {showBack && (
          <TouchableOpacity
            onPress={onBackPress}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <MaterialIcons name="arrow-back" size={26} color="white" />
          </TouchableOpacity>
        )}
      </View>

      {/* Center (Title) */}
      <Text style={styles.appTitle} numberOfLines={1}>
        {title}
      </Text>

      {/* Right (Menu) */}
      <View style={[styles.headerSide, { alignItems: 'flex-end' }]}>
        {showMenu && (
          <TouchableOpacity
            onPress={onMenuPress}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <MaterialIcons name="menu" size={28} color="white" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default RpAppHeader;
