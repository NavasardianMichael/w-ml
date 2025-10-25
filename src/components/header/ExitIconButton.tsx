import { FC } from 'react'
import { TouchableOpacityProps } from 'react-native'
import { ICONS } from '@/constants/icons'
import AppButton from '../ui/AppButton'

type Props = TouchableOpacityProps

const ExitIconButton: FC<Props> = props => {
  return (
    <AppButton className={`ml-md rotate-180`} {...props}>
      <ICONS.exit />
    </AppButton>
  )
}

export default ExitIconButton
