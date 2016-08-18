import React from 'react'
import { View, TouchableOpacity, Image } from 'react-native'
import Hamburger from './Hamburger.js'
import { cycleEnvironments } from '../API/environments'

const NavigationBar = () => {
  return (
    <View style={{ height: 30, justifyContent: 'space-between', alignItems: 'center', paddingTop: 2, flexDirection: 'row' }}>
      <View style={{ width: 30 }}/>
      <TouchableOpacity onPress={cycleEnvironments}>
        <Image
          source={require('../../img/logo.png')}
          style={{ alignSelf: 'center', width: 82, height: 26}}
        />
      </TouchableOpacity>
      <TouchableOpacity style={{ paddingRight: 10, paddingTop: 3 }}>
        <Hamburger />
      </TouchableOpacity>
    </View>
  )
}

export default NavigationBar
