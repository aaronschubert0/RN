import React, { Component } from 'react'
import { View, Text } from 'react-native'
import moment from 'moment'

function formatedDate(date) {
  const delta = Math.round(( + new Date - date) / 1000);

  let formatedTime = 'now'
  let minutes = Math.round((delta / 60) % 60)
  let hours = Math.round(delta / 3600)

  if (hours > 24) {
    const days = Math.round(hours/24)
    formatedTime = days + ' day'
  } else if (hours >= 1) {
    formatedTime = hours + ' hrs'
  } else if (minutes > 0) {
    formatedTime = minutes + ' min'
  } else if (delta < 30) {
    formatedTime = delta + ' s'
  }
  return formatedTime.toUpperCase()
}


export default class Meta extends Component {

  constructor(props) {
    super(props)
    this.state = {
      time: formatedDate(new Date(this.props.time))
    }
  }

  componentWillMount() {
    this._updateTime()
  }

  _updateTime() {
    setTimeout(() => {
      this.setState({
        time: formatedDate(new Date(this.props.time))
      })
      this._updateTime()
    }, 60000)
  }

  render() {
    const { time, section, style } = this.props
    return (
      <View style={[ style, {flexDirection: 'row'} ]}>
        { time ? <Text style={{fontSize: 13, fontFamily:'Source Sans Pro', color: '#09b4ff'}}>{this.state.time + ' / '}</Text> : null }
        { section ? <Text style={{fontSize: 13, fontFamily:'Source Sans Pro', color: 'gray'}}>{section}</Text> :  null }
      </View>
    )
  }
}
