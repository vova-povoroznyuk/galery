import RNFetchBlob from 'rn-fetch-blob';

import {PermissionsAndroid} from 'react-native';

const creatDir = async (path) => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    );
    const read = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      RNFetchBlob.fs.isDir(path).then((isDir) => {
        isDir &
          RNFetchBlob.fs.mkdir(path).catch((err) => {
            console.log(err);
          });
      });
    }
  } catch (err) {
    console.warn(err);
  }
};

export default creatDir;
