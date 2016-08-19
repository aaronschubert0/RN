import React, { PropTypes } from 'react'
import { View } from 'react-native'
import { TabNavigator, Tab } from '../TabNavigator/'
import MenuBar from '../MenuBar'
import { TopStories, UK, International, Politics, Features, Entertainment } from '../Sections'
import { cycleEnvironments } from '../API/environments'
import { getDeviceHeight } from '../Utilities'

const MENU_BAR_HEIGHT = 30
const CONTAINER_PADDING_TOP = 20

const Root = ({ push, pop }) => {
  return (
    <View style={{ paddingTop: CONTAINER_PADDING_TOP, backgroundColor: 'white' }}>
      <MenuBar
        onHamburgerPress={() => {}}
        onBrandPress={cycleEnvironments}
        style={{
          height: MENU_BAR_HEIGHT
        }}
      />
      <TabNavigator
        initialTab="Top Stories"
        renderDistance={1}
        tabProps={{ push, pop }}
        height={getDeviceHeight() - MENU_BAR_HEIGHT - CONTAINER_PADDING_TOP}
      >
        <Tab title="Top Stories" component={TopStories} />
        <Tab title="UK" component={UK} />
        <Tab title="International" component={International} />
        <Tab title="Politics" component={Politics} />
        <Tab title="Features" component={Features} />
        <Tab title="Entertainment" component={Entertainment} />
      </TabNavigator>
    </View>
  )
}
Root.propTypes = {
  push: PropTypes.func.isRequired,
  pop: PropTypes.func.isRequired
}
export default Root
