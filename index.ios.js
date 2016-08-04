import React, { Component, PropTypes } from 'react'
import { AppRegistry, View, Text, Image, ScrollView, TouchableWithoutFeedback, Animated, StyleSheet, Modal } from 'react-native'
import { TabNavigator, Tab } from './js/TabNavigator/'
import { Meta, Divider, InfoPanel } from './js/components/'
const Metro = () => {
  return (
    <View style={{ marginTop: 20 }}>
      <TabNavigator initialTab="Top Stories" renderDistance={4}>
        <Tab title="Breaking News" component={One} />
        <Tab title="Top Stories" component={Two} />
        <Tab title="Glasgow / West" component={Three} />
        <Tab title="UK" component={Four} />
        <Tab title="International" component={Five} />
        <Tab title="Politics" component={Six} />
        <Tab title="Features" component={Seven} />
        <Tab title="Entertainment" component={Eight} />
      </TabNavigator>
    </View>

  )
}

const BigImageArticlePreview = ({ title, imageURL, section, time }) => {
  return (
    <View>
    <View style={{paddingLeft: 20, paddingTop: 10, paddingBottom: 15, paddingRight: 20}}>
      <Text style={{fontSize: 22, fontWeight: '700', fontFamily: 'SourceSansPro-Bold', paddingBottom: 15}}>
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
        <Text style={{fontSize: 14, fontFamily:'SourceSansPro-Regular', paddingBottom: 5}}>
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
        <Text style={{ fontFamily: 'Merriweather-BlackItalic', fontSize: 18, color: '#09b4ff', paddingBottom: 10}}>
        {author + '  /  '}
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
        <Text style={{fontSize: 14, fontFamily:'SourceSansPro-Regular', paddingBottom: 5}}>
        {title}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ padding: 1.5, paddingLeft: 7, paddingRight: 7, borderRadius: 2, backgroundColor: '#09b4ff', marginRight: 5}}>
            <Text style={{ color: 'white', fontSize: 10, fontFamily:'SourceSansPro-Regular', fontWeight: '600' }}>{'LIVE'}</Text>
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
        <Text style={{fontSize: 14, fontFamily:'SourceSansPro-Regular', paddingBottom: 5}}>
        {title}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ padding: 1.5, paddingLeft: 7, paddingRight: 7, borderRadius: 2, backgroundColor: '#F4DB43', marginRight: 5}}>
            <Text style={{ color: 'white', fontSize: 10, fontWeight: '600', fontFamily:'SourceSansPro-Regular' }}>{'SPONSORED'}</Text>
          </View>
          <Meta section={section}/>
        </View>
      </View>
    </View>
  )
}

const ArticleSwitcher = ({ fullscreen, article, children }) => {
  return (
    fullscreen ? null : children
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
      <ArticleSwitcher article={article}>
        {_previewForArticleType(article.type)}
      </ArticleSwitcher>
    </View>
  )
}



class One extends Component {

  render() {
    return (
      <ScrollView>
      <InfoPanel date="TUESDAY 12 JULY" lastUpdatedTime="10:44am" />
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
