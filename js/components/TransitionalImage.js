import React, { Component } from 'react'
import { View, Animated } from 'react-native'

export default class TransitionalImage extends Component {
  static propTypes = {
    url: React.PropTypes.string.isRequired,
    transitionDuration: React.PropTypes.number
  }

  static defaultProps = {
    transitionDuration: 500
  }

  constructor (props) {
    super(props)
    this.state = {
      previousImageUrl: undefined,
      currentImageUrl: this.props.url,
      currentImageOpacity: new Animated.Value(0),
      isTransitioning: false
    }
  }

  componentDidMount () {
    Animated.timing(
      this.state.currentImageOpacity,
      {
        toValue: 1,
        duration: this.props.transitionDuration
      }
    ).start()
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.url !== this.props.url) {
      this.setState({
        previousImageUrl: this.state.currentImageUrl,
        currentImageUrl: nextProps.url,
        currentImageOpacity: new Animated.Value(0),
        isTransitioning: true
      }, () => {
        Animated.timing(
          this.state.currentImageOpacity,
          {
            toValue: 1,
            duration: this.props.transitionDuration
          }
        ).start(() => {
          this.setState({
            isTransitioning: false
          })
        })
      })
    }
  }

  render () {
    return (
      <View style={this.props.style}>
        <Animated.Image
          key={this.state.previousImageUrl}
          source={{ uri: this.state.previousImageUrl }}
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }}
        />
        <Animated.Image
          key={this.state.currentImageUrl}
          source={{ uri: this.state.currentImageUrl }}
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            alignSelf: 'stretch',
            opacity: this.state.currentImageOpacity
          }}
        />

        <View>
          {this.props.children}
        </View>
      </View>
    )
  }
}
