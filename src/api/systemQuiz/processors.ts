import { QuizItem } from '@/store/game/types'
import { OptionSerialNumber } from '@/types/game'
import {
  FetchSystemQuizAPI,
  MarkQuizSeenAPI,
  SystemQuizItemResponse,
} from './types'

const processSystemQuizItem = (
  quizItemResponse: SystemQuizItemResponse,
): QuizItem => {
  const { answerIndex, ...restQuizItem } = quizItemResponse
  return {
    ...restQuizItem,
    correctOptionSerialNumber: (answerIndex + 1) as OptionSerialNumber,
    answeredOptionSerialNumber: null,
  }
}

export const processSystemQuiz: FetchSystemQuizAPI['processor'] = quiz => {
  return quiz.value.map(item => {
    return processSystemQuizItem(item)
  })
}

export const processMarkQuizSeen: MarkQuizSeenAPI['processor'] = response => {
  return response.value.success
}
