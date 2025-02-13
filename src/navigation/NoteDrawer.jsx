import { useEffect, useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AddNoteScreen from '../screens/AddNoteScreen';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MemoScreen from '../screens/MemoScreen';
import NoteScreen from '../screens/NoteScreen';
import { useNoteActions } from '../util/useNoteActions';

const Drawer = createDrawerNavigator();

const NoteDrawer = () => {
  const [drawers, setDrawers] = useState([]);
  const { readMemo } = useNoteActions();

  useEffect(() => {
    readMemo((callback) => {
      setDrawers(callback);
    });
  }, []);

  return (
    <Drawer.Navigator
      screenOptions={{
        drawerActiveTintColor: 'white',
        drawerInactiveTintColor: 'black',
        drawerActiveBackgroundColor: '#003CB3',
      }}
    >
      <Drawer.Screen
        name='Home'
        component={NoteScreen}
        options={{
          drawerIcon: ({ focused }) => (
            <MaterialIcons
              name='edit-note'
              size={24}
              color={focused ? 'white' : 'black'}
            />
          ),
        }}
      />
      <Drawer.Screen
        name='AddScreen'
        component={AddNoteScreen}
        options={{
          drawerIcon: ({ focused }) => (
            <MaterialIcons
              name='note-add'
              size={24}
              color={focused ? 'white' : 'black'}
            />
          ),
        }}
      />
      {drawers.map((drawer) => (
        <Drawer.Screen
          key={drawer.id}
          name={drawer.title || `タイトルなし-${drawer.id}`}
          children={() => (
            <MemoScreen
              id={drawer.id}
              title={drawer.title}
              content={drawer.content}
            />
          )}
          options={{
            drawerLabel: drawer.title || `タイトルなし-${drawer.id}`,
            drawerIcon: ({ focused }) => (
              <MaterialIcons
                name='description'
                size={24}
                color={focused ? 'white' : 'black'}
              />
            ),
          }}
        />
      ))}
    </Drawer.Navigator>
  );
};

export default NoteDrawer;
