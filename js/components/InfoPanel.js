import React from 'react'
import { View, Text } from 'react-native'
import Divider from './Divider'

const InfoPanel = ({ date, lastUpdatedTime }) => {
  return (
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 20, paddingRight: 20, paddingTop: 15, paddingBottom: 5 }}>
        <Text style={{fontSize: 12, fontWeight: '600', color: 'gray'}}>{date}</Text>
        <Text style={{fontSize: 12, color: 'gray'}}>{'Last updated ' + lastUpdatedTime}</Text>
      </View>
      <Divider />
    </View>
  )
}

export default InfoPanel
