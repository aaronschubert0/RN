import React, { Component } from 'react'
import { View, ScrollView, Animated, TouchableOpacity, Image } from 'react-native'
import TabButton from './TabButton'
import { getDeviceWidth } from '../Utilities'

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView)

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
      tabUnderlineLeft: new Animated.Value(0),
      tabOpacity: new Animated.Value(0),
      textColor: new Animated.Value(0),
      tabKeys: Object.keys(props.tabs)
    }
    this._tabButtons = {}
    this._tabMeasurements = {}
    this._tvRestingPosition = 0
    this._tvScrollPosition = 0
    this._contentRestingPosition = 0
    this._allTabsMeasured = false
  }

  shouldComponentUpdate () {
    return false
  }

  updateScrollPosition (currentIndex) {
    const { tabs } = this.props
    const { tabKeys } = this.state
    const lastTab = this._tabMeasurements[tabKeys[tabKeys.length-1]]
  }

  measureTab (title, index, e) {
    if (this._allTabsMeasured) return
    const { tabs, onTabActivated, onTabsMeasured, initialTab } = this.props
    const { x, width, height } = e.nativeEvent.layout
    this._tabMeasurements[title] = { left: x, right: x + width, width, height }
    if (title === initialTab || !initialTab && index === 0) {
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
    const tabKeys = Object.keys(tabs)
    const deviceWidth = getDeviceWidth()
    return (
      <View
        style={{
          height: 80,
          overflow: 'visible'
        }}
      >
        <View style={{ height: 30, justifyContent: 'center', alignItems: 'center', paddingTop: 2 }}>
          <Image source={require('../../img/logo.png')} style={{ width: 82, height: 26}} />
        </View>
        <AnimatedScrollView
          ref={tv => this.tv = tv}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{
            flex: 1,
            paddingLeft: 50,
            opacity: this.state.tabOpacity
          }}
        >
          {tabKeys.map((title, index) => {
            return (
              <TabButton
                key={title}
                ref={tb => this._tabButtons[title] = tb}
                title={title}
                onLayout={(e) => this.measureTab(title, index, e)}
                onPress={() => this.props.onTabActivated(title, { shouldAnimate: true })}
                style={{
                  color: this.props.contentScrollX.interpolate({
                    inputRange: [0, tabKeys.length*deviceWidth],
                    outputRange: ['rgb(188, 188, 188)', 'rgb(48, 192, 255)'],
                    easing: (val) => {
                      const scrollPosition = val*(tabKeys.length*deviceWidth)
                      const position = scrollPosition/deviceWidth
                      const progress = position - Math.floor(position)
                      if (index === Math.floor(position)) {
                        return step(1 - progress, 25)
                      } else if (index === Math.ceil(position)) {
                        return step(progress, 25)
                      } else {
                        return 0
                      }
                    }
                  })
                }}
              />
            )
          })}
          <Animated.View style={{
            position: 'absolute',
            height: 3,
            backgroundColor: '#09b4ff',
            bottom: 0,
            left: this.props.contentScrollX.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1],
              easing: (val) => {
                return !this._allTabsMeasured ? 0 : indexToScrollPosition(
                  val/getDeviceWidth(),
                  this.props.tabs,
                  this._tabMeasurements
                )
              }
            }),
            width: this.props.contentScrollX.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1],
              easing: (val) => {
                return !this._allTabsMeasured ? 0 : indexToIndicatorWidth(
                  val/getDeviceWidth(),
                  this.props.tabs,
                  this._tabMeasurements
                )
              }
            })
          }}></Animated.View>
        </AnimatedScrollView>
        <View style={{
          position: 'absolute',
          height: 0.5,
          backgroundColor: '#D8D8D8',
          bottom: 0,
          left: -getDeviceWidth(),
          right: -getDeviceWidth()
        }}></View>
      </View>

    )
  }
}

function indexToScrollPosition (index, tabs, measurements) {
  const tabKeys = Object.keys(tabs)
  const lowerTab = tabKeys[Math.floor(index)] || tabKeys[0]
  const higherTab = tabKeys[Math.ceil(index)] || tabKeys[tabKeys.length-1]
  const lowerPosition = measurements[lowerTab].left
  const higherPosition = measurements[higherTab].left
  const diff = higherPosition - lowerPosition
  return lowerPosition + (diff * (index - Math.floor(index)))
}

function indexToIndicatorWidth (index, tabs, measurements) {
  const tabKeys = Object.keys(tabs)
  const lowerTab = tabKeys[Math.floor(index)] || tabKeys[0]
  const higherTab = tabKeys[Math.ceil(index)] || tabKeys[tabKeys.length-1]
  const lowerWidth = measurements[lowerTab].width
  const higherWidth = measurements[higherTab].width
  const diff = higherWidth - lowerWidth
  return lowerWidth + (diff * (index - Math.floor(index)))
}

function step (value, step) {
  return value - (((value*100) % step) / 100)
}
