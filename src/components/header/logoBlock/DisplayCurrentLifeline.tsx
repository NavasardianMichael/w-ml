import { memo } from 'react'
import { useLifelinesStore } from '@/store/lifelines/store'
import { LIFELINES } from '@/constants/game'
import AskAudience from './AskAudience'
import PhoneAFriend from './PhoneAFriend'

export default memo(function DisplayCurrentLifeline() {
  const { currentLifeline } = useLifelinesStore()

  if (!currentLifeline) return null

  return currentLifeline === LIFELINES.askAudience ? (
    <AskAudience />
  ) : (
    <PhoneAFriend />
  )
})
