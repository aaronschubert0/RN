import React, { Component, PropTypes, findNodeHandle } from 'react'
import { AppRegistry, View, Text, Image, ScrollView, TouchableWithoutFeedback, Animated, StyleSheet, Modal, LayoutAnimation, NativeMethodsMixin, PanResponder } from 'react-native'
import { TabNavigator, Tab } from './js/TabNavigator/'
const Metro = () => {
  return (
    <View style={{ marginTop: 20 }}>
      <TabNavigator renderDistance={4}>
        <Tab title="Breaking News" component={One} />
        <Tab title="Top Stories" component={Two} />
        <Tab title="Glasgow / West" component={Three} />
        <Tab title="Four" component={Four} />
        <Tab title="Five" component={Five} />
        <Tab title="Six" component={Six} />
        <Tab title="Seven" component={Seven} />
        <Tab title="Eight" component={Eight} />
      </TabNavigator>
    </View>

  )
}

const Meta = ({ time, region }) => {
  return (
    <View style={{flexDirection: 'row'}}>
      <Text style={{fontSize: 11, fontWeight: '500', color: '#09b4ff'}}>{time + ' / '}</Text>
      <Text style={{fontSize: 11, fontWeight: '500', color: 'gray'}}>{region}</Text>
    </View>
  )
}

const Divider = () => {
  return (
    <View style={{flex: 1, backgroundColor: '#D8D8D8', height: 0.5, marginLeft: 15, marginRight: 15, marginTop: 10, marginBottom: 10}} />
  )
}

var styles = StyleSheet.create({
  notVisible: {
  },
  visible: {
    top: 0,
  },
  scrollNotVisible: {

  },
  scrollVisible: {
    paddingBottom: 10,
    height: 595,
    width: 375
  }
})



const FullscreenOnPress = React.createClass({
  mixins: [NativeMethodsMixin],
  propTypes: {
    fullscreenProp: PropTypes.string.isRequired
  },
  componentWillUpdate () {
    LayoutAnimation.easeInEaseOut()
  },
  getInitialState () {
    return {
      floating: false,
      originalViewHidden: false,
      fullscreen: false,
      fadeAnim: new Animated.Value(0)
    }
  },
  componentWillMount () {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
      onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
      onPanResponderGrant: this._handlePanResponderGrant,
      onPanResponderMove: this._handlePanResponderMove,
      onPanResponderRelease: this._handlePanResponderEnd,
      onPanResponderTerminate: this._handlePanResponderEnd,
    })
  },
  getInnerModalStyle () {
    const { originalViewMeasurements } = this.state
    const { pX: left, pY: top, width, height } = originalViewMeasurements
    return this.state.fullscreen ? { top: 25 } : {
      position: 'absolute',
      top,
      left,
      width,
      height
    }
  },
  getBackgroundModalStyle () {
    return {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      backgroundColor: 'white',
      opacity: this.state.fadeAnim
    }
  },
  onTouchablePress () {
    this.setState({ floating: true }, () => {
      requestAnimationFrame(() => {
      })
      Animated.timing(
        this.state.fadeAnim,
        { toValue: 1, duration: 200 }
      ).start()
      requestAnimationFrame(() => {
        this.setState({ fullscreen: true, originalViewHidden: true })
      })
    })
  },
  _handleStartShouldSetPanResponder () {
    return true
  },
  _handleMoveShouldSetPanResponder () {
    return true
  },
  _handlePanResponderGrant () {
    this.setState({ fullscreen: false }, () => {
      Animated.timing(
        this.state.fadeAnim,
        { toValue: 0, duration: 200 }
      ).start()
      setTimeout(() => {
        this.setState({
          floating: false,
          originalViewHidden: false
        })
      }, 500)
    })
  },
  _handlePanResponderMove (e, gestureState) {
    console.log(gestureState)
  },
  _handlePanResponderEnd () {

  },
  render() {
    const { floating, fullscreen, originalViewHidden } = this.state
    const { children, fullscreenProp } = this.props
    const clonedChildren = React.Children.map(
      children,
      (child, index) => React.cloneElement(child, {
        [fullscreenProp]: fullscreen,
        key: index
      })
    )

    return (
      <TouchableWithoutFeedback
        onPress={() => {
          this.refs.originalView.measure((x, y, width, height, pX, pY) => {
            const measurements = { x, y, width, height, pX, pY }
            this.setState({ originalViewMeasurements: measurements }, this.onTouchablePress)
          })
        }}
      >
        <View
          ref="originalView"
          style={{
            opacity: originalViewHidden ? 0 : 1
          }}
        >
          {children}

          {floating && (
            <Modal transparent={true}>
              <Animated.View style={this.getBackgroundModalStyle()}></Animated.View>
              <View
                style={{
                  ...this.getInnerModalStyle(),
                  overflow: 'hidden',
                  flex: 1
                }}
                {...this._panResponder.panHandlers}
              >
                {clonedChildren}
              </View>
            </Modal>
          )}
        </View>
      </TouchableWithoutFeedback>
    )
  }
})

class Article extends Component {
  render () {
    const { article, expanded } = this.props
    const image = (
      <Image
        key="image"
        source={{ uri: article.imageURL }}
        style={{
          // flex: 1,
          width: expanded ? 375 : 150,
          height: expanded ? 211 : 84,
          marginRight: expanded ? 0 : 10
        }}
      />
    )

    const heading = (
      <View
        key="heading"
        style={{ flex: 1 }}
      >
        <Text style={{
          fontSize: expanded ? 22 : 14,
          fontWeight: expanded ? '700' : '500',
          paddingBottom: expanded ? 15 : 5
        }}>
          {article.title}
        </Text>
        <Meta time={article.time} region={article.region}/>
      </View>
    )

    const body = (
      <Text key="body" style={{ color: 'white', fontSize: 20 }}>
        Hello World!
      </Text>
    )

    const children = expanded ? [
      heading,
      image
    ] : [
      image,
      heading
    ]

    return (
      <View
        style={{
          flexDirection: expanded ? 'column' : 'row',
          marginBottom: 10,
          alignItems: 'center'
        }}
      >
        {children}
      </View>
    )
  }
}

class One extends Component {

  render() {
    return (
      <ScrollView ref={sv => this._contentScrollView = sv}>
        <InfoPanel date="TUESDAY 12 JULY" lastUpdatedTime="10:44am" />
        <FullscreenOnPress fullscreenProp="expanded">
          <Article
            article={{
              title: "Sturgeon: Tackling 'unnacceptable' child poverty a priority",
              imageURL: 'https://files.stv.tv/imagebase/461/w768/461445-daniel-roche-left-ramona-marquez-and-tyger-drew-honey-in-2011.jpg',
              region: "GLASGOW & WEST",
              time: "34 MIN"
            }}
          />
        </FullscreenOnPress>
        <FullscreenOnPress fullscreenProp="expanded">
          <Article
            article={{
              title: "Sturgeon: Tackling 'unnacceptable' child poverty a priority",
              imageURL: 'https://files.stv.tv/imagebase/461/w768/461445-daniel-roche-left-ramona-marquez-and-tyger-drew-honey-in-2011.jpg',
              region: "GLASGOW & WEST",
              time: "34 MIN"
            }}
          />
        </FullscreenOnPress>
        <FullscreenOnPress fullscreenProp="expanded">
          <Article
            article={{
              title: "Sturgeon: Tackling 'unnacceptable' child poverty a priority",
              imageURL: 'https://files.stv.tv/imagebase/461/w768/461445-daniel-roche-left-ramona-marquez-and-tyger-drew-honey-in-2011.jpg',
              region: "GLASGOW & WEST",
              time: "34 MIN"
            }}
          />
        </FullscreenOnPress>
        <FullscreenOnPress fullscreenProp="expanded">
          <Article
            article={{
              title: "Sturgeon: Tackling 'unnacceptable' child poverty a priority",
              imageURL: 'https://files.stv.tv/imagebase/461/w768/461445-daniel-roche-left-ramona-marquez-and-tyger-drew-honey-in-2011.jpg',
              region: "GLASGOW & WEST",
              time: "34 MIN"
            }}
          />
        </FullscreenOnPress>
        <FullscreenOnPress fullscreenProp="expanded">
          <Article
            article={{
              title: "Sturgeon: Tackling 'unnacceptable' child poverty a priority",
              imageURL: 'https://files.stv.tv/imagebase/461/w768/461445-daniel-roche-left-ramona-marquez-and-tyger-drew-honey-in-2011.jpg',
              region: "GLASGOW & WEST",
              time: "34 MIN"
            }}
          />
        </FullscreenOnPress>
        <FullscreenOnPress fullscreenProp="expanded">
          <Article
            article={{
              title: "Sturgeon: Tackling 'unnacceptable' child poverty a priority",
              imageURL: 'https://files.stv.tv/imagebase/461/w768/461445-daniel-roche-left-ramona-marquez-and-tyger-drew-honey-in-2011.jpg',
              region: "GLASGOW & WEST",
              time: "34 MIN"
            }}
          />
        </FullscreenOnPress>
      </ScrollView>
    )
  }

}

const Two = () => {
  return (
    <One />
  )
}
const Three = () => {
  return (
    <One />
  )
}
const Four = () => {
  return (
    <One />
  )
}
const Five = () => {
  return (
    <One />
  )
}
const Six = () => {
  return (
    <One />
  )
}
const Seven = () => {
  return (
    <One />
  )
}
const Eight = () => {
  return (
    <One />
  )
}

AppRegistry.registerComponent('Metro', () => Metro)

const InfoPanel = ({ date, lastUpdatedTime }) => {
  return (
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 20, paddingRight: 20, paddingTop: 15, paddingBottom: 5 }}>
        <Text style={{fontSize: 12, fontWeight: '600', color: 'gray'}}>{date}</Text>
        <Text style={{fontSize: 12, color: 'gray'}}>{'Last updated ' + lastUpdatedTime}</Text>
      </View>
      <Divider />
    </View>
  )
}
