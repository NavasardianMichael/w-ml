import { create } from 'zustand'
import { combine } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { fetchSystemQuiz, markQuizSeen } from '@/api/systemQuiz/main'
import { QuestionStage } from '@/types/game'
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
  isPrefetching: false,
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

          try {
            // Fetch first 5 questions (stages 1-5)
            const quiz = await fetchSystemQuiz({
              language: payload.language,
              startStage: 1,
              endStage: 5,
            })

            set(prevState => {
              prevState.quiz = quiz
              prevState.currentQuestionStage = 1
            })

            set({ isPending: false })
            return quiz
          } catch (error) {
            console.error('Error initializing quiz:', error)
            set({ isPending: false })
            return []
          }
        },
        fetchNextBatch: async ({ language, startStage, endStage }) => {
          const state = get()

          // Don't fetch if already prefetching or pending
          if (state.isPrefetching || state.isPending) {
            return
          }

          set({ isPrefetching: true })

          try {
            const quiz = await fetchSystemQuiz({
              language,
              startStage,
              endStage,
            })

            set(prevState => {
              prevState.quiz = prevState.quiz.concat(quiz)
            })

            console.log(`Prefetched questions ${startStage}-${endStage}`)
          } catch (error) {
            console.error('Error fetching next batch:', error)
          } finally {
            set({ isPrefetching: false })
          }
        },
        markCurrentQuizSeen: async () => {
          const state = get()
          const currentQuiz = state.quiz[state.currentQuestionStage - 1]

          if (currentQuiz) {
            await markQuizSeen({ quizItemId: currentQuiz.id })
          }
        },
        goToNextQuestion: () => {
          const state = get()
          const settingsStore = useSettingsStore.getState()

          // Check if we should prefetch before incrementing
          // Prefetch when only one question is left in the current batch
          // For example, when on question 5 (last of batch 1), fetch questions 6-10
          // When on question 10 (last of batch 2), fetch questions 11-15
          const currentStage = state.currentQuestionStage
          if (currentStage >= 1 && currentStage <= 15) {
            const safeHavenNumber = getSafeHavenSerialNumberByQuestionStage(
              currentStage as QuestionStage,
            )
            const stageInCurrentBatch = currentStage - (safeHavenNumber - 1) * 5

            // If we're on the last question of the current batch (5th question)
            // Only prefetch if we're not on the last batch (safeHavenNumber < 3, since max is 3)
            // This prevents trying to fetch questions 16-20 when on question 15
            if (stageInCurrentBatch === 5 && safeHavenNumber < 3) {
              const nextBatchStart = safeHavenNumber * 5 + 1
              const nextBatchEnd = (safeHavenNumber + 1) * 5

              const actions = get() as GameState & GameStateActions
              actions.fetchNextBatch({
                language: settingsStore.language,
                startStage: nextBatchStart,
                endStage: nextBatchEnd,
              })
            }
          }

          set(prevState => {
            prevState.currentQuestionStage = (prevState.currentQuestionStage +
              1) as QuestionStage
          })
        },
        switchCurrentQuestion: async ({ language }) => {
          const state = get()

          // Don't switch if already pending or prefetching
          if (state.isPending || state.isPrefetching) {
            return
          }

          set({ isPending: true })

          try {
            const currentStage = state.currentQuestionStage

            // Fetch a single replacement question for the current stage
            const quiz = await fetchSystemQuiz({
              language,
              startStage: currentStage,
              endStage: currentStage,
            })

            if (quiz.length > 0) {
              // Replace the current question with the new one
              set(prevState => {
                prevState.quiz[currentStage - 1] = quiz[0]
              })

              console.log(`Switched question at stage ${currentStage}`)
            }
          } catch (error) {
            console.error('Error switching question:', error)
          } finally {
            set({ isPending: false })
          }
        },
      }
    }),
  ),
)
