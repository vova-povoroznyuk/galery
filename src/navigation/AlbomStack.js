import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Page from '../albomPages/albomPageTemplate';
import KeyGenerator from '../utils/keyGenerator';
import {Text, View} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import {rootDirPath} from '../constants';

const Stack = createStackNavigator();
export default (props) => {
  const [albom, setAlbom] = useState([]);
  useEffect(() => {
    if (props.route.params) {
      RNFetchBlob.fs
        .ls(rootDirPath + '/' + props.route.params.data)
        .then((albom) => setAlbom(albom));
    }
    // RNFetchBlob.fs.ls();
  }, []);
  if (props.route.params) {
    const keyGenerator = new KeyGenerator();
    const albomParams = props.route.params.data;
    const Screens = albom.map((item, i) => {
      const CurrentPage = (props) => (
        <Page
          data={item}
          albomParams={albomParams}
          i={i + 1}
          {...props}
          isLast={i === albom.length - 1}
          isFirst={false}
        />
      );
      const itemkey = keyGenerator.createKey();
      return (
        <Stack.Screen
          name={`Page_${i + 1}`}
          component={CurrentPage}
          key={itemkey}
          itemKey={itemkey}
        />
      );
    });
    const AlbomScreen = () => {
      return (
        <Page
          data={null}
          albomParams={albomParams}
          {...props}
          isLast={false}
          isFirst={true}
          i={0}
        />
      );
    };
    return (
      <Stack.Navigator>
        <Stack.Screen name={`Page_${0}`} component={AlbomScreen} />
        {Screens}
      </Stack.Navigator>
    );
  } else {
    return <Text>album not selected, with button to go to album list</Text>;
  }
};
