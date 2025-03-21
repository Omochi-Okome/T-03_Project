import React from 'react';
import { Pressable, Text, Animated, StyleSheet } from 'react-native';
import { Colors } from '../../util/styles';

type CustomButtonProps = {
  title: string;
  onPress: () => void;
};

const CustomButton: React.FC<CustomButtonProps> = ({ title, onPress }) => {
  const scale = new Animated.Value(1);

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.97,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View style={[styles.button, { transform: [{ scale }] }]}>
        <Text style={styles.buttonText}>{title}</Text>
      </Animated.View>
    </Pressable>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.systemBlue,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    // iOS用の影
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  buttonText: {
    color: Colors.white100,
    fontSize: 18,
    fontWeight: '600',
  },
});
