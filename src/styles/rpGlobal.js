import { StyleSheet, Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  /* Header */
  appHeaderContainer: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'black',
    paddingHorizontal: 12,
  },

  appTitle: {
    flex: 1,
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },

  headerSide: {
    width: 40,
    justifyContent: 'center',
  },

  /* Side Menu */
  sideMenuOverlay: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
    zIndex: 100,
  },

  sideMenuBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },

  sideMenuContainer: {
    width: Dimensions.get('window').width * 0.66,
    backgroundColor: 'white',
  },

  menuSection: {
    marginBottom: 16,
  },

  menuSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },

  menuSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
  },

  menuItems: {
    paddingLeft: 16,
  },

  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },

  menuItemText: {
    fontSize: 15,
    color: '#333',
  },

  /* Tooltip 전체 영역 */
  tooltipContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* 아이콘 래퍼 (정중앙 정렬) */
  iconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    overflow: 'hidden', // 🔥 중요
  },
  /* 버튼 컨테이너 */
  rpButtonContainer: {
    height: 50,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* 버튼 내부 정렬 */
  rpButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  /* 버튼 텍스트 */
  rpButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },

  textInputCon: {
    height: 56,
    backgroundColor: 'white',
  },

  /* 드롭다운 */
  dropdownContainer: {
    marginBottom: 8,
  },
});

export default styles;
