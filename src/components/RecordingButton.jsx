import { StyleSheet } from 'react-native';
import MaterialButton from './UI/MaterialButton';

export default function RecordingButton({ recording, setRecording }) {
  function handlePress() {
    setRecording((recording) => !recording);
  }
  return (
    <MaterialButton
      style={styles.button}
      onPress={handlePress}
      iconName={recording ? 'stop' : 'mic'}
      iconSize={50}
      iconColor={recording ? 'red' : 'white'}
    />
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'black',
    borderRadius: 100,
    padding: 10,
  },
});
