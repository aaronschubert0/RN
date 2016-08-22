import React, { Component, PropTypes } from 'react'
import { Text, View, TouchableOpacity, Image, Animated } from 'react-native'
import Hamburger from './Hamburger'
import { getDeviceHeight, noop } from '../Utilities'

export default class MenuBar extends Component {
  static propTypes = {
    style: PropTypes.object,
    onHamburgerPress: PropTypes.func,
    onBrandPress: PropTypes.func
  }

  static defaultProps = {
    onHamburgerPress: noop,
    onBrandPress: noop
  }

  constructor (props) {
    super(props)
    this.state = {
      menuOpenValue: new Animated.Value(0),
      menuOpen: false
    }
  }

  onHamburgerPress = () => {
    const { menuOpen } = this.state

    this.props.onHamburgerPress()

    if (!menuOpen) {
      this.setState({ menuOpen: true })
      Animated.spring(
        this.state.menuOpenValue,
        { toValue: 1, friction: 8 }
      ).start()
    } else {
      this.setState({ menuOpen: false })
      Animated.spring(
        this.state.menuOpenValue,
        { toValue: 0, friction: 8 }
      ).start()
    }
  }

  render () {
    const { style, onBrandPress } = this.props
    const { menuOpen, menuOpenValue } = this.state
    return (
      <View style={{
        flexDirection: 'column'
      }}>
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
            onPress={this.onHamburgerPress}
            style={{
              paddingRight: 10,
              paddingTop: 3,
              paddingLeft: 20
            }}
          >
            <Hamburger state={menuOpen ? 'open' : 'closed'}/>
          </TouchableOpacity>
        </View>
        <Animated.View style={{
          flex: 1,
          overflow: 'hidden',
          height: menuOpenValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, getDeviceHeight()-style.height],
            extrapolateLeft: 'clamp'
          }),
          flexDirection: 'column'
        }}>
          <Animated.View style={{
            marginTop: 25,
            alignSelf: 'stretch'
          }}>
            <Text style={{
              fontSize: 28,
              alignSelf: 'center'
            }}>Menu</Text>
          </Animated.View>
        </Animated.View>
      </View>

    )
  }
}
