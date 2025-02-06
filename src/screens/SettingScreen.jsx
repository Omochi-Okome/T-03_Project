import { StyleSheet, View } from 'react-native';

import ToggleSwitch from '../components/UI/ToggleSwitch';

export default function SettingScreen() {
  return (
    <View style={style.container}>
      <View style={style.settingContainer}>
        <ToggleSwitch
          text='パスコードロック'
          explain='アプリの起動時にパスワードを要求します'
        />
        <ToggleSwitch
          text='自動ログイン'
          explain='アプリの起動時に自動的にログインします'
        />
        <ToggleSwitch
          text='メモの自動リセット'
          explain='アプリの起動時にメモを自動的にリセットします'
        />
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  settingContainer: {
    margin: 10,
  },
});
