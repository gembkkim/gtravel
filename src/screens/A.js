/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../styles/global1';

const BOTTOM_BUTTON_HEIGHT = 60;

/* 예시 데이터 */
const SAMPLE_DATA = [
  { user_id: 'user01', name: '홍길동' },
  { user_id: 'user02', name: '김철수' },
  { user_id: 'user03', name: '이영희' },
];

const A = () => {
  const [userIdS, setUserIdS] = useState('');

  const renderItem = ({ item }) => (
    <View style={styles.listRow}>
      <Text style={styles.listText}>
        {item.user_id} - {item.name}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
      >
        {/* 타이틀 */}
        <Text style={styles.appTitle}>A 사용자 목록</Text>

        {/* 검색 영역 */}
        <View style={styles.searchContainer}>
          <TextInput
            label="사용자ID"
            mode="outlined"
            placeholder="사용자ID 검색어 입력"
            value={userIdS}
            onChangeText={setUserIdS}
          />
        </View>

        {/* 리스트 */}
        <FlatList
          data={SAMPLE_DATA}
          keyExtractor={item => item.user_id}
          renderItem={renderItem}
          contentContainerStyle={{
            paddingBottom: BOTTOM_BUTTON_HEIGHT + 20,
          }}
        />

        {/* 하단 고정 버튼 */}
        <View style={styles.bottomButtonContainer}>
          <Button
            mode="contained"
            style={styles.bottomButton}
            onPress={() => console.log('사용자 추가')}
          >
            사용자 추가하기
          </Button>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default A;
