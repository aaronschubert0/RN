import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Meta, Divider } from '../Components/'

const Opinion = ({ article, pushArticle, showMeta }) => {
  const { byline, title, section } = article
  const author = byline[0]
  const fullName = `${author.firstname} ${author.lastname}`
  return (
    <View>
      <TouchableOpacity
        style={{
          paddingLeft: 20,
          paddingRight: 20,
          paddingTop: 5
        }}
        onPress={() => pushArticle(article)}
      >
          <Text style={{
            fontFamily: 'Merriweather-BlackItalic',
            fontSize: 20,
            color: '#09b4ff',
            paddingBottom: 10
          }}>
            {fullName + '  /  '}
          <Text style={{
            fontSize: 20,
            color: 'black',
            flex: 1
          }}>
            {title}
          </Text>
          </Text>
        { showMeta && <Meta
          section={section.title}
          style={{ paddingBottom: 5}}
        /> }
      </TouchableOpacity>
      <Divider />
    </View>
  )
}

export default Opinion
