import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import FlashMessage from 'react-native-flash-message';

const App = () => {
  return (
    <NavigationContainer>
      <FlashMessage position='top' />
      <AppNavigator />
      <StatusBar style='auto' />
    </NavigationContainer>
  );
};

export default App;
