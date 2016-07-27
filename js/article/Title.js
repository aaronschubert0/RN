import React from 'react';
import { Text } from 'react-native';
import { articleStyles } from './Article';
const Title = ({ children: text }) => (
  <Text style={articleStyles.title}>
    {text}
  </Text>
);
export default Title;
