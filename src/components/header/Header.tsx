import { useState } from 'react'
import { View } from 'react-native'
import VolumeOffIcon from '@/assets/icons/volume-off.svg'
import VolumeOnIcon from '@/assets/icons/volume-on.svg'
import { useGameStore } from '@/store/game/store'
import { useSoundStore } from '@/store/sound/store'
import { SCREENS } from '@/constants/game'
import { SOUNDS_URIS } from '@/constants/sound'
import { useSound } from '@/hooks/useSound'
import SidebarTrigger from '../game/Sidebar/SidebarTrigger'
import AppButton from '../ui/AppButton'
import ExitIconButton from './ExitIconButton'
import ExitModal from './ExitModal'
import LogoBlock from './logoBlock/LogoBlock'

export default function Header() {
  const { screen, setScreen } = useGameStore()
  const {
    playSoundById,
    toggleActiveSoundMuted,
    setIsActiveSoundMuted,
    isMuted,
    activeSoundIdsStack,
  } = useSoundStore()
  const [isExitModalVisible, setIsExitModalVisible] = useState(false)

  useSound(SOUNDS_URIS.mainTheme, { loop: true })
  useSound(SOUNDS_URIS.easy, { loop: true })

  const soundHandler = async () => {
    if (!activeSoundIdsStack.length && isMuted) {
      const soundId =
        screen === SCREENS.home ? SOUNDS_URIS.mainTheme : SOUNDS_URIS.easy
      playSoundById(soundId, { loop: true })
      setIsActiveSoundMuted(false)
      return
    }
    toggleActiveSoundMuted()
  }

  return (
    <>
      <View className='flex flex-row '>
        <AppButton onPress={soundHandler}>
          {isMuted ? <VolumeOffIcon /> : <VolumeOnIcon />}
        </AppButton>
        {screen === SCREENS.game ? (
          <ExitIconButton onPress={() => setIsExitModalVisible(true)} />
        ) : null}
        {screen === SCREENS.settings || screen === SCREENS.results ? (
          <ExitIconButton onPress={() => setScreen(SCREENS.home)} />
        ) : null}
        {screen === SCREENS.game ? <SidebarTrigger /> : null}
      </View>

      <ExitModal
        isVisible={isExitModalVisible}
        onClose={() => setIsExitModalVisible(false)}
      />

      <LogoBlock />
    </>
  )
}
