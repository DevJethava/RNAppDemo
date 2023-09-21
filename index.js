/**
 * @format
 */

import {AppRegistry} from 'react-native';
// import App from './App';
import {name as appName} from './app.json';
// import App from './src/ReduxSagaApp/App';
import App from './src/ReduxApp/App';
// import App from './src/ChatApp/App';
// import App from './src/CofeeApp/App';
// import App from './src/AuthApp/App';

AppRegistry.registerComponent(appName, () => App);
