import { combineReducers } from 'redux'
import { fromJS, List } from 'immutable'

const initialState = List([])

const findAnswers = (answers, feedback) => {
  return answers.filter(answer => {
    return answer.get('answerable').get('id') === feedback.get('id')
  })
}

const findQuestion = (questions, answer) => {
  return questions.find(question => {
    return question.get('id') === answer.get('questionId')
  })
}

const findDocument = (documents, answer) => {
  return documents.find(document => {
    return document.get('id') === answer.get('documentId')
  })
}

const list = function(state = initialState, action = {}) {
  const ids = state.map(feedback => feedback.get('id'))

  switch (action.type) {
    case 'addFeedbacks':
      const feedbacks = fromJS(action.feedbacks)
      const questions = fromJS(action.questions)
      const documents = fromJS(action.documents)
      const answers = fromJS(action.answers)

      return state.concat(
        feedbacks
          .filterNot(feedback => ids.includes(feedback.get('id')))
          .map(feedback => {
            return feedback.set(
              'answers',
              findAnswers(answers, feedback)
                .map(answer =>
                  answer.set('question', findQuestion(questions, answer))
                )
                .map(answer =>
                  answer.set('document', findDocument(documents, answer))
                )
            )
          })
      )

    default:
      return state
  }
}

const isLoading = function(state = false, action = {}) {
  switch (action.type) {
    case 'fetchFeedback':
      return true

    case 'addFeedback':
      return false

    default:
      return state
  }
}

export default combineReducers({
  list,
  isLoading
})
