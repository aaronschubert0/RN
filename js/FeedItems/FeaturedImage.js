import React from 'react'
import { View, Text, Image } from 'react-native'
import { Meta, TransitionalImage } from '../Components/'

const FeaturedImage = ({ title, imageURL, section, time }) => {
  return (
    <View>
    <View style={{paddingLeft: 20, paddingBottom: 15, paddingRight: 20}}>
      <Text style={{fontSize: 22, fontWeight: '700', fontFamily: 'Source Sans Pro', paddingBottom: 15}}>
      {title}
      </Text>
      <Meta time={time} section={section.title}/>
    </View>
    <TransitionalImage
      url={imageURL}
      style={{width: 375, height: 211, backgroundColor: '#D8D8D8'}}
    />
    </View>
  )
}

export default FeaturedImage
