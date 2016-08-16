import React, { Component } from 'react'
import Feed from './Feed'
import requestRankedArticlesInSection from '../API/requestRankedArticlesInSection'
import Tombstones from '../TabNavigator/Tombstones'

export default class TopStories extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loaded: false
    }
  }

  componentWillMount() {
    this.fetchArticles()
  }

  fetchArticles() {
    console.log('Fetch article')
    requestRankedArticlesInSection(this.props.guid).then((articles) => {
      this.articles = articles
      this.setState({ loaded: true })
    })
  }

  render() {
    if (!this.state.loaded) {
      return <Tombstones />
    } else {
      const { title, articles, push, pop } = this.props
      return (
        <Feed
          onRefresh={this.fetchArticles}
          title={title}
          articles={this.articles}
          push={push}
          pop={pop}
        />
      )
    }
  }
}
