import React, { useEffect } from 'react';
import { StyleSheet, View, Button, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { PaperProvider, Text } from 'react-native-paper';
import * as ScreenCapture from 'expo-screen-capture';
import * as MediaLibrary from 'expo-media-library';
import Constants from 'expo-constants';
console.log('test ----------------------------------------' + Constants.systemFonts);

const Stack = createStackNavigator();

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function HomeScreen({ navigation }: any) {
  return (
    <View style={style.container}>
      <Text>Home Screen</Text>
      <Button title="Go to details" onPress={() => navigation.navigate('Details')} />
    </View>
  );
}

function DetailsScreen() {
  useEffect(() => {
    async () => {
      await hasPermissions();
      const subscription = ScreenCapture.addScreenshotListener(() => {
        Alert.alert('Thanks for screenshotting my beautiful app 😊');
      });

      return () => subscription.remove();
    };
  }, []);

  const hasPermissions = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    return status === 'granted';
  };

  const activate = async () => {
    await ScreenCapture.preventScreenCaptureAsync();
  };

  const deactivate = async () => {
    await ScreenCapture.allowScreenCaptureAsync();
  };

  return (
    <View style={style.container}>
      <Button title="Activate" onPress={activate} />
      <Button title="Deactivate" onPress={deactivate} />
    </View>
  );
}

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Details" component={DetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
