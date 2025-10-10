// Audio file constants for react-native-sound
export const SOUNDS_URIS = {
  audienceHelp: 'audience-help.mp3',
  correctAnswer: 'correct-answer.mp3',
  easy: 'easy.mp3',
  fiftyFifty: 'fifty-fifty.mp3',
  finalAnswer: 'final-answer.mp3',
  hard: 'hard.mp3',
  mainTheme: 'main-theme.mp3',
  medium: 'medium.mp3',
  next: 'next.mp3',
  phoneAFriend: 'phone-a-friend.mp3',
  resign: 'resign.mp3',
  wrongAnswer: 'wrong-answer.mp3',
  youWonMillion: 'you-won-a-million.mp3',
} as const

// TrackPlayer Track objects (now using simple filenames)
export const SOUND_TRACKS = {
  [SOUNDS_URIS.audienceHelp]: {
    id: SOUNDS_URIS.audienceHelp,
    url: SOUNDS_URIS.audienceHelp,
    title: 'Audience Help',
    duration: 5.46,
  },
  [SOUNDS_URIS.correctAnswer]: {
    id: SOUNDS_URIS.correctAnswer,
    url: SOUNDS_URIS.correctAnswer,
    title: 'Correct Answer',
    duration: 8.07,
  },
  [SOUNDS_URIS.easy]: {
    id: SOUNDS_URIS.easy,
    url: SOUNDS_URIS.easy,
    title: 'Easy Question',
    duration: 75.65,
  },
  [SOUNDS_URIS.fiftyFifty]: {
    id: SOUNDS_URIS.fiftyFifty,
    url: SOUNDS_URIS.fiftyFifty,
    title: 'Fifty Fifty',
    duration: 3.11,
  },
  [SOUNDS_URIS.finalAnswer]: {
    id: SOUNDS_URIS.finalAnswer,
    url: SOUNDS_URIS.finalAnswer,
    title: 'Final Answer',
    duration: 29.99,
  },
  [SOUNDS_URIS.hard]: {
    id: SOUNDS_URIS.hard,
    url: SOUNDS_URIS.hard,
    title: 'Hard Question',
    duration: 160.18,
  },
  [SOUNDS_URIS.mainTheme]: {
    id: SOUNDS_URIS.mainTheme,
    url: SOUNDS_URIS.mainTheme,
    title: 'Main Theme',
    duration: 32.31,
  },
  [SOUNDS_URIS.medium]: {
    id: SOUNDS_URIS.medium,
    url: SOUNDS_URIS.medium,
    title: 'Medium Question',
    duration: 56.71,
  },
  [SOUNDS_URIS.next]: {
    id: SOUNDS_URIS.next,
    url: SOUNDS_URIS.next,
    title: 'Next Question',
    duration: 6.87,
  },
  [SOUNDS_URIS.phoneAFriend]: {
    id: SOUNDS_URIS.phoneAFriend,
    url: SOUNDS_URIS.phoneAFriend,
    title: 'Phone A Friend',
    duration: 9.17,
  },
  [SOUNDS_URIS.resign]: {
    id: SOUNDS_URIS.resign,
    url: SOUNDS_URIS.resign,
    title: 'Resign',
    duration: 5.7,
  },
  [SOUNDS_URIS.wrongAnswer]: {
    id: SOUNDS_URIS.wrongAnswer,
    url: SOUNDS_URIS.wrongAnswer,
    title: 'Wrong Answer',
    duration: 5.8,
  },
  [SOUNDS_URIS.youWonMillion]: {
    id: SOUNDS_URIS.youWonMillion,
    url: SOUNDS_URIS.youWonMillion,
    title: 'You Won Million',
    duration: 3.03,
  },
}

export const SOUND_DURATION_BY_URI: Record<
  (typeof SOUNDS_URIS)[keyof typeof SOUNDS_URIS],
  number
> = {
  [SOUNDS_URIS.audienceHelp]: 5460,
  [SOUNDS_URIS.correctAnswer]: 8072,
  [SOUNDS_URIS.easy]: 75651,
  [SOUNDS_URIS.fiftyFifty]: 3109,
  [SOUNDS_URIS.finalAnswer]: 29989,
  [SOUNDS_URIS.hard]: 160183,
  [SOUNDS_URIS.mainTheme]: 32313,
  [SOUNDS_URIS.medium]: 56712,
  [SOUNDS_URIS.next]: 6870,
  [SOUNDS_URIS.phoneAFriend]: 9169,
  [SOUNDS_URIS.resign]: 5695,
  [SOUNDS_URIS.wrongAnswer]: 5799,
  [SOUNDS_URIS.youWonMillion]: 3030,
}

export const SOUNDS_IDS_BY_SAFE_HAVEN = [
  SOUNDS_URIS.easy,
  SOUNDS_URIS.medium,
  SOUNDS_URIS.hard,
]

export const SOUND_ID_BY_LIFELINE = {
  fiftyFifty: SOUNDS_URIS.fiftyFifty,
  askAudience: SOUNDS_URIS.audienceHelp,
  phoneAFriend: SOUNDS_URIS.phoneAFriend,
  switchQuestion: SOUNDS_URIS.fiftyFifty,
}
