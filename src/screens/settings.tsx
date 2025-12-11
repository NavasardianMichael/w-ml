import { useState } from 'react'
import { ScrollView, View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useGameStore } from '@/store/game/store'
import { useSettingsStore } from '@/store/settings/store'
import { SettingsState } from '@/store/settings/types'
import { DurationKey } from '@/types/settings'
import { SCREENS } from '@/constants/game'
import { DURATION_KEYS } from '@/constants/settings'
import { useAppDropdownOptions } from '@/hooks/useAppDropdownOptions'
import AppBinaryRadioButtonsGroup from '@/components/ui/AppBinaryRadioButtonsGroup'
import AppButton from '@/components/ui/AppButton'
import AppDropdown from '@/components/ui/AppDropdown'
import AppHorizontalRule from '@/components/ui/AppHorizontalRule'
import AppText from '@/components/ui/AppText'

export default function Settings() {
  const { setGameState } = useGameStore()
  const { setSettingsState, language, timer } = useSettingsStore()
  const [tempSettings, setTempSettings] = useState<SettingsState>({
    language,
    timer,
  })
  const { t } = useTranslation()

  const TIMER_SETTINGS_TEMPLATE = {
    optionKeys: [t('with-timer'), t('without-timer')],
  }

  const durationDropdownOptions =
    useAppDropdownOptions<DurationKey>(DURATION_KEYS)

  const setPartialSettingsState = (partialState: Partial<SettingsState>) => {
    setTempSettings(prev => ({ ...prev, ...partialState }))
  }

  return (
    <View>
      <ScrollView>
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
