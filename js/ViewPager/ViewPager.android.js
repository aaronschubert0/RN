import React, { Component } from 'react'
import { ViewPagerAndroid } from 'react-native'

const noop = () => {}

export default class ViewPager extends Component {
  setPage (page, animated = true) {
    if (animated) {
      this.vp.setPage(page)
    } else {
      this.vp.setPageWithoutAnimation(page)
    }
  }

  render () {
    const {
      children,
      style,
      onScroll = noop,
      onScrollStart = noop,
      onScrollEnd = noop,
      onTouchStartCapture = noop
    } = this.props
    return (
      <ViewPagerAndroid
        ref={vp => this.vp = vp}
        style={style}
        onLayout={e => {
          this.width = e.nativeEvent.layout.width
        }}
        onPageScroll={e => {
          const position = e.nativeEvent.position + e.nativeEvent.offset
          this.position = position
          e.nativeEvent.contentOffset = { x: position*this.width }
          onScroll(e)
        }}
        onPageScrollStateChanged={state => {
          switch (state) {
            case 'dragging':
              onScrollStart()
              break
            case 'idle':
              onScrollEnd(this.position)
              break
          }
        }}
        onTouchStartCapture={onTouchStartCapture}
      >
        {children}
      </ViewPagerAndroid>
    )
  }
}
