/* eslint-disable react-native/no-inline-styles */
import { KeyboardAvoidingView, Alert, View, Platform } from 'react-native';
import { MD3LightTheme, PaperProvider } from 'react-native-paper';
import { asp } from '../apis/apiService';
import { useAuth } from '../context/AuthContext';
import React, { useState, useEffect } from 'react';
import styles from '../styles/global';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
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

const ChangePasswordScreen = ({ navigation }) => {
  const thisName = '▶ ' + ChangePasswordScreen.name + ' ::: ';
  const [menuVisible, setMenuVisible] = useState(false);
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('gembkkim@gmail.com');
  const [pwd, setPwd] = useState('jamesdin21');
  const [newPwd, setNewPwd] = useState('qwer1324');
  const [confirmNewPwd, setConfirmNewPwd] = useState('qwer1324');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChangePassword = async () => {
    if (email === '' || pwd === '' || newPwd === '' || confirmNewPwd === '') {
      setErrorMsg(
        '이메일, 현재 비밀번호, 새 비밀번호, 새 비밀번호 확인을 입력해 주세요.',
      );
      return;
    }

    console.log(thisName + 'email: ' + email);
    console.log(thisName + 'pwd: ' + pwd);
    console.log(thisName + 'user.email: ' + JSON.stringify(user.email));
    console.log(thisName + 'user.pwd: ' + JSON.stringify(user.pwd));
    if (email === user.email && pwd !== user.pwd) {
      setErrorMsg('현재 비밀번호가 일치하지 않습니다.');
      return;
    }

    if (newPwd !== confirmNewPwd) {
      setErrorMsg('새 비밀번호와 새 비밀번호 확인이 일치하지 않습니다.');
      return;
    }

    setLoading(true);
    setErrorMsg('');
    try {
      const args = {
        sp_name: 'asp_users_changepassword',
        email_s: email,
        new_pwd_s: newPwd,
      };
      const data = await asp(args);
      console.log(thisName + 'data: ' + JSON.stringify(data));

      if (data.length === 1) {
        const status = data[0];

        if (status.message === 'Ok') {
          logout();

          Alert.alert(
            '비밀번호 변경',
            '비밀번호가 성공적으로 변경되었습니다.',
            [{ text: '확인', onPress: () => navigation.navigate('SignIn') }],
          );
        } else {
          setErrorMsg('비밀번호 변경에 실패하였습니다. 다시 시도해 주세요.');
        }
      }
    } catch (err) {
      console.err('Failed to select item', err);
    } finally {
      setLoading(false);
      console.log(
        thisName + 'handleChangePassword ▶▶▶ 비밀번호 변경이 완료 되었습니다.',
      );
    }
  };

  return (
    <PaperProvider theme={theme}>
      <SafeAreaView style={styles.safeAreaViewContainer}>
        <RpAppHeader
          title="비밀번호 변경"
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

              {/* 이메일 */}
              <RpTextInput
                id="email"
                label="이메일"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
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
                style={{ marginBottom: 12 }}
              />

              {/* 새로운 비밀번호 */}
              <RpTextInput
                id="newPwd"
                label="새 비밀번호"
                value={newPwd}
                onChangeText={setNewPwd}
                secureTextEntry={true}
                autoCapitalize="none"
                style={{ marginBottom: 12 }}
              />

              {/* 새로운 확인 비밀번호 */}
              <RpTextInput
                id="confirmNewPwd"
                label="새 비밀번호 확인"
                value={confirmNewPwd}
                onChangeText={setConfirmNewPwd}
                secureTextEntry={true}
                autoCapitalize="none"
                style={{ marginBottom: 12 }}
              />

              {/* 에러 */}
              {errorMsg !== '' && (
                <RpText style={{ color: 'red', marginBottom: 10 }}>
                  {errorMsg}
                </RpText>
              )}

              {/* 비밀번호 변경 버튼 */}
              <RpButton
                title="비밀번호 변경"
                iconOcticonsName=""
                onPress={handleChangePassword}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </PaperProvider>
  );
};

export default ChangePasswordScreen;
