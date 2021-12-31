import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

export default function App() {
  const progress = useRef(new Animated.Value(0.5)).current; // useSharedValue(0)
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // withTiming, withSpring

    // withRepeat
    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.spring(progress, { toValue: 1, useNativeDriver: true }),
          Animated.spring(progress, { toValue: 0.5, useNativeDriver: true }),
        ]),
        Animated.sequence([
          Animated.spring(scale, { toValue: 2, useNativeDriver: true }),
          Animated.spring(scale, { toValue: 1, useNativeDriver: true }),
        ]),
      ]),
      { iterations: 3 }
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.square,
          {
            borderRadius: /* progress.value * SIZE / 2 */ progress.interpolate({
              inputRange: [0.5, 1],
              outputRange: [SIZE / 4, SIZE / 2],
            }),
            // borderRadius: Animated.multiply(progress, SIZE / 2),
            opacity: progress,
            transform: [
              { scale },
              {
                rotate: /* progress.value * 2 * Math.PI */ progress.interpolate(
                  {
                    inputRange: [0.5, 1],
                    outputRange: [Math.PI, 2 * Math.PI],
                  }
                ),
              },
              // {
              //   rotate: Animated.multiply(progress, 2 * Math.PI),
              // },
            ],
          },
        ]}
      />
    </View>
  );
}

const SIZE = 100.0;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  square: {
    width: SIZE,
    height: SIZE,
    backgroundColor: 'rgba(0,0,256,0.5)',
  },
});
