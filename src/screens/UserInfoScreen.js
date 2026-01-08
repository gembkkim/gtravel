/* eslint-disable react-native/no-inline-styles */
import {
  Alert,
  Platform,
  BackHandler,
  KeyboardAvoidingView,
  View,
} from 'react-native';
import {
  Button,
  TextInput,
  Text,
  MD3LightTheme,
  PaperProvider,
  IconButton,
} from 'react-native-paper';
import { asp } from '../apis/apiService';
import { useRef, useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/global';
import { Dropdown, MultiSelectDropdown } from 'react-native-paper-dropdown';
import RpIconButton from '../components/RpIconButton';
import RpButton from '../components/RpButton';
import RpTextInput from '../components/RpTextInput';
import RpDropdown from '../components/RpDropdown';
import RpAppHeader from '../components/RpAppHeader';
import RpSideMenu from '../components/RpSideMenu';
import RpSideMenuContent from '../components/RpSideMenuContent';

const theme = {
  ...MD3LightTheme, // or MD3DarkTheme
  roundness: 2,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#3498db',
    secondary: '#f1c40f',
    tertiary: '#a1b2c3',
  },
};

const SEX_TY_OPTIONS = [
  { label: '', value: '' },
  { label: '남성', value: 'M' },
  { label: '여성', value: 'F' },
];

const UserInfoScreen = ({ route }) => {
  const thisName = '■ ' + UserInfoScreen.name + ' ::: ';
  const [menuVisible, setMenuVisible] = useState(false);
  const date = new Date(+new Date() + 3240 * 10000).toISOString().split('T')[0];
  const time = new Date().toTimeString().split(' ')[0];
  console.log(thisName + '*************************** ' + date + ' ' + time);

  const navigation = useNavigation();
  console.log(thisName + 'route.params: ' + JSON.stringify(route.params));
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(route.params.user_id || '');
  const [name, setName] = useState(route.params.name || '');
  const [age, setAge] = useState(
    route.params.age ? String(route.params.age) : '',
  );
  const [sexTy, setSexTy] = useState(route.params.sex_ty || '');
  const [rmk, setRmk] = useState(route.params.rmk || '');
  const [enableInputYn, setEnableInputYn] = useState(true);

  useEffect(() => {
    console.log(
      thisName + 'handleSelectRow ▶▶▶ 사용자 조회가 완료 되었습니다.',
    );
    if (route.params.user_id.toString() !== '') setEnableInputYn(false);
    // handleInsertRowOrUpdateRow;
    // 백 버튼 누름을 처리하는 사용자 정의 로직 : 기본 동작(예: 앱 종료)을 방지하려면 true를 반환, 기본 동작을 허용하려면 false를 반환
    // BackHandler.addEventListener("hardwareBackPress", () => {
    //   Alert.alert("알림", "우상단 뒤로가기 버튼을 사용 하십시오.");
    //   return true;
    // });
  }, []);

  const onChangeTextUserId = userId => {
    setUserId(userId);
  };
  const onChangeTextName = name => {
    setName(name);
  };
  const onChangeTextSexTy = sexTy => {
    setSexTy(sexTy);
  };
  const onChangeTextRmk = rmk => {
    setRmk(rmk);
  };

  const handleInsertRowOrUpdateRow = async () => {
    setLoading(true);
    if (userId.toString() === '') {
      console.log(
        thisName +
          'handleInsertRowOrUpdateRow ▶▶▶ 사용자ID가 입력되지 않았습니다.',
      );
      return;
    }
    try {
      const args = {
        sp_name: 'asp_usrs_u',
        user_id: userId,
        name: name,
        age: age,
        sex_ty: sexTy,
        rmk: rmk,
      };
      console.log(
        thisName +
          'handleInsertRowOrUpdateRow ▶▶▶ args: ' +
          JSON.stringify(args),
      );
      const data = await asp(args);
      console.log(
        thisName + 'handleInsertRowOrUpdateRow:' + JSON.stringify(data),
      );
      handleSelectRow();
    } catch (err) {
      console.err('Failed to update item', err);
    } finally {
      setLoading(false);
      console.log(
        thisName +
          'handleInsertRowOrUpdateRow ▶▶▶ 사용자 등록이 완료 되었습니다.',
      );
    }
  };

  useEffect(() => {
    console.log(
      thisName + 'handleSelectRow ▶▶▶ items: ' + JSON.stringify(items),
    );
    if (!items || items.length === 0) {
      return;
    }
    setUserId(items[0].user_id);
    setName(items[0].name);
    setAge(items[0].age.toString());
    setSexTy(items[0].sex_ty);
    setRmk(items[0].rmk);
    // console.log("items.user_id: " + items[0].user_id);
  }, [items]);

  const handleSelectRow = async () => {
    setLoading(true);
    try {
      const args = {
        sp_name: 'asp_usrs_k',
        user_id_s: userId,
      };
      const data = await asp(args);
      console.log(
        thisName + 'handleSelectRow ▶▶▶ 사용자 조회가 완료 되었습니다.',
      );

      setItems(data);
    } catch (err) {
      console.err('Failed to select item', err);
    } finally {
      setLoading(false);
      console.log(
        thisName + 'handleSelectRow ▶▶▶ 사용자 조회가 완료 되었습니다.',
      );
    }
  };

  return (
    <PaperProvider theme={theme}>
      <SafeAreaView style={{ flex: 1 }}>
        <RpAppHeader
          title="사용자 등록"
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
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
        >
          <View style={[styles.viewTotalContainer, {}]}>
            <View style={[styles.viewColumnContainer, {}]}>
              <RpTextInput
                id="txtUserId"
                style={{ width: '100%', marginBottom: 5 }}
                label="사용자ID"
                placeholder="사용자ID"
                value={userId}
                onChangeText={onChangeTextUserId}
                editable={enableInputYn}
              />
              <RpTextInput
                id="txtName"
                style={{ width: '100%', marginBottom: 5 }}
                label="성명"
                placeholder="성명"
                value={name}
                onChangeText={onChangeTextName}
              />
              <RpTextInput
                id="txtAge"
                style={{ width: '100%', marginBottom: 5 }}
                label="나이"
                placeholder="나이"
                value={age}
                onChangeText={age => {
                  setAge(age.replace(/[^0-9]/g, ''));
                }}
              />
              <RpDropdown
                id="cbxSexTy"
                label="성별"
                placeholder="성별 선택..."
                options={SEX_TY_OPTIONS}
                value={sexTy}
                onSelect={onChangeTextSexTy}
              />
              <RpTextInput
                id="txtRmk"
                style={{ width: '100%', marginBottom: 5 }}
                label="비고"
                placeholder="비고"
                value={rmk}
                onChangeText={onChangeTextRmk}
              />
            </View>
          </View>
          <View style={[styles.viewTotalContainer, { flex: 0 }]}>
            <View
              style={[
                styles.viewColumnContainer,
                {
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                },
              ]}
            >
              <RpButton
                title="사용자 등록 혹은 수정"
                iconOcticonsName="plus-circle"
                width="100%"
                borderRadius={5}
                onPress={handleInsertRowOrUpdateRow}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </PaperProvider>
  );
};

export default UserInfoScreen;
