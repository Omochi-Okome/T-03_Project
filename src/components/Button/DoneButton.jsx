import { Keyboard, StyleSheet } from 'react-native';
import MaterialButton from '../UI/MaterialButton';

const DoneButton = () => {
  return (
    <MaterialButton
      style={styles.doneButton}
      onPress={() => {
        Keyboard.dismiss();
      }}
      iconName='check'
      iconSize={32}
      iconColor='black'
    />
  );
};

const styles = StyleSheet.create({
  doneButton: {
    paddingHorizontal: 10,
  },
});

export default DoneButton;
