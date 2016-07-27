import React, { Component, PropTypes } from 'react'
import { View, Text, ScrollView, TouchableOpacity, Animated, Dimensions } from 'react-native'
import Tab from './Tab'

const getDeviceWidth = () => Dimensions.get('window').width


export default class TabNavigator extends Component {
  static propTypes = {
    renderDistance: PropTypes.number,
    actions: PropTypes.object,
    state: PropTypes.shape({
      tabs: PropTypes.object,
      visibleTab: PropTypes.string
    })
  }
  constructor (props) {
    super(props)
    this.state = {
      tabUnderlineLeft: new Animated.Value(0),
      tabUnderlineWidth: new Animated.Value(0),
      tabTextColor: new Animated.Value(0)
    }

    this._tabMeasurements = {}
    this._tabsScrollViewPosition = 0
    this._tabsScrollViewRestingPosition = 0
    this._contentScrollViewRestingPosition = 0
    this._contentScrollViewPosition = 0
    this._tabWasPressed = undefined

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
      tabs[tab.title] = { ...tab, color: new Animated.Value(0) }
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
    this._tabWasPressed = false
    this.setState({
      visibleTab: newVisibleTab
    })
  }

  onContentScrollValueChange (scrollValue) {
    const { visibleTab, tabs } = this._readState()
    const tabKeys = Object.keys(tabs)

    const startIndex = this._contentScrollViewRestingPosition / getDeviceWidth()
    const currentIndex = scrollValue / getDeviceWidth()
    const direction = currentIndex > startIndex ? 'right' : 'left'

    const endIndex = direction === 'right'
      ? Math.ceil(currentIndex)
      : Math.floor(currentIndex)

    const startTab = tabKeys[Math.round(startIndex)]
    const nextTab = tabKeys[Math.round(endIndex)]
    const progressTowardsNextTab = 1 - (endIndex - currentIndex)
    
    this.state.tabs[nextTab].color.setValue(direction === 'left' ? 1-(progressTowardsNextTab-1) : progressTowardsNextTab)
    this.state.tabs[startTab].color.setValue(direction === 'left' ? -(1-progressTowardsNextTab) : 1-progressTowardsNextTab)
    // console.log(startIndex, currentIndex)
    // console.log(`start: ${startIndex}, current: ${currentIndex}, end: ${endIndex}`)

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
    this._tabsScrollView.scrollTo({ x: currentScrollPosition - 50, animated: false })

    // Update the position/width of the indicator
    const currentIndicatorLeft = currentScrollPosition
    const currentIndicatorWidth = indexToIndicatorWidth(currentIndex, this._tabMeasurements)
    this.state.tabUnderlineLeft.setValue(currentIndicatorLeft)
    this.state.tabUnderlineWidth.setValue(currentIndicatorWidth)
  }

  // onContentScrollValueChange (scrollValue) {
  //   if (!this.state.contentScrollViewIsScrolling) {
  //     this._tabsScrollViewRestingPosition = this._tabsScrollViewPosition
  //     this._contentScrollViewIsScrolling = true
  //     this.setState({
  //       contentScrollViewIsScrolling: true
  //     })
  //   }
  //   const { visibleTab, tabs } = this._readState()
  //   const indicatorPosition = scrollValue / getDeviceWidth()
  //   const tabKeys = Object.keys(tabs)
  //   const visibleTabIndex = tabKeys.indexOf(visibleTab)
  //   const direction = (indicatorPosition < visibleTabIndex) ? 'left' : 'right'
  //
  //   let percentage = indicatorPosition - Math.floor(indicatorPosition) || 1
  //   if (direction === 'left') percentage = 1 - percentage
  //
  //   const lastTab = (direction === 'right')
  //     ? tabKeys[Math.floor(indicatorPosition)]
  //     : tabKeys[Math.ceil(indicatorPosition)]
  //
  //   const nextTab = (direction === 'right')
  //     ? tabKeys[Math.ceil(indicatorPosition)]
  //     : tabKeys[Math.floor(indicatorPosition)]
  //
  //   const nextTabsScrollViewPosition = this._tabMeasurements[nextTab].left - (getDeviceWidth()/2) + (this._tabMeasurements[nextTab].width/2)
  //   const currentScrollViewPosition = (
  //     nextTabsScrollViewPosition - (
  //       (nextTabsScrollViewPosition - this._tabsScrollViewRestingPosition)
  //       *
  //       (1 - percentage === 1 ? 0 : 1 - percentage)
  //     )
  //   )
  //
  //   this._tabsScrollView.scrollTo({
  //     x: currentScrollViewPosition,
  //     animated: false
  //   })
  //
  //   const lastTabMeasurements = this._tabMeasurements[lastTab]
  //   const nextTabMeasurments = this._tabMeasurements[nextTab]
  //   const newLeft = nextTabMeasurments.left - ((nextTabMeasurments.left - lastTabMeasurements.left) * (1 - percentage))
  //   const newWidth = nextTabMeasurments.width - ((nextTabMeasurments.width - lastTabMeasurements.width) * (1 - percentage))
  //
  //   this.state.tabUnderlineLeft.setValue(newLeft)
  //   this.state.tabUnderlineWidth.setValue(newWidth)
  // }

  render () {
    const state = this._readState()
    if (!state) return null

    const { renderDistance } = this.props
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
        <ScrollView
          ref={sv => this._tabsScrollView = sv}
          horizontal
          directionalLockEnabled
          showsHorizontalScrollIndicator={false}
          automaticallyAdjustContentInsets={false}
          style={{height: 50}}
          onScroll={e => {
            this._tabsScrollViewPosition = e.nativeEvent.contentOffset.x
            // console.log(e.nativeEvent.contentOffset.x)
          }}
          onMomentumScrollEnd={e => {
            this._tabsScrollViewRestingPosition = e.nativeEvent.contentOffset.x
          }}
          onLayout={e => {
            this._tabsScrollViewRestingPosition = 0
          }}
          scrollEventThrottle={16}
          contentOffset={{ x: -50 }}
          scrollEnabled={false}
        >
          {Object.keys(tabs).map(key => tabs[key]).map(({ color, title }, index) => {
            // console.log(color, title)
            return (
              <TouchableOpacity
                key={index}
                style={{ padding: 15, paddingBottom: 35 }}
                onLayout={e => {
                  const { x, width, height, } = e.nativeEvent.layout
                  this._tabMeasurements[title] = { left: x, right: x + width, width, height }
                }}
                onPress={() => {
                  const index = tabKeys.indexOf(title)
                  this._tabWasPressed = title
                  this._contentScrollView.scrollTo({ x: index * getDeviceWidth() })
                }}
              >
                <Animated.Text style={{
                  fontSize: 12,
                  fontWeight: '700',
                  color: color.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['rgb(188, 188, 188)', 'rgb(48, 192, 255)']
                  })
                }}>{title.toUpperCase()}</Animated.Text>
              </TouchableOpacity>
            )

          })}
          <View style={{
            position: 'absolute',
            height: 2,
            backgroundColor: 'rgba(255, 0, 0, 0.0)',
            bottom: 0,
            left: -getDeviceWidth(),
            right: -getDeviceWidth()
          }}></View>
          <Animated.View style={{
            position: 'absolute',
            height: 3,
            backgroundColor: '#09b4ff',
            bottom: 0,
            left: this.state.tabUnderlineLeft,
            width: this.state.tabUnderlineWidth,
          }}></Animated.View>
        </ScrollView>
        <ScrollView
          ref={sv => this._contentScrollView = sv}
          horizontal
          pagingEnabled
          bounces={true}
          directionalLockEnabled
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          automaticallyAdjustContentInsets={false}
          onMomentumScrollEnd={(e) => {
            const offsetX = e.nativeEvent.contentOffset.x
            const page = Math.round(offsetX / getDeviceWidth())
            const visibleTabKey = tabKeys[page]
            const visibleTab = tabs[visibleTabKey]
            this._updateVisibleTab(visibleTab.title)
            this.setState({ contentScrollViewIsScrolling: false })

            this._contentScrollViewIsScrolling = false
            this._contentScrollViewRestingPosition = offsetX
          }}
          onMomentumScrollBegin={e => {
            this._contentScrollViewIsScrolling = true
          }}
          onTouchStartCapture={e => {
            console.log('Touch captured. Scrolling=' + this._contentScrollViewIsScrolling)
            if (this._contentScrollViewIsScrolling) {
              this._contentScrollViewRestingPosition = this._contentScrollViewPosition
            }
          }}
          onScroll={e => {
            const offsetX = e.nativeEvent.contentOffset.x
            this._contentScrollViewPosition = offsetX
            this.onContentScrollValueChange(offsetX)
          }}
          scrollEventThrottle={16}
          style={{
            height: 607
          }}
        >
          {tabKeys.map((key, index) => {
            const viewStyle = { width: getDeviceWidth() }
            if (renderedTabKeys.indexOf(key) === -1){
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

        </ScrollView>

      </View>
    )
  }
}

const mapChildrenToTabs = (children) => React.Children.map(
  children,
  child => child.type === Tab && child.props
).filter(tab => tab !== false)
