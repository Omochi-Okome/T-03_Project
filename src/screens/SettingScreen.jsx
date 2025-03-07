import { StyleSheet, View } from 'react-native';
import ToggleSwitch from '../components/UI/ToggleSwitch';

const SettingScreen = () => {
  return (
    <View style={style.container}>
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
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  },
});

export default SettingScreen;
