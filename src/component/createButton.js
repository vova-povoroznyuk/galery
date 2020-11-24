import React from 'react';
import {TouchableOpacity, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export default (props) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('CreateAlbomStack')}
      style={style.button}>
      <View style={style.crossWrap}>
        <View style={style.horizontal}></View>
      </View>
      <View style={style.crossWrap}>
        <View style={style.vertical}></View>
      </View>
    </TouchableOpacity>
  );
};
const style = StyleSheet.create({
  button: {
    padding: 10,
    width: 50,
    height: 50,
  },
  crossWrap: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  horizontal: {
    width: 30,
    height: 2,
    backgroundColor: 'blue',
  },
  vertical: {
    width: 2,
    height: 30,
    backgroundColor: 'blue',
  },
  buttonLabel: {
    fontSize: 25,
  },
});
