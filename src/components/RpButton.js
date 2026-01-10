import React from 'react';
import { View, Text, Pressable } from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';
import styles from '../styles/rpGlobal';

const RpButton = ({
  title = '버튼이름 title 을 추가해 주세요',
  iconOcticonsName = '',
  width = '100%',
  borderRadius = 5,
  onPress,
  style = { marginBottom: 12, width: '100%' },
}) => {
  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: '#ddd' }}
      style={({ pressed }) => [
        styles.rpButtonContainer,
        style,
        // {
        //   width,
        //   borderRadius,
        //   opacity: pressed ? 0.85 : 1,
        // },
      ]}
    >
      <View style={styles.rpButtonContent}>
        {iconOcticonsName !== '' && (
          <Octicons
            name={iconOcticonsName === '' ? '' : iconOcticonsName}
            size={20}
            color="white"
            style={{ marginRight: 8 }}
          />
        )}

        <Text style={styles.rpButtonText}>{title}</Text>
      </View>
    </Pressable>
  );
};

export default RpButton;
