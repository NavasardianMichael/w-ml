import AppButton from '@/components/ui/AppButton';
import Header from '@/components/header/Header';
import { SCREENS } from '@/constants/game';
import { SOUND_DURATION_BY_URI, SOUNDS_URIS } from '@/constants/sound';
import { sleep } from '@/helpers/commons';
import { useSound } from '@/hooks/useSound';
import { useGameStore } from '@/store/game/store';
import { useSettingsStore } from '@/store/settings/store';
import { useSoundStore } from '@/store/sound/store';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

export default function Home() {
  const { playSoundById, stopAllTracks } = useSoundStore();
  const { language } = useSettingsStore();
  const { isPending, initQuiz, setScreen } = useGameStore();
  const { t } = useTranslation();
  const hasPlayedRef = useRef(false);

  // Only use useSound to initialize the sound, don't auto-play
  useSound(SOUNDS_URIS.mainTheme);

  // Play main theme only once when component mounts
  useEffect(() => {
    if (hasPlayedRef.current) return; // Prevent multiple plays
    hasPlayedRef.current = true;

    const playMainTheme = async () => {
      // Stop any existing sounds first
      await stopAllTracks();
      // Then play main theme
      await playSoundById(SOUNDS_URIS.mainTheme, { loop: true });
    };
    playMainTheme();
  }, [playSoundById, stopAllTracks]);

  return (
    <View className="flex-1 bg-primary">
      <Header />
      <Text className="text-xl text-center text-white font-bold">
        {t('who-wants-to-be-a-millionaire')}
      </Text>
      <View className="flex flex-1 justify-center items-center gap-4">
        <AppButton
          disabled={isPending}
          className={isPending ? 'opacity-50' : ''}
          onPress={async e => {
            if (isPending) {
              e.preventDefault();
              e.stopPropagation();
              return;
            }
            initQuiz({ language });
            await playSoundById(SOUNDS_URIS.resign);
            await sleep(SOUND_DURATION_BY_URI[SOUNDS_URIS.resign]);
            await playSoundById(SOUNDS_URIS.easy, { loop: true });
            setScreen(SCREENS.game);
          }}
        >
          <Text className="text-secondary">{t('start-game')}</Text>
        </AppButton>

        {/* Test Audio Button */}
        <AppButton
          onPress={async () => {
            console.log('=== TEST AUDIO BUTTON PRESSED ===');
            try {
              await playSoundById(SOUNDS_URIS.correctAnswer);
              console.log('=== TEST AUDIO COMPLETED ===');
            } catch (error) {
              console.error('=== TEST AUDIO ERROR ===', error);
            }
          }}
        >
          <Text>Test Audio</Text>
        </AppButton>

        {/* Stop All Audio Button */}
        <AppButton
          onPress={async () => {
            console.log('=== STOP ALL BUTTON PRESSED ===');
            try {
              await stopAllTracks();
              console.log('=== STOP ALL COMPLETED ===');
            } catch (error) {
              console.error('=== STOP ALL ERROR ===', error);
            }
          }}
        >
          <Text>Stop All Audio</Text>
        </AppButton>
      </View>
    </View>
  );
}
