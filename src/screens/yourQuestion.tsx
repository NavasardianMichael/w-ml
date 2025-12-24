import React, { useState } from 'react'
import { View, ScrollView } from 'react-native'
import AppText from '../components/ui/AppText'
import AppTextInput from '../components/ui/AppTextInput'
import AppButton from '../components/ui/AppButton'
import AppBinaryRadioButtonsGroup from '../components/ui/AppBinaryRadioButtonsGroup'

import { FC } from 'react'
const YourQuestionScreen: FC = () => {
  const [question, setQuestion] = useState('')
  const [answers, setAnswers] = useState(['', '', '', ''])
  const [correctOption, setCorrectOption] = useState(1)

  const handleAnswerChange = (text: string, idx: number) => {
    const newAnswers = [...answers]
    newAnswers[idx] = text
    setAnswers(newAnswers)
  }

  const handleSubmit = () => {
    // Submission logic will be added later
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      className='flex flex-col p-md'
    >
      <AppText className='font-bold text-lg mb-md' disableDefaultFontSize>
        Your Question
      </AppText>
      <AppTextInput
        value={question}
        onChangeText={setQuestion}
        placeholder='Type your question here...'
        multiline
        className='mb-md'
      />
      {answers.map((ans, idx) => (
        <View key={idx} className='mb-sm'>
          <AppText className='mb-xs'>{`Option ${idx + 1}`}</AppText>
          <AppTextInput
            value={ans}
            onChangeText={text => handleAnswerChange(text, idx)}
            placeholder={`Answer ${idx + 1}`}
          />
        </View>
      ))}
      <AppBinaryRadioButtonsGroup
        value={correctOption}
        onValueChange={setCorrectOption}
        label='Correct Option'
        options={['1', '2', '3', '4']}
      />
      <AppButton className='mt-md' onPress={handleSubmit}>
        <AppText className='text-center' disableDefaultFontSize>
          Submit
        </AppText>
      </AppButton>
    </ScrollView>
  )
}

export default YourQuestionScreen
