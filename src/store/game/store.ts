import { create } from 'zustand'
import { combine } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { fetchAIQuiz } from '@/api/aiQuiz/main'
import { getSafeHavenSerialNumberByQuestionStage } from '@/helpers/game'
import { SCREENS } from '@/constants/game'
import { useSettingsStore } from '../settings/store'
import { GameState, GameStateActions } from './types'

const initialState: GameState = {
  screen: SCREENS.home,
  isPending: false,
  currentQuestionStage: 1,
  quiz: [],
  isSidebarOpen: false,
}

export const useGameStore = create<GameState & GameStateActions>()(
  immer(
    combine(initialState, (set, get): GameStateActions => {
      return {
        setGameState: async payload => {
          set(prevState => ({
            ...prevState,
            ...payload,
          }))
        },
        setIsSidebarOpen: isOpen => {
          set(prevState => {
            prevState.isSidebarOpen = isOpen
          })
        },
        setScreen: screen => {
          set(prevState => {
            prevState.screen = screen
          })
        },
        toggleIsSidebarOpen: () => {
          set(prevState => {
            prevState.isSidebarOpen = !prevState.isSidebarOpen
          })
        },
        setAnsweredOptionSerialNumber: serialNumber => {
          set(prevState => {
            prevState.quiz[
              prevState.currentQuestionStage - 1
            ].answeredOptionSerialNumber = serialNumber
          })
        },
        initQuiz: async payload => {
          set({ isPending: true })
          const settingsStore = useSettingsStore.getState()

          return new Promise<GameState['quiz']>(async resolve => {
            const gameSettings = get()
            const safeHavenSerialNumber =
              getSafeHavenSerialNumberByQuestionStage(
                gameSettings.currentQuestionStage,
              )
            const endStageToFetch = safeHavenSerialNumber * 5

            const quiz = await fetchAIQuiz({
              language: payload.language ?? settingsStore.language,
              difficulty: payload.difficulty ?? settingsStore.aiMode.difficulty,
              startStage: payload.startStage ?? endStageToFetch - 4,
              endStage: payload.endStage ?? endStageToFetch,
            })

            set(prevState => {
              if (payload.replaceLastQuizItem) {
                prevState.quiz[prevState.quiz.length - 1] = quiz[0]
              } else {
                prevState.quiz = prevState.quiz.concat(quiz)
              }
            })

            set({ isPending: false })
            resolve(quiz ?? [])
          })
        },
      }
    }),
  ),
)
