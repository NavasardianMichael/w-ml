import { ReactNode } from 'react'
import { View } from 'react-native'
import { useTranslation } from 'react-i18next'
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
  const {
    i18n: { changeLanguage },
  } = useTranslation()
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
        changeLanguage(languageOptionId)
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
