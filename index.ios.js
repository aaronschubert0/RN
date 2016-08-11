import React, { Component, PropTypes } from 'react'
import { AppRegistry, View, Text, Image, ListView, NavigationExperimental, TouchableOpacity, ScrollView } from 'react-native'
import { TabNavigator, Tab } from './js/TabNavigator/'
import { Meta, Divider, InfoPanel } from './js/Components/'
import { FeaturedImage, SmallImage, Opinion, Live, Sponsored } from './js/FeedItems/'
const {
  CardStack: NavigationCardStack,
  StateUtils: NavigationStateUtils,
} = NavigationExperimental;

class Metro extends Component {

  constructor(props) {
    super(props)
    this.state = {
      navigationState: {
        index: 0,
        routes: [{ key: 'root' }]
      }
    }

    this.onNavigationChange = this._onNavigationChange.bind(this)
  }

  _onNavigationChange(type, component, data) {
    let { navigationState } = this.state

    switch (type) {
      case 'push':
        const route = {key: 'Route-' + type.id}
        navigationState = NavigationStateUtils.push(navigationState, route)
        break;
      case 'pop':
        navigationState = NavigationStateUtils.pop(navigationState)
        break;
    }

    if (this.state.navigationState !== navigationState) {
      this.setState({
        navigationState: navigationState,
        data: data,
        component: component
      })
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
    const { component, data } = this.state
    if (scene.route.key === 'root') {
      return (
        <View style={{ paddingTop: 20, backgroundColor: 'white' }}>
          <TabNavigator
            initialTab="Top Stories"
            renderDistance={1}
            tabProps={{
              push: (component, data) => this.onNavigationChange('push', component, data),
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
    } else if (scene.route.key.indexOf('Route-') !== -1){
      return (
        React.cloneElement(component, {...data})
      )
    }
  }
}

const FullScreenArticle = (data) => {
  const { title, imageURL, section } = data
  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <View style={{ backgroundColor: 'white', borderBottomColor: 'gray', borderBottomWidth: 0.5, height: 64, flexDirection:'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 20, paddingLeft: 20, paddingRight: 20 }}>
        <TouchableOpacity onPress={() => this.onNavigationChange('pop', undefined)}>
          <Text style={{ color: '#54565b', fontFamily:'Source Sans Pro', fontSize: 16 }}>{'< Back'}</Text>
        </TouchableOpacity>
        <Text style={{ color: '#09b4ff', fontFamily:'Source Sans Pro', fontSize: 16 }}>{data.section}</Text>
        <Text style={{ color: '#54565b', fontFamily:'Source Sans Pro', fontSize: 16 }}>Share</Text>
      </View>
      <ScrollView style={{ flex: 1}}>
        <Image
        source={{ uri: imageURL }}
        style={{ width: 375, height: 211 }}
        />
        <View style={{ flex: 1, backgroundColor: 'white', paddingLeft: 20, paddingRight: 20 }}>
          <Text style={{fontSize: 22, fontWeight: '700', fontFamily: 'Source Sans Pro', paddingBottom: 15, paddingTop: 15}}>
          {title}
          </Text>
          <Text style={{ color: '#54565b', fontSize: 16, paddingBottom: 15, lineHeight: 25 }}>
            The First Minister announced a new Scotland-specific Child Poverty Bill to improve life chances.
          </Text>
          <Text style={{ color: '#54565b', fontSize: 16, paddingBottom: 15, lineHeight: 25 }}>
            Legislation aimed at helping to eradicate child poverty in Scotland has been announced by Nicola Sturgeon.
          </Text>
          <Text style={{ color: '#54565b', fontSize: 16, paddingBottom: 15, lineHeight: 25 }}>
            The First Minister said the Child Poverty Bill will set out a new approach to tackling inequality as she visited the Prince's Trust charity.
          </Text>
          <Text style={{ color: '#54565b', fontSize: 16, paddingBottom: 15, lineHeight: 25 }}>
            She was also sharply critical of the UK Government's decision last year to repeal much of the Child Poverty Act, calling it "fundamentally wrong".
          </Text>
        </View>
      </ScrollView>
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
    console.log('Props ', this.props)
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
        id: 1000,
        time: "34 MIN",
        type: "bigimage"
      },
      {
        title: "Murder probe after elderly man stabbed to death in street",
        imageURL: 'https://files.stv.tv/imagebase/13/w768/13179-crash-at-busy-city-roundabout.jpg',
        section: "GLASGOW & WEST",
        id: 2000,
        time: "34 MIN",
        type: "smallimage"
      },
      {
        author: "Melanie Reid",
        quote: "We need leaders like Theresa May and Nicola Sturgeon in a world gone mad",
        section: "POLITICS",
        id: 3000,
        type: "opinion"
      },
      {
        title: "North Sea Oil workers announce 48-hours offshore strike",
        imageURL: 'https://files.stv.tv/imagebase/431/w768/431609-generic-stock-coastguard-rescue-helicopter-rescuegeneric.jpg',
        section: "ABERDEEN & NORTH",
        id: 4000,
        type: "live"
      },
      {
        title: "5 Guys opens up in Glasgow City Centre",
        imageURL: 'https://bloximages.chicago2.vip.townnews.com/heraldextra.com/content/tncms/assets/v3/editorial/2/c1/2c1b327d-5967-5d22-bc0e-6e61971f19cb/51416f5fe66d5.image.jpg',
        section: "LOCAL",
        id: 5000,
        type: "ad"
      },
      {
        title: "Sturgeon: Tackling 'unnacceptable' child poverty a priority",
        imageURL: 'https://files.stv.tv/imagebase/461/w768/461445-daniel-roche-left-ramona-marquez-and-tyger-drew-honey-in-2011.jpg',
        section: "GLASGOW & WEST",
        id: 6000,
        time: "34 MIN",
        type: "bigimage"
      },
      {
        title: "Murder probe after elderly man stabbed to death in street",
        imageURL: 'https://files.stv.tv/imagebase/13/w768/13179-crash-at-busy-city-roundabout.jpg',
        section: "GLASGOW & WEST",
        id: 7000,
        time: "34 MIN",
        type: "smallimage"
      },
      {
        author: "Melanie Reid",
        quote: "We need leaders like Theresa May and Nicola Sturgeon in a world gone mad",
        section: "POLITICS",
        id: 8000,
        type: "opinion"
      },
      {
        title: "North Sea Oil workers announce 48-hours offshore strike",
        imageURL: 'https://files.stv.tv/imagebase/431/w768/431609-generic-stock-coastguard-rescue-helicopter-rescuegeneric.jpg',
        section: "ABERDEEN & NORTH",
        id: 9000,
        type: "live"
      },
      {
        title: "5 Guys opens up in Glasgow City Centre",
        imageURL: 'https://bloximages.chicago2.vip.townnews.com/heraldextra.com/content/tncms/assets/v3/editorial/2/c1/2c1b327d-5967-5d22-bc0e-6e61971f19cb/51416f5fe66d5.image.jpg',
        section: "LOCAL",
        id: 9999,
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
      <TouchableOpacity onPress={() => this.props.push(<FullScreenArticle />, object)}>
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
