import React from 'react';
import { Text } from 'react-native-paper';
import { StyleSheet } from 'react-native';

/**
 * RpText
 *
 * @param {string|number} children - 텍스트 내용
 * @param {object|array} style - 추가 스타일
 * @param {string} variant - react-native-paper Text variant
 * @param {number|string} width - width 값 (optional)
 * @param {number} fontSize - fontSize (optional)
 * @param {string} color - 글자 색상 (optional)
 * @param {object} rest - 기타 Text props
 */
const RpText = ({
  children,
  style,
  variant = 'headlineMedium',
  width,
  fontSize,
  color,
  ...rest
}) => {
  return (
    <Text
      variant={variant}
      style={[
        styles.base,
        width && { width },
        fontSize && { fontSize },
        color && { color },
        style,
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
};

export default RpText;

const styles = StyleSheet.create({
  base: {
    color: '#333',
  },
});
