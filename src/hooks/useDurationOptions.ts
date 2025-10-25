import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { DurationKey } from '@/types/settings'
import { AppDropdownType } from '@/types/ui'
import { DURATION_KEYS, DURATION_LABELS_BY_KEY } from '@/constants/settings'

export const useDurationOptions = () => {
  const { t } = useTranslation()

  const options: AppDropdownType['props']['options'] = useMemo(() => {
    return Object.keys(DURATION_KEYS).map(
      key =>
        ({
          label: t(key),
          id: DURATION_LABELS_BY_KEY[key as DurationKey],
        } as AppDropdownType['option']),
    )
  }, [t])

  return options
}
