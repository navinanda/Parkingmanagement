import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ParkingLotCreation, ParkingLotDrawing, CarDeregisterScreen } from './src/Components'
import { ParkingProvider } from './src/context/ParkingContext';

const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <ParkingProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen options={{headerShown: false}} name="ParkingLotCreation" component={ParkingLotCreation} />
          <Stack.Screen options={{headerShown: false}} name="ParkingLotDrawing" component={ParkingLotDrawing} />
          <Stack.Screen options={{headerShown: false}} name="CarDeregisterScreen" component={CarDeregisterScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ParkingProvider>
  );
};

export default App;
