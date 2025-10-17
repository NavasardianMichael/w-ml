import { FC, memo } from 'react'
import { Modal, TouchableOpacity, View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useGameStore } from '@/store/game/store'
import { SCREENS } from '@/constants/game'
import AppText from '../ui/AppText'

type Props = {
  isVisible: boolean
  onClose: () => void
}

const ExitModal: FC<Props> = ({ isVisible, onClose }) => {
  const { screen, setScreen } = useGameStore()
  const { t } = useTranslation()

  if (screen !== SCREENS.game) return null

  return (
    <Modal
      animationType='fade'
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View className='flex-1 justify-center items-center bg-black/50'>
        <View className='bg-secondary rounded-md p-md w-10/12 max-w-sm'>
          <View className='mb-4'>
            <AppText className='font-semibold text-primary'>
              {t('are-you-sure-you-want-to-quit')}
            </AppText>
          </View>
          <View className='flex-row justify-end'>
            <TouchableOpacity onPress={onClose} className='px-4 py-2'>
              <AppText className='text-primary font-semibold'>
                {t('no')}
              </AppText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                onClose()
                setScreen(SCREENS.home)
              }}
              className='px-4 py-2'
            >
              <AppText className='font-semibold text-red-500'>
                {t('yes')}
              </AppText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default memo(ExitModal)
