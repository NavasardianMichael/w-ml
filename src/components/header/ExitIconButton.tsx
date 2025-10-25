import { FC } from 'react'
import { TouchableOpacityProps } from 'react-native'
import { ICONS } from '@/constants/icons'
import AppSmallIconButton from '../ui/AppSmallIconButton'

type Props = TouchableOpacityProps

const ExitIconButton: FC<Props> = props => {
  return (
    <AppSmallIconButton className={`ml-md rotate-180`} {...props}>
      <ICONS.exit />
    </AppSmallIconButton>
  )
}

export default ExitIconButton
