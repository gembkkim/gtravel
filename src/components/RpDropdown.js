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
      />
    </View>
  );
};

export default RpDropdown;
