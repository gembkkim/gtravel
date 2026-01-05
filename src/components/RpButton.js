import React from 'react';
import { View, Text, Pressable } from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';
import styles from '../styles/rpGlobal';

const RpButton = ({
  title = '사용자 추가하기',
  iconOcticonsName = 'plus-circle',
  width = '100%',
  borderRadius = 5,
  onPress,
}) => {
  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: '#ddd' }}
      style={({ pressed }) => [
        styles.rpButtonContainer,
        {
          width,
          borderRadius,
          opacity: pressed ? 0.85 : 1,
        },
      ]}
    >
      <View style={styles.rpButtonContent}>
        <Octicons
          name={iconOcticonsName}
          size={20}
          color="white"
          style={{ marginRight: 8 }}
        />
        <Text style={styles.rpButtonText}>{title}</Text>
      </View>
    </Pressable>
  );
};

export default RpButton;
