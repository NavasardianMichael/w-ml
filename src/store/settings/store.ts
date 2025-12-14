import { create } from 'zustand'
import { combine } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { LANGUAGES } from '@/services/translations/constants'
import { DURATION_KEYS } from '@/constants/settings'
import { SettingsState, SettingsStateActions } from './types'

const initialState: SettingsState = {
  language: LANGUAGES.en,
}

export const useSettingsStore = create<SettingsState & SettingsStateActions>()(
  immer(
    combine(
      initialState,
      (set): SettingsStateActions => ({
        setSettingsState: async payload => {
          set(prevState => ({
            ...prevState,
            ...payload,
          }))
        },
      }),
    ),
  ),
)
