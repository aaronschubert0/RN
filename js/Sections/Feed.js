import React, { Component } from 'react'
import  { ListView, TouchableOpacity, RefreshControl, View } from 'react-native'
import { Meta, Divider, InfoPanel } from '../Components/'
import { FeaturedImage, SmallImage, Opinion, Live, Sponsored } from '../FeedItems/'
import Article from '../Article/'
import { moment } from '../Utilities'
export default class Feed extends Component {

  static defaultProps = {
    layout: 'chronological' // either chronological or ranked
  }

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
      <InfoPanel
        customDate={ this.props.layout === 'chronological' ? articles[0].modified : undefined }
        lastUpdatedTime={moment().format('h:mma')}
      />,
      ...articles.map((article, index) => {
        if (this.props.layout === 'chronological') {
          const previousArticle = articles[index-1]
          if (previousArticle) {
            return this._chronologicalLayout(article, previousArticle, index)
          }
        }
        return this._previewForArticleType(article, index)
      })
    ]
    return listItems
  }

  _chronologicalLayout(article, previousArticle, index) {
    const sameDay = moment(article.modified).isSame(previousArticle.modified, 'day')
    const today = moment(article.modified).isSame(new Date(), 'day')
    if (!sameDay) {
      return (
        <View>
          <InfoPanel
            style={{ paddingTop: 5, paddingBottom: 15 }}
            customDate={article.modified}
            showDivider={false}
          />
          {this._previewForArticleType(article, index, false)}
        </View>
      )
    }
    return this._previewForArticleType(article, index, !(sameDay && !today)) // only show metadata under certain conditions
  }

  _onRefresh() {
     this.setState({refreshing: true})
     setTimeout(() => {
       this.props.onRefresh()
       this.setState({refreshing: false})
      }, 100)
  }

   _previewForArticleType(article, index, showMeta = true) {
    if (index === 0 && article.image) {
      return <Article.Preview.FeaturedImage article={article} pushArticle={this._pushArticle.bind(this)} showMeta={showMeta}/>
    } else if (article.image && article.contentType === 'news') {
      return <Article.Preview.SmallImage article={article} pushArticle={this._pushArticle.bind(this)} showMeta={showMeta}/>
    } else if (article.contentType === 'opinion') {
      return <Article.Preview.Opinion article={article} pushArticle={this._pushArticle.bind(this)} showMeta={showMeta}/>
    } else if (article.contentType === 'live-blog') {
      return <Article.Preview.Live article={article} pushArticle={this._pushArticle.bind(this)} showMeta={showMeta}/>
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
