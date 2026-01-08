import React from 'react';
import { View } from 'react-native';
import { Text, Switch } from 'react-native-paper';
import styles from '../styles/rpGlobal';

const RpSwitch = ({ label, value, onValueChange, color = 'black', style }) => {
  return (
    <View style={[styles.switchContainer, style]}>
      <Text style={styles.switchLabel}>{label}</Text>
      <Switch value={value} onValueChange={onValueChange} color={color} />
    </View>
  );
};

export default RpSwitch;
