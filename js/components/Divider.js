import React from 'react'
import { View } from 'react-native'
import getDeviceWidth from '../get-device-width'

const Divider = ({ style }) => {
  return (
    <View style={[style, { width: getDeviceWidth()-30, backgroundColor: '#D8D8D8', height: 0.5, marginLeft: 15, marginRight: 0, marginTop: 10, marginBottom: 10}]} />
  )
}

export default Divider
