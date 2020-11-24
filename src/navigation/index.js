import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import BottomTab from './BotttomTabNavigator';

export default () => {
  return (
    <NavigationContainer>
      <BottomTab />
    </NavigationContainer>
  );
};
