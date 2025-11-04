import { LANGUAGES } from '@/services/translations/constants'
import { paramsToQueryString } from '@/helpers/commons'
import { DIFFICULTY_KEYS, DIFFICULTY_NAMES_BY_KEY } from '@/constants/settings'
import { processQuiz } from './processors'
import { FetchQuizItemAPI } from './types'
import { ENV_VARS } from '@/constants/environment'

export const fetchAIQuiz: FetchQuizItemAPI['api'] = async ({
  language = LANGUAGES.en,
  difficulty = DIFFICULTY_NAMES_BY_KEY[DIFFICULTY_KEYS.medium],
  startStage,
  endStage,
}) => {

  try {
    const response = await fetch(
      `${ENV_VARS.apiURL}/GetAIQuiz?${paramsToQueryString({
        language,
        difficulty,
        startStage,
        endStage,
      })}`,
    )
    const quizResponse = await response.json()
    const processedQuiz = processQuiz(quizResponse)
    return processedQuiz
  } catch (error) {
    console.error({ error })
    return []
  }
}
