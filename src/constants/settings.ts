import { LANGUAGES } from '@/services/translations/constants'
import { ObjectKeys } from '@/types/commons'
import { Language } from '@/types/settings'

export const LANGUAGE_NAMES: Record<Language, string> = {
  [LANGUAGES.en]: 'English',
  [LANGUAGES.am]: 'Հայերեն',
  [LANGUAGES.ru]: 'Русский',
}

export const DIFFICULTY_KEYS = {
  'very-easy': 'very-easy',
  easy: 'easy',
  medium: 'medium',
  hard: 'hard',
  'very-hard': 'very-hard',
} as const

export const DIFFICULTY_NAMES_BY_KEY: Record<
  ObjectKeys<typeof DIFFICULTY_KEYS>,
  string
> = {
  'very-easy': 'Very easy',
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard',
  'very-hard': 'Very hard',
}

export const DURATION_KEYS = {
  '30-seconds': '30-seconds',
  '1-minute': '1-minute',
  '2-minutes': '2-minutes',
  '5-minutes': '5-minutes',
  '10-minutes': '10-minutes',
} as const

export const SECONDS_BY_DURATIONS_KEY: Record<
  ObjectKeys<typeof DURATION_KEYS>,
  number
> = {
  '30-seconds': 30,
  '1-minute': 60,
  '2-minutes': 120,
  '5-minutes': 300,
  '10-minutes': 600,
}
