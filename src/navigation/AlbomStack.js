import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Page from '../albomPages/albomPageTemplate';
import KeyGenerator from '../utils/keyGenerator';
import {Text} from 'react-native';

const Stack = createStackNavigator();
const pages = [1, 2, 3, 4, 5];
export default (props) => {
  useEffect(() => {
    return console.log('unmount');
  }, []);
  if (props.route.params) {
    const keyGenerator = new KeyGenerator();
    const albomParams = props.route.params.data;
    const Screens = pages.map((item, i) => {
      const CurrentPage = (props) => (
        <Page
          data={item}
          albomParams={albomParams}
          {...props}
          isLast={i === pages.length - 1}
          isFirst={i === 0}
        />
      );
      const itemkey = keyGenerator.createKey();
      return (
        <Stack.Screen
          name={`Page_${item}`}
          component={CurrentPage}
          key={itemkey}
          itemKey={itemkey}
        />
      );
    });
    return <Stack.Navigator>{Screens}</Stack.Navigator>;
  } else {
    return <Text>album not selected, with button to go to album list</Text>;
  }
};
