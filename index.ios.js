import React, { Component, PropTypes } from 'react'
import { AppRegistry, View, ListView, NavigationExperimental } from 'react-native'
import { TabNavigator, Tab } from './js/TabNavigator/'
import { TopStories, UK, International, Politics, Features, Entertainment } from './js/Sections'

const {
  CardStack: NavigationCardStack,
  StateUtils: NavigationStateUtils,
} = NavigationExperimental;

const Root = ({ push, pop }) => {
  return (
    <View style={{ paddingTop: 20, backgroundColor: 'white' }}>
      <TabNavigator
        initialTab="Top Stories"
        renderDistance={1}
        tabProps={{
          push,
          pop
        }}
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

const EmptyComponent = () => {
  return <View></View>
}

class Metro extends Component {

  constructor(props) {
    super(props)
    this.onNavigationChange = this._onNavigationChange.bind(this)

    this.state = {
      navigationState: {
        index: 0,
        routes: [{ key: 'root', component: Root}]
      }
    }
  }

  _onNavigationChange(type, component, props, key) {
    let { navigationState } = this.state

    switch (type) {
      case 'push':
        const route = {component, props, key}
        navigationState = NavigationStateUtils.push(navigationState, route)
        break;
      case 'pop':
        navigationState = NavigationStateUtils.pop(navigationState)
        break;
    }

    if (this.state.navigationState !== navigationState) {
      this.setState({ navigationState })
    }
  }

  render() {
    return (
      <NavigationCardStack
        onNavigateBack={() => this.onNavigationChange('pop', undefined, undefined)}
        navigationState={this.state.navigationState}
        renderScene={this._renderScene.bind(this)}
        style={{ flex: 1}}
      />
    )
  }

  _renderScene(sceneProps) {
    const { scene } = sceneProps
    const { component: Component, props } = scene.route
    const navigationActions = {
      push: (component, props, key) => this.onNavigationChange('push', component, props, key),
      pop: () => this.onNavigationChange('pop')
    }
    return <Component {...props} {...navigationActions} />
  }
}

AppRegistry.registerComponent('Metro', () => Metro)
