import { FC } from 'react'
import { TouchableOpacity } from 'react-native'
import { useGameStore } from '@/store/game/store'

const SidebarOverlay: FC = () => {
  const { isSidebarOpen, setIsSidebarOpen } = useGameStore()

  if (!isSidebarOpen) return

  return (
    <TouchableOpacity
      className='absolute left-0 top-0 right-0 bottom-0 inset-0 z-5 bg-black/20'
      onPress={() => setIsSidebarOpen(false)}
      activeOpacity={1}
    />
  )
}

export default SidebarOverlay
