import React from 'react';
import { View, Image, Text } from 'react-native';
import { articleStyles } from '../Article';
// import Lightbox from 'react-native-lightbox';
const ImageBlock = ({ source, attribution, caption }) => (
  <View style={articleStyles.imageContainer}>
    {/*<Lightbox backgroundColor="rgba(0, 0, 0, 0.8)">*/}
      <Image
        source={{ uri: source }}
        style={articleStyles.image}
      />
    {/*</Lightbox>*/}
    <View style={articleStyles.imageCaptionContainer}>
      <Text style={articleStyles.imageCaption}>
        {caption}
        <Text style={articleStyles.imageAttribution}>
          {attribution}
        </Text>
      </Text>
    </View>
  </View>
);
export default ImageBlock;
