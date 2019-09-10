import { Platform, StyleSheet, Dimensions } from 'react-native'
import Colors from 'enlist/app/styles/colors'

export default StyleSheet.create({
  box: {
    marginTop: 5,
    borderRadius: 4
  },

  currentStageBox: {
    backgroundColor: Colors.lightGray,
    padding: 15,
    borderBottomColor: Colors.mediumGray,
    borderBottomWidth: 1
  },

  currentStageName: {
    fontWeight: '600',
    fontSize: 16,
    marginTop: 10
  },

  lastChangedAt: {
    color: Colors.textGray,
    fontSize: 13,
    marginTop: 3
  },

  changeStageButton: {
    marginTop: 10,

    ...Platform.select({
      ios: {
        backgroundColor: Colors.green,
        width: 220
      }
    })
  },

  changeStageButtonText: {
    color: Colors.white,
    fontSize: 12
  },

  questionText: {
    fontSize: 13,
    fontWeight: '500',
    color: Colors.textGray,
    marginBottom: 3
  },

  headerText: {
    fontWeight: '500'
  },

  metadata: {
    marginTop: 3,
    fontSize: 12,
    color: Colors.textGray
  },

  statusTextCompleted: {
    fontSize: 12,
    color: Colors.darkGreen
  },

  interviewBox: {
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10
  },

  interviewerName: {
    fontSize: 13
  }
})
