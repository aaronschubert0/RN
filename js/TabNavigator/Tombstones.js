import React from 'react'
import { View } from 'react-native'
import { Divider, InfoPanel } from '../Components/'

const Tombstones = () => {
  return (
    <View>
      <View>
        <InfoPanel date="LOADING"/>
        <View style={{ height: 15, marginLeft: 20, marginRight: 95, marginBottom: 20, backgroundColor: '#D8D8D8' }}></View>
        <View style={{ height: 15, marginLeft: 20, marginRight: 250, marginBottom: 20, backgroundColor: '#D8D8D8' }}></View>
        <View style={{ height: 15, marginLeft: 20, marginRight: 200, marginBottom: 20, backgroundColor: '#D8D8D8' }}></View>
        <View style={{ height: 180, backgroundColor: '#D8D8D8' }}></View>
      </View>
      <Divider />
      <View>
        <View style={{ flexDirection: 'row' }}>
        <View style={{ marginLeft: 20, width: 100, height: 56, backgroundColor: '#D8D8D8' }}></View>
        <View>
          <View style={{ height: 15, width: 200, marginLeft: 20, marginBottom: 20, backgroundColor: '#D8D8D8' }}></View>
          <View style={{ height: 15, width: 150, marginLeft: 20, backgroundColor: '#D8D8D8' }}></View>
        </View>
        </View>
      </View>
      <Divider />
      <View>
        <View style={{ flexDirection: 'row' }}>
        <View style={{ marginLeft: 20, width: 100, height: 56, backgroundColor: '#D8D8D8' }}></View>
        <View>
          <View style={{ height: 15, width: 200, marginLeft: 20, marginBottom: 20, backgroundColor: '#D8D8D8' }}></View>
          <View style={{ height: 15, width: 150, marginLeft: 20, backgroundColor: '#D8D8D8' }}></View>
        </View>
        </View>
      </View>
      <Divider />
      <View>
        <View style={{ flexDirection: 'row' }}>
        <View style={{ marginLeft: 20, width: 100, height: 56, backgroundColor: '#D8D8D8' }}></View>
        <View>
          <View style={{ height: 15, width: 200, marginLeft: 20, marginBottom: 20, backgroundColor: '#D8D8D8' }}></View>
          <View style={{ height: 15, width: 150, marginLeft: 20, backgroundColor: '#D8D8D8' }}></View>
        </View>
        </View>
      </View>
      <Divider />
    </View>
  )
}

export default Tombstones
