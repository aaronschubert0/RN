import React, { Component, PropTypes } from 'react';
import {
  ScrollView,
  StyleSheet,
  Dimensions
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TextBlock, ImageBlock, MackayMailSignupBlock } from './blocks';
import Title from './Title';
import ArticleInfo from './ArticleInfo';

const Article = ({ article }) => {
  const { title, author, published, data } = article;
  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps={true}
      keyboardDismissMode="on-drag"
      contentContainerStyle={articleStyles.container}>
      <Title>{title}</Title>
      <ArticleInfo
        author={author}
        date={new Date(published)}
      />
      {data.map(renderBlock)}
    </KeyboardAwareScrollView>
  )
}
export default Article;

const renderBlock = (block, index) => {
  switch (block.type) {
    case 'heading': return (
      <TextBlock
        key={index}
        style={articleStyles.heading}>
        {block.data.text}
      </TextBlock>
    )
    case 'text': return (
      <TextBlock
        key={index}
        style={articleStyles.text}>
        {block.data.text}
      </TextBlock>
    )
    case 'image': return (
      <ImageBlock
        key={index}
        source={block.data.src}
        caption={block.data.caption}
        attribution={block.data.attribution}
      />
    )
    case 'mackaymail': return (
      <MackayMailSignupBlock
        key={index}
      />
    )
  }
}

Article.propTypes = {
  article: PropTypes.shape({
    title: PropTypes.string,
    author: PropTypes.string,
    published: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.object)
  })
}

const gray = '#333'
const lightGray = 'gray'
export const articleStyles = StyleSheet.create({
  container: {
    padding: 10,
    paddingBottom: 20,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#FFF'
  },
  title: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: '700',
    color: gray
  },
  articleInfo: {
    marginTop: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: lightGray,
    paddingTop: 5,
    paddingBottom: 5,
    alignSelf: 'stretch'
  },
  author: {
    fontSize: 12,
    fontWeight: '700',
    color: gray
  },
  date: {
    fontSize: 12,
    color: gray
  },
  heading: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: '700'
  },
  imageContainer: {
    marginTop: 20,
    alignSelf: 'stretch'
  },
  image: {
    height: 190,
    alignSelf: 'stretch'
  },
  imageCaptionContainer: {
    padding: 5,
    backgroundColor: '#eee'
  },
  imageCaption: {
    fontSize: 10,
    lineHeight: 15,
    marginBottom: 3
  },
  imageAttribution: {
    fontWeight: '700'
  },
  text: {
    marginTop: 20,
  }
});
