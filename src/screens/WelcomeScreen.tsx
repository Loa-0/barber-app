import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  Text,
  View,
  Button,
  SafeAreaView,
} from 'react-native';

const backgroundImage = require('../assets/main.jpg');
const onPressLearnMore = (params: any) => {
  console.log(params);
};

export const WelcomeScreen = () => {
  return (
    <View style={styles.backgroundColor}>
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <Text>12312</Text>
        <Button
          onPress={onPressLearnMore}
          title="Learn More"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    marginVertical: 100,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundColor: {
    flex: 1,
    backgroundColor: '#000000',
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
//prueba committ Derek
