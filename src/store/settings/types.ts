import { Language } from '@/types/settings'

export type SettingsState = {
  language: Language
}

export type SettingsStateActions = {
  setSettingsState: (state: Partial<SettingsState>) => void
}
