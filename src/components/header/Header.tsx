import { useState } from 'react'
import { View } from 'react-native'
import VolumeOffIcon from '@/assets/icons/volume-off.svg'
import VolumeOnIcon from '@/assets/icons/volume-on.svg'
import { useGameStore } from '@/store/game/store'
import { useSoundStore } from '@/store/sound/store'
import { SCREENS } from '@/constants/game'
import { ICONS } from '@/constants/icons'
import { SOUNDS_URIS } from '@/constants/sound'
import { useSound } from '@/hooks/useSound'
import SidebarTrigger from '../game/Sidebar/SidebarTrigger'
import AppIconButtonSmall from '../ui/AppIconButtonSmall'
import ExitModal from './ExitModal'
import LanguagesDropdown from './LanguagesDropdown'
import LogoBlock from './logoBlock/LogoBlock'

export default function Header() {
  const { screen } = useGameStore()
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
      <View className='flex flex-row items-center justify'>
        <AppIconButtonSmall onPress={soundHandler}>
          {isMuted ? <VolumeOffIcon /> : <VolumeOnIcon />}
        </AppIconButtonSmall>
        {screen === SCREENS.game ? (
          <AppIconButtonSmall
            key='header-exit-button'
            onPress={() => setIsExitModalVisible(true)}
            className='ml-md rotate-180'
          >
            <ICONS.exit />
          </AppIconButtonSmall>
        ) : null}
        {screen === SCREENS.home ? (
          <View className='ml-auto'>
            <LanguagesDropdown />
          </View>
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
