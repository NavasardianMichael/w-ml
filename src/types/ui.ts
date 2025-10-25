import { ReactNode } from 'react'

type AppDropdownOption = {
  id: string
  label: string
}

type AppDropdownProps = {
  label: string
  selectedOptionId: AppDropdownOption['id']
  options: AppDropdownOption[]
  onSelect: (option: AppDropdownOption) => void
  renderOptionNode?: (
    option: AppDropdownOption,
    index?: number,
    arr?: AppDropdownOption[],
  ) => ReactNode
}

export type AppDropdownType = {
  option: AppDropdownOption
  props: AppDropdownProps
}
