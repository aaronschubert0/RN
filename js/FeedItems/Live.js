import React from 'react'
import { View, Image, Text } from 'react-native'
import { Meta } from '../Components/'

const Live = ({ title, imageURL, section }) => {
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
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ padding: 1.5, paddingLeft: 7, paddingRight: 7, borderRadius: 2, backgroundColor: '#09b4ff', marginRight: 5}}>
            <Text style={{ color: 'white', fontSize: 10, fontFamily:'Source Sans Pro', fontWeight: '500' }}>{'LIVE'}</Text>
          </View>
          <Meta section={section}/>
        </View>
      </View>
    </View>
  )
}

export default Live
