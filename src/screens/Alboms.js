import React, {useReducer, useEffect} from 'react';
import {Text, TouchableOpacity, View, FlatList, StyleSheet} from 'react-native';
import KeyGenerator from '../utils/keyGenerator';

const initialState = {
  loading: true,
  data: [],
};

function reducer(state, action) {
  switch (action.type) {
    case 'getData':
      return {data: action.payload, loading: false};
    default:
      return state;
  }
}
const getData = (dispatch) => {
  fetch('https://jsonplaceholder.typicode.com/photos').then((r) =>
    r.json().then((res) => dispatch({payload: res, type: 'getData'})),
  );
};
export default ({navigation}) => {
  const keyGenerator = new KeyGenerator();
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => getData(dispatch), []);
  if (state.loading) {
    return <Text>Loading...</Text>;
  } else {
    return (
      <View style={style.viewContainer}>
        <Text>Alboms</Text>
        <FlatList
          data={[1, 2, 3, 4, 5]}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('AlbomStack', {data: item})}>
              <Text>go to albom</Text>
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
  },
  createButton: {
    borderRadius: 1000000,
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
