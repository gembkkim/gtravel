import React from 'react';
import { TextInput } from 'react-native-paper';
import styles from '../styles/rpGlobal';

const RpTextInput = ({
  id,
  label,
  placeholder,
  value,
  onChangeText,
  disabled = false,
  secureTextEntry = false,
  editable = true,
  /* optional */
  rightIcon,
  onRightPress,
  style = { borderRadius: 5, marginBottom: 12, width: '100%' },
}) => {
  return (
    <TextInput
      id={id}
      style={[styles.textInputCon, style]}
      label={label}
      mode="outlined"
      placeholder={placeholder}
      value={value}
      disabled={disabled}
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
