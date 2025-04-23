import {AppRegistry} from 'react-native';
import './styles.css';
import App from './App';

AppRegistry.registerComponent('App', () => App);
AppRegistry.runApplication('App', {
  rootTag: document.getElementById('root'),
});
