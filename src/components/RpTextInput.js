import React from 'react';
import { TextInput } from 'react-native-paper';
import styles from '../styles/rpGlobal';

const RpTextInput = ({
  id,
  style,
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  editable = true,
  /* optional */
  rightIcon,
  onRightPress,
}) => {
  return (
    <TextInput
      id={id}
      style={[styles.textInputCon, style]}
      label={label}
      mode="outlined"
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      right={
        rightIcon ? (
          <TextInput.Icon icon={rightIcon} onPress={onRightPress} />
        ) : null
      }
    />
  );
};

export default RpTextInput;
