import { LIFELINES } from '@/constants/game'
import { ICONS } from '@/constants/icons'
import AppText from '@/components/ui/AppText'

const LIFELINES_TEMPLATE = [
  {
    id: LIFELINES.fiftyFifty,
    icon: (
      <AppText
        disableDefaultFontSize
        className='mx-auto text-[11px] lg:text-md font-bold'
      >
        50/50
      </AppText>
    ),
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
