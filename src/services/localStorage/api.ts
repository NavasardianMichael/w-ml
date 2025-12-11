import AsyncStorage from '@react-native-async-storage/async-storage'
import { QuizItem } from '@/store/game/types'
import { Language } from '@/types/settings'
import { LOCAL_STORAGE_KEYS } from './constants'
import { LocalStorageData } from './types'

// Generate a unique device ID
const generateDeviceId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`
}

// Get or create device ID
export const getDeviceId = async (): Promise<string> => {
  try {
    let deviceId = await AsyncStorage.getItem(LOCAL_STORAGE_KEYS.deviceId)
    if (!deviceId) {
      deviceId = generateDeviceId()
      await AsyncStorage.setItem(LOCAL_STORAGE_KEYS.deviceId, deviceId)
    }
    return deviceId
  } catch (error) {
    console.error('Error getting device ID:', error)
    // Return a fallback device ID if storage fails
    return generateDeviceId()
  }
}

export const getLocalStorageItemJSON = async <T>(
  key: keyof typeof LOCAL_STORAGE_KEYS,
): Promise<T> => {
  const jsonString = await AsyncStorage.getItem(key)
  try {
    return jsonString != null ? JSON.parse(jsonString) : ({} as T)
  } catch (error) {
    console.warn('Error parsing JSON from local storage:', error)
    return {} as T
  }
}

export const getLastQuestionNumberBySafeHavenNumberByLanguage = async (
  language: Language,
) => {
  const lastQuestionNumberBySafeHavenNumber = await getLocalStorageItemJSON<
    LocalStorageData['lastQuestionNumberBySafeHavenNumberByLanguage']
  >(LOCAL_STORAGE_KEYS.lastQuestionNumberBySafeHavenNumberByLanguage)
  const result = lastQuestionNumberBySafeHavenNumber[language]
  if (!result) {
    const initialValue: LocalStorageData['lastQuestionNumberBySafeHavenNumberByLanguage'] =
      {
        en: {
          1: 0,
          2: 0,
          3: 0,
        },
        ru: {
          1: 0,
          2: 0,
          3: 0,
        },
        am: {
          1: 0,
          2: 0,
          3: 0,
        },
      }
    AsyncStorage.setItem(
      LOCAL_STORAGE_KEYS.lastQuestionNumberBySafeHavenNumberByLanguage,
      JSON.stringify(initialValue),
    )
    return initialValue[language]
  }
  return result
}

// Note: The following functions are kept for backwards compatibility
// but are no longer actively used since we switched to the backend API
export const setLastQuestionNumberBySafeHavenNumberByLanguage = async ({
  language: _language,
  quizItemId: _quizItemId,
}: {
  language: Language
  quizItemId: QuizItem['id']
}) => {
  // This function is deprecated - quiz tracking is now handled by the backend
  console.log(
    'Deprecated: setLastQuestionNumberBySafeHavenNumberByLanguage called',
  )
}

export const getNextQuizItemByLanguageAndSafeHavenNumber = async ({
  language: _language,
  safeHavenNumber: _safeHavenNumber,
}: {
  language: Language
  safeHavenNumber: number
}): Promise<QuizItem | null> => {
  // This function is deprecated - questions are now fetched from the backend
  console.log('Deprecated: getNextQuizItemByLanguageAndSafeHavenNumber called')
  return null
}
