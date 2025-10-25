import { View } from 'react-native'
import { useGameStore } from '@/store/game/store'
import { ICONS } from '@/constants/icons'
import AppButton from '@/components/ui/AppButton'

export default function SidebarTrigger() {
  const { toggleIsSidebarOpen } = useGameStore()

  return (
    <View className={`ml-auto`}>
      <AppButton onPress={toggleIsSidebarOpen}>
        <ICONS.sidebar />
      </AppButton>
    </View>
  )
}
