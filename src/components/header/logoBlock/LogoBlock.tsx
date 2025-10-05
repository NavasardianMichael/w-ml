import { LIFELINES } from '@/constants/game';
import { useClassNameByOrientation } from '@/hooks/useClassNameByOrientation';
import { useIsPortrait } from '@/hooks/useIsPortrait';
import { useLifelinesStore } from '@/store/lifelines/store';
import { memo, useMemo } from 'react';
import { Image, View } from 'react-native';
import DisplayCurrentLifeline from './DisplayCurrentLifeline';

export default memo(function LogoBlock() {
  const { currentLifeline } = useLifelinesStore();
  const sizeClassName = useClassNameByOrientation('w-40 h-40', 'w-30 h-30');
  const className = useClassNameByOrientation('mb-8', 'mb-2');

  const isPortrait = useIsPortrait();
  const showLifeline = useMemo(() => {
    return !(
      currentLifeline !== LIFELINES.askAudience &&
      currentLifeline !== LIFELINES.phoneAFriend
    );
  }, [currentLifeline]);

  if (isPortrait) {
    return (
      <View className="flex-1 flex flex-col gap-md">
        <Image
          className={`ml-4! ${className} ${sizeClassName}`}
          source={require('../../../assets/images/logo.webp')}
        />

        {showLifeline ? <DisplayCurrentLifeline /> : null}
      </View>
    );
  } else {
    return (
      <>
        {showLifeline ? (
          <DisplayCurrentLifeline />
        ) : (
          <Image
            className={`mx-auto ${className} ${sizeClassName}`}
            source={require('../../../assets/images/logo.webp')}
          />
        )}
      </>
    );
  }
});
