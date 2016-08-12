import React, { Component, PropTypes } from 'react'
import { AppRegistry, View, Text, Image, ListView, NavigationExperimental, TouchableOpacity, ScrollView } from 'react-native'
import { TabNavigator, Tab } from './js/TabNavigator/'
import { Meta, Divider, InfoPanel } from './js/Components/'
import { FeaturedImage, SmallImage, Opinion, Live, Sponsored } from './js/FeedItems/'
import FullscreenArticle from './js/Article/FullscreenArticle'
const {
  CardStack: NavigationCardStack,
  StateUtils: NavigationStateUtils,
} = NavigationExperimental;

const Root = ({ push, pop }) => {
  return (
    <View style={{ paddingTop: 20, backgroundColor: 'white' }}>
      <TabNavigator
        initialTab="Top Stories"
        renderDistance={1}
        tabProps={{
          push,
          pop
        }}
      >
        <Tab title="Breaking News" component={One} />
        <Tab title="Top Stories" component={One} />
        <Tab title="Glasgow / West" component={One} />
        <Tab title="UK" component={One} />
        <Tab title="International" component={One} />
        <Tab title="Politics" component={One} />
        <Tab title="Features" component={One} />
        <Tab title="Entertainment" component={One} />
      </TabNavigator>
    </View>
  )
}

class Metro extends Component {

  constructor(props) {
    super(props)
    this.onNavigationChange = this._onNavigationChange.bind(this)

    this.state = {
      navigationState: {
        index: 0,
        routes: [{ key: 'root', component: Root}]
      }
    }
  }

  _onNavigationChange(type, component, props, key) {
    let { navigationState } = this.state

    switch (type) {
      case 'push':
        const route = {component, props, key}
        navigationState = NavigationStateUtils.push(navigationState, route)
        break;
      case 'pop':
        navigationState = NavigationStateUtils.pop(navigationState)
        break;
    }

    if (this.state.navigationState !== navigationState) {
      this.setState({ navigationState })
    }
  }

  render() {
    return (
      <NavigationCardStack
        onNavigateBack={() => this.onNavigationChange('pop', undefined, undefined)}
        navigationState={this.state.navigationState}
        renderScene={this._renderScene.bind(this)}
        style={{ flex: 1}}
      />
    )
  }

  _renderScene(sceneProps) {
    const { scene } = sceneProps
    const { component: Component, props } = scene.route
    const navigationActions = {
      push: (component, props, key) => this.onNavigationChange('push', component, props, key),
      pop: () => this.onNavigationChange('pop')
    }
    return <Component {...props} {...navigationActions} />
  }
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
        infoPanel: true,
        date: "THURSDAY 11 AUGUST",
        lastUpdatedTime: "12:01pm"
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

  _renderComponent(object) {
    return (
      object.type ?
      <TouchableOpacity
        onPress={() => this.props.push(FullscreenArticle,
         { articleData: object, sectionTitle: this.props.title },
          'article')}>
        <Article article={object} />
        <Divider />
      </TouchableOpacity>
      :
      <InfoPanel date={object.date} lastUpdatedTime={object.lastUpdatedTime}/>
    )
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this._renderComponent.bind(this)}
        style={{ flex: 1}}
      />
    )
  }

}

AppRegistry.registerComponent('Metro', () => Metro)
