import { Platform, StyleSheet, Dimensions } from 'react-native'
import Colors from 'enlist/app/styles/colors'

const { height, width } = Dimensions.get('window')

export const Styles = StyleSheet.create({
  errors: {
    backgroundColor: Colors.lightRed,
    padding: 10,
    borderRadius: 4
  },

  enNotify: {
    padding: 10,
    position: 'absolute',
    top: 80,
    left: 0,
    right: 0
  },

  enNotifyMessage: {
    flexDirection: 'row',
    padding: 5,
    marginTop: 10,
    backgroundColor: 'rgba(66,133,244,.975)',
    borderRadius: 4
  },

  enNotifyText: {
    color: Colors.white
  },

  interviewBox: {
    marginTop: 15,
    borderRadius: 4
  },

  interviewActions: {
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: Colors.mediumGray,
    flexDirection: 'row'
  },

  interviewExpanded: {
    borderWidth: 1,
    borderColor: Colors.mediumGray,
    backgroundColor: Colors.white,
    shadowColor: Colors.mediumGray,
    shadowOpacity: 1,
    shadowRadius: 30,
    shadowOffset: {
      height: 1,
      width: 0
    }
  },

  fadeScreen: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    height: height,
    width: width,
    backgroundColor: 'rgba(91,97,108,.35)',
    borderRadius: 4,
    zIndex: 100
  },

  modal: {
    position: 'absolute',
    left: 10,
    right: 10,
    top: 40,
    bottom: 10,
    backgroundColor: 'rgba(255,255,255,.99)',
    borderRadius: 4,
    zIndex: 101
  },

  selectModal: {
    backgroundColor: 'rgba(255,255,255,.975)',
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0
  },

  selectModalStripe: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.mediumGray,
    flexDirection: 'row'
  },

  selectModalPicker: {},

  centered: {
    justifyContent: 'center',
    alignItems: 'center'
  },

  blankSlate: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  whiteText: {
    color: Colors.white
  },

  blackText: {
    color: Colors.black
  },

  blueText: {
    color: Colors.blue
  },

  redText: {
    color: Colors.red
  },

  lightText: {
    color: Colors.gray
  },

  smallText: {
    fontSize: 13
  },

  lightSmallText: {
    color: Colors.gray,
    fontSize: 13
  },

  boldText: {
    fontWeight: '500'
  },

  headlineText: {
    fontWeight: '500',
    fontSize: 16
  },

  box: {
    padding: 15
  },

  boxHeadlineText: {
    fontWeight: '400',
    fontSize: 12,
    color: Colors.gray
  },

  headerStripe: {
    flexDirection: 'row',
    backgroundColor: Colors.lightGray,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.mediumGray
  },

  loginBox: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.white
  },

  logoBox: {
    flex: 1,
    height: 30,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 10
  },

  logo: {
    height: 30,
    width: 30
  },

  loginForm: {
    flex: 3,
    backgroundColor: Colors.lightGray,
    borderTopColor: Colors.mediumGray,
    borderTopWidth: 1,
    padding: 40
  },

  fieldset: {
    margin: 10
  },

  label: {
    fontWeight: '600',
    marginBottom: 4
  },

  input: {
    ...Platform.select({
      ios: {
        padding: 10,
        height: 40,
        backgroundColor: Colors.white,
        borderColor: Colors.mediumGray,
        borderWidth: 1,
        borderRadius: 4
      },

      android: {
        height: 40
      }
    })
  },

  button: {
    backgroundColor: Colors.blue,
    padding: 10,
    alignItems: 'center',

    ...Platform.select({
      ios: {
        borderRadius: 4
      },

      android: {
        shadowColor: 'black',
        shadowOpacity: 0.4,
        shadowRadius: 5,
        shadowOffset: {
          height: 5,
          width: 0
        }
      }
    })
  },

  smallButton: {
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10
  },

  buttonText: {
    color: Colors.white,
    fontWeight: '500'
  },

  redButton: {
    backgroundColor: Colors.red,
    padding: 10,
    height: 36,
    alignItems: 'center',
    borderRadius: 4
  },

  grayButton: {
    backgroundColor: Colors.gray,
    padding: 10,
    height: 36,
    alignItems: 'center',
    borderRadius: 4
  },

  header: {
    backgroundColor: Colors.black,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    minHeight: 80
  },

  headerTitle: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 7,
    alignItems: 'center'
  },

  headerButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch'
  },

  headerBackBtn: {
    flex: 1,
    justifyContent: 'flex-end',
    maxWidth: 100,
    paddingBottom: 5
  },

  headerText: {
    color: Colors.white,
    fontSize: 20
  },

  notifications: {
    flex: 1
  },

  notificationComponent: {
    flex: 1
  },

  notificationBox: {
    marginBottom: 5,
    borderRadius: 4,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.mediumGray,
    shadowColor: Colors.mediumGray,
    shadowOpacity: 0.75,
    shadowRadius: 20,
    shadowOffset: {
      height: 1,
      width: 0
    }
  },

  notificationBoxDetails: {
    borderTopColor: Colors.mediumGray,
    borderTopWidth: 1,
    padding: 15
  },

  notificationBoxActions: {
    borderTopColor: Colors.mediumGray,
    borderTopWidth: 1,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row'
  },

  notificationBlock: {
    borderWidth: 1,
    borderColor: Colors.mediumGray,
    borderRadius: 4,
    marginBottom: 10,
    flexDirection: 'row'
  },

  notificationBlockCount: {
    padding: 15,
    borderRightWidth: 1,
    borderRightColor: Colors.mediumGray
  },

  notificationBlockLabel: {
    flex: 1,
    padding: 15
  },

  tabs: {
    backgroundColor: Colors.white,
    flexDirection: 'row',
    borderTopColor: Colors.mediumGray,
    borderTopWidth: 1
  },

  tabItem: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },

  tabItemsCount: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.mediumGray,
    padding: 3,
    borderRadius: 4,
    marginLeft: 4
  },

  tabItemIcon: {
    height: 12,
    width: 12,
    marginBottom: 5
  },

  tabItemText: {
    fontSize: 12
  },

  tabItemTextActive: {
    color: Colors.blue,
    fontSize: 13,
    fontWeight: '600'
  },

  tabsApplication: {
    flex: 1,
    flexDirection: 'row',

    ...Platform.select({
      ios: {
        backgroundColor: Colors.white,
        borderTopWidth: 1,
        borderTopColor: Colors.mediumGray,
        borderBottomWidth: 1,
        borderBottomColor: Colors.mediumGray
      },

      android: {
        backgroundColor: Colors.black,
        borderBottomWidth: 1,
        borderBottomColor: Colors.mediumGray
      }
    })
  },

  tabsApplicationItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent'
  },

  tabsApplicationItemActive: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.blue
  },

  tabsApplicationItemText: {
    fontSize: 13,
    fontWeight: '400',
    color: Colors.textGray
  },

  tabApplicationSettings: {
    padding: 20,
    paddingLeft: 30,
    paddingRight: 30,
    ...Platform.select({
      ios: {
        backgroundColor: Colors.white,
        borderTopWidth: 1,
        borderTopColor: Colors.mediumGray
      },

      android: {
        backgroundColor: Colors.black
      }
    })
  },

  userBox: {
    alignItems: 'center',
    backgroundColor: Colors.lightGray,
    borderBottomColor: Colors.mediumGray,
    borderBottomWidth: 1,
    padding: 15,
    paddingTop: 50
  },

  jobBox: {
    padding: 15,
    paddingLeft: 30,
    paddingRight: 20,
    backgroundColor: Colors.white,
    borderColor: Colors.mediumGray,
    borderWidth: 1,
    borderRadius: 4,
    marginTop: 15
  },

  indicator: {
    height: 6,
    width: 6,
    borderRadius: 20,
    backgroundColor: Colors.gray,
    position: 'absolute',
    left: 15,
    top: 20
  },

  headerStripeApplication: {
    backgroundColor: Colors.blue,
    borderBottomWidth: 1,
    borderBottomColor: Colors.mediumGray
  },

  headerStripeApplicationDetails: {
    flexDirection: 'row',
    marginTop: 15
  },

  applicationBox: {
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: Colors.white,
    borderColor: Colors.mediumGray,
    borderWidth: 1,
    borderRadius: 4,
    marginTop: 15
  },

  tags: {
    flexDirection: 'row',
    marginTop: 4
  },

  tag: {
    padding: 4,
    paddingLeft: 8,
    paddingRight: 8,
    marginRight: 2,
    backgroundColor: Colors.lightGray,
    borderWidth: 1,
    borderColor: Colors.mediumGray,
    borderRadius: 4
  },

  applicationDetails: {
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.lightGray
  },

  applicationNotificationCounter: {
    position: 'absolute',
    paddingTop: 1,
    paddingBottom: 1,
    paddingLeft: 4,
    paddingRight: 4,

    top: 10,
    left: -4,
    backgroundColor: Colors.red,
    borderRadius: 4
  },

  noteBox: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.mediumGray,
    borderRadius: 4,
    marginTop: 15
  },

  noteBoxText: {
    padding: 10,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4
  },

  noteMetadata: {
    flexDirection: 'row',
    marginTop: 5,
    borderTopWidth: 1,
    backgroundColor: Colors.lightGray,
    borderTopColor: Colors.mediumGray,
    padding: 10,
    paddingTop: 7,
    paddingBottom: 7
  },

  noteMetadataText: {
    fontSize: 12,
    color: Colors.textGray
  },

  keyboardViewWrapper: {
    flex: 1,
    backgroundColor: 'rgba(245,248,251,.99)'
  },

  keyboardContainer: {
    justifyContent: 'flex-end'
  },

  threadBox: {
    backgroundColor: Colors.white,
    borderBottomColor: Colors.mediumGray,
    borderBottomWidth: 1,
    paddingTop: 10,
    paddingBottom: 10
  },

  threadBoxText: {
    padding: 15,
    paddingTop: 3,
    paddingBottom: 0,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4
  },

  inactiveThreadText: {
    color: '#575D67'
  },

  threadMetadata: {
    flexDirection: 'row',
    padding: 15,
    paddingTop: 3,
    paddingBottom: 7
  },

  emailBox: {
    padding: 15,
    borderBottomColor: Colors.mediumGray,
    borderBottomWidth: 1
  },

  emailBoxApplication: {
    backgroundColor: Colors.lightGray
  },

  emailMetadata: {
    flexDirection: 'row'
  },

  emailBoxText: {
    marginTop: 15,
    lineHeight: 20
  },

  applicationsListUpdating: {
    backgroundColor: Colors.lightGray,
    width: width - 30,
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },

  searchBtnContainer: {
    backgroundColor: Colors.black,
    padding: 10
  },

  searchBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.searchBackground,
    borderRadius: 4,
    padding: 8
  }
})
