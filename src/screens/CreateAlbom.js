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
  let dirs = RNFetchBlob.fs.dirs;
  RNFetchBlob.config({
    //  добавляем этот параметр, который сохраняет данные ответа в виде файла,
    //  это намного эффективнее.
    fileCache: false,
    notification: true,
    path: '/storage/emulated/0/custome_galery/qwer.jpg',
  })
    .fetch(
      ' GET ',
      'https://shkolazhizni.ru/img/content/i133/133607_or.jpg',
      {},
    )
    .then((res) => {
      console.log('assssssssssssssddddd', res.base64());
      console.log('res', res);
      res.readFile('base64').then((r) => {
        const fs = RNFetchBlob.fs;
        const NEW_FILE_PATH = '/storage/emulated/0/custome_galery/qwer2.jpg';
        fs.writeFile(NEW_FILE_PATH, `data:image/png;base64,${r}`, 'base64');
      });
    })
    .catch((err) => console.log(err));
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
