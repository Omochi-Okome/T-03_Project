import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import FlashMessage from 'react-native-flash-message';
import MemoSubscriber from './src/components/MemoSubsciber';
import { Provider } from 'react-redux';
import store from './src/store/store';

const App = () => {
  return (
    <Provider store={store}>
      <MemoSubscriber />
      <NavigationContainer>
        <FlashMessage position='top' />
        <AppNavigator />
        <StatusBar style='auto' />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
