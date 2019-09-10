import { Platform, StyleSheet, Dimensions } from 'react-native'
import Color from 'color'
import Colors from 'enlist/app/styles/colors'

const { height, width } = Dimensions.get('window')

export default StyleSheet.create({
  addNote: {
    backgroundColor: Colors.lightGray,
    borderTopColor: Colors.mediumGray,
    borderTopWidth: 1,
    padding: 10
  },

  addNoteTextArea: {
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 4,
    padding: 8,
    fontSize: 13,

    ...Platform.select({
      ios: {
        backgroundColor: Colors.lightGray,
        borderWidth: 1,
        borderColor: Colors.mediumGray
      }
    })
  },

  addNoteActions: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,

    ...Platform.select({
      ios: {
        backgroundColor: Colors.lightGray,
        borderTopColor: Colors.mediumGray,
        borderTopWidth: 1
      }
    })
  },

  atPicker: {
    backgroundColor: Colors.lightGray,
    borderWidth: 1,
    borderColor: Colors.mediumGray,
    margin: 10,
    borderRadius: 4
  },

  atPickerUser: {
    padding: 10,
    flexDirection: 'row'
  }
})
