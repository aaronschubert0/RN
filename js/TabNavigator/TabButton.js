import React, { Component, PropTypes } from 'react'
import { TouchableOpacity, Animated } from 'react-native'

const noop = () => {}

export default class TabButton extends Component {
  static propTypes = {
    onPress: PropTypes.func,
    onLayout: PropTypes.func,
    title: PropTypes.string.isRequired
  }
  constructor (props) {
    super(props)
    this.state = {
      active: new Animated.Value(0)
    }
  }
  setActive (value = 1) {
    requestAnimationFrame(() => {
      this.state.active.setValue(value)
    })
  }
  render () {
    const { onPress, onLayout, title } = this.props
    const { active } = this.state
    return (
      <TouchableOpacity
        onPress={onPress || noop}
        onLayout={onLayout || noop}
        style={{ padding: 15 }}
      >
        <Animated.Text
          style={{
            fontSize: 14,
            fontFamily:'Source Sans Pro',
            fontWeight: '500',
            ...this.props.style
          }}
        >
          {title.toUpperCase()}
        </Animated.Text>
      </TouchableOpacity>
    )
  }
}
