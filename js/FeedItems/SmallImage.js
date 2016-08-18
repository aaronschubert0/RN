import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { Meta, TransitionalImage, Divider } from '../Components/'

const SmallImage = ({ article, pushArticle, showMeta }) => {
  const { title, section } = article
  const imageURL = article.image.renditions.small
  const time = article.modified
  return (
    <View>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          paddingLeft: 20,
          paddingRight: 20
        }}
        onPress={() => pushArticle(article)}
      >
        <TransitionalImage
          url={imageURL}
          style={{
            width: 100,
            height: 56,
            marginRight: 10,
            backgroundColor: '#D8D8D8'
          }}
        />
        <View style={{flex: 1}}>
          <Text style={{
            fontSize: 16,
            fontFamily:'Source Sans Pro',
            fontWeight: '500',
            paddingBottom: 5
          }}>
            {title}
          </Text>
          { showMeta &&
             <Meta
              time={time}
              section={section.title}
            /> 
          }
        </View>
      </TouchableOpacity>
      <Divider/>
    </View>
  )
}

export default SmallImage
