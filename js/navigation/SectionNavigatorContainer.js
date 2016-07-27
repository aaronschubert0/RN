import React, { Component } from 'react'
import { View, Image, ScrollView, Dimensions } from 'react-native'
import SectionNavigator from './SectionNavigator'
import Sections from '../../json/sections-1.json'


const preview = [1, 2, 3, 4, 5, 6]

export default class SectionNavigatorContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      activeSlug: this.props.activeSlug,
      indicatorPos: -50,
      sectionMeasurements: {}
    }
    this.direction = undefined
    this.nextSlug = this.props.activeSlug
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.activeSlug !== this.state.activeSlug) {
      this.nextSlug = nextProps.activeSlug
      this.setState({
        activeSlug: nextProps.activeSlug
      })
    }
  }

  render () {
    return (
      <View>
        <SectionNavigator
          loaded={this.props.loaded}
          sections={this.props.sections}
          activeSectionSlug={this.state.activeSlug}
          direction={this.direction}
          indicatorPos={this.props.indicatorPos}
          onSectionsRendered={sectionMeasurements => {
            this.props.onSectionsRendered(sectionMeasurements)
            this.setState({ sectionMeasurements })
          }}
          onSelectSection={(index, offsetX, width) => {
            console.log('onSelectSection ', index)
           this.props.onSelectSection(index)
          }}
        />
    </View>
    )
  }
}
