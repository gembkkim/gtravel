/* eslint-disable react-native/no-inline-styles */
import {
  FlatList,
  KeyboardAvoidingView,
  Alert,
  View,
  Platform,
} from 'react-native';
import {
  Button,
  TextInput,
  Text,
  Checkbox,
  MD3LightTheme,
  PaperProvider,
  IconButton,
  Tooltip,
} from 'react-native-paper';
import { asp } from '../apis/apiService';
import { useAuth } from '../context/AuthContext';
import React, { useState, useEffect } from 'react';
import styles from '../styles/global';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from 'react-native-paper';
import { Dropdown, MultiSelectDropdown } from 'react-native-paper-dropdown';
import { useIsFocused } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import RpIconButton from '../components/RpIconButton';
import RpButton from '../components/RpButton';
import RpTextInput from '../components/RpTextInput';
import RpText from '../components/RpText';
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

const FindEmailScreen = ({ navigation }) => {
  const thisName = '▶ ' + FindEmailScreen.name + ' ::: ';
  const [menuVisible, setMenuVisible] = useState(false);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, logout } = useAuth();
  const [name, setName] = useState('김봉균');
  const [ncnm, setNcnm] = useState('봉이김선달');
  const [cdmaNo, setCdmaNo] = useState('010-8523-7729');
  const [errorMsg, setErrorMsg] = useState('');

  const handleFindEmail = async () => {
    if (name === '' || ncnm === '' || cdmaNo === '') {
      setErrorMsg('성명, 별명, 휴대전화를 입력해 주세요.');
      return;
    }

    setLoading(true);
    try {
      const args = {
        sp_name: 'asp_users_findemail',
        name_s: name,
        ncnm_s: ncnm,
        cdma_no_s: cdmaNo,
      };
      const data = await asp(args);

      if (data.length === 1) {
        setItems(data);
        Alert.alert(
          '아이디 찾기',
          `회원님의 아이디는 ${data[0].email} 입니다.`,
          [{ text: '확인', onPress: () => navigation.goBack() }],
        );
      } else {
        setErrorMsg(
          '해당하는 사용자가 없습니다. 입력정보를 다시 확인해 주세요.',
        );
      }
    } catch (err) {
      console.err('Failed to select item', err);
    } finally {
      setLoading(false);
      console.log(
        thisName + 'handleFindEmail ▶▶▶ 사용자 조회가 완료 되었습니다.',
      );
    }
    console.log(thisName + 'items: ' + JSON.stringify(items));
  };

  return (
    <PaperProvider theme={theme}>
      <SafeAreaView style={styles.safeAreaViewContainer}>
        <RpAppHeader
          title="아이디 찾기"
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
        >
          <View style={[styles.viewTotalContainer, {}]}>
            <View style={{ flex: 1, justifyContent: 'center', padding: 24 }}>
              {/* 아이콘 */}
              <View style={{ alignItems: 'center', marginBottom: 30 }}>
                <MaterialIcons name="account-circle" size={90} color="#444" />
              </View>

              {/* 성명 */}
              <RpTextInput
                id="name"
                label="성명"
                value={name}
                onChangeText={setName}
                // keyboardType="email-address"
                autoCapitalize="none"
                style={{ marginBottom: 12 }}
              />

              {/* 별명 */}
              <RpTextInput
                id="ncnm"
                label="별명"
                value={ncnm}
                onChangeText={setNcnm}
                // keyboardType="email-address"
                autoCapitalize="none"
                style={{ marginBottom: 12 }}
              />

              {/* 휴대전화 */}
              <RpTextInput
                id="cdmaNo"
                label="휴대전화"
                value={cdmaNo}
                onChangeText={setCdmaNo}
                // keyboardType="email-address"
                autoCapitalize="none"
                style={{ marginBottom: 12 }}
              />

              {/* 에러 */}
              {errorMsg !== '' && (
                <RpText style={{ color: 'red', marginBottom: 10 }}>
                  {errorMsg}
                </RpText>
              )}

              {/* 아이디 찾기 버튼 */}
              <RpButton
                title="아이디 찾기"
                iconOcticonsName=""
                onPress={handleFindEmail}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </PaperProvider>
  );
};

export default FindEmailScreen;
