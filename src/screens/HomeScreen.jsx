import { useState } from 'react';
import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

import RecordingButton from '../components/RecordingButton';

import { Colors } from '../util/styles';

const HomeScreen = () => {
  const [recording, setRecording] = useState(false);

  return (
    <SafeAreaProvider>
      <SafeAreaView />
      <KeyboardAvoidingView style={styles.container}>
        <ScrollView style={styles.recognitionContainer}>
          <Text
            style={{ fontSize: 17 }}
            placeholder='Enter text here'
            multiline
          >
            開発中
          </Text>
        </ScrollView>
        <View style={styles.switchContainer}>
          <RecordingButton
            recording={recording}
            setRecording={setRecording}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.systemBackground,
  },
  recognitionContainer: {
    flex: 0.9,
    margin: 10,
  },
  switchContainer: {
    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
