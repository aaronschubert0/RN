import React from 'react'
import { View, Text, Image } from 'react-native'
import { Meta, TransitionalImage } from '../Components/'

const SmallImage = ({ title, imageURL, section, time }) => {
  return (
    <View style={{flexDirection: 'row', paddingLeft: 20, paddingRight: 20}}>
    <TransitionalImage
      url={imageURL}
      style={{width: 100, height: 56, marginRight: 10, backgroundColor: '#D8D8D8'}}
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
