import React, { Component, PropTypes } from 'react'
import { View, Text, ScrollView, TouchableOpacity, Animated, Dimensions, InteractionManager } from 'react-native'

import Tab from './Tab'
import TabBar from './TabBar'
import Tombstones from './Tombstones'
import ViewPager from '../ViewPager'
import { getDeviceWidth } from '../Utilities'

export default class TabNavigator extends Component {
  static propTypes = {
    renderDistance: PropTypes.number.isRequired,
    initialTab: PropTypes.string
  }

  constructor (props) {
    super(props)
    this._contentScrollViewRestingPosition = 0
    this._contentScrollViewPosition = 0
    this._updateVisibleTab = this._updateVisibleTab.bind(this)
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

  onContentScrollValueChange (currentIndex) {
    this.tabBar.setCurrentIndex(
      this._contentScrollViewRestingPosition,
      currentIndex
    )
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
          tabBarRef={tv => this.tv = tv}
          onTabsMeasured={measurements => this._tabMeasurements = measurements}
          onTabActivated={(title, { shouldAnimate = false } = {}) => {
            console.log('activated', title)
            this._updateVisibleTab(title)
            this._contentScrollView.setPage(tabKeys.indexOf(title), shouldAnimate)
          }}
        />
        <ViewPager
          ref={sv => this._contentScrollView = sv}
          onScrollStart={position => {
            this._contentScrollViewIsScrolling = true
            this._contentScrollViewPosition = position
          }}
          onScroll={position => {
            this._contentScrollViewPosition = position
            this.onContentScrollValueChange(position)
          }}
          onScrollEnd={position => {
            const page = Math.round(position)
            const visibleTabKey = tabKeys[page]
            const visibleTab = tabs[visibleTabKey]

            InteractionManager.runAfterInteractions(() => {
              this._updateVisibleTab(visibleTab.title)
            })

            this._contentScrollViewIsScrolling = false
            this._contentScrollViewRestingPosition = position
          }}
          onTouchStartCapture={e => {
            if (this._contentScrollViewIsScrolling) {
              this._contentScrollViewRestingPosition = this._contentScrollViewPosition
            }
            return true
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
                <TabComponent {...this.props.tabProps} shouldLoad={(renderedTabKeys.indexOf(key) > -1)} title={title}/>
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
