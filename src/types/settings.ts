import { LANGUAGES } from '@/services/translations/constants'
import { DIFFICULTY_KEYS, DURATION_KEYS } from '@/constants/settings'
import { ObjectKeys } from './commons'

export type Language = ObjectKeys<typeof LANGUAGES>

export type DifficultyKey = ObjectKeys<typeof DIFFICULTY_KEYS>

export type DurationKey = ObjectKeys<typeof DURATION_KEYS>
