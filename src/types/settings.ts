import { LANGUAGES } from '@/services/translations/constants'
import { DIFFICULTY_LEVELS } from '@/constants/settings'

export type Language = (typeof LANGUAGES)[keyof typeof LANGUAGES]

export type Difficulty = (typeof DIFFICULTY_LEVELS)[number]
