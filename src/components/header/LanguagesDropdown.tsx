import { ReactNode } from 'react'
import { View } from 'react-native'
import { getQuiz } from '@/api/getQuiz'
import { useSettingsStore } from '@/store/settings/store'
import { LANGUAGES } from '@/services/translations/constants'
import { Language } from '@/types/settings'
import { ICONS } from '@/constants/icons'
import { LANGUAGE_NAMES } from '@/constants/settings'
import { useAppDropdownOptions } from '@/hooks/useAppDropdownOptions'
import AppDropdown from '../ui/AppDropdown'
import AppText from '../ui/AppText'

export type AppDropdownOption = {
  label: ReactNode
  value: string
}

export default function LanguagesDropdown() {
  const { language, setSettingsState } = useSettingsStore()
  const languagesDropdownOptions = useAppDropdownOptions<Language>(
    LANGUAGES,
    LANGUAGE_NAMES,
  )
  return (
    <AppDropdown
      options={languagesDropdownOptions}
      onSelect={option => {
        const languageOptionId = option.id as Language
        setSettingsState({ language: languageOptionId })
        getQuiz({ language: languageOptionId })
      }}
      selectedOptionId={language}
      renderOptionNode={option => {
        const Icon = ICONS[option.id as keyof typeof ICONS] as React.ElementType
        return (
          <View className={`flex flex-row w-full items-center`}>
            <Icon className='w-6 lg:w-12' />
            <AppText className='text-primary ml-sm'>{option.label}</AppText>
          </View>
        )
      }}
      renderSelectedOptionNode={option => {
        const Icon = ICONS[option.id as keyof typeof ICONS] as React.ElementType
        return (
          <View className={`flex flex-row w-full items-center`}>
            <Icon className='w-6 lg:w-12' />
            <AppText className='ml-sm'>{option.label}</AppText>
          </View>
        )
      }}
    />
  )
}
