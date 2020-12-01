import React, {useEffect, useState, useRef} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  TextInput,
  StyleSheet,
  FlatList,
  AppState,
} from 'react-native';

import {PermissionsAndroid} from 'react-native';
import creatDir from '../utils/createDir';
import {rootDirPath} from '../constants';
import RNFetchBlob from 'rn-fetch-blob';
import Item from '../component/ImageItem';
import Toast from 'react-native-simple-toast';
import BackgroundTask from 'react-native-background-task';

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
BackgroundTask.define(() => {
  console.log('Hello from a background task');
  BackgroundTask.finish();
});
export default ({navigation}) => {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const [state, setName, addImage, getData, resetImageArr] = useStore();
  const [isSelect, setSelect] = useState(false);
  const [isModalOpen, setModal] = useState(false);
  const changeModal = () => setModal(!isModalOpen);
  const changeSelect = () => setSelect(!isSelect);
  useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
    };
  }, []);

  const _handleAppStateChange = (nextAppState) => {
    if (nextAppState === 'background') {
      BackgroundTask.schedule();
    }
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      // console.log('App has come to the foreground!');
    }

    appState.current = nextAppState;
    setAppStateVisible(appState.current);
    // console.log('AppState', appState.current);
  };
  useEffect(() => getData(URL), []);
  // useEffect(() => {
  //   BackgroundTask.schedule();
  // }, []);
  const data = state.data.slice(0, 20);
  const createAlbom = () => {
    if (state.albomName) {
      try {
        createAlbomDir(state.albomName);
        state.imageArr.forEach((element) => {
          download(`image${counter.getNumber()}`, element, state.albomName);
        });
        // setTimeout(
        //   () => navigation.navigate('AlbomStack', {data: state.albomName}),
        //   10000,
        // );
      } catch (error) {
        console.log(error);
      }
    }
  };
  const renderItem = ({item}) => (
    <Item
      data={item}
      addImage={() => addImage(item.url)}
      isCheck={state.imageArr.includes(item.url)}
      changeSelect={changeSelect}
      isSelect={isSelect}
    />
  );
  return (
    <View style={style.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => `${item.id}`}
        extraData={isSelect}
        numColumns={2}
        horizontal={false}
      />
      {state.imageArr.length > 0 && (
        <View style={style.buttonWrap}>
          <TouchableOpacity
            onPress={() => changeModal()}
            style={style.creatButton}>
            <Text style={style.creatButtonLabel}>continue</Text>
          </TouchableOpacity>
        </View>
      )}
      {isModalOpen && (
        <Modal
          setName={setName}
          state={state}
          changeModal={changeModal}
          createAlbom={createAlbom}
          resetImageArr={resetImageArr}
        />
      )}
    </View>
  );
};

const Modal = ({setName, state, changeModal, createAlbom, resetImageArr}) => {
  const save = () => {
    changeModal();
    createAlbom();
    resetImageArr();
    Toast.show(
      `the album "${state.albomName}" is generated. We will inform you how the process will end`,
      Toast.LONG,
    );
  };

  return (
    <View style={style.modalContainer}>
      <View style={style.modal}>
        <TouchableOpacity onPress={changeModal} style={style.cross}>
          <Text style={style.crossLabel}>X</Text>
        </TouchableOpacity>
        <TextInput
          style={style.input}
          onChangeText={setName}
          value={state.albomName}
        />
        <TouchableOpacity style={style.creatButton} onPress={save}>
          <Text style={style.creatButtonLabel}>save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  crossLabel: {
    fontSize: 20,
  },
  cross: {
    width: 20,
    height: 20,
    alignItems: 'center',
    marginLeft: 'auto',
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: 300,
    height: 150,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
  },
  container: {flex: 1},
  input: {height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10},
  buttonWrap: {
    width: '100%',
    position: 'absolute',
    bottom: 20,
  },
  creatButton: {
    width: 100,
    borderColor: 'blue',
    borderWidth: 1,
    borderRadius: 30,
    padding: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: 'white',
  },
  creatButtonLabel: {
    color: 'blue',
    textAlign: 'center',
  },
});
