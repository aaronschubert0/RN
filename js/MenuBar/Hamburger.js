import React, { Component, PropTypes } from 'react'
import { View, Animated } from 'react-native'

const lineStyle = {
  position: 'absolute',
  height: 2,
  backgroundColor: '#979797'
}

class Hamburger extends Component {
  static propTypes = {
    state: PropTypes.oneOf(['closed', 'open'])
  }

  constructor (props) {
    super(props)
    this.state = {
      openValue: new Animated.Value(0)
    }
  }

  componentWillReceiveProps ({ state }) {
    if (state !== this.props.state) {
      switch (state) {
        case 'closed':
          Animated.timing(
            this.state.openValue,
            { toValue: 0, duration: 200 }
          ).start()
        break;
        case 'open':
          Animated.timing(
            this.state.openValue,
            { toValue: 1, duration: 200 }
          ).start()
        break;
      }
    }
  }

  render () {
    return (
      <View style={{ width: 20, height: 20 }}>
        <Animated.View style={{
          ...lineStyle,
          top: 3,
          left: 0,
          right: 0,
          opacity: this.state.openValue.interpolate({
            inputRange: [0, 0.5],
            outputRange: [1, 0]
          })
        }} />
        <Animated.View style={{
          ...lineStyle,
          top: 9,
          left: 0,
          right: 0,
          transform: [
            {
              rotate: this.state.openValue.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '45deg']
              })
            }
          ]
        }} />
        <Animated.View style={{
          ...lineStyle,
          top: 9,
          left: 0,
          right: 0,
          transform: [
            {
              rotate: this.state.openValue.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '-45deg']
              })
            }
          ]
        }} />
        <Animated.View style={{
          ...lineStyle,
          bottom: 3,
          left: 0,
          right: 0,
          opacity: this.state.openValue.interpolate({
            inputRange: [0, 0.5],
            outputRange: [1, 0]
          })
        }} />
      </View>
    )
  }
}

export default Hamburger
