import React from 'react'
import { View, Text } from 'react-native'
import moment from 'moment'

function formatedDate(date) {
  const delta = Math.round(( + new Date - date) / 1000);

  let formatedTime = 'now'
  let minutes = Math.round((delta / 60) % 60)
  let hours = Math.round(delta / 3600)

  if (hours >= 1) {
    formatedTime = hours + ' hr'
  } else if (minutes > 0) {
    formatedTime = minutes + ' min'
  } else if (delta < 30) {
    formatedTime = delta + ' s'
  }
  return formatedTime.toUpperCase()
}

const Meta = ({ time, section, style }) => {
  return (
    <View style={[ style, {flexDirection: 'row'} ]}>
      { time ? <Text style={{fontSize: 13, fontFamily:'Source Sans Pro', color: '#09b4ff'}}>{formatedDate(new Date(time)) + ' / '}</Text> : null }
      { section ? <Text style={{fontSize: 13, fontFamily:'Source Sans Pro', color: 'gray'}}>{section}</Text> :  null }
    </View>
  )
}

export default Meta
