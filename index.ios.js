import React, { Component } from 'react'
import { AppRegistry, View, Text, Image, ScrollView } from 'react-native'
import { TabNavigator, Tab } from './js/TabNavigator/'
const Metro = () => {
  return (
    <View style={{ marginTop: 20 }}>
      <TabNavigator renderDistance={4}>
        <Tab title="Breaking News" component={One} />
        <Tab title="Top Stories" component={Two} />
        <Tab title="Glasgow / West" component={Three} />
        <Tab title="Four" component={Four} />
        <Tab title="Five" component={Five} />
        <Tab title="Six" component={Six} />
        <Tab title="Seven" component={Seven} />
        <Tab title="Eight" component={Eight} />
      </TabNavigator>
    </View>

  )
}

const Meta = ({ time, region }) => {
  return (
    <View style={{flexDirection: 'row', paddingBottom: 15}}>
      <Text style={{fontSize: 11, fontWeight: '500', color: '#09b4ff'}}>{time + ' / '}</Text>
      <Text style={{fontSize: 11, fontWeight: '500', color: 'gray'}}>{region}</Text>
    </View>
  )
}

const Divider = () => {
  return (
    <View style={{flex: 1, backgroundColor: 'gray', height: 0.5, marginLeft: 15, marginRight: 15, marginTop: 10, marginBottom: 10}} />
  )
}

const One = () => {
  return (
    <ScrollView>
    <View style={{paddingLeft: 20, paddingRight: 20}}>
      <Text style={{fontSize: 22, fontWeight: '700', paddingBottom: 15}}>
      Sturgeon: Tackling 'unnacceptable' child poverty a priority
      </Text>
      <Meta style={{paddingBottom: 15}} time="34 MIN" region="GLASGOW & WEST"/>
    </View>
    <Image
    source={{uri: 'https://files.stv.tv/imagebase/461/w768/461445-daniel-roche-left-ramona-marquez-and-tyger-drew-honey-in-2011.jpg'}}
    style={{width: 375, height: 211}}/>
    <Divider />

    <View style={{flexDirection: 'row', paddingLeft: 20, paddingRight: 20}}>
    <Image
      source={{uri: 'https://files.stv.tv/imagebase/13/w768/13179-crash-at-busy-city-roundabout.jpg'}}
      style={{width: 150, height: 84, marginRight: 10}}
      />
      <View style={{flex: 1}}>
        <Text style={{fontSize: 14, fontWeight: '500', paddingBottom: 5}}>
        Murder probe after elderly man stabbed to death in street
        </Text>
        <Meta time="34 MIN" region="GLASGOW & WEST"/>
      </View>
    </View>
    <Divider />
    </ScrollView>
  )
}
const Two = () => {
  return (
    <View>
      <Text>Two</Text>
    </View>
  )
}
const Three = () => {
  return (
    <View>
      <Text>Three</Text>
    </View>
  )
}
const Four = () => {
  return (
    <View>
      <Text>Four</Text>
    </View>
  )
}
const Five = () => {
  return (
    <View>
      <Text>Five</Text>
    </View>
  )
}
const Six = () => {
  return (
    <View>
      <Text>Six</Text>
    </View>
  )
}
const Seven = () => {
  return (
    <View>
      <Text>Seven</Text>
    </View>
  )
}
const Eight = () => {
  return (
    <View>
      <Text>Eight</Text>
    </View>
  )
}

AppRegistry.registerComponent('Metro', () => Metro)