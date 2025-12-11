import { create } from 'zustand'
import { combine } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { LANGUAGES } from '@/services/translations/constants'
import { DURATION_KEYS } from '@/constants/settings'
import { SettingsState, SettingsStateActions } from './types'

const initialState: SettingsState = {
  language: LANGUAGES.en,
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
