/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import {
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import { Text } from 'react-native-paper';
import { asp } from '../apis/apiService';
import { useAuth } from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import RpTextInput from '../components/RpTextInput';
import RpButton from '../components/RpButton';
import RpSwitch from '../components/RpSwitch';
import RpText from '../components/RpText';

const SignInScreen = ({ navigation }) => {
  const thisName = '■ ' + SignInScreen.name + ' ::: ';
  const [menuVisible, setMenuVisible] = useState(false);
  const date = new Date(+new Date() + 3240 * 10000).toISOString().split('T')[0];
  const time = new Date().toTimeString().split(' ')[0];
  console.log(thisName + '*************************** ' + date + ' ' + time);

  const { login } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [autoLogin, setAutoLogin] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // 🔹 자동로그인 정보 로딩
  useEffect(() => {
    const loadCredential = async () => {
      const saved = await AsyncStorage.getItem('AUTH_CREDENTIAL');
      if (saved) {
        const { email, pwd } = JSON.parse(saved);
        setEmail(email);
        setPwd(pwd);
        setAutoLogin(true);
      }
    };
    loadCredential();
  }, []);

  const handleSignin = async () => {
    if (email === '' || pwd === '') {
      setErrorMsg('이메일 혹은 비밀번호를 입력해 주세요.');
      return;
    }

    setLoading(true);
    try {
      const args = {
        sp_name: 'asp_users_signin',
        email_s: email,
        pwd_s: pwd,
      };
      const data = await asp(args);

      if (data.length === 1) {
        if (email === data[0].email && pwd === data[0].pwd) {
          await login(
            {
              email: data[0].email,
              name: data[0].name,
              ncnm: data[0].ncnm,
              cdma_no: data[0].cdma_no,
              pwd: data[0].pwd,
            },
            autoLogin,
          );
          setItems(data);

          navigation.replace('UserList');
        } else {
          setErrorMsg('이메일 또는 비밀번호가 올바르지 않습니다.');
        }
      } else {
        setErrorMsg('이메일 또는 비밀번호가 올바르지 않습니다.');
      }
    } catch (err) {
      console.err('Failed to select item', err);
    } finally {
      setLoading(false);
      console.log(thisName + 'handleSignin ▶▶▶ 사용자 조회가 완료 되었습니다.');
    }
    console.log(thisName + 'items: ' + JSON.stringify(items));
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={{ flex: 1, justifyContent: 'center', padding: 24 }}>
          {/* 타이틀 */}
          <View style={{ alignItems: 'center', marginBottom: 20 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>G-Travel</Text>
          </View>

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
            label="비밀번호"
            value={pwd}
            secureTextEntry={true}
            onChangeText={setPwd}
            style={{ marginBottom: 12 }}
          />

          {/* 에러 */}
          {errorMsg !== '' && (
            <RpText style={{ color: 'red', marginBottom: 10 }}>
              {errorMsg}
            </RpText>
          )}

          {/* 자동 로그인 */}
          <RpSwitch
            label="자동 로그인"
            value={autoLogin}
            onValueChange={setAutoLogin}
          />

          {/* 로그인 버튼 */}
          <RpButton title="로그인" iconOcticonsName="" onPress={handleSignin} />

          {/* 하단 링크 */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 28,
            }}
          >
            <TouchableOpacity onPress={() => navigation.navigate('FindEmail')}>
              <Text>아이디 찾기</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('FindPassword')}
            >
              <Text>비밀번호 찾기</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text>회원가입</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default SignInScreen;
