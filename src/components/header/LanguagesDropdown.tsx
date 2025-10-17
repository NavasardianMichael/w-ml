import { ReactNode, useCallback, useState } from 'react'
import { Pressable, ScrollView, View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { getQuiz } from '@/api/getQuiz'
import { useSettingsStore } from '@/store/settings/store'
import { LANGUAGES_LIST } from '@/services/translations/constants'
import { Language } from '@/types/settings'
import { ICONS } from '@/constants/icons'
import { LANGUAGE_NAMES } from '@/constants/settings'
import AppText from '../ui/AppText'

export type AppDropdownOption = {
  label: ReactNode
  value: string
}

export default function LanguagesDropdown() {
  const { language, setSettingsState } = useSettingsStore()
  const {
    i18n: { changeLanguage },
  } = useTranslation()

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const selectLanguage = useCallback(
    (selectedValue: Language) => {
      setSettingsState({ language: selectedValue })
      changeLanguage(selectedValue)
      setIsDropdownOpen(false)
      getQuiz({ language: selectedValue })
    },
    [setSettingsState, changeLanguage],
  )

  const SelectedLangIcon = ICONS[language] as React.ElementType

  return (
    <View className={`relative!`}>
      <Pressable
        accessibilityIgnoresInvertColors
        onPress={toggleDropdown}
        className={`bg-primary w-140  border border-secondary rounded-lg p-sm flex-row justify-between items-center ${
          isDropdownOpen ? 'rounded-b-none' : ''
        }`}
      >
        <View className={`flex-row items-center`}>
          <View className='flex flex-row items-center gap-sm'>
            <SelectedLangIcon className='border border-primary w-6 h-6 flex items-center' />
            <AppText className='text-secondary'>
              {LANGUAGE_NAMES[language]}
            </AppText>
          </View>
        </View>
        <AppText
          className={`text-secondary text-xs transition ml-sm ${
            isDropdownOpen ? 'rotate-180' : ''
          }`}
        >
          {'▼'}
        </AppText>
        {/* Dropdown List */}
      </Pressable>
      {isDropdownOpen ? (
        <View className='absolute z-10 left-0 right-0 top-9 bg-primary border border-t-0  border-secondary rounded-b-lg overflow-hidden'>
          <ScrollView>
            {LANGUAGES_LIST.map((l, index, arr) => {
              const Icon = ICONS[l] as React.ElementType
              return (
                <Pressable
                  key={l}
                  onPress={() => selectLanguage(l)}
                  className={`flex-row items-center   ${
                    language === l ? 'bg-secondary' : 'bg-secondary'
                  } `}
                >
                  <View
                    className={`flex flex-row w-full items-center h-10 p-sm ${
                      index + 1 !== arr.length
                        ? 'border-b border-b-2-primary'
                        : ''
                    }`}
                  >
                    <Icon className='w-6 h-6' />
                    <AppText className='text-primary ml-sm'>
                      {LANGUAGE_NAMES[l]}
                    </AppText>
                  </View>
                </Pressable>
              )
            })}
          </ScrollView>
        </View>
      ) : null}
    </View>
  )
}
