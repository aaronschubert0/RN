import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { Meta, TransitionalImage, Divider } from '../Components/'

const FeaturedImage = ({ article, pushArticle }) => {
  const { title, section } = article
  const imageURL = article.image.renditions.large
  const time = article.modified
  return (
    <TouchableOpacity
    onPress={() => this.props.pushArticle(article)}>
      <View style={{
        paddingLeft: 20,
        paddingBottom: 15,
        paddingRight: 20
      }}>
        <Text style={{
          fontSize: 22,
          fontWeight: '700',
          fontFamily: 'Source Sans Pro',
          paddingBottom: 15
        }}>
        {title}
        </Text>
        <Meta
          time={time}
          section={section.title}
        />
      </View>
      <TransitionalImage
        url={imageURL}
        style={{
          width: 375,
          height: 211,
          backgroundColor: '#D8D8D8'
        }}
      />
      <Divider />
    </TouchableOpacity>
  )
}

export default FeaturedImage
