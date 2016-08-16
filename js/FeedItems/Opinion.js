import React from 'react'
import { View, Text } from 'react-native'
import { Meta } from '../Components/'

const Opinion = ({ author, quote, section }) => {
  return (
    <View style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 5 }}>
        <Text style={{ fontFamily: 'Merriweather-BlackItalic', fontSize: 20, color: '#09b4ff', paddingBottom: 10}}>
        {author + '  /  '}
        <Text style={{ fontSize: 20, color: 'black', flex: 1 }}>
          {quote}
        </Text>
        </Text>
      <Meta section={section.title} style={{ paddingBottom: 5}}/>
    </View>
  )
}

export default Opinion
