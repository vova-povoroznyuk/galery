import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

export default (props) => {
  const {data, navigation, isFirst, isLast, albomParams} = props;

  const onSwipeLeft = () => {
    console.log('left');
    isFirst || navigation.navigate(`Page_${data - 1}`);
  };

  const onSwipeRight = () => {
    console.log('right');
    isLast || navigation.navigate(`Page_${data + 1}`);
  };

  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  };
  return (
    <GestureRecognizer
      onSwipeLeft={() => onSwipeLeft()}
      onSwipeRight={() => onSwipeRight()}
      config={config}
      style={{
        flex: 1,
      }}>
      <View>
        <Text>albom {albomParams}</Text>
        <Text>{data}</Text>
        {isLast || (
          <TouchableOpacity
            onPress={() => navigation.navigate(`Page_${data + 1}`)}>
            <Text>To page {data + 1}</Text>
          </TouchableOpacity>
        )}

        {isFirst || (
          <TouchableOpacity
            onPress={() => navigation.navigate(`Page_${data - 1}`)}>
            <Text>To page {data - 1}</Text>
          </TouchableOpacity>
        )}
      </View>
    </GestureRecognizer>
  );
};
