import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from '../styles/rpGlobal';

const MenuSection = ({ title, children }) => {
  const [open, setOpen] = useState(true);

  return (
    <View style={styles.menuSection}>
      <TouchableOpacity
        style={styles.menuSectionHeader}
        onPress={() => setOpen(!open)}
      >
        <Text style={styles.menuSectionTitle}>{title}</Text>
        <MaterialIcons
          name={open ? 'expand-less' : 'expand-more'}
          size={22}
          color="#333"
        />
      </TouchableOpacity>

      {open && <View style={styles.menuItems}>{children}</View>}
    </View>
  );
};

const MenuItem = ({ label, onPress }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <Text style={styles.menuItemText}>{label}</Text>
  </TouchableOpacity>
);

const RpSideMenuContent = ({ navigation, onClose }) => {
  const go = screen => {
    onClose();
    navigation.navigate(screen);
  };

  return (
    <View>
      <MenuSection title="사용자관리">
        <MenuItem label="사용자목록" onPress={() => go('UserList')} />
        <MenuItem label="사용자등록" onPress={() => go('UserInfo')} />
      </MenuSection>

      <MenuSection title="기타관리">
        <MenuItem label="홈" onPress={() => go('Home')} />
        <MenuItem label="상세" onPress={() => go('Detail')} />
        <MenuItem label="프로파일" onPress={() => go('Profile')} />
      </MenuSection>
    </View>
  );
};

export default RpSideMenuContent;
