import { QuizItem } from '@/store/game/types'
import { OptionSerialNumber } from '@/types/game'
import { FetchAIQuizAPI, AIQuizItemResponse } from './types'

const processAIQuizItem = (quizItemResponse: AIQuizItemResponse): QuizItem => {
  const { answerIndex, ...restQuizItem } = quizItemResponse
  return {
    ...restQuizItem,
    id: Math.random().toString(36).substring(2, 15),
    correctOptionSerialNumber: (answerIndex + 1) as OptionSerialNumber,
    answeredOptionSerialNumber: null,
  }
}

export const processAIQuiz: FetchAIQuizAPI['processor'] = quiz => {
  return quiz.value.map(item => {
    return processAIQuizItem(item)
  })
}
