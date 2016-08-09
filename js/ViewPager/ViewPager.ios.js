import React, { Component } from 'react'
import { ScrollView } from 'react-native'
import getDeviceWidth from '../get-device-width'

const noop = () => {}

export default class ViewPager extends Component {
  constructor (props) {
    super(props)
    this.isScrolling = false
  }
  setPage (page, animated = true) {
    this.sv.scrollTo({ x: page * getDeviceWidth(), animated })
  }
  render () {
    const {
      children,
      style,
      width = getDeviceWidth(),
      onScroll = noop,
      onScrollStart = noop,
      onScrollEnd = noop,
      onTouchStartCapture = noop
    } = this.props
    return (
      <ScrollView
        ref={sv => this.sv = sv}
        /* Configured via props */
        style={style}
        onMomentumScrollEnd={(e) => {
          this.isScrolling = false
          onScrollEnd(e.nativeEvent.contentOffset.x / width)
        }}
        onScroll={(e) => {
          if (!this.isScrolling) {
            this.isScrolling = true
            onScrollStart(Math.round(e.nativeEvent.contentOffset.x / width))
          }
          onScroll(e.nativeEvent.contentOffset.x / width)
        }}
        onTouchStartCapture={onTouchStartCapture}
        /* Non-configurable */
        horizontal
        pagingEnabled
        bounces={true}
        directionalLockEnabled
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        automaticallyAdjustContentInsets={false}
        scrollEventThrottle={16}
      >
        {children}
      </ScrollView>
    )
  }
}
