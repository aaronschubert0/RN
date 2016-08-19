import React from 'react'
import { View, TouchableOpacity, Image } from 'react-native'
import Hamburger from './Hamburger'

const MenuBar = ({ style, onHamburgerPress, onBrandPress }) => {
  return (
    <View style={{
      alignItems: 'center',
      flexDirection: 'row',
      ...style
    }}>
      <TouchableOpacity
        onPress={onHamburgerPress}
        style={{ paddingLeft: 20, paddingTop: 3 }}
      >
        <Hamburger />
      </TouchableOpacity>
      <TouchableOpacity onPress={onBrandPress}>
        <Image
          source={require('../../img/logo.png')}
          style={{ marginLeft: 30 , width: 82, height: 26}}
        />
      </TouchableOpacity>
    </View>
  )
}
export default MenuBar
