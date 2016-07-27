import React, { Component } from 'react'
import { Animated } from 'react-native'

export default class Indicator extends Component {
  constructor (props) {
    super(props)
    this.state = {
      position: new Animated.Value(this.props.indicatorPos)
    }
  }

  componentWillUpdate(nextProps) {
    Animated.spring(
      this.state.position,
      {
        toValue: nextProps.indicatorPos,
        friction: 10
      }
    ).start()
  }

  render() {
    return (
      <Animated.View style={{
          position: 'absolute',
          bottom: 0,
          left: this.state.position,
          height: 10,
          width: 10,
          backgroundColor: 'transparent',
          borderLeftWidth: 10,
          borderRightWidth: 10,
          borderBottomWidth: 10,
          borderLeftColor: 'transparent',
          borderRightColor: 'transparent',
          borderBottomColor: 'white'
        }}>
      </Animated.View>
    )
  }
}
