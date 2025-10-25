import { DifficultyKey, DurationKey, Language } from '@/types/settings'

export type SettingsState = {
  language: Language
  aiMode: {
    enabled: boolean
    difficulty: DifficultyKey
  }
  timer: {
    enabled: boolean
    duration: DurationKey
  }
}

export type SettingsStateActions = {
  setSettingsState: (state: Partial<SettingsState>) => void
  setAIModeState: (state: Partial<SettingsState['aiMode']>) => void
  setTimerState: (state: Partial<SettingsState['timer']>) => void
}
