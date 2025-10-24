import { create } from 'zustand'
import { combine } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { LANGUAGES } from '@/services/translations/constants'
import { DIFFICULTY_LEVELS } from '@/constants/settings'
import { SettingsState, SettingsStateActions } from './types'

const initialState: SettingsState = {
  language: LANGUAGES.en,
  aiMode: {
    enabled: false,
    difficulty: DIFFICULTY_LEVELS[2], // Medium
  },
  timer: {
    enabled: false,
    duration: 60,
  },
}

export const useSettingsStore = create<SettingsState & SettingsStateActions>()(
  immer(
    combine(
      initialState,
      (set): SettingsStateActions => ({
        setSettingsState: async payload => {
          set(prevState => {
            return {
              ...prevState,
              ...payload,
            }
          })
        },
        setAIModeState: async payload => {
          set(state => {
            state.aiMode = {
              ...state.aiMode,
              ...payload,
            }
          })
        },
        setTimerState: async payload => {
          set(state => {
            state.timer = {
              ...state.timer,
              ...payload,
            }
          })
        },
      }),
    ),
  ),
)
