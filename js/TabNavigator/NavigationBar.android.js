import React from 'react'
import { View, TouchableOpacity, Image } from 'react-native'
import Hamburger from './Hamburger.js'
import { cycleEnvironments } from '../API/environments'

const NavigationBar = () => {
  return (
    <View style={{ height: 30, alignItems: 'center', flexDirection: 'row' }}>
      <TouchableOpacity style={{ paddingLeft: 20, paddingTop: 3 }}>
        <Hamburger />
      </TouchableOpacity>
      <TouchableOpacity onPress={cycleEnvironments}>
        <Image
          source={require('../../img/logo.png')}
          style={{ marginLeft: 30 , width: 82, height: 26}}
        />
      </TouchableOpacity>
    </View>
  )
}

export default NavigationBar
