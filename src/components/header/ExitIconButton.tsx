import { FC } from 'react'
import { TouchableOpacityProps } from 'react-native'
import { ICONS } from '@/constants/icons'
import AppIconButtonSmall from '../ui/AppIconButtonSmall'

type Props = TouchableOpacityProps

const ExitIconButton: FC<Props> = props => {
  return (
    <AppIconButtonSmall className={`ml-md rotate-180`} {...props}>
      <ICONS.exit />
    </AppIconButtonSmall>
  )
}

export default ExitIconButton
