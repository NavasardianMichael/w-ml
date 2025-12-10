import { QuizItem } from '@/store/game/types'
import { OptionSerialNumber } from '@/types/game'
import { FetchSystemQuizAPI, SystemQuizItemResponse } from './types'

const processSystemQuizItem = (
  quizItemResponse: SystemQuizItemResponse,
): QuizItem => {
  const { answerIndex, ...restQuizItem } = quizItemResponse
  return {
    ...restQuizItem,
    id: Math.random().toString(36).substring(2, 15),
    correctOptionSerialNumber: (answerIndex + 1) as OptionSerialNumber,
    answeredOptionSerialNumber: null,
  }
}

export const processSystemQuiz: FetchSystemQuizAPI['processor'] = quiz => {
  return quiz.value.map(item => {
    return processSystemQuizItem(item)
  })
}
