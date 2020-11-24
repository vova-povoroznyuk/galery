import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Alboms from '../screens/Alboms';

import CreateAlbomButton from '../component/createButton';

const Stack = createStackNavigator();
export default () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Alboms"
        component={Alboms}
        options={{headerRight: (props) => <CreateAlbomButton {...props} />}}
      />
    </Stack.Navigator>
  );
};
