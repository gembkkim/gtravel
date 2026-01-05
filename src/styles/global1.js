import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  /* 타이틀 */
  appTitle: {
    padding: 12,
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
    backgroundColor: 'black',
    textAlign: 'center',
  },

  /* 검색 */
  searchContainer: {
    padding: 10,
  },

  /* 리스트 Row */
  listRow: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },

  listText: {
    fontSize: 16,
    color: '#333',
  },

  /* 하단 버튼 컨테이너 */
  bottomButtonContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 10,
    backgroundColor: 'white',
  },

  bottomButton: {
    height: 60,
    justifyContent: 'center',
  },
});

export default styles;
