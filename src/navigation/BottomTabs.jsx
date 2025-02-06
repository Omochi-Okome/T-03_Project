import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import VoiceScreen from '../screens/VoiceScreen';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import SettingScreen from '../screens/SettingScreen';
import NoteDrawer from './NoteDrawer';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name='Voice'
        component={VoiceScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons
              name='record-voice-over'
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name='Note'
        component={NoteDrawer}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons
              name='edit-note'
              color={color}
              size={size}
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name='Setting'
        component={SettingScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons
              name='settings'
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
