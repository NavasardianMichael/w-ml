import { QuizItem } from '@/store/game/types'
import { Language } from '@/types/settings'
import { paramsToQueryString } from '@/helpers/commons'

export type FetchQuizItemAPI = {
  payload: {
    language: Language
    difficulty: string
    stagesRange: {
      start: number
      end: number
    }
  }
  response:
    | (Pick<QuizItem, 'question' | 'options'> & {
        answerIndex: number
      })[]
    | undefined
}

export const fetchPartialQuizFromAI = async ({
  language,
  difficulty,
  stagesRange,
}: FetchQuizItemAPI['payload']): Promise<QuizItem[]> => {
  try {
    const response = await fetch(
      `http://localhost:8080/GetPartialQuiz?${paramsToQueryString({
        language,
        difficulty,
        stagesRange,
      })}`,
    )

    console.log({ response })
    const jsonString = await response.json()
    console.log({ jsonString })

    const quiz: FetchQuizItemAPI['response'] = JSON.parse(jsonString)
    const response: QuizItem[] =
      quiz?.map(item => ({
        question: item.question,
        options: item.options,
        answeredOptionSerialNumber: item.answerIndex,
        id: Math.random().toString(36).substring(2, 9),
      })) ?? []
  } catch (error) {
    console.error('Error generating word:', error)
  }
}
