import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabs from './BottomTabs';
import EditMemoScreen from '../screens/EditMemoScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='BottomTabs'
        component={BottomTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='EditMemo'
        component={EditMemoScreen}
        options={{ headerTitle: 'メモを編集', headerBackTitle: '戻る' }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
