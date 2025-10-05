import { AppRegistry } from 'react-native';
// import TrackPlayer from 'react-native-track-player';
import App from './src/App';
import { name as appName } from './app.json';
import { initI18n } from './src/services/translations/i18n';

// Initialize i18n before registering the app
initI18n();

// Extra logging to track "Text strings must be rendered within a <Text> component" errors
// const originalConsoleError = console.error;
// console.error = (...args) => {
//   try {
//     const firstArg = args[0];
//     if (
//       typeof firstArg === 'string' &&
//       firstArg.includes(
//         'Text strings must be rendered within a <Text> component',
//       )
//     ) {
//       const error = new Error('Stack trace for Text rendering issue');
//       originalConsoleError.call(console, error.stack);
//     }
//   } catch (loggingError) {
//     originalConsoleError.call(console, loggingError);
//   }
//   originalConsoleError.apply(console, args);
// };

// Register the playback service for background audio handling
// TrackPlayer.registerPlaybackService(() =>
//   require('./src/services/trackPlayer/playbackService.js'),
// );

AppRegistry.registerComponent(appName, () => App);
