import { LIFELINES } from '@/constants/game'
import { ICONS } from '@/constants/icons'
import { Text } from 'react-native'

const LIFELINES_TEMPLATE = [
  {
    id: LIFELINES.fiftyFifty,
    icon: <Text className='text-secondary text-sm font-bold'>50/50</Text>,
  },
  {
    id: LIFELINES.phoneAFriend,
    icon: <ICONS.phone />,
  },
  {
    id: LIFELINES.askAudience,
    icon: <ICONS.audience />,
  },
  {
    id: LIFELINES.switchQuestion,
    icon: <ICONS.switch />,
  },
]

export default LIFELINES_TEMPLATE
