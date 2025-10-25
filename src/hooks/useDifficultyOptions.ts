import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { DifficultyKey } from '@/types/settings'
import { AppDropdownType } from '@/types/ui'
import { DIFFICULTY_KEYS, DIFFICULTY_LABELS_BY_KEY } from '@/constants/settings'

export const useDifficultyOptions = () => {
  const { t } = useTranslation()

  const options: AppDropdownType['props']['options'] = useMemo(() => {
    return Object.keys(DIFFICULTY_KEYS).map(
      key =>
        ({
          label: t(key),
          id: DIFFICULTY_LABELS_BY_KEY[key as DifficultyKey],
        } as AppDropdownType['option']),
    )
  }, [t])

  return options
}
