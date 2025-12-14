import { LANGUAGES } from '@/services/translations/constants'
import { ObjectKeys } from '@/types/commons'
import { Language } from '@/types/settings'

export const LANGUAGE_NAMES: Record<Language, string> = {
  [LANGUAGES.en]: 'English',
  [LANGUAGES.am]: 'Հայերեն',
  [LANGUAGES.ru]: 'Русский',
}
