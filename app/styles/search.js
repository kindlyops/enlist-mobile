import { Platform, StyleSheet, Dimensions } from 'react-native'
import Colors from 'enlist/app/styles/colors'

export default StyleSheet.create({
  searchWrapper: {
    flex: 1,
    backgroundColor: '#F6F7F9',
    padding: 15
  },

  searchContainer: {},

  searchInputWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        backgroundColor: Colors.white,
        borderBottomWidth: 1,
        borderBottomColor: Colors.mediumGray,
        padding: 0,
        paddingLeft: 10,
        shadowColor: Colors.mediumGray,
        shadowOpacity: 1,
        shadowRadius: 10,
        shadowOffset: {
          height: 1,
          width: 0
        }
      }
    })
  },

  searchInput: {
    flex: 1,
    marginLeft: 15
  },

  searchResults: {
    flex: 1,
    marginTop: 5,
    backgroundColor: Colors.white,
    shadowColor: Colors.mediumGray,
    borderWidth: 1,
    borderColor: Colors.mediumGray,
    shadowOpacity: 1,
    shadowRadius: 10,
    shadowOffset: {
      height: 1,
      width: 0
    }
  },

  searchResultItem: {
    flex: 1,
    padding: 20
  },

  metadata: {
    color: Colors.textGray
  },

  searchHeaderText: {
    color: Colors.textGray,
    fontWeight: 'bold'
  },

  searchCloseBtn: {
    padding: 15,
    backgroundColor: Colors.lightGray,
    borderLeftWidth: 1,
    borderLeftColor: Colors.mediumGray
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
    color: Colors.textGray,
    borderRadius: 4,
    fontSize: 12
  }
})
