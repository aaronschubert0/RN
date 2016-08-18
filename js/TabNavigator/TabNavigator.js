import React, { Component, PropTypes } from 'react'
import { View, Animated, Dimensions, InteractionManager } from 'react-native'

import Tab from './Tab'
import TabBar from './TabBar'
import ViewPager from '../ViewPager'
import { getDeviceWidth } from '../Utilities'

export default class TabNavigator extends Component {
  static propTypes = {
    renderDistance: PropTypes.number.isRequired,
    initialTab: PropTypes.string
  }

  constructor (props) {
    super(props)
    this._updateVisibleTab = this._updateVisibleTab.bind(this)
    this.state = {
      scrollX: new Animated.Value(0)
    }
  }

  componentWillMount () {
    this._storeTabs()
  }

  _storeTabs () {
    const { name, children, initialTab } = this.props
    const tabs = mapChildrenToTabs(children).reduce((tabs, tab) => {
      tabs[tab.title] = tab
      return tabs
    }, {})
    this.setState({
      name,
      tabs,
      visibleTab: initialTab || Object.keys(tabs)[0]
    })
  }

  _updateVisibleTab (newVisibleTab) {
    this.setState({
      visibleTab: newVisibleTab
    })
  }

  render () {
    const { renderDistance, initialTab } = this.props
    const { tabs, visibleTab } = this.state
    const tabKeys = Object.keys(tabs)
    const visibleTabIndex = tabKeys.indexOf(visibleTab)
    const renderedTabKeys = tabKeys.filter(
      (key, index) => (
        index >= visibleTabIndex - renderDistance
        && index <= visibleTabIndex + renderDistance
      )
    )
    const renderedTabs = renderedTabKeys.map(key => tabs[key])

    return (
      <View>
        <TabBar
          ref={tb => this.tabBar = tb}
          tabs={tabs}
          initialTab={initialTab}
          onTabsMeasured={measurements => this._tabMeasurements = measurements}
          onTabActivated={(title, { shouldAnimate = false } = {}) => {
            this._updateVisibleTab(title)
            this._contentScrollView.setPage(tabKeys.indexOf(title), shouldAnimate)
          }}
          contentScrollX={this.state.scrollX}
        />
        <ViewPager
          ref={sv => this._contentScrollView = sv}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: this.state.scrollX}}}]
          )}
          onScrollEnd={position => {
            const page = Math.round(position)
            const visibleTabKey = tabKeys[page]
            const visibleTab = tabs[visibleTabKey]
            InteractionManager.runAfterInteractions(() => {
              this._updateVisibleTab(visibleTab.title)
            })
          }}
          style={{
            height: Dimensions.get('window').height-95
          }}
        >
          {tabKeys.map((key, index) => {
            const viewStyle = { width: getDeviceWidth() }
            const { title, component: TabComponent } = tabs[key]
            return (
              <View key={title} style={viewStyle}>
                <TabComponent {...this.props.tabProps} shouldLoad={(renderedTabKeys.indexOf(key) > -1)} title={title} />
              </View>
            )
          })}
        </ViewPager>
      </View>
    )
  }
}

const mapChildrenToTabs = (children) => React.Children.map(
  children,
  child => child.type === Tab && child.props
).filter(tab => tab !== false)
