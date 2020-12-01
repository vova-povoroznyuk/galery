import React, {useReducer, useEffect} from 'react';
import {Text, TouchableOpacity, View, FlatList, StyleSheet} from 'react-native';
import KeyGenerator from '../utils/keyGenerator';
import {rootDirPath} from '../constants';
import RNFetchBlob from 'rn-fetch-blob';
import createDir from '../utils/createDir';

const initialState = {
  loading: true,
  alboms: [],
};

function reducer(state, action) {
  switch (action.type) {
    case 'getAlboms':
      return {alboms: action.payload, loading: false};
    default:
      return state;
  }
}
const getAlboms = (dispatch) => {
  RNFetchBlob.fs
    .ls(rootDirPath)
    .then((alboms) => dispatch({payload: alboms, type: 'getAlboms'}));
};
export default ({navigation}) => {
  const keyGenerator = new KeyGenerator();
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(async () => {
    createDir(rootDirPath, () => getAlboms(dispatch));
  }, []);
  if (state.loading) {
    return <Text>loading...</Text>;
  } else {
    return (
      <View style={style.viewContainer}>
        <Text style={style.caption}>Alboms</Text>
        <FlatList
          data={state.alboms}
          renderItem={({item}) => (
            <TouchableOpacity
              style={style.albomButton}
              onPress={() => navigation.navigate('AlbomStack', {data: item})}>
              <Text style={style.albomLabel}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={() => keyGenerator.createKey()}
        />
      </View>
    );
  }
};

const style = StyleSheet.create({
  viewContainer: {
    flex: 1,
    padding: 10,
  },
  caption: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 15,
  },
  albomButton: {
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
    borderRadius: 25,
    marginBottom: 10,
  },
  albomLabel: {},
  createButton: {
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'blue',
    width: 50,
    height: 50,
    position: 'absolute',
    bottom: 30,
    right: 30,
  },
  crossWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  vertical: {
    width: 2,
    height: 30,
    backgroundColor: 'blue',
  },
  horizontal: {
    width: 30,
    height: 2,
    backgroundColor: 'blue',
  },
});
