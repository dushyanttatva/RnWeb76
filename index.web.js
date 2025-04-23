import {AppRegistry} from 'react-native';
import './src/styles.css';
import App from './src/App';

AppRegistry.registerComponent('App', () => App);
AppRegistry.runApplication('App', {
  rootTag: document.getElementById('root'),
});
