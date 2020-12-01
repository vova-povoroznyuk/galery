import React from 'react';
import {View, Image, Text} from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';

export default (props) => {
  const {data, navigation, isFirst, isLast, albomParams, i} = props;

  const onSwipeLeft = () => {
    isLast || navigation.navigate(`Page_${i + 1}`);
  };

  const onSwipeRight = () => {
    isFirst || navigation.navigate(`Page_${i - 1}`);
  };

  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  };
  const renderContent = () => {
    return data ? (
      <Image
        resizeMode="cover"
        source={{
          uri:
            'file:/storage/emulated/0/custome_galery/' +
            '/' +
            albomParams +
            '/' +
            data,
        }}
        style={{flex: 1, backgroundColor: 'red'}}
      />
    ) : (
      <Text>{albomParams}</Text>
    );
  };
  return (
    <GestureRecognizer
      onSwipeLeft={() => onSwipeLeft()}
      onSwipeRight={() => onSwipeRight()}
      config={config}
      style={{
        flex: 1,
        backgroundColor: 'red',
      }}>
      <View style={{flex: 1}}>{renderContent()}</View>
    </GestureRecognizer>
  );
};
