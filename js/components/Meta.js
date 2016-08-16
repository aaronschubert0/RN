import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { moment } from '../Utilities'

export default class Meta extends Component {
  componentWillMount () {
    this.interval = setInterval(() => {
      this.setState({ currentTime: new Date() })
    }, 60000)
  }

  componentWillUnmount () {
    clearInterval(this.interval)
  }

  render () {
    const { time, section, style } = this.props
    const baseTextStyles = {
      fontSize: 13,
      fontFamily: 'Source Sans Pro'
    }
    return (
      <View style={[ style, {flexDirection: 'row'} ]}>
        {time && (
          <Text style={[ baseTextStyles, {
            color: '#09b4ff'
          }]}>
            {moment(new Date(time)).fromNow().toUpperCase() + ' / '}
          </Text>
        )}
        {section && (
          <Text style={[ baseTextStyles, {
            color: 'gray'
          }]}>
            {section}
          </Text>
        )}
      </View>
    )
  }
}
