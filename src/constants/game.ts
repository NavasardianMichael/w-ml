export const QUESTION_STAGES = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
] as const

export const SAFE_HAVEN_STAGES = [1, 2, 3] as const

export const OPTIONS_SERIAL_NUMBERS = [1, 2, 3, 4] as const

export const LIFELINES = {
  fiftyFifty: 'fiftyFifty',
  askAudience: 'askAudience',
  phoneAFriend: 'phoneAFriend',
  switchQuestion: 'switchQuestion',
} as const

export const SCREENS = {
  home: 'home',
  results: 'results',
  game: 'game',
  settings: 'settings',
} as const
