import React from 'react';
import {Text, TouchableOpacity, View, Image, Linking} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

import {PermissionsAndroid} from 'react-native';
const counter = {
  number: 0,
  getNumber() {
    this.number++;
    return this.number;
  },
};

saveFile = async (path, name) => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    );
    const read = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Permission granted');

      const fs = RNFetchBlob.fs;
      // const base64 = RNFetchBlob.base64;

      const dirs = RNFetchBlob.fs.dirs;
      // console.log(fs);
      if (!dirs.Custome_Galery) {
        const Custome_Galery = '/storage/emulated/0/custome_galery';
        RNFetchBlob.fs.mkdir(Custome_Galery).catch((err) => {
          console.log(err);
        });
        dirs.Custome_Galery = Custome_Galery;
      }
      const NEW_FILE_PATH =
        dirs.Custome_Galery + `/file${counter.getNumber()}.txt`;
      fs.createFile(NEW_FILE_PATH, 'foo', 'utf8');
    } else {
      // console.log('Permission denied');
    }
  } catch (err) {
    // console.warn(err);
  }
};

const download = () => {
  try {
    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;
  } catch (err) {
    // console.warn(err);
  }
  let dirs = RNFetchBlob.fs.dirs;
  // const config = RNFetchBlob.config({
  //   //  добавляем этот параметр, который сохраняет данные ответа в виде файла,
  //   //  это намного эффективнее.

  //   notification: true,

  // });
  // console.log(config);

  RNFetchBlob.config({
    path: '/storage/emulated/0/custome_galery' + '/qwer.jpg',
    fileCache: false,
  })
    .fetch('GET', 'https://shkolazhizni.ru/img/content/i133/133607_or.jpg')
    .catch((err) => console.log('err', err));
};

export default () => {
  return (
    <View>
      <Image
        source={{uri: 'https://shkolazhizni.ru/img/content/i133/133607_or.jpg'}}
        resizeMod="contain"
        style={{width: 300, height: 300}}
      />
      <TouchableOpacity onPress={download}>
        <Text>download</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity onPress={}>
        <Text>download1</Text>
      </TouchableOpacity> */}
    </View>
  );
};
