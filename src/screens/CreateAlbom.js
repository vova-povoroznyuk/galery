import React, {useEffect} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  TextInput,
  StyleSheet,
  FlatList,
} from 'react-native';

import {PermissionsAndroid} from 'react-native';
import creatDir from '../utils/createDir';
import {rootDirPath} from '../constants';
import RNFetchBlob from 'rn-fetch-blob';
import Item from '../component/ImageItem';

import useStore from '../utils/useStore';
import {URL} from '../constants';

const counter = {
  number: 0,
  getNumber() {
    this.number++;
    return this.number;
  },
};

const download = (name, url, albomName) => {
  try {
    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;
  } catch (err) {
    console.warn(err);
  }
  RNFetchBlob.config({
    path:
      '/storage/emulated/0/custome_galery' + `/${albomName}` + `/${name}.jpg`,
    fileCache: false,
  })
    .fetch('GET', url)
    .catch((err) => console.log('err', err));
};
const createAlbomDir = (name) => {
  if (name) {
    const path = rootDirPath + '/' + name;
    RNFetchBlob.fs.isDir(path).then((res) => {
      res || creatDir(path);
    });
  }
};

export default () => {
  const [state, setName, addImage, getData] = useStore();
  useEffect(() => getData(URL), []);
  const data = state.data.slice(0, 5);
  const createAlbom = () => {
    if (state.albomName) {
      createAlbomDir(state.albomName);
      state.imageArr.forEach((element) => {
        download(`image${counter.getNumber()}`, element, state.albomName);
      });
    }
  };
  console.log('update');
  const renderItem = ({item}) => (
    <Item
      data={item}
      addImage={() => addImage(item.url)}
      isCheck={state.imageArr.includes(item.url)}
    />
  );
  return (
    <View style={style.constainer}>
      <TextInput
        style={style.input}
        onChangeText={setName}
        value={state.albomName}
      />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => `${item.id}`}
        extraData={state.imageArr}
      />
      <TouchableOpacity onPress={createAlbom} style={style.creatButton}>
        <Text style={style.creatButtonLabel}>create</Text>
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  constainer: {flex: 1},
  input: {height: 40, borderColor: 'gray', borderWidth: 1},
  creatButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    borderColor: 'blue',
    borderWidth: 1,
    borderRadius: 30,
    padding: 10,
  },
  creatButtonLabel: {
    color: 'blue',
  },
});
