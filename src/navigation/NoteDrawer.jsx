import { useEffect, useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AddNoteScreen from '../screens/AddNoteScreen';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MemoScreen from '../screens/MemoScreen';
import NoteScreen from '../screens/NoteScreen';
import { useNoteActions } from '../util/useNoteActions';

const Drawer = createDrawerNavigator();

export default function NoteDrawer() {
  const [drawers, setDrawers] = useState([]);
  const { readMemo, deleteMemo } = useNoteActions(readData);

  useEffect(() => {
    readData();
  }, []);

  async function readData() {
    const getDrawers = await readMemo();
    setDrawers(getDrawers);
  }

  // const readData = useCallback(async () => {
  //   const getDrawers = await readMemo();
  //   setDrawers(getDrawers);
  // }, [readMemo]);

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
          children={(props) => (
            <MemoScreen
              {...props}
              id={drawer.id}
              title={drawer.title}
              content={drawer.content}
              remove={deleteMemo}
              onChange={readData}
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
}
