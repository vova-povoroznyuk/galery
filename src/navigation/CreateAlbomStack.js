import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CreateAlbom from '../screens/CreateAlbom';

const Stack = createStackNavigator();
export default () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="CreateAlbom" component={CreateAlbom} />
    </Stack.Navigator>
  );
};
