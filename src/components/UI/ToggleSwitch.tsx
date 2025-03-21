import React, { useState } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import { Colors } from '../../util/styles';

type ToggleSwitchProps = {
  text: string;
  explain: string;
};

const ToggleSwitch = ({ text, explain }: ToggleSwitchProps) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = (): void => setIsEnabled((previousState) => !previousState);

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Text style={styles.text}>{text}</Text>
        <Switch
          value={isEnabled}
          onChange={() => toggleSwitch()}
        />
      </View>
      <Text style={styles.explain}>{explain}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  explain: {
    fontSize: 14,
    color: Colors.black900,
  },
});

export default ToggleSwitch;
