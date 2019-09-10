import { StyleSheet, Dimensions } from 'react-native'
import Colors from 'enlist/app/styles/colors'

export default StyleSheet.create({
  logoWrapper: {
    flex: 1,
    padding: 15,
    backgroundColor: Colors.black,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },

  userDetails: {
    flex: 2,
    padding: 25,
    alignItems: 'center'
  },

  headlineText: {
    fontWeight: '600',
    fontSize: 18
  },

  lightText: {
    marginTop: 3,
    color: Colors.textGray
  },

  outlineButton: {
    backgroundColor: Colors.lightGray,
    borderColor: Colors.mediumGray,
    borderWidth: 1,
    padding: 10,
    height: 40,
    alignItems: 'center',
    borderRadius: 4
  },

  outlineButtonText: {
    color: Colors.gray,
    fontSize: 13,
    fontWeight: '500'
  },

  redButton: {
    backgroundColor: Colors.red,
    padding: 10,
    height: 36,
    alignItems: 'center',
    borderRadius: 4
  }
})
