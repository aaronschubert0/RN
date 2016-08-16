import React from 'react'
import { View, Text, Image } from 'react-native'
import { Meta } from '../Components/'

const SmallImage = ({ title, imageURL, section, time }) => {
  return (
    <View style={{flexDirection: 'row', paddingLeft: 20, paddingRight: 20}}>
    <Image
      source={{uri: imageURL}}
      style={{width: 100, height: 56, marginRight: 10}}
      />
      <View style={{flex: 1}}>
        <Text style={{fontSize: 16, fontFamily:'Source Sans Pro', fontWeight: '500', paddingBottom: 5}}>
        {title}
        </Text>
        <Meta time={time} section={section.title}/>
      </View>
    </View>
  )
}

export default SmallImage
