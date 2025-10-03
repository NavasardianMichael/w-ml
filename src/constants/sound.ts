import audienceHelpSound from '@/assets/audio/audience-help.mp3';
import correctAnswerSound from '@/assets/audio/correct-answer.mp3';
import easyQuestionSound from '@/assets/audio/easy.mp3';
import fiftyFiftySound from '@/assets/audio/fifty-fifty.mp3';
import finalAnswerSound from '@/assets/audio/final-answer.mp3';
import hardAnswerSound from '@/assets/audio/hard.mp3';
import mainThemeSound from '@/assets/audio/main-theme.mp3';
import mediumAnswerSound from '@/assets/audio/medium.mp3';
import nextQuestionSound from '@/assets/audio/next.mp3';
import phoneAFriendSound from '@/assets/audio/phone-a-friend.mp3';
import resignSound from '@/assets/audio/resign.mp3';
import wrongAnswerSound from '@/assets/audio/wrong-answer.mp3';
import youWonMillionSound from '@/assets/audio/you-won-a-million.mp3';

export const SOUNDS_URIS = {
  audienceHelp: audienceHelpSound,
  correctAnswer: correctAnswerSound,
  easy: easyQuestionSound,
  fiftyFifty: fiftyFiftySound,
  finalAnswer: finalAnswerSound,
  hard: hardAnswerSound,
  mainTheme: mainThemeSound,
  medium: mediumAnswerSound,
  next: nextQuestionSound,
  phoneAFriend: phoneAFriendSound,
  resign: resignSound,
  wrongAnswer: wrongAnswerSound,
  youWonMillion: youWonMillionSound,
} as const;

// TrackPlayer Track objects
export const SOUND_TRACKS = {
  [SOUNDS_URIS.audienceHelp]: {
    id: SOUNDS_URIS.audienceHelp,
    url: audienceHelpSound,
    title: 'Audience Help',
    duration: 5.46,
  },
  [SOUNDS_URIS.correctAnswer]: {
    id: SOUNDS_URIS.correctAnswer,
    url: correctAnswerSound,
    title: 'Correct Answer',
    duration: 8.07,
  },
  [SOUNDS_URIS.easy]: {
    id: SOUNDS_URIS.easy,
    url: easyQuestionSound,
    title: 'Easy Question',
    duration: 75.65,
  },
  [SOUNDS_URIS.fiftyFifty]: {
    id: SOUNDS_URIS.fiftyFifty,
    url: fiftyFiftySound,
    title: 'Fifty Fifty',
    duration: 3.11,
  },
  [SOUNDS_URIS.finalAnswer]: {
    id: SOUNDS_URIS.finalAnswer,
    url: finalAnswerSound,
    title: 'Final Answer',
    duration: 29.99,
  },
  [SOUNDS_URIS.hard]: {
    id: SOUNDS_URIS.hard,
    url: hardAnswerSound,
    title: 'Hard Question',
    duration: 160.18,
  },
  [SOUNDS_URIS.mainTheme]: {
    id: SOUNDS_URIS.mainTheme,
    url: mainThemeSound,
    title: 'Main Theme',
    duration: 32.31,
  },
  [SOUNDS_URIS.medium]: {
    id: SOUNDS_URIS.medium,
    url: mediumAnswerSound,
    title: 'Medium Question',
    duration: 56.71,
  },
  [SOUNDS_URIS.next]: {
    id: SOUNDS_URIS.next,
    url: nextQuestionSound,
    title: 'Next Question',
    duration: 6.87,
  },
  [SOUNDS_URIS.phoneAFriend]: {
    id: SOUNDS_URIS.phoneAFriend,
    url: phoneAFriendSound,
    title: 'Phone A Friend',
    duration: 9.17,
  },
  [SOUNDS_URIS.resign]: {
    id: SOUNDS_URIS.resign,
    url: resignSound,
    title: 'Resign',
    duration: 5.7,
  },
  [SOUNDS_URIS.wrongAnswer]: {
    id: SOUNDS_URIS.wrongAnswer,
    url: wrongAnswerSound,
    title: 'Wrong Answer',
    duration: 5.8,
  },
  [SOUNDS_URIS.youWonMillion]: {
    id: SOUNDS_URIS.youWonMillion,
    url: youWonMillionSound,
    title: 'You Won Million',
    duration: 3.03,
  },
};

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
};

export const SOUNDS_IDS_BY_SAFE_HAVEN = [
  SOUNDS_URIS.easy,
  SOUNDS_URIS.medium,
  SOUNDS_URIS.hard,
];

export const SOUND_ID_BY_LIFELINE = {
  fiftyFifty: SOUNDS_URIS.fiftyFifty,
  askAudience: SOUNDS_URIS.audienceHelp,
  phoneAFriend: SOUNDS_URIS.phoneAFriend,
  switchQuestion: SOUNDS_URIS.fiftyFifty,
};
