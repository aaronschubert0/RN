import React from 'react'
import { View, TouchableOpacity, Image } from 'react-native'
import Hamburger from './Hamburger.js'

const NavigationBar = () => {
  return (
    <View style={{ height: 30, justifyContent: 'space-between', alignItems: 'center', paddingTop: 2, flexDirection: 'row' }}>
      <View style={{ width: 30 }}/>
      <Image 
        source={require('../../img/logo.png')}
        style={{ alignSelf: 'center', width: 82, height: 26}}
      />
      <TouchableOpacity style={{ paddingRight: 10, paddingTop: 3 }}>
        <Hamburger />
      </TouchableOpacity>
    </View>
  )
}

export default NavigationBar
