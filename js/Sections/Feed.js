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
      dataSource: this.state.dataSource.cloneWithRows(this.props.articles)
    })
  }
  
  _onRefresh() {
     this.setState({refreshing: true})
     setTimeout(() => {
       this.props.onRefresh()
       this.setState({refreshing: false})
      }, 100)
  }

   _previewForArticleType(type, article) {
    if (type === 'bigimage') {
      return <Article.Preview.FeaturedImage title={article.title} imageURL={article.imageURL} section={article.section} time={article.time}/>
    } else if (type === 'smallimage') {
      return <Article.Preview.SmallImage title={article.title} imageURL={article.imageURL} section={article.section} time={article.time}/>
    } else if (type === 'opinion') {
      return <Article.Preview.Opinion author={article.author} quote={article.quote} section={article.section} />
    } else if (type === 'live') {
      return <Article.Preview.Live title={article.title} imageURL={article.imageURL} section={article.section} />
    } else if (type === 'ad') {
      return <Article.Preview.Sponsored title={article.title} imageURL={article.imageURL}/>
    }
  }

  _renderComponent(object) {
    return (
      object.type ?
      <TouchableOpacity
        onPress={() => this.props.push(Article.Fullscreen,
         { articleData: object, sectionTitle: this.props.title },
          'article')}>
          {this._previewForArticleType(object.type, object)}
        <Divider />
      </TouchableOpacity>
      :
      <InfoPanel lastUpdatedTime={object.lastUpdatedTime}/>
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
