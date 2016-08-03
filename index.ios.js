import React, { Component, PropTypes } from 'react'
import { AppRegistry, View, Text, Image, ScrollView, TouchableWithoutFeedback, Animated, StyleSheet, Modal } from 'react-native'
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

const Meta = ({ time, section, style }) => {
  return (
    <View style={[ style, {flexDirection: 'row'} ]}>
      { time ? <Text style={{fontSize: 11, fontWeight: '500', color: '#09b4ff'}}>{time + ' / '}</Text> : null }
      { section ? <Text style={{fontSize: 11, fontWeight: '500', color: 'gray'}}>{section}</Text> :  null }
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

class FullscreenOnPress extends Component {

  static propTypes = {
    fullscreenProp: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      scale: new Animated.Value(1),
      fullscreen: false
    }
  }

  render() {
    const { fullscreen } = this.state
    const { children, fullscreenProp } = this.props
    return (
      <Animated.View style={[(this.state.position === 'absolute') ? styles.visible : styles.notVisible, { height: this.state.height, transform: [{scale: this.state.scale}] }]}>
      <TouchableWithoutFeedback disabled={fullscreen} onPress={() => {this.setState({ fullscreen: true })}}>
      {(!fullscreen) ?
        <View>
          {React.Children.map(children, (child, index) => {
            return React.cloneElement(child, {
              [fullscreenProp]: fullscreen,
              key: index
            })
          })}
        </View>
        :
        <Modal style={{paddingBottom: 15, backgroundColor: 'white', paddingTop: 20}}>
        {React.Children.map(children, (child, index) => {
            return React.cloneElement(child, {
              [fullscreenProp]: fullscreen,
              key: index
            })
          })}
        </Modal>
      }

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

class FadeInImage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      opacity: new Animated.Value(0)
    }
  }

  onLoad() {
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 500
    }).start()
  }

  render() {
    console.log('render')
    return (
      <View
        style={this.props.style}
        backgroundColor={'white'}
      >
        <Animated.Image
          style={[{opacity: this.state.opacity, width: this.props.style.width, height: this.props.style.height }]}
          source={this.props.source}
          onLoad={this.onLoad.bind(this)} />
      </View>
    )
  }

}

const FullScreenArticle = ({title, imageURL}) => {
  return (
    <ScrollView style={{paddingLeft: 20, paddingRight: 20, paddingTop: 15}}>
      <Text style={{fontSize: 20, fontWeight: '700', paddingBottom: 10, paddingTop: 10}}>
        {title}
      </Text>
      <Text style={{fontSize: 16}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id pretium mi, sit amet volutpat sem. </Text>
      <FadeInImage
        source={{uri: imageURL}}
        style={{height: 211, marginTop: 10, marginLeft: -20, marginRight: -20}}
        />
        <Text style={{marginTop: 10, fontSize: 16}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id pretium mi, sit amet volutpat sem. Nullam gravida orci at rhoncus tincidunt. Etiam ullamcorper tortor et mattis tempor. Mauris auctor sed mauris sit amet maximus. Praesent porta neque ut turpis tempor vulputate. In feugiat, mi eu tincidunt euismod, nunc mi efficitur velit, sit amet ultrices dui diam et ex. Ut luctus bibendum justo in porttitor. </Text>
        <Text style={{paddingTop: 10, fontSize: 16}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id pretium mi, sit amet volutpat sem. Nullam gravida orci at rhoncus tincidunt. Etiam ullamcorper tortor et mattis tempor. Mauris auctor sed mauris sit amet maximus. Praesent porta neque ut turpis tempor vulputate. In feugiat, mi eu tincidunt euismod, nunc mi efficitur velit, sit amet ultrices dui diam et ex. Ut luctus bibendum justo in porttitor. </Text>
    </ScrollView>
  )
}

const BigImageArticlePreview = ({ title, imageURL, section, time }) => {
  return (
    <View>
    <View style={{paddingLeft: 20, paddingTop: 10, paddingBottom: 15, paddingRight: 20}}>
      <Text style={{fontSize: 22, fontWeight: '700', paddingBottom: 15}}>
      {title}
      </Text>
      <Meta time={time} section={section}/>
    </View>
    <Image
    source={{uri: imageURL}}
    style={{width: 375, height: 211}}
    />
    </View>
  )
}

const SmallImageArticlePreview = ({ title, imageURL, section, time }) => {
  return (
    <View style={{flexDirection: 'row', paddingLeft: 20, paddingRight: 20}}>
    <Image
      source={{uri: imageURL}}
      style={{width: 100, height: 56, marginRight: 10}}
      />
      <View style={{flex: 1}}>
        <Text style={{fontSize: 14, fontWeight: '500', paddingBottom: 5}}>
        {title}
        </Text>
        <Meta time={time} section={section}/>
      </View>
    </View>
  )
}

const OpinionArticlePreview = ({ author, quote, section }) => {
  return (
    <View style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 5 }}>
        <Text style={{ fontFamily: 'TimesNewRomanPS-BoldItalicMT', fontSize: 18, color: '#09b4ff', paddingBottom: 10}}>
        {author + ' / '}
        <Text style={{ fontSize: 18, color: 'black', flex: 1 }}>
          {quote}
        </Text>
        </Text>
      <Meta section={section} style={{ paddingBottom: 5}}/>
    </View>
  )
}

const LiveArticlePreview = ({ title, imageURL, section }) => {
  return (
    <View style={{flexDirection: 'row', paddingLeft: 20, paddingRight: 20}}>
    <Image
      source={{uri: imageURL}}
      style={{width: 100, height: 56, marginRight: 10}}
      />
      <View style={{flex: 1}}>
        <Text style={{fontSize: 14, fontWeight: '500', paddingBottom: 5}}>
        {title}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ padding: 1.5, paddingLeft: 7, paddingRight: 7, borderRadius: 2, backgroundColor: '#09b4ff', marginRight: 5}}>
            <Text style={{ color: 'white', fontSize: 10, fontWeight: '600' }}>{'LIVE'}</Text>
          </View>
          <Meta section={section}/>
        </View>
      </View>
    </View>
  )
}

const NativeAdPreview = ({ title, imageURL, section }) => {
  return (
    <View style={{flexDirection: 'row', paddingLeft: 20, paddingRight: 20}}>
    <Image
      source={{uri: imageURL}}
      style={{width: 100, height: 56, marginRight: 10}}
      />
      <View style={{flex: 1}}>
        <Text style={{fontSize: 14, fontWeight: '500', paddingBottom: 5}}>
        {title}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ padding: 1.5, paddingLeft: 7, paddingRight: 7, borderRadius: 2, backgroundColor: '#F4DB43', marginRight: 5}}>
            <Text style={{ color: 'white', fontSize: 10, fontWeight: '600' }}>{'SPONSORED'}</Text>
          </View>
          <Meta section={section}/>
        </View>
      </View>
    </View>
  )
}

const ArticleSwitcher = ({ fullscreen, article, children }) => {
  return (
    fullscreen ? <FullScreenArticle title={article.title} imageURL={article.imageURL}/> : children
  )
}

const Article = ({ article }) => {

  function _previewForArticleType(type) {
    if (type === 'bigimage') {
      return <BigImageArticlePreview title={article.title} imageURL={article.imageURL} section={article.section} time={article.time}/>
    } else if (type === 'smallimage') {
      return <SmallImageArticlePreview title={article.title} imageURL={article.imageURL} section={article.section} time={article.time}/>
    } else if (type === 'opinion') {
      return <OpinionArticlePreview author={article.author} quote={article.quote} section={article.section} />
    } else if (type === 'live') {
      return <LiveArticlePreview title={article.title} imageURL={article.imageURL} section={article.section} />
    } else if (type === 'ad') {
      return <NativeAdPreview title={article.title} imageURL={article.imageURL}/>
    }
  }

  return (
    <View>
      <FullscreenOnPress fullscreenProp="fullscreen">
        <ArticleSwitcher article={article}>
          {_previewForArticleType(article.type)}
        </ArticleSwitcher>
      </FullscreenOnPress>
    </View>
  )
}



class One extends Component {

  render() {
    return (
      <ScrollView>
      <InfoPlanel date="TUESDAY 12 JULY" lastUpdatedTime="10:44am" />
      <Article article={{
          title: "Sturgeon: Tackling 'unnacceptable' child poverty a priority",
          imageURL: 'https://files.stv.tv/imagebase/461/w768/461445-daniel-roche-left-ramona-marquez-and-tyger-drew-honey-in-2011.jpg',
          section: "GLASGOW & WEST",
          time: "34 MIN",
          type: "bigimage"
      }} />
      <Divider />
      <Article article={{
          title: "Murder probe after elderly man stabbed to death in street",
          imageURL: 'https://files.stv.tv/imagebase/13/w768/13179-crash-at-busy-city-roundabout.jpg',
          section: "GLASGOW & WEST",
          time: "34 MIN",
          type: "smallimage"
      }} />
      <Divider />

      <Article article={{
          author: "Melanie Reid",
          quote: "We need leaders like Theresa May and Nicola Sturgeon in a world gone mad",
          section: "POLITICS",
          type: "opinion"
      }} />
      <Divider />

      <Article article={{
          title: "North Sea Oil workers announce 48-hours offshore strike",
          imageURL: 'https://files.stv.tv/imagebase/431/w768/431609-generic-stock-coastguard-rescue-helicopter-rescuegeneric.jpg',
          section: "ABERDEEN & NORTH",
          type: "live"
      }} />
      <Divider />

      <Article article={{
          title: "5 Guys opens up in Glasgow City Centre",
          imageURL: 'https://bloximages.chicago2.vip.townnews.com/heraldextra.com/content/tncms/assets/v3/editorial/2/c1/2c1b327d-5967-5d22-bc0e-6e61971f19cb/51416f5fe66d5.image.jpg',
          section: "LOCAL",
          type: "ad"
      }} />
      <Divider />

      <View style={{paddingLeft: 20, paddingRight: 20}}>
        <Text style={{fontSize: 14, fontWeight: '500', paddingBottom: 5}}>
        Man accussed of murdering police officer to appear in court
        </Text>
        <Meta time="34 MIN" section="GLASGOW & WEST"/>
      </View>
      <Divider />

      <View style={{paddingLeft: 20, paddingTop: 10, paddingBottom: 15, paddingRight: 20}}>
        <Text style={{fontSize: 22, fontWeight: '700', paddingBottom: 15}}>
        Sturgeon: Tackling 'unnacceptable' child poverty a priority
        </Text>
        <Meta time="34 MIN" section="GLASGOW & WEST"/>
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
          <Meta time="34 MIN" section="GLASGOW & WEST"/>
        </View>
      </View>
      <Divider />

      <View style={{paddingLeft: 20, paddingRight: 20}}>
        <Text style={{fontSize: 14, fontWeight: '500', paddingBottom: 5}}>
        Man accussed of murdering police officer to appear in court
        </Text>
        <Meta time="34 MIN" section="GLASGOW & WEST"/>
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
