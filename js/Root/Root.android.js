import React, { Component, PropTypes } from 'react'
import { DrawerLayoutAndroid, View, Text } from 'react-native'
import { TabNavigator, Tab } from '../TabNavigator/'
import MenuBar from '../MenuBar'
import { TopStories, UK, International, Politics, Features, Entertainment } from '../Sections'
import { cycleEnvironments } from '../API/environments'
import { getDeviceHeight } from '../Utilities'

const MENU_BAR_HEIGHT = 30
const CONTAINER_PADDING_TOP = 20

class Root extends Component {
  static propTypes = {
    push: PropTypes.func.isRequired,
    pop: PropTypes.func.isRequired
  }
  openDrawer = () => {
    this.drawer && this.drawer.openDrawer()
  }
  render () {
    const { push, pop } = this.props
    return (
      <DrawerLayoutAndroid
        ref={d => this.drawer = d}
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={() => {
          return (
            <View style={{ flex: 1 }}>
              <Text>Navigation</Text>
            </View>
          )
        }}
      >
        <View style={{ paddingTop: 20, backgroundColor: 'white' }}>
          <MenuBar
            onHamburgerPress={this.openDrawer}
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
      </DrawerLayoutAndroid>
    )
  }
}

export default Root
