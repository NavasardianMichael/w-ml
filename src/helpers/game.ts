import { QuestionStage, SafeHavenStage } from '@/types/game'
import { SOUNDS_IDS_BY_SAFE_HAVEN } from '@/constants/sound'

export const getBgSoundIdByQuestionStage = (stage: number) => {
  return SOUNDS_IDS_BY_SAFE_HAVEN[Math.floor(stage / 5)]
}

export const getSafeHavenSerialNumberByQuestionStage = (
  stage: QuestionStage,
) => {
  return (Math.floor(stage / 5) + 1) as SafeHavenStage
}
