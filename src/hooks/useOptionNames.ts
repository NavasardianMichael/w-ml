import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { OptionSerialNumber } from '@/types/game'

/**
 * A custom hook that provides localized option names for quiz questions.
 *
 * @returns A record mapping option serial numbers (1-4) to their corresponding
 * localized names (option-a, option-b, option-c, option-d).
 *
 * @example
 * ```typescript
 * const optionNames = useOptionNames();
 * console.log(optionNames[1]); // "Option A" (localized)
 * ```
 */

export const useOptionNames = () => {
  const { t } = useTranslation()

  const optionNames: Record<OptionSerialNumber, string> = useMemo(() => {
    return {
      1: t(`option-a`),
      2: t(`option-b`),
      3: t(`option-c`),
      4: t(`option-d`),
    }
  }, [t])

  return optionNames
}
