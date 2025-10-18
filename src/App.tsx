import { StatusBar, TouchableOpacity, View } from 'react-native'
import { SCREENS } from './constants/game'
import Game from './screens/game'
import Home from './screens/home'
import Results from './screens/results'
import { useGameStore } from './store/game/store'
import { Screen } from './types/game'

function App() {
  const { screen, isSidebarOpen, setIsSidebarOpen } = useGameStore()

  const COMPONENT_BY_SCREEN: Record<Screen, React.FC> = {
    [SCREENS.game]: Game,
    [SCREENS.results]: Results,
    [SCREENS.home]: Home,
  }

  const ScreenComponent = COMPONENT_BY_SCREEN[screen]

  return (
    <View className='flex-1 bg-primary p-lg'>
      <StatusBar hidden />
      <ScreenComponent />
      {/* Backdrop/Overlay that covers the entire screen */}
      {isSidebarOpen && (
        <TouchableOpacity
          className='absolute left-0 top-0 right-0 bottom-0 inset-0 z-5 bg-black/20'
          onPress={() => setIsSidebarOpen(false)}
          activeOpacity={1}
        />
      )}
    </View>
  )
}

export default App
