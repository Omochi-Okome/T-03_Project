import { useEffect, useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import AddNoteScreen from '../screens/AddNoteScreen';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import ManagementScreen from '../screens/ManagementScreen';
import MemoScreen from '../screens/MemoScreen';
import NoteScreen from '../screens/NoteScreen';
import { useNoteActions } from '../util/useNoteActions';
import { Colors } from '../util/styles';
import { Memo } from '../store/memoSlice';

const Drawer = createDrawerNavigator();

const NoteDrawer = () => {
  const memos: Memo[] = useSelector((state: RootState) => state.memos);

  return (
    <Drawer.Navigator
      backBehavior='history'
      screenOptions={{
        drawerActiveTintColor: Colors.white100,
        drawerInactiveTintColor: Colors.black900,
        drawerActiveBackgroundColor: Colors.blue500,
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
              color={focused ? Colors.white100 : Colors.black900}
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
              name='add-circle'
              size={24}
              color={focused ? Colors.white100 : Colors.black900}
            />
          ),
        }}
      />
      <Drawer.Screen
        name='Management'
        component={ManagementScreen}
        options={{
          drawerIcon: ({ focused }) => (
            <MaterialIcons
              name='format-list-bulleted'
              size={24}
              color={focused ? Colors.white100 : Colors.black900}
            />
          ),
        }}
      />
      {memos.map((drawer) => (
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
                color={focused ? Colors.white100 : Colors.black900}
              />
            ),
          }}
        />
      ))}
    </Drawer.Navigator>
  );
};

export default NoteDrawer;
