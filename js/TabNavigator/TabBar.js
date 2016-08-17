import React, { Component } from 'react'
import { View, ScrollView, Animated, TouchableOpacity, Image } from 'react-native'
import TabButton from './TabButton'
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
      tabUnderlineLeft: new Animated.Value(0),
      tabOpacity: new Animated.Value(0),
      textColor: new Animated.Value(0),
      tabKeys: Object.keys(props.tabs)
    }
    this._tabButtons = {}
    this._tabMeasurements = {}
    this._tvRestingPosition = 0
    this._tvScrollPosition = 0
    this._allTabsMeasured = false
  }

  shouldComponentUpdate () {
    return false
  }

  setCurrentIndex (restingIndex, currentIndex, scrollingDirectlyToTab) {
    const { tabs } = this.props
    const { tabKeys } = this.state
    const left = currentIndex < restingIndex
    const { startTabIndex, currentTabIndex, endTabIndex } = this.getTabIndexes(
      restingIndex,
      currentIndex,
      left,
      scrollingDirectlyToTab
    )
    const startTab = tabKeys[startTabIndex]
    const currentTab = tabKeys[currentTabIndex]
    const endTab = tabKeys[endTabIndex]

    if (!endTab || !currentTab || !startTab) return

    const progressToEndTab = 1 - (
      (endTabIndex - currentIndex) / (endTabIndex - startTabIndex)
    ) || 1

    requestAnimationFrame(() => {
      // this.updateTabActives(currentTab, endTab, progressToEndTab)
      this.updateTabUnderline(currentIndex)
      if (!scrollingDirectlyToTab) {
        // this.updateScrollPosition(currentIndex)
      }
    })
  }

  getTabIndexes (restingIndex, currentIndex, left, scrollingDirectlyToTab) {
    const { tabKeys } = this.state
    const startTabIndex = Math.round(restingIndex)
    const currentTabIndex = scrollingDirectlyToTab
      ? startTabIndex
      : left ? Math.ceil(currentIndex) : Math.floor(currentIndex)

    const endTabIndex = scrollingDirectlyToTab
      ? tabKeys.indexOf(scrollingDirectlyToTab)
      : left ? Math.floor(currentIndex) : Math.ceil(currentIndex)

    return { startTabIndex, currentTabIndex, endTabIndex }
  }

  updateTabActives (currentTab, endTab, progressToEndTab) {
    this._tabButtons[endTab].setActive(progressToEndTab)
    if (currentTab !== endTab) {
      this._tabButtons[currentTab].setActive(1 - progressToEndTab)
    }
  }

  updateScrollPosition (currentIndex) {
    const { tabs } = this.props
    const { tabKeys } = this.state
    const lastTab = this._tabMeasurements[tabKeys[tabKeys.length-1]]

    console.log(this._tvRestingPosition)


    // const nextScrollPosition = indexToScrollPosition(
    //   currentIndex,
    //   tabs,
    //   this._tabMeasurements
    // )
    // this.tv.scrollTo({
    //   x: Math.min(
    //     nextScrollPosition,
    //     lastTab.left + lastTab.width - getDeviceWidth() + 50
    //   ),
    //   animated: false
    // })
    // this.tv.setNativeProps({
    //   contentOffset: {
    //     x: Math.min(
    //       nextScrollPosition,
    //       lastTab.left + lastTab.width - getDeviceWidth() + 50
    //     )
    //   }
    // })
  }

  updateTabUnderline (currentIndex) {
    const { tabs } = this.props
    // this.state.tabUnderlineWidth.setValue(
    //   indexToIndicatorWidth(
    //     currentIndex,
    //     tabs,
    //     this._tabMeasurements
    //   )
    // )
    console.log(indexToIndicatorWidth(
      currentIndex,
      tabs,
      this._tabMeasurements
    ))
    // this.state.tabUnderlineLeft.setValue(
    //   indexToScrollPosition(
    //     currentIndex,
    //     tabs,
    //     this._tabMeasurements
    //   )
    // )
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
        <View style={{ height: 30, justifyContent: 'center', alignItems: 'center', paddingTop: 2 }}>
          <Image source={require('../../img/logo.png')} style={{ width: 82, height: 26}} />
        </View>
        <ScrollView
          ref={tv => this.tv = tv}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{
            flex: 1,
            paddingLeft: 50
            // opacity: this.state.tabOpacity
          }}
          onScroll={e => this._tvScrollPosition = e.nativeEvent.contentOffset.x}
          onTouchStartCapture={() => this._tvRestingPosition = this._tvScrollPosition}
          onResponderRelease={() => this._tvRestingPosition = this._tvScrollPosition}
          onMomentumScrollEnd={() => this._tvRestingPosition = this._tvScrollPosition}
          scrollEventThrottle={64}
        >
          {Object.keys(tabs).map((title, index) => {
            return (
              <TabButton
                key={title}
                ref={tb => this._tabButtons[title] = tb}
                title={title}
                onLayout={(e) => this.measureTab(title, index, e)}
                onPress={e => {
                  onTabActivated(title, { shouldAnimate: true, direct: true })
                  const tabKeys = Object.keys(tabs)
                  const lastTab = this._tabMeasurements[tabKeys[tabKeys.length-1]]
                  const deviceWidth = getDeviceWidth()
                  requestAnimationFrame(() => {
                    const screenLeft = this._tvRestingPosition
                    const screenRight = this._tvRestingPosition + deviceWidth
                    const isOffLeft = !(screenLeft <= this._tabMeasurements[title].left)
                    const isOffRight = !(screenRight >= this._tabMeasurements[title].right + 100)
                    if (isOffLeft) {
                      this.tv.scrollTo({
                        x: this._tabMeasurements[title].left
                      })
                    } else if (isOffRight) {
                      this.tv.scrollTo({
                        x: Math.min(
                          this._tabMeasurements[title].left - deviceWidth + this._tabMeasurements[title].width + 50 + 50,
                          lastTab.left + lastTab.width - deviceWidth + 50
                        )
                      })
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
            left: 0,
            width: this.state.tabUnderlineWidth,
            left: this.state.tabUnderlineLeft
          }}></Animated.View>
        </ScrollView>
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
