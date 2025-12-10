import { LANGUAGES } from '@/services/translations/constants'
import { paramsToQueryString } from '@/helpers/commons'
import { ENV_VARS } from '@/constants/environment'
import { processSystemQuiz } from './processors'
import { FetchSystemQuizAPI } from './types'

export const fetchSystemQuiz: FetchSystemQuizAPI['api'] = async ({
  language = LANGUAGES.en,
}) => {
  try {
    const response = await fetch(
      `${ENV_VARS.apiURL}/GetSystemQuiz?${paramsToQueryString({
        language,
      })}`,
    )
    const quizResponse = await response.json()
    const processedQuiz = processSystemQuiz(quizResponse)
    return processedQuiz
  } catch (error) {
    console.error({ error })
    return []
  }
}
