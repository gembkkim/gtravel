import React from 'react';
import { View } from 'react-native';
import { Dropdown } from 'react-native-paper-dropdown';
import styles from '../styles/rpGlobal';

const RpDropdown = ({
  id,
  label,
  placeholder,
  options = [],
  value,
  onSelect,
  mode = 'outlined',
  style = { borderRadius: 5 },
  containerStyle,
}) => {
  return (
    <View style={[styles.dropdownContainer, containerStyle]}>
      <Dropdown
        id={id}
        label={label}
        placeholder={placeholder}
        options={options}
        value={value}
        onSelect={onSelect}
        mode={mode}
        style={[styles.dropdownCon, style]}
      />
    </View>
  );
};

export default RpDropdown;
