import { QuizItem } from '@/store/game/types'
import { Language } from '@/types/settings'
import { Endpoint } from '../types'

export type QuizItemResponse = Pick<QuizItem, 'question' | 'options'> & {
  answerIndex: number
}

export type FetchQuizItemAPI = Endpoint<{
  payload: {
    language: Language
    difficulty: string
    stagesRange: {
      start: number
      end: number
    }
  }
  response: QuizItemResponse[]
  processed: QuizItem[]
}>
