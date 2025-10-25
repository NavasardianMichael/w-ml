import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { AppDropdownType } from '@/types/ui'

export const useAppDropdownOptions = <T extends string>(
  optionKeys: Record<T, string>,
  labelsByOptionKey: Record<T, string>,
) => {
  const { t } = useTranslation()

  const options: AppDropdownType['props']['options'] = useMemo(() => {
    return Object.keys(optionKeys).map(
      key =>
        ({
          label: t(key),
          id: labelsByOptionKey[key as T],
        } as AppDropdownType['option']),
    )
  }, [t, optionKeys, labelsByOptionKey])

  return options
}
