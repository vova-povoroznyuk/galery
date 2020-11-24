import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import AlbomStack from './AlbomStack';
import AlbomsStack from './AlbomsStack';
import CreateAlbomStack from './CreateAlbomStack';

const Tab = createBottomTabNavigator();

export default () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="AlbomsStack"
        component={AlbomsStack}
        options={{tabBarLabel: 'alboms'}}
      />
      <Tab.Screen
        name="AlbomStack"
        component={AlbomStack}
        options={{tabBarLabel: 'albom'}}
      />
      <Tab.Screen
        name="CreateAlbomStack"
        component={CreateAlbomStack}
        options={{tabBarLabel: 'create albom'}}
      />
    </Tab.Navigator>
  );
};
