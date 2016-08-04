import React from 'react'
import { View, Text } from 'react-native'

const Meta = ({ time, section, style }) => {
  return (
    <View style={[ style, {flexDirection: 'row'} ]}>
      { time ? <Text style={{fontSize: 11, fontFamily:'SourceSansPro-Regular', color: '#09b4ff'}}>{time + ' / '}</Text> : null }
      { section ? <Text style={{fontSize: 11, fontFamily:'SourceSansPro-Regular', color: 'gray'}}>{section}</Text> :  null }
    </View>
  )
}

export default Meta
