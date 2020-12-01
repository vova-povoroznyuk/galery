import React from 'react';
import {TouchableOpacity, Image, StyleSheet, View} from 'react-native';
import {LongPressGestureHandler, State} from 'react-native-gesture-handler';

const Item = ({data, addImage, isCheck, isSelect, changeSelect}) => {
  return (
    <LongPressGestureHandler
      onHandlerStateChange={({nativeEvent}) => {
        if (nativeEvent.state === State.ACTIVE) {
          changeSelect();
        } else if (nativeEvent.state === State.FAILED && isSelect) {
          addImage();
        }
      }}
      minDurationMs={800}>
      <View
        style={[
          style.container,
          {
            // opacity: isCheck ? 1 : 0.6,
          },
        ]}>
        <Image
          source={{
            uri: data.url,
          }}
          resizeMode="cover"
          style={style.image}
        />
        {isSelect ? (
          <View style={style.checkbox}>
            <View
              style={[
                style.checkboxInside,
                {backgroundColor: isCheck ? 'blue' : 'transparent'},
              ]}></View>
          </View>
        ) : null}
      </View>
    </LongPressGestureHandler>
  );
};
const style = StyleSheet.create({
  image: {width: '100%', height: 200},
  button: {flex: 1},
  container: {width: '50%'},
  checkbox: {
    width: 20,
    height: 20,
    borderColor: 'blue',
    borderWidth: 1,
    borderRadius: 100,
    position: 'absolute',
    top: 5,
    right: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxInside: {
    width: 16,
    height: 16,
    borderRadius: 100,
  },
});
export default Item;
