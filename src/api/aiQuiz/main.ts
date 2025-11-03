import { LANGUAGES } from '@/services/translations/constants'
import { paramsToQueryString } from '@/helpers/commons'
import { DIFFICULTY_KEYS, DIFFICULTY_NAMES_BY_KEY } from '@/constants/settings'
import { processQuiz } from './processors'
import { FetchQuizItemAPI } from './types'

export const fetchAIQuiz: FetchQuizItemAPI['api'] = async ({
  language = LANGUAGES.en,
  difficulty = DIFFICULTY_NAMES_BY_KEY[DIFFICULTY_KEYS.medium],
  startStage,
  endStage,
}) => {
  console.log('request sent!!!!!!!!!')

  try {
    const response = await fetch(
      `http://10.0.2.2:5111/GetAIQuiz?${paramsToQueryString({
        language,
        difficulty,
        startStage,
        endStage,
      })}`,
    )
    console.log({ response })

    const quizResponse = await response.json()
    console.log({ quizResponse })
    const processedQuiz = processQuiz(quizResponse)
    return processedQuiz
  } catch (error) {
    console.error({ error })
    return []
  }
}
