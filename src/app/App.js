/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, StatusBar} from 'react-native';
import Toast from 'react-native-simple-toast';

import Navigator from '../navigation';
import createDir from '../utils/createDir';
import {rootDirPath} from '../constants';

const App = () => {
  try {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={style.safeArea}>
          <Navigator />
        </SafeAreaView>
      </>
    );
  } catch {
    Toast.show('system error', Toast.LONG);
    return null;
  }
};

const style = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});

export default App;
