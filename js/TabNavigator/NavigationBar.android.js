import React from 'react'
import { View, TouchableOpacity, Image } from 'react-native'
import Hamburger from './Hamburger.js'

const NavigationBar = () => {
  return (
    <View style={{ height: 30, alignItems: 'center', flexDirection: 'row' }}>
      <TouchableOpacity style={{ paddingLeft: 20, paddingTop: 3 }}>
        <Hamburger />
      </TouchableOpacity>
      <Image
        source={require('../../img/logo.png')}
        style={{ marginLeft: 30 , width: 82, height: 26}}
      />
    </View>
  )
}

export default NavigationBar
