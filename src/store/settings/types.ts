import { DurationKey, Language } from '@/types/settings'

export type SettingsState = {
  language: Language
  timer: {
    enabled: boolean
    duration: DurationKey
  }
}

export type SettingsStateActions = {
  setSettingsState: (state: Partial<SettingsState>) => void
  setTimerState: (state: Partial<SettingsState['timer']>) => void
}
