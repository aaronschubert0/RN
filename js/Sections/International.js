import React, { Component } from 'react'
import Feed from './Feed'
import requestRankedArticlesInSection from '../API/requestRankedArticlesInSection'
import Tombstones from '../TabNavigator/Tombstones'

export default class International extends Component {

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
    requestRankedArticlesInSection(this.props.guid).then((articles) => {
      this.setState({ articles, loaded: true })
    })
  }

  render() {
    if (!this.state.loaded) {
      return <Tombstones />
    } else {
      const { title, articles, push, pop } = this.props
      return (
        <Feed
          onRefresh={this.fetchArticles.bind(this)}
          title={title}
          articles={this.state.articles}
          push={push}
          pop={pop}
        />
      )
    }
  }
}
