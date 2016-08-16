import React, { Component } from 'react'
import  { ListView, TouchableOpacity, RefreshControl } from 'react-native'
import { Meta, Divider, InfoPanel } from '../Components/'
import { FeaturedImage, SmallImage, Opinion, Live, Sponsored } from '../FeedItems/'
import Article from '../Article/'

export default class Feed extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      refreshing: false
    }
  }

  componentWillMount() {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this._createListItems(this.props.articles))
    })
  }

  _createListItems(articles) {
    const listItems = [
      <InfoPanel lastUpdatedTime="10:12am" />,
      ...articles.map((article, index) => {
        return this._previewForArticleType(article, index)
      })
    ]
    return listItems
  }

  _onRefresh() {
     this.setState({refreshing: true})
     setTimeout(() => {
       this.props.onRefresh()
       this.setState({refreshing: false})
      }, 100)
  }

   _previewForArticleType(article, index) {
    if (index === 0 && article.image) {
      return <Article.Preview.FeaturedImage title={article.title} imageURL={article.image.renditions.large} section={article.section} time={article.modified}/>
    } else if (article.image) {
      return <Article.Preview.SmallImage title={article.title} imageURL={article.image.renditions.small} section={article.section} time={article.modified}/>
    }
    // } else if (type === 'opinion') {
    //   return <Article.Preview.Opinion author={article.author} quote={article.quote} section={article.section} />
    // } else if (type === 'live') {
    //   return <Article.Preview.Live title={article.title} imageURL={article.imageURL} section={article.section} />
    // } else if (type === 'ad') {
    //   return <Article.Preview.Sponsored title={article.title} imageURL={article.imageURL}/>
    // }
  }

  _renderComponent(object, section, row) {
    return (
      row === '0' ? object :
      <TouchableOpacity
        onPress={() => this.props.push(Article.Fullscreen,
         { articleData: object.props, sectionTitle: this.props.title },
          'article')}>
          {object}
        <Divider />
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this._renderComponent.bind(this)}
        style={{ flex: 1}}
        refreshControl={
         <RefreshControl
           refreshing={this.state.refreshing}
           onRefresh={this._onRefresh.bind(this)} />
         }
      />
    )
  }

}
