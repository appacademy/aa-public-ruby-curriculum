import React from 'react';
import Form from './form';
import PostIndex from './post_index';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
    this.fetchPosts = this.fetchPosts.bind(this);
  }

  fetchPosts() {
    $.ajax({
      url: "/api/posts"
    }).then(posts => {
      this.setState({posts});
    });
  }

  componentDidMount() {
    this.fetchPosts();
  }

  render() {
    return (
      <div>
        <Form fetchPosts={this.fetchPosts}/>
        <PostIndex posts={this.state.posts}/>
      </div>
    );
  }
}
