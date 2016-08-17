import React, { Component } from 'react'
import { View, Animated, Image, TouchableOpacity } from 'react-native'
import TabButton from './TabButton'
import NavigationBar from './NavigationBar'
import { getDeviceWidth } from '../Utilities'

export default class TabBar extends Component {
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
      tabUnderlineWidth: new Animated.Value(0),
      tabOpacity: new Animated.Value(0)
    }
    this._tabButtons = {}
    this._tabMeasurements = {}
    this._allTabsMeasured = false
  }

  shouldComponentUpdate () {
    return false
  }

  setCurrentIndex (restingIndex, currentIndex) {
    const { tabs } = this.props
    const tabKeys = Object.keys(tabs)

    const left = currentIndex < restingIndex

    const startTabIndex = Math.round(restingIndex)
    const currentTabIndex = left ? Math.ceil(currentIndex) : Math.floor(currentIndex)
    const endTabIndex = left ? Math.floor(currentIndex) : Math.ceil(currentIndex)

    const startTab = tabKeys[startTabIndex]
    const currentTab = tabKeys[currentTabIndex]
    const endTab = tabKeys[endTabIndex]

    if (!endTab || !currentTab || !startTab) return

    const progressToEndTab = 1 - (
      left ? currentIndex - endTabIndex : endTabIndex - currentIndex
    )

    this._tabButtons[endTab].setActive(progressToEndTab)

    if (currentTab !== endTab) {
      this._tabButtons[currentTab].setActive(1 - progressToEndTab)
    }

    // Update the scroll position of the tabs ScrollView
    const currentScrollPosition = indexToScrollPosition(
      currentIndex,
      tabs,
      this._tabMeasurements
    )
    requestAnimationFrame(() => {
      this.tv.setNativeProps({
        style: {
          transform: [
            { translateX: -(currentScrollPosition - 50) }
          ]
        }
      })
    })

    // Update the width of the indicator
    const currentIndicatorWidth = indexToIndicatorWidth(
      currentIndex,
      tabs,
      this._tabMeasurements
    )
    this.state.tabUnderlineWidth.setValue(
      indexToIndicatorWidth(
        currentIndex,
        tabs,
        this._tabMeasurements
      )
    )
  }

  measureTab (title, index, e) {
    if (this._allTabsMeasured) return
    const { tabs, onTabActivated, onTabsMeasured, initialTab } = this.props
    const { x, width, height } = e.nativeEvent.layout
    this._tabMeasurements[title] = { left: x, right: x + width, width, height }
    if (title === initialTab || !initialTab && index === 0) {
      this.setCurrentIndex(0, index)
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
  }

  render () {
    const { tabs, tabBarRef, onTabActivated, onTabsMeasured } = this.props
    return (
      <View
        style={{
          height: 80,
          overflow: 'visible'
        }}
      >
        <NavigationBar />
        <Animated.View
          ref={tv => {
            this.tv = tv
            tabBarRef(tv)
          }}
          style={{
            flexDirection: 'row',
            position: 'absolute',
            top: 30,
            left: 0,
            bottom: 0,
            right: -3000,
            opacity: this.state.tabOpacity
          }}
        >
          {Object.keys(tabs).map((title, index) => {
            return (
              <TabButton
                key={title}
                ref={tb => this._tabButtons[title] = tb}
                title={title}
                onLayout={(e) => this.measureTab(title, index, e)}
                onPress={e => onTabActivated(title, { shouldAnimate: true })}
              />
            )
          })}
        </Animated.View>
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
      </View>

    )
  }
}

function indexToScrollPosition (index, tabs, measurements) {
  const tabKeys = Object.keys(tabs)
  const lowerTab = tabKeys[Math.floor(index)]
  const higherTab = tabKeys[Math.ceil(index)]
  const lowerPosition = measurements[lowerTab].left
  const higherPosition = measurements[higherTab].left
  const diff = higherPosition - lowerPosition
  return lowerPosition + (diff * (index - Math.floor(index)))
}

function indexToIndicatorWidth (index, tabs, measurements) {
  const tabKeys = Object.keys(tabs)
  const lowerTab = tabKeys[Math.floor(index)]
  const higherTab = tabKeys[Math.ceil(index)]
  const lowerWidth = measurements[lowerTab].width
  const higherWidth = measurements[higherTab].width
  const diff = higherWidth - lowerWidth
  return lowerWidth + (diff * (index - Math.floor(index)))
}
