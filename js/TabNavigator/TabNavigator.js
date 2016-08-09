import React, { Component, PropTypes } from 'react'
import { View, Text, ScrollView, TouchableOpacity, Animated, Dimensions, InteractionManager } from 'react-native'

import Tab from './Tab'
import ViewPager from '../ViewPager'

import getDeviceWidth from '../get-device-width'

export default class TabNavigator extends Component {
  static propTypes = {
    renderDistance: PropTypes.number,
    actions: PropTypes.object,
    initialTab: PropTypes.string,
    state: PropTypes.shape({
      tabs: PropTypes.object,
      visibleTab: PropTypes.string
    })
  }
  shouldComponentUpdate () {
    console.log('definitely not')
    return true
  }
  constructor (props) {
    super(props)
    this.state = {
      tabViewPosition: new Animated.Value(0),
      tabUnderlineLeft: new Animated.Value(0),
      tabUnderlineWidth: new Animated.Value(0),
      tabTextColor: new Animated.Value(0),
      tabOpacity: new Animated.Value(0)
    }

    this._tabMeasurements = {}
    this._tabsScrollViewPosition = 0
    this._tabsScrollViewRestingPosition = 0
    this._contentScrollViewRestingPosition = 0
    this._contentScrollViewPosition = 0

    this._updateVisibleTab = this._updateVisibleTab.bind(this)
  }
  componentWillMount () {
    this._storeTabs()
  }
  // REDUX
  // _storeTabs () {
  //   const { name, children, actions } = this.props
  //   const tabs = mapChildrenToTabs(children)
  //   actions.initialize(name, tabs)
  // }

  // COMPONENT STATE
  _storeTabs () {
    const { name, children } = this.props
    const tabs = mapChildrenToTabs(children).reduce((tabs, tab) => {
      tabs[tab.title] = { ...tab, opacity: new Animated.Value(0) }
      return tabs
    }, {})
    this.setState({
      name,
      tabs,
      visibleTab: Object.keys(tabs)[0]
    })
  }

  // REDUX
  // _readState () {
  //   return this.props.state
  // }

  // COMPONENT STATE
  _readState () {
    return this.state
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
    console.log('rendering')
    const state = this._readState()
    if (!state) return null

    const { renderDistance, initialTab } = this.props
    const { tabs, visibleTab } = state
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
          onTabActivated={title => {
            this._updateVisibleTab(title)
            this._contentScrollView.setPage(tabKeys.indexOf(title), false)
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
            //
            // InteractionManager.runAfterInteractions(() => {
            //   this._updateVisibleTab(visibleTab.title)
            // })

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
            height: 607
          }}
        >
          {tabKeys.map((key, index) => {
            const viewStyle = { width: getDeviceWidth() }
            if (renderedTabKeys.indexOf(key) === -1 && false){
              return (
                <View key={`placeholder_${index}`} style={viewStyle}>
                  <Text>(Tombstone)</Text>
                </View>
              )
            }
            const { title, component: TabComponent } = tabs[key]
            return (
              <View key={title} style={viewStyle}>
                <TabComponent />
              </View>
            )
          })}

        </ViewPager>
      </View>
    )
  }
}

class TabBar extends Component {
  static defaultProps = {
    tabs: {},
    initalTab: undefined,
    tabBarRef: () => {},
    onTabsMeasured: () => {},
    onTabActivated: () => {}
  }

  constructor (props) {
    super(props)
    this.state = {
      tabViewPosition: new Animated.Value(0),
      tabUnderlineLeft: new Animated.Value(0),
      tabUnderlineWidth: new Animated.Value(0),
      tabTextColor: new Animated.Value(0),
      tabOpacity: new Animated.Value(0)
    }
    this._tabMeasurements = {}
    this._tabTextViews = {}
    this._allTabsMeasured = false
  }

  shouldComponentUpdate () {
    return false
  }

  setCurrentIndex (restingIndex, currentIndex) {
    const { tabs } = this.props
    const tabKeys = Object.keys(tabs)

    const startIndex = restingIndex
    const direction = currentIndex > startIndex ? 'right' : 'left'

    const endIndex = direction === 'left'
      ? Math.floor(currentIndex)
      : Math.ceil(currentIndex)


    const startTab = tabKeys[Math.round(startIndex)]
    const currentTab = tabKeys[
      direction === 'left' ? Math.ceil(currentIndex) : Math.floor(currentIndex)
    ]
    const endTab = tabKeys[Math.round(endIndex)]
    const progressTowardsNextTab = 1 - (endIndex - currentIndex)

    if (!endTab || !currentTab || !startTab) return


    tabs[endTab].opacity.setValue(
      direction === 'left'
        ? 1-(progressTowardsNextTab-1)
        : progressTowardsNextTab
    )

    if (currentTab !== endTab) {
      tabs[currentTab].opacity.setValue(
        direction === 'left'
          ? -(1-progressTowardsNextTab)
          : 1-progressTowardsNextTab
      )
    }

    function indexToScrollPosition (index, measurements) {
      const lowerTab = tabKeys[Math.floor(index)]
      const higherTab = tabKeys[Math.ceil(index)]
      const lowerPosition = measurements[lowerTab].left
      const higherPosition = measurements[higherTab].left
      const diff = higherPosition - lowerPosition
      return lowerPosition + (diff * (index - Math.floor(index)))
    }

    function indexToIndicatorWidth (index, measurements) {
      const lowerTab = tabKeys[Math.floor(index)]
      const higherTab = tabKeys[Math.ceil(index)]
      const lowerWidth = measurements[lowerTab].width
      const higherWidth = measurements[higherTab].width
      const diff = higherWidth - lowerWidth
      return lowerWidth + (diff * (index - Math.floor(index)))
    }

    // Update the scroll position of the tabs ScrollView
    const currentScrollPosition = indexToScrollPosition(currentIndex, this._tabMeasurements)
    this.tv.setNativeProps({
      style: {
        transform: [
          { translateX: -(currentScrollPosition - 50) }
        ]
      }
    })

    // Update the position/width of the indicator
    // const currentIndicatorLeft = currentScrollPosition
    const currentIndicatorWidth = indexToIndicatorWidth(currentIndex, this._tabMeasurements)
    // this.state.tabUnderlineLeft.setValue(currentIndicatorLeft)
    this.state.tabUnderlineWidth.setValue(currentIndicatorWidth)
  }

  render () {
    const { tabs, tabBarRef, onTabActivated, onTabsMeasured } = this.props
    return (
      <View
        style={{
          height: 50,
          overflow: 'visible'
        }}
      >
        <View
          ref={tv => {
            this.tv = tv
            tabBarRef(tv)
          }}
          style={{
            flexDirection: 'row',
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: -3000
          }}
        >
          {Object.keys(tabs).map(key => tabs[key]).map(({ opacity, title }, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={{ padding: 15, paddingBottom: 35 }}
                onLayout={e => {
                  if (this._allTabsMeasured) return
                  console.log('Layout on', title)
                  const { x, width, height, } = e.nativeEvent.layout
                  const { initialTab } = this.props
                  this._tabMeasurements[title] = { left: x, right: x + width, width, height }

                  if (initialTab && title === initialTab) {
                    onTabActivated(title)
                  } else if (!initialTab && index === 0) {
                    this.state.tabUnderlineLeft.setValue(x)
                    this.state.tabUnderlineWidth.setValue(width)
                    tabs[title].opacity.setValue(1)
                    onTabActivated(title)
                  }

                  if (Object.keys(this._tabMeasurements).length === Object.keys(tabs).length) {
                    Animated.timing(
                      this.state.tabOpacity,
                      { toValue: 1, duration: 300 }
                    ).start()
                    this._allTabsMeasured = true
                    onTabsMeasured(this._tabMeasurements)
                  }
                }}
                onPress={() => {
                  onTabActivated(title)
                }}
              >
                <Animated.Text
                  ref={at => this._tabTextViews[title] = at}
                  style={{
                    fontSize: 12,
                    fontFamily:'Source Sans Pro',
                    fontWeight: '500',
                    color: opacity.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['rgb(188, 188, 188)', 'rgb(48, 192, 255)']
                    })
                  }}
                >{title.toUpperCase()}</Animated.Text>
              </TouchableOpacity>
            )
          })}
        </View>
        <View style={{
          position: 'absolute',
          height: 0.5,
          backgroundColor: '#D8D8D8',
          bottom: 0,
          left: -getDeviceWidth(),
          right: -getDeviceWidth()
        }}></View>
        <Animated.View style={{
          position: 'absolute',
          height: 3,
          backgroundColor: '#09b4ff',
          bottom: 0,
          left: 50,
          width: this.state.tabUnderlineWidth,
        }}></Animated.View>
        <Animated.View pointerEvents={'none'} style={{
          position: 'absolute',
          backgroundColor: 'white',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          opacity: this.state.tabOpacity.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0]
          })
        }}></Animated.View>
      </View>

    )
  }
}

const mapChildrenToTabs = (children) => React.Children.map(
  children,
  child => child.type === Tab && child.props
).filter(tab => tab !== false)
