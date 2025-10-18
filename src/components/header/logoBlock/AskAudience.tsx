import { memo } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { useLifelinesStore } from '@/store/lifelines/store'
import { HTML_CODES } from '@/constants/commons'
import {
  CHAR_CODES_BY_OPTION_SERIAL_NUMBER,
  OPTIONS_SERIAL_NUMBERS,
} from '@/constants/game'
import AppText from '@/components/ui/AppText'

export default memo(function AskAudience() {
  const { askAudience, setLifelinesState } = useLifelinesStore()
  // const [barHeight, setBarHeight] = useState(0)

  return (
    <View className=' flex-1 justify-center p-sm mx-auto rounded-lg border border-secondary'>
      <View className='relative flex-row'>
        {OPTIONS_SERIAL_NUMBERS.map(serialNumber => {
          const percentage = askAudience?.[serialNumber] ?? 0
          console.log({ percentage })

          const optionCharCode =
            CHAR_CODES_BY_OPTION_SERIAL_NUMBER[serialNumber]
          return (
            <View
              key={serialNumber}
              className={`h-full flex flex-col justify-end items-center  border-separate border-l border-secondary px-md  ${
                serialNumber === 1 ? 'border-l-0' : ''
              }`}
            >
              <AppText className=' text-secondary'>
                {askAudience?.[serialNumber] ?? 0}%
              </AppText>
              <View className={`w-xl  flex-1 rounded-sm  `}>
                <View
                  className={`mt-auto f-hull rounded-sm border border-secondary`}
                  style={{ flex: percentage / 100 }}
                />
              </View>
              <AppText className='text-secondary'>{optionCharCode}</AppText>
            </View>
          )
        })}
      </View>
      {askAudience?.[1] !== undefined ? (
        <TouchableOpacity
          className={`h-9 w-9 flex items-center justify-center z-10 absolute -top-4 -right-4 rounded-full bg-secondary ${
            !askAudience ? 'opacity-50' : 'opacity-100'
          }`}
          onPress={() => {
            setLifelinesState({ currentLifeline: null })
          }}
          disabled={!askAudience}
        >
          <AppText className='text-primary font-semibold text-md '>
            {HTML_CODES.close}
          </AppText>
        </TouchableOpacity>
      ) : null}
    </View>
  )
})
