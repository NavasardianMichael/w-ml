import { LANGUAGES } from '@/services/translations/constants'
import { DURATION_KEYS } from '@/constants/settings'
import { ObjectKeys } from './commons'

export type Language = ObjectKeys<typeof LANGUAGES>

export type DurationKey = ObjectKeys<typeof DURATION_KEYS>
