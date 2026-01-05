import React from 'react';
import { View, Pressable } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from '../styles/rpGlobal';

const RpIconButton = ({
  iconMaterialIconsName,
  iconSize = 24,
  iconColor = 'black',
  onPress,
  viewWidth = 40,
  viewHeight = 40,
}) => {
  return (
    <Pressable onPress={onPress}>
      <View
        style={[
          styles.iconWrapper,
          {
            width: viewWidth,
            height: viewHeight,
            borderRadius: viewWidth / 2,
          },
        ]}
      >
        <MaterialIcons
          name={iconMaterialIconsName}
          size={iconSize}
          color={iconColor}
          onPress={onPress}
        />
      </View>
    </Pressable>
  );
};

export default RpIconButton;
