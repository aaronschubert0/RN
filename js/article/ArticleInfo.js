import React from 'react';
import { View, Text } from 'react-native';
import { articleStyles } from './Article';
const ArticleInfo = ({ author, date }) => (
  <View style={articleStyles.articleInfo}>
    <Text style={articleStyles.author}>{author}</Text>
    <Text style={articleStyles.date}>{date.toString()}</Text>
  </View>
);
export default ArticleInfo;
