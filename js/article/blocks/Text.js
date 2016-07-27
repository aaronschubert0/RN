import React from 'react';
import { View } from 'react-native';
import HTMLView from 'react-native-htmlview';
const TextBlock = ({ children, style, textStyleSheet = {} }) => (
  <View style={style}>
    <HTMLView
      stylesheet={textStyleSheet}
      value={children}
    />
  </View>
);
export default TextBlock;
