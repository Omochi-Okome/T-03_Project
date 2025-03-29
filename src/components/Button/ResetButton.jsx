import { StyleSheet } from 'react-native';
import MaterialButton from '../UI/MaterialButton';
import { useNoteActions } from '../../util/useNoteActions';

const ResetButton = ({ setInput }) => {
  const { resetMemo } = useNoteActions();

  return (
    <MaterialButton
      style={styles.doneButton}
      onPress={() => resetMemo(setInput)}
      iconName='autorenew'
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

export default ResetButton;
