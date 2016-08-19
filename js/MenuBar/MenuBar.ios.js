import React from 'react'
import { View, TouchableOpacity, Image } from 'react-native'
import Hamburger from './Hamburger'

const MenuBar = ({ style, onHamburgerPress, onBrandPress }) => {
  return (
    <View style={{
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: 2,
      flexDirection: 'row',
      ...style
    }}>
      <View style={{ width: 30 }} />
      <TouchableOpacity onPress={onBrandPress}>
        <Image
          source={require('../../img/logo.png')}
          style={{ alignSelf: 'center', width: 82, height: 26}}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onHamburgerPress}
        style={{ paddingRight: 10, paddingTop: 3 }}
      >
        <Hamburger />
      </TouchableOpacity>
    </View>
  )
}
export default MenuBar
