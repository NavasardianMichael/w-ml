import { LANGUAGES } from '@/services/translations/constants'
import { ObjectKeys } from './commons'

export type Language = ObjectKeys<typeof LANGUAGES>
