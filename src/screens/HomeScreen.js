import React, { useState } from 'react';
import { KeyboardAvoidingView, View, Platform } from 'react-native';
import { MD3LightTheme, PaperProvider } from 'react-native-paper';
import { asp } from '../apis/apiService';
import styles from '../styles/global';
import { SafeAreaView } from 'react-native-safe-area-context';
import RpAppHeader from '../components/RpAppHeader';
import RpSideMenu from '../components/RpSideMenu';
import RpSideMenuContent from '../components/RpSideMenuContent';

const theme = {
  ...MD3LightTheme, // or MD3DarkTheme
  roundness: 5,
  colors: {
    ...MD3LightTheme.colors,
    // primary: '#3498db',
    primary: 'black',
    secondary: '#f1c40f',
    // tertiary: '#a1b2c3',
    tertiary: 'black',
  },
};

const HomeScreen = ({ navigation }) => {
  const thisName = '▶ ' + HomeScreen.name + ' ::: ';
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <PaperProvider theme={theme}>
      <SafeAreaView style={styles.safeAreaViewContainer}>
        <RpAppHeader
          title="Home"
          showBack={true}
          onBackPress={() => navigation.goBack()}
          onMenuPress={() => setMenuVisible(true)}
        />
        <RpSideMenu visible={menuVisible} onClose={() => setMenuVisible(false)}>
          <RpSideMenuContent
            navigation={navigation}
            onClose={() => setMenuVisible(false)}
          />
        </RpSideMenu>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
        ></KeyboardAvoidingView>
      </SafeAreaView>
    </PaperProvider>
  );
};

export default HomeScreen;
