import { useState } from 'react'
import { ScrollView, View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useGameStore } from '@/store/game/store'
import { useSettingsStore } from '@/store/settings/store'
import { SettingsState } from '@/store/settings/types'
import { DifficultyKey, DurationKey } from '@/types/settings'
import { SCREENS } from '@/constants/game'
import { DIFFICULTY_KEYS, DURATION_KEYS } from '@/constants/settings'
import { useAppDropdownOptions } from '@/hooks/useAppDropdownOptions'
import AppBinaryRadioButtonsGroup from '@/components/ui/AppBinaryRadioButtonsGroup'
import AppButton from '@/components/ui/AppButton'
import AppDropdown from '@/components/ui/AppDropdown'
import AppHorizontalRule from '@/components/ui/AppHorizontalRule'
import AppText from '@/components/ui/AppText'

export default function Settings() {
  const { setGameState } = useGameStore()
  const { setSettingsState, language, aiMode, timer } = useSettingsStore()
  const [tempSettings, setTempSettings] = useState<SettingsState>({
    language,
    aiMode,
    timer,
  })
  const { t } = useTranslation()

  const AI_MODE_SETTINGS_TEMPLATE = {
    optionKeys: [t('artificial-intelligence'), t('system')],
  }

  const TIMER_SETTINGS_TEMPLATE = {
    optionKeys: [t('with-timer'), t('without-timer')],
  }

  const difficultyDropdownOptions =
    useAppDropdownOptions<DifficultyKey>(DIFFICULTY_KEYS)

  const durationDropdownOptions =
    useAppDropdownOptions<DurationKey>(DURATION_KEYS)

  const setPartialSettingsState = (partialState: Partial<SettingsState>) => {
    setTempSettings(prev => ({ ...prev, ...partialState }))
  }

  return (
    <View>
      <ScrollView>
        <View>
          <AppBinaryRadioButtonsGroup
            label={t('questions-generated-by')}
            options={AI_MODE_SETTINGS_TEMPLATE.optionKeys}
            onValueChange={value =>
              setPartialSettingsState({ aiMode: { ...aiMode, enabled: value } })
            }
            value={tempSettings.aiMode.enabled}
          />
          {tempSettings.aiMode.enabled && (
            <View className='mt-md xl:mt-lg'>
              <AppDropdown
                label={t('difficulty-level')}
                options={difficultyDropdownOptions}
                selectedOptionId={tempSettings.aiMode.difficulty}
                onSelect={option =>
                  setTempSettings(prev => ({
                    ...prev,
                    aiMode: {
                      ...prev.aiMode,
                      difficulty: option.id as DifficultyKey,
                    },
                  }))
                }
              />
            </View>
          )}
        </View>
        <View className='mt-xl mb-md xl:mt-xl xl:mb-lg'>
          <AppBinaryRadioButtonsGroup
            label={t('force-answer-with-time-limit')}
            options={TIMER_SETTINGS_TEMPLATE.optionKeys}
            onValueChange={value =>
              setPartialSettingsState({ timer: { ...timer, enabled: value } })
            }
            value={tempSettings.timer.enabled}
          />
          {tempSettings.timer.enabled && (
            <View className='mt-md xl:mt-lg'>
              <AppDropdown
                label={t('time-limit')}
                options={durationDropdownOptions}
                selectedOptionId={tempSettings.timer.duration}
                onSelect={option =>
                  setTempSettings(prev => ({
                    ...prev,
                    timer: {
                      ...prev.timer,
                      duration: option.id as DurationKey,
                    },
                  }))
                }
              />
            </View>
          )}
        </View>
        <AppHorizontalRule />
        <View className='flex flex-row'>
          <AppButton
            className=''
            onPress={() => setGameState({ screen: SCREENS.home })}
          >
            <AppText className='text-center'>{t('cancel')}</AppText>
          </AppButton>
          <AppButton
            className='ml-sm lg:ml-md bg-secondary'
            onPress={() => {
              setSettingsState(tempSettings)
              setGameState({ screen: SCREENS.home })
            }}
          >
            <AppText className='text-center text-primary'>{t('save')}</AppText>
          </AppButton>
        </View>
      </ScrollView>
    </View>
  )
}
