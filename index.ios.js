import React, { Component, PropTypes } from 'react'
import { AppRegistry, View, Text, Image, ListView } from 'react-native'
import { TabNavigator, Tab } from './js/TabNavigator/'
import { Meta, Divider, InfoPanel } from './js/Components/'
import { FeaturedImage, SmallImage, Opinion, Live, Sponsored } from './js/FeedItems/'

const Metro = () => {
  return (
    <View style={{ paddingTop: 20, backgroundColor: 'white' }}>
      <TabNavigator initialTab="Top Stories" renderDistance={1}>
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

const ArticleSwitcher = ({ fullscreen, article, children }) => {
  return (
    fullscreen ? null : children
  )
}

const Article = ({ article }) => {

  function _previewForArticleType(type) {
    if (type === 'bigimage') {
      return <FeaturedImage title={article.title} imageURL={article.imageURL} section={article.section} time={article.time}/>
    } else if (type === 'smallimage') {
      return <SmallImage title={article.title} imageURL={article.imageURL} section={article.section} time={article.time}/>
    } else if (type === 'opinion') {
      return <Opinion author={article.author} quote={article.quote} section={article.section} />
    } else if (type === 'live') {
      return <Live title={article.title} imageURL={article.imageURL} section={article.section} />
    } else if (type === 'ad') {
      return <Sponsored title={article.title} imageURL={article.imageURL}/>
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


{/*<InfoPanel date="TUESDAY 12 JULY" lastUpdatedTime="10:44am" />*/}


class One extends Component {

  constructor(props) {
    super(props)
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      })
    };
  }

  componentDidMount() {
    const articles = [
      {
        title: "Sturgeon: Tackling 'unnacceptable' child poverty a priority",
        imageURL: 'https://files.stv.tv/imagebase/461/w768/461445-daniel-roche-left-ramona-marquez-and-tyger-drew-honey-in-2011.jpg',
        section: "GLASGOW & WEST",
        time: "34 MIN",
        type: "bigimage"
      },
      {
        title: "Murder probe after elderly man stabbed to death in street",
        imageURL: 'https://files.stv.tv/imagebase/13/w768/13179-crash-at-busy-city-roundabout.jpg',
        section: "GLASGOW & WEST",
        time: "34 MIN",
        type: "smallimage"
      },
      {
        author: "Melanie Reid",
        quote: "We need leaders like Theresa May and Nicola Sturgeon in a world gone mad",
        section: "POLITICS",
        type: "opinion"
      },
      {
        title: "North Sea Oil workers announce 48-hours offshore strike",
        imageURL: 'https://files.stv.tv/imagebase/431/w768/431609-generic-stock-coastguard-rescue-helicopter-rescuegeneric.jpg',
        section: "ABERDEEN & NORTH",
        type: "live"
      },
      {
        title: "5 Guys opens up in Glasgow City Centre",
        imageURL: 'https://bloximages.chicago2.vip.townnews.com/heraldextra.com/content/tncms/assets/v3/editorial/2/c1/2c1b327d-5967-5d22-bc0e-6e61971f19cb/51416f5fe66d5.image.jpg',
        section: "LOCAL",
        type: "ad"
      },
      {
        title: "Sturgeon: Tackling 'unnacceptable' child poverty a priority",
        imageURL: 'https://files.stv.tv/imagebase/461/w768/461445-daniel-roche-left-ramona-marquez-and-tyger-drew-honey-in-2011.jpg',
        section: "GLASGOW & WEST",
        time: "34 MIN",
        type: "bigimage"
      },
      {
        title: "Murder probe after elderly man stabbed to death in street",
        imageURL: 'https://files.stv.tv/imagebase/13/w768/13179-crash-at-busy-city-roundabout.jpg',
        section: "GLASGOW & WEST",
        time: "34 MIN",
        type: "smallimage"
      },
      {
        author: "Melanie Reid",
        quote: "We need leaders like Theresa May and Nicola Sturgeon in a world gone mad",
        section: "POLITICS",
        type: "opinion"
      },
      {
        title: "North Sea Oil workers announce 48-hours offshore strike",
        imageURL: 'https://files.stv.tv/imagebase/431/w768/431609-generic-stock-coastguard-rescue-helicopter-rescuegeneric.jpg',
        section: "ABERDEEN & NORTH",
        type: "live"
      },
      {
        title: "5 Guys opens up in Glasgow City Centre",
        imageURL: 'https://bloximages.chicago2.vip.townnews.com/heraldextra.com/content/tncms/assets/v3/editorial/2/c1/2c1b327d-5967-5d22-bc0e-6e61971f19cb/51416f5fe66d5.image.jpg',
        section: "LOCAL",
        type: "ad"
      }
    ]
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(articles)
    });
  }

  renderPreview(articleObject) {
    return (
      <View>
        <Article article={articleObject} />
        <Divider />
      </View>
    )
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderPreview}
        style={{ flex: 1}}
      />
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
