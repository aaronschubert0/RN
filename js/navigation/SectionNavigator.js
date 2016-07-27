import React, { Component } from 'react'
import { Image, View, ScrollView } from 'react-native'
import Indicator from './Indicator'
import LinearGradient from 'react-native-linear-gradient'
import SectionButton from './SectionButton'
import TransitionalImage from '../components/TransitionalImage'
import calculateScrollPosition from './calculate-scroll-position'

export default class SectionNavigator extends Component {
  constructor (props) {
      super(props)
      this.buttons = []
      this.measurements = undefined
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loaded && nextProps.sections !== this.props.sections) {
      this.measureSections()
    }
  }

  selectSectionAnimated (buttonInstance, index, totalSections, callback) {
    buttonInstance.measure((...measurements) => {
      const [ offsetX, _, width ] = measurements
      const { shouldScroll, x, y } = calculateScrollPosition(measurements, index, totalSections)
      if (shouldScroll) {
        this.scrollView.scrollTo({ x, y })
      }
      callback(offsetX, width)
    })
  }

  measureSections() {
    requestAnimationFrame(() => {
      const measurementPromises = this.buttons.map(({ index, button }) => new Promise((resolve, reject) => {
        button.measure((...measurements) => resolve({ index, measurements }))
      }))

      Promise.all(measurementPromises).then((sections) => {
        const measurementsObject = sections.reduce((measurementsObject, measurement) => {
          measurementsObject[measurement.index] = measurement.measurements
          return measurementsObject
        }, {})
        this.measurements = measurementsObject
        this.props.onSectionsRendered(measurementsObject)
      })
    })
  }

  componentDidMount () {
    // this.measureSections()
  }

  render () {
    const { sections, activeSectionSlug, onSelectSection, indicatorPos } = this.props
    const { title, headerImage } = sections[activeSectionSlug]
    return (
      <TransitionalImage
        url={headerImage}
        style={{ alignSelf: 'stretch', paddingTop: 30 }}>
        <LinearGradient
          locations={[ 0, 1 ]}
          colors={[ 'rgba(0,0,0,0)', 'rgba(0,0,0,0.6)' ]}>
          <View style={{ backgroundColor: 'transparent', alignSelf: 'center', marginBottom: 10 }}>
            <Image source={{ uri: 'https://raw.githubusercontent.com/stvgroup/Metropolis-iOS/master/Metropolis/Images.xcassets/logoLarge.imageset/logoLarge%402x.png?token=AFFkut9t4YJEnEOKD-gjh-DXq7fDUkyuks5XXqjtwA%3D%3D' }} style={{ width: 100, height: 35 }}/>
          </View>
          <ScrollView
            ref={sv => this.scrollView = sv}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{
              marginTop: -100,
              backgroundColor: 'transparent'
            }}>
            {this.props.loaded ? Object.keys(sections).map((slug, index, sectionKeys) => (
              <SectionButton
                key={index}
                onMount={(inst) => {
                  this.buttons.push({ index, button: inst })
                  if (slug !== activeSectionSlug) return
                  this.selectSectionAnimated(
                    inst,
                    index,
                    sectionKeys.length,
                    (offsetX, width) => onSelectSection(index, offsetX, width)
                  )
                }}
                onActivate={(inst) => {
                  this.selectSectionAnimated(
                    inst,
                    index,
                    sectionKeys.length,
                    (offsetX, width) => onSelectSection(index, offsetX, width)
                  )
                }}
                onPress={({ _targetInst: inst }) => {
                  this.selectSectionAnimated(
                    inst,
                    index,
                    sectionKeys.length,
                    (offsetX, width) => onSelectSection(index, offsetX, width)
                  )
                }}
                active={slug === activeSectionSlug}
                label={sections[slug].title}
              />
          )) : null}
            <Indicator indicatorPos={this.props.indicatorPos}/>
          </ScrollView>
        </LinearGradient>
      </TransitionalImage>
    )
  }
}
