import { Difficulty, Language } from '@/types/settings'

export type SettingsState = {
  language: Language
  aiMode: {
    enabled: boolean
    difficulty: Difficulty
  }
  timer: {
    enabled: boolean
    duration: number
  }
}

export type SettingsStateActions = {
  setSettingsState: (state: Partial<SettingsState>) => void
  setAIModeState: (state: Partial<SettingsState['aiMode']>) => void
  setTimerState: (state: Partial<SettingsState['timer']>) => void
}
