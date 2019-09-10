import { StyleSheet, Dimensions } from 'react-native'
import Colors from 'enlist/app/styles/colors'

const { height, width } = Dimensions.get('window')

export default StyleSheet.create({
  feedback: {
    backgroundColor: 'rgba(255,255,255,0.975)',
    minHeight: height
  },

  backStripe: {
    backgroundColor: Colors.blue,
    padding: 10,
    paddingTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },

  backStripeText: {
    color: 'white',
    marginLeft: 10,
    fontSize: 13,
    fontWeight: '500'
  },

  header: {
    padding: 15,
    flexDirection: 'row',
    backgroundColor: Colors.lightGray,
    borderBottomWidth: 1,
    borderColor: Colors.mediumGray
  },

  headerDetails: {
    flex: 1
  },

  headerText: {
    fontWeight: '600'
  },

  metadata: {
    color: Colors.textGray,
    fontSize: 12,
    marginTop: 2
  },

  averageRating: {
    alignSelf: 'flex-end',
    padding: 6,
    borderRadius: 5,
    minWidth: 30,
    alignItems: 'center'
  },

  answer: {
    padding: 15
  },

  questionText: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 3
  },

  answerText: {
    fontSize: 14,
    color: '#616874',
    lineHeight: 24
  },

  ratings: {
    borderWidth: 1,
    borderColor: Colors.mediumGray,
    borderRadius: 5
  },

  rating: {
    flexDirection: 'row'
  },

  ratingCriterion: {
    flex: 1,
    padding: 5,
    paddingLeft: 10,
    backgroundColor: '#F4F6F9',
    borderRightWidth: 1,
    borderRightColor: Colors.mediumGray
  },

  ratingCriterionText: {
    fontSize: 13,
    color: Colors.textGray
  },

  ratingScale: {
    flex: 1,
    padding: 5,
    paddingLeft: 10
  },

  ratingScaleText: {
    fontSize: 13,
    fontWeight: '500'
  }
})
