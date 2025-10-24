import { StatusBar, View } from 'react-native'

import SidebarContent from './components/game/Sidebar/SidebarContent'
import SidebarOverlay from './components/game/Sidebar/SidebarOverlay'
import Header from './components/header/Header'
import { SCREENS } from './constants/game'
import Game from './screens/game'
import Home from './screens/home'
import Results from './screens/results'
import Settings from './screens/settings'
import { useGameStore } from './store/game/store'
import { Screen } from './types/game'

function App() {
  const { screen } = useGameStore()

  const COMPONENT_BY_SCREEN: Record<Screen, React.FC> = {
    [SCREENS.game]: Game,
    [SCREENS.results]: Results,
    [SCREENS.home]: Home,
    [SCREENS.settings]: Settings,
  }

  const CurrentScreen = COMPONENT_BY_SCREEN[screen]

  return (
    <View className='flex-1 bg-primary p-md md:p-xl'>
      <StatusBar hidden />
      <Header />
      <View className='min-h-[50vh]'>
        <CurrentScreen />
      </View>
      <SidebarOverlay />
      {screen === SCREENS.game && <SidebarContent />}
    </View>
  )
}

export default App
