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
            playSoundById(SOUNDS_URIS.resign);
            setScreen(SCREENS.game);
            await sleep(SOUND_DURATION_BY_URI[SOUNDS_URIS.resign]);
            playSoundById(SOUNDS_URIS.easy, { loop: true });
          }}
        >
          <Text className="text-secondary">{t('start-game')}</Text>
        </AppButton>
      </View>
    </View>
  );
}
