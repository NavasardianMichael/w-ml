import { create } from 'zustand'
import { combine } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { LANGUAGES } from '@/services/translations/constants'
import { DIFFICULTY_KEYS, DURATION_KEYS } from '@/constants/settings'
import { SettingsState, SettingsStateActions } from './types'

const initialState: SettingsState = {
  language: LANGUAGES.en,
  aiMode: {
    enabled: false,
    difficulty: DIFFICULTY_KEYS.medium,
  },
  timer: {
    enabled: false,
    duration: DURATION_KEYS['1-minute'],
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
