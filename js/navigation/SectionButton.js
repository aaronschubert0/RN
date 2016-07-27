import React, { Component } from 'react'
import { TouchableOpacity, View, Text } from 'react-native'

export default class SectionButton extends Component {
  componentDidMount () {
    setTimeout(() => {
      this.props.onMount(this.container)
    }, 0)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.active && !this.props.active) {
      this.props.onActivate(this.container)
    }
  }
  render () {
    const { label, active, onPress } = this.props
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={{ padding: 20, paddingTop: 100, paddingBottom: 10, marginBottom: 10 }}
        onPress={onPress}
        ref={to => this.container = to}>
        <View style={{backgroundColor: label === 'Breaking News' ? 'rgba(187, 18, 36, 1)' : 'transparent', borderRadius: 5, padding: 5}}>
          <Text style={{
            opacity: active ? 1 : 0.6,
            color: 'white',
            fontWeight: '700'
          }}>
            {label.toUpperCase()}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }
}
