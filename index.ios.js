import React, { Component } from 'react'
import { AppRegistry, View, Text, Image, ScrollView, TouchableWithoutFeedback, Animated, StyleSheet } from 'react-native'
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
});

class FullScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      scale: new Animated.Value(1),
      position: 'relative'
    }
  }

  render() {
    return (
      <Animated.View style={[(this.state.position === 'absolute') ? styles.visible : styles.notVisible, { position: this.state.position, zIndex: (this.state.position === 'absolute') ? 5 : 0, height: this.state.height, transform: [{scale: this.state.scale}] }]}>
      <TouchableWithoutFeedback disabled={(this.state.position === 'absolute')} onPress={() => {
        const currentPosition = this.state.position
        if (currentPosition === 'relative') {
          this.props.onPositionChange('absolute')
          this.setState({position: 'absolute'})
        }
        Animated.sequence([
          Animated.timing(this.state.scale, {toValue: 1.1, duration: 150}),
          Animated.timing(this.state.scale, {toValue: 1, duration: 150})
        ]).start(() => {
          if (currentPosition === 'absolute') {
            this.props.onPositionChange('relative')
            this.setState({position: 'relative'})
          }
        })
      }}>
      <View style={[(this.state.position === 'absolute') ? {height: 610, width: 375, paddingBottom: 15} : {}, {backgroundColor: 'white'}]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {this.props.children}
        </ScrollView>
      </View>
      </TouchableWithoutFeedback>
    </Animated.View>
    )
  }
}

const InfoPlanel = ({ date, lastUpdatedTime }) => {
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

class One extends Component {

  constructor(props) {
    super(props)
    this.state = {
      position: 'relative'
    }
  }

  _updateToNewPosition(newPosition) {
    this.setState({ position: newPosition })
    this._contentScrollView.scrollTo({x:0, y:0, animated:false})
  }

  render() {
    return (
      <ScrollView scrollEnabled={(this.state.position === 'relative')} ref={sv => this._contentScrollView = sv}>
      <InfoPlanel date="TUESDAY 12 JULY" lastUpdatedTime="10:44am" />
      <FullScreen onPositionChange={(newPosition) => {
        this._updateToNewPosition(newPosition)
       }}>
       {(this.state.position === 'relative') ?
       <View>
       <View style={{paddingLeft: 20, paddingTop: 10, paddingBottom: 15, paddingRight: 20}}>
         <Text style={{fontSize: 22, fontWeight: '700', paddingBottom: 15}}>
         Sturgeon: Tackling 'unnacceptable' child poverty a priority
         </Text>
         <Meta time="34 MIN" region="GLASGOW & WEST"/>
       </View>
       <Image
       source={{uri: 'https://files.stv.tv/imagebase/461/w768/461445-daniel-roche-left-ramona-marquez-and-tyger-drew-honey-in-2011.jpg'}}
       style={{width: 375, height: 211}}
       />
       </View>
         :
        <View style={{paddingLeft: 20, paddingTop: 10, paddingBottom: 15, paddingRight: 20}}>
          <Text style={{fontSize: 22, fontWeight: '700', paddingBottom: 15}}>
          Sturgeon: Tackling 'unnacceptable' child poverty a priority
          </Text>
          <Text style={{fontSize: 16, paddingBottom: 15}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id pretium mi, sit amet volutpat sem. </Text>
          <Image
          source={{uri: 'https://files.stv.tv/imagebase/461/w768/461445-daniel-roche-left-ramona-marquez-and-tyger-drew-honey-in-2011.jpg'}}
          style={{width: 375, height: 211, marginLeft: -20}}/>
          <View style={{backgroundColor: 'white', height: 550}}><Text style={{paddingTop: 15, fontSize: 16}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id pretium mi, sit amet volutpat sem. Nullam gravida orci at rhoncus tincidunt. Etiam ullamcorper tortor et mattis tempor. Mauris auctor sed mauris sit amet maximus. Praesent porta neque ut turpis tempor vulputate. In feugiat, mi eu tincidunt euismod, nunc mi efficitur velit, sit amet ultrices dui diam et ex. Ut luctus bibendum justo in porttitor. </Text></View>
        </View> }
      </FullScreen>
      <Divider />

      <FullScreen onPositionChange={(newPosition) => {
        this._updateToNewPosition(newPosition)
       }}>
       {(this.state.position === 'relative') ?
        <View style={{flexDirection: 'row', paddingLeft: 20, paddingRight: 20}}>
        <Image
          source={{uri: 'https://files.stv.tv/imagebase/13/w768/13179-crash-at-busy-city-roundabout.jpg'}}
          style={{width: 150, height: 84, marginRight: 10}}
          />
          <View style={{flex: 1}}>
            <Text style={{fontSize: 14, fontWeight: '500', paddingBottom: 5}}>
            Murder probe after elderly man stabbed to death in street
            </Text>
            <Meta time="34 MIN" region="GLASGOW & WEST"/>
          </View>
        </View> :
        <View style={{paddingLeft: 20, paddingRight: 20}}>
          <Text style={{fontSize: 20, fontWeight: '700', paddingBottom: 10, paddingTop: 10}}>
          Murder probe after elderly man stabbed to death in street
          </Text>
          <Text style={{fontSize: 16}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id pretium mi, sit amet volutpat sem. </Text>
          <Image
            source={{uri: 'https://files.stv.tv/imagebase/13/w768/13179-crash-at-busy-city-roundabout.jpg'}}
            style={{height: 211, marginTop: 10, marginLeft: -20, marginRight: -20}}
            />
            <Text style={{paddingTop: 10, fontSize: 16}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id pretium mi, sit amet volutpat sem. Nullam gravida orci at rhoncus tincidunt. Etiam ullamcorper tortor et mattis tempor. Mauris auctor sed mauris sit amet maximus. Praesent porta neque ut turpis tempor vulputate. In feugiat, mi eu tincidunt euismod, nunc mi efficitur velit, sit amet ultrices dui diam et ex. Ut luctus bibendum justo in porttitor. </Text>
            <Text style={{paddingTop: 10, fontSize: 16}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id pretium mi, sit amet volutpat sem. Nullam gravida orci at rhoncus tincidunt. Etiam ullamcorper tortor et mattis tempor. Mauris auctor sed mauris sit amet maximus. Praesent porta neque ut turpis tempor vulputate. In feugiat, mi eu tincidunt euismod, nunc mi efficitur velit, sit amet ultrices dui diam et ex. Ut luctus bibendum justo in porttitor. </Text>
        </View>
      }
      </FullScreen>
      <Divider />

      <View style={{paddingLeft: 20, paddingRight: 20}}>
        <Text style={{fontSize: 14, fontWeight: '500', paddingBottom: 5}}>
        Man accussed of murdering police officer to appear in court
        </Text>
        <Meta time="34 MIN" region="GLASGOW & WEST"/>
      </View>
      <Divider />

      <View style={{paddingLeft: 20, paddingTop: 10, paddingBottom: 15, paddingRight: 20}}>
        <Text style={{fontSize: 22, fontWeight: '700', paddingBottom: 15}}>
        Sturgeon: Tackling 'unnacceptable' child poverty a priority
        </Text>
        <Meta time="34 MIN" region="GLASGOW & WEST"/>
      </View>
      <Image
      source={{uri: 'https://files.stv.tv/imagebase/461/w768/461445-daniel-roche-left-ramona-marquez-and-tyger-drew-honey-in-2011.jpg'}}
      style={{width: 375, height: 211}}/>
      <Divider />

      <View style={{flexDirection: 'row', paddingLeft: 20, paddingRight: 20}}>
      <Image
        source={{uri: 'https://files.stv.tv/imagebase/13/w768/13179-crash-at-busy-city-roundabout.jpg'}}
        style={{width: 150, height: 84, marginRight: 10}}
        />
        <View style={{flex: 1}}>
          <Text style={{fontSize: 14, fontWeight: '500', paddingBottom: 5}}>
          Murder probe after elderly man stabbed to death in street
          </Text>
          <Meta time="34 MIN" region="GLASGOW & WEST"/>
        </View>
      </View>
      <Divider />

      <View style={{paddingLeft: 20, paddingRight: 20}}>
        <Text style={{fontSize: 14, fontWeight: '500', paddingBottom: 5}}>
        Man accussed of murdering police officer to appear in court
        </Text>
        <Meta time="34 MIN" region="GLASGOW & WEST"/>
      </View>
      <Divider />

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
