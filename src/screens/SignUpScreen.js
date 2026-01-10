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
import { API_BASE_URL } from '../constants/constants';
import A from './A';

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

const SignUpScreen = ({ navigation }) => {
  const thisName = '▶ ' + SignUpScreen.name + ' ::: ';
  const [menuVisible, setMenuVisible] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, logout } = useAuth();
  const [email, setEmail] = useState('gembkkim@gmail.com');
  const [name, setName] = useState('김봉균');
  const [ncnm, setNcnm] = useState('봉이김선달');
  const [cdmaNo, setCdmaNo] = useState('010-8523-7729');
  const [pwd, setPwd] = useState('qwer1324');
  const [confirmPwd, setConfirmPwd] = useState('qwer1324');
  const [errorMsg, setErrorMsg] = useState('');

  const handleVerifyEmail = async () => {
    if (email === '') {
      setErrorMsg('이메일을 입력해 주세요.');
      return;
    }

    setLoading(true);
    setErrorMsg('');
    try {
      const args = {
        sp_name: 'asp_users_verifyemail',
        email_s: email,
      };
      const data = await asp(args);
      console.log(thisName + 'data: ' + JSON.stringify(data));

      if (data.length === 1) {
        const status = data[0];
        // setItems(data);
        console.log(thisName + 'status: ' + JSON.stringify(status));
        console.log(thisName + 'status.cnt: ' + JSON.stringify(status.cnt));

        if (status.cnt === 1) {
          Alert.alert('중복확인', '입력하신 이메일은 이미 존재 합니다.', [
            {
              text: '확인',
              onPress: () => {
                return;
              },
            },
          ]);
        } else {
          setErrorMsg('입력하신 이메일은 사용 가능합니다.');
          setDisabled(true);
        }
      }
    } catch (err) {
      console.err('Failed to select item', err);
    } finally {
      setLoading(false);
      console.log(
        thisName + 'asp_users_verifyemail ▶▶▶ 중복확인 처리가 완료 되었습니다.',
      );
    }
  };

  const handleSignUp = async () => {
    if (
      email === '' ||
      name === '' ||
      ncnm === '' ||
      cdmaNo === '' ||
      pwd === ''
    ) {
      setErrorMsg('이메일, 성명, 별명, 휴대전화를 입력해 주세요.');
      return;
    }

    if (pwd !== confirmPwd) {
      setErrorMsg('비밀번호와 확인비밀번호가 일치하지 않습니다.');
      return;
    }

    setLoading(true);
    setErrorMsg('');
    try {
      const args = {
        sp_name: 'asp_users_u',
        email: email,
        name: name,
        ncnm: ncnm,
        cdma_no: cdmaNo,
        pwd: pwd,
      };
      const data = await asp(args);
      console.log(thisName + 'data: ' + JSON.stringify(data));

      if (data.length === 1) {
        const status = data[0];
        setItems(data);

        console.log(thisName + 'status: ' + JSON.stringify(status));
        console.log(
          thisName +
            'status.affected_rows: ' +
            JSON.stringify(status.affected_rows),
        );
        console.log(
          thisName + 'status.message: ' + JSON.stringify(status.message),
        );

        if (status.affected_rows === 1) {
          Alert.alert('회원가입', '회원가입에 성공했습니다.', [
            { text: '확인', onPress: () => navigation.navigate('SignIn') },
          ]);
        } else {
          setErrorMsg(
            '회원가입에 실패했습니다. 입력정보를 다시 확인해 주세요.',
          );
        }
      } else {
        setErrorMsg('정상적으로 처리되지 않았습니다. 다시 시도해 주세요.');
      }
    } catch (err) {
      console.err('Failed to select item', err);
    } finally {
      setLoading(false);
      console.log(
        thisName + 'handleFindPassword ▶▶▶ 사용자 조회가 완료 되었습니다.',
      );
    }
  };

  return (
    <PaperProvider theme={theme}>
      <SafeAreaView style={styles.safeAreaViewContainer}>
        <RpAppHeader
          title="회원가입"
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
              <View style={[styles.viewRowContainer, {}]}>
                {/* 이메일 */}
                <RpTextInput
                  id="email"
                  label="이메일"
                  value={email}
                  borderRadius={5}
                  onChangeText={setEmail}
                  disabled={disabled}
                  // keyboardType="email-address"
                  autoCapitalize="none"
                  style={{ width: '73%' }}
                />

                {/* 중복확인 버튼 */}
                <RpButton
                  title="중복확인"
                  iconOcticonsName=""
                  onPress={handleVerifyEmail}
                  style={{ width: '25%' }}
                />
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
              {/* 비밀번호 */}
              <RpTextInput
                id="pwd"
                label="비밀번호"
                value={pwd}
                onChangeText={setPwd}
                secureTextEntry={true}
                autoCapitalize="none"
              />
              {/* 확인비밀번호 */}
              <RpTextInput
                id="confirmPwd"
                label="비밀번호 확인"
                value={confirmPwd}
                onChangeText={setConfirmPwd}
                secureTextEntry={true}
                autoCapitalize="none"
              />
              {/* 에러 */}
              {errorMsg !== '' && (
                <RpText style={{ color: 'red', marginBottom: 10 }}>
                  {errorMsg}
                </RpText>
              )}
              {/* 회원가입 버튼 */}
              <RpButton
                title="회원가입"
                iconOcticonsName=""
                onPress={handleSignUp}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </PaperProvider>
  );
};

export default SignUpScreen;
