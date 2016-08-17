import React, { Component } from 'react'
import  { ListView, TouchableOpacity, RefreshControl, View } from 'react-native'
import { Meta, Divider, InfoPanel } from '../Components/'
import { FeaturedImage, SmallImage, Opinion, Live, Sponsored } from '../FeedItems/'
import Article from '../Article/'
import { moment } from '../Utilities'
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
    this.updateArticles(this.props.articles)
  }

  componentWillReceiveProps (nextProps) {
    this.updateArticles(nextProps.articles)
  }

  updateArticles (articles) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(
        this._createListItems(articles)
      )
    })
  }

  _createListItems(articles) {
    const listItems = [
      <InfoPanel lastUpdatedTime={moment().format('h:mma')} />,
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
      return <Article.Preview.FeaturedImage article={article} pushArticle={this._pushArticle.bind(this)}/>
    } else if (article.image && article.contentType === 'news') {
      return <Article.Preview.SmallImage article={article} pushArticle={this._pushArticle.bind(this)}/>
    } else if (article.contentType === 'opinion') {
      return <Article.Preview.Opinion article={article} pushArticle={this._pushArticle.bind(this)}/>
    } else if (article.contentType === 'live-blog') {
      return <Article.Preview.Live article={article} pushArticle={this._pushArticle.bind(this)}/>
    } else {
      return <View />
      // console.log('nothing', article.contentType)
    }
    // } else if (type === 'ad') {
    //   return <Article.Preview.Sponsored title={article.title} imageURL={article.imageURL}/>
    // }
  }

  _pushArticle(article) {
    this.props.push(Article.Fullscreen,
     { articleData: article, sectionTitle: this.props.title },
      'article')
  }

  _renderComponent(object, section, row) {
    return object
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
