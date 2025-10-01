import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import { initI18n } from './src/services/translations/i18n';

// Initialize i18n before registering the app
initI18n();

AppRegistry.registerComponent(appName, () => App);
