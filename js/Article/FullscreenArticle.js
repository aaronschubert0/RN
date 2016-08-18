import React from 'react'
import  { View, TouchableOpacity, Image, ScrollView, Text } from 'react-native'

const FullscreenArticle = ({ articleData, sectionTitle, pop }) => {
  const { title } = articleData
  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <View style={{ backgroundColor: 'white', borderBottomColor: 'gray', borderBottomWidth: 0.5, height: 64, flexDirection:'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 20, paddingLeft: 20, paddingRight: 20 }}>
        <TouchableOpacity onPress={() => pop()}>
          <Text style={{ color: '#54565b', fontFamily:'Source Sans Pro', fontSize: 16 }}>{'< Back'}</Text>
        </TouchableOpacity>
        <Text style={{ color: '#09b4ff', fontFamily:'Source Sans Pro', fontSize: 16 }}>{sectionTitle}</Text>
        <Text style={{ color: '#54565b', fontFamily:'Source Sans Pro', fontSize: 16 }}>Share</Text>
      </View>
      <ScrollView style={{ flex: 1}}>
        <Image
        source={{ uri: articleData.image.renditions.large }}
        style={{ width: 375, height: 211 }}
        />
        <View style={{ flex: 1, backgroundColor: 'white', paddingLeft: 20, paddingRight: 20 }}>
          <Text style={{fontSize: 22, fontWeight: '700', fontFamily: 'Source Sans Pro', paddingBottom: 15, paddingTop: 15}}>
          {title}
          </Text>
          <Text style={{ color: '#54565b', fontSize: 16, paddingBottom: 15, lineHeight: 25 }}>
            The First Minister announced a new Scotland-specific Child Poverty Bill to improve life chances.
          </Text>
          <Text style={{ color: '#54565b', fontSize: 16, paddingBottom: 15, lineHeight: 25 }}>
            Legislation aimed at helping to eradicate child poverty in Scotland has been announced by Nicola Sturgeon.
          </Text>
          <Text style={{ color: '#54565b', fontSize: 16, paddingBottom: 15, lineHeight: 25 }}>
            The First Minister said the Child Poverty Bill will set out a new approach to tackling inequality as she visited the Prince's Trust charity.
          </Text>
          <Text style={{ color: '#54565b', fontSize: 16, paddingBottom: 15, lineHeight: 25 }}>
            She was also sharply critical of the UK Government's decision last year to repeal much of the Child Poverty Act, calling it "fundamentally wrong".
          </Text>
        </View>
      </ScrollView>
    </View>
  )
}

export default FullscreenArticle
