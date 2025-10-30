import { QuizItem } from '@/store/game/types'
import { OptionSerialNumber } from '@/types/game'
import { FetchQuizItemAPI, QuizItemResponse } from './types'

const processQuizItem = (quizItemResponse: QuizItemResponse): QuizItem => {
  return {
    ...quizItemResponse,
    id: Math.random().toString(36).substring(2, 15),
    correctOptionSerialNumber: (quizItemResponse.answerIndex +
      1) as OptionSerialNumber,
    answeredOptionSerialNumber: null,
  }
}

export const processQuiz: FetchQuizItemAPI['processor'] = quiz => {
  return quiz.value.map(item => {
    return processQuizItem(item)
  })
}
