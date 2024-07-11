## Advanced Containers

While we said in the Containers reading that you should aim to have very few
containers, there are exceptions.  

Separating our concerns with presentational and container components allows us
to reuse presentational components where it makes sense, rather than duplicating
code. If a presentational component needs different data in each situation,
though, we may need more containers. By creating more container components, we
can render the same presentational component with each of those containers to
suit different needs.

Consider a form component that may either _create_ or _edit_ a post. The form
itself looks and works the same in both cases; it has a few inputs and a submit
button. Our use cases differ, though, in that the edit form needs to map state
from the store to its props, while the create form does not. Furthermore, the
edit form will need to dispatch a different action when the form submits than
the create form will, as well as request the object from our backend. Let's see
what this looks like in code.


**As you go through the code snippets below, read the comments carefully.**

Here's our presentational component, `PostForm`:

```jsx
// post_form.jsx
import React from "react";

class PostForm extends React.Component {
  constructor(props) {
    super(props);
    // set up initial state
    this.state = this.props.post; // a Post object has a title and a body
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    // if we get a different post in props, we'll need to set state
    if (props.post.id !== state.id) {
      return props.post;
    }
  }

  update(field) {
    return e => {
      this.setState({ [field]: e.target.value });
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    // `submit` will be a thunk action that presumably creates or edits a post
    this.props.submit(this.state);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Title
          <input
            type="text"
            onChange={this.update("title")}
            value={this.state.title}
          />
        </label>

        <label>
          Body
          <input
            type="text"
            onChange={this.update("body")}
            value={this.state.body}
          />
        </label>

        <button>Submit Post</button>
      </form>
    );
  }
}

export default PostForm;
```

We can see that `PostForm` is expecting two things in props: a `post` object,
and a `submit` function. The container will have to define these, since right
now, this form can't actually do anything. Let's give it the ability to create a
post:

```jsx
// create_post_form_container.js
import PostForm from "./post_form";
import { connect } from "react-redux";
import { createPost } from "../actions/post_actions";

const mapStateToProps = state => {
  return {
    post: { title: "", body: "" } // a default blank object
  };
};

const mapDispatchToProps = dispatch => {
  return {
    submit: post => dispatch(createPost(post))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostForm);
```

So far, this is nothing new. Now, wherever we need a form to create a post, we
can render `CreatePostFormContainer` by importing from the above file.

But what about editing? This is a little trickier, because we need more
information from the store - so we'll need a
[higher-order component](https://spin.atomicobject.com/2017/03/02/higher-order-components-in-react/)
to help us out. Higher-order components are a useful React pattern that
essentially uses a component to render another component, usually to handle some
sort of work and pass in data. This pattern allows us to keep our components
small and modular. Here, we'll use a higher-order component to fetch the post we
want to edit and pass it into the `PostForm`.

```jsx
// edit_post_form_container.jsx
// this is a .jsx file because we're going to use JSX in this container
import { connect } from "react-redux";
import React from "react";
import PostForm from "./post_form";
import { fetchPost, updatePost } from "../actions/post_actions";
import { selectPost } from "../selectors";

const mapStateToProps = (state, ownProps) => {
  const defaultPost = { title: "", body: "" };
  const post = selectPost(ownProps.match.params.postId) || defaultPost;
  // get the post this route is asking for
  // (I'm assuming here that this component is being rendered by a route)
  // if I don't have the post in state yet, 
  // give me a blank post so PostForm doesn't break
  return { post };
};

const mapDispatchToProps = dispatch => {
  // an edit form will need to fetch the relevant post, 
  // but my PostForm shouldn't handle that we'll handle this problem with a 
  // higher-order component, EditPostFormContainer
  return {
    fetchPost: id => dispatch(fetchPost(id)),
    submit: post => dispatch(updatePost(post))
  };
};

class EditPostForm extends React.Component {
  // this is the higher-order component made to handle the fetch

  componentDidMount() {
    // do my fetching here so that PostForm doesn't have to
    this.props.fetchPost(this.props.match.params.postId);
  }

  render() {
    // destructure the props so I can easily pass them down to PostForm
    const { post, submit } = this.props;
    return <PostForm post={post} submit={submit} />;
  }
}

// now `connect` it to the Redux store

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditPostForm);
```

The result here is that we can render a `CreatePostFormContainer` wherever we
want a form to create a post, and an `EditPostFormContainer` wherever we want to
edit a post. Both components will render a `PostForm`, but each will have
different functions. The `PostForm` also gets to be very simple and make almost
no decisions. This helps keep our code DRY and modular.

We can use this pattern with any presentational component that needs to be
connected to the store, but may need entirely different data to perform
different functions. For instance, when we introduce frontend auth, we'll create
a single `SessionForm` that has separate containers for `Login` and `Signup`.
