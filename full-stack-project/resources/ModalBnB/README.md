# React Redux Modal Demo

In this demo we have implemented Login and Signup modals in our BenchBnB solution. You can download the code [here]( https://assets.aaonline.io/fullstack/full-stack-project/additional_resources/ModalBnB.zip).

## Key Files

- `modal_actions.js`
- `app.jsx`
- `greeting_container.js`
- `greeting.jsx`
- `modal.jsx`
- `login_form_container.jsx`
- `session_form.jsx`
- `modal_reducer.js`

## Concept

We use the term modal to describe a graphical element with which the user must interact before being able to use any other part of your application. The modal's importance is usually highlighted by a dimming of the rest of the application in the background.

So that's our goal. Create a React component that will dim the rest of our application while presenting a child component for us to interact with. To be able to easily control when and what our modal component is displaying, we will tie it in to our redux state.

## Redux
Our new state shape will look like this:
```js
{
  entities: {...},
  session: {...},
  errors: {...},
  ui: {
    filters: {...},
    modal: //defaults to null, will be set to a string representing which component to show
  }
}
```
In order to accomplish this we add a modal key pointing to the `modalReducer` inside of our call to `combineReducers` in `ui_reducer.js`.

The modal reducer will respond to two actions, `OPEN_MODAL` and `CLOSE_MODAL`. `OPEN_MODAL` will set our modal slice to a string, `CLOSE_MODAL` will reset our modal slice to be null. Check out `modal_actions.js` to see the action creators and constants we use.

## React
```jsx
const App = () => (
  <div>
    <Modal />
    <header>
      <Link to="/" className="header-link">
        <h1>Bench BnB</h1>
      </Link>
      <GreetingContainer />
    </header>
    <Switch>
      <ProtectedRoute exact path="/benches/new" component={BenchFormContainer} />
      <Route path="/benches/:benchId" component={BenchShowContainer} />
      <Route exact path="/" component={SearchContainer} />
    </Switch>
  </div>
);
```

The first change comes in our `App` component. We no longer need routes for out log in and sign up pages. We typically don't change the url when we are presenting our user with some information in a modal.

The second change is that we have added our `Modal` component. Since it is in our `App` component, we can think of it as always being on our page. In order to understand how we can achieve the effect of our modal appearing and disappearing, let's look at the contents of `modal.jsx`.

```jsx
import React from 'react';
import { closeModal } from '../../actions/modal_actions';
import { connect } from 'react-redux';
import LoginFormContainer from '../session_form/login_form_container';
import SignupFormContainer from '../session_form/signup_form_container';

function Modal({modal, closeModal}) {
  if (!modal) {
    return null;
  }
  let component;
  switch (modal) {
    case 'login':
      component = <LoginFormContainer />;
      break;
    case 'signup':
      component = <SignupFormContainer />;
      break;
    default:
      return null;
  }
  return (
    <div className="modal-background" onClick={closeModal}>
      <div className="modal-child" onClick={e => e.stopPropagation()}>
        { component }
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    modal: state.ui.modal
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);

```
The first thing that we should note is that we are exporting a connected version of our `Modal` component so that we can have access to our modal slice of state and the ability to dispatch the `closeModal` action.

If our modal slice is null, we'll return null from our component, effectively making it non-existent. Otherwise, we have a switch statement which will choose what component we put inside of our `.modal-child` div which is inside of our `.modal-background` div.

The `onClick` of our `.modal-background` is the `closeModal` prop that will send an action to our store to set our modal slice to null. The `onClick` of our `.modal-child` is a callback that will stop the propagation of the click event. **This is of the utmost importance**. If we didn't stop the propagation of the click event, our modal would close any time we clicked anywhere inside of our `modal-child` due to the way events bubble up through all containing elements. (Ask a TA for a further explanation)

Another place where we've made major changes is in both of the containers for our `SessionForm`. Let's look at the `LoginFormContainer`:

```jsx
import { connect } from 'react-redux';
import React from 'react';
import { login } from '../../actions/session_actions';
import { openModal, closeModal } from '../../actions/modal_actions';
import SessionForm from './session_form';

const mapStateToProps = ({ errors }) => {
  return {
    errors: errors.session,
    formType: 'login',
  };
};

const mapDispatchToProps = dispatch => {
  return {
    processForm: (user) => dispatch(login(user)),
    otherForm: (
      <button onClick={() => dispatch(openModal('signup'))}>
        Signup
      </button>
    ),
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);
```
We used to pass in a prop that was a `Link` component that we would use to navigate to the other form. Now we pass in a prop that is a `<button>` with an `onClick` that will dispatch the action to display a different component inside of our `Modal`.

We've also done something similar in our `GreetingContainer` and `Greeting` components. Instead of having links to navigate to the old routes that showed our sign up and log in pages, we now use the `openModal` action creator to change our redux state and make our `Modal` display something.

## CSS

To achieve the classic modal look, use these style rules as inspiration.
```css
.modal-background {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 10;
}

.modal-child {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```
The `.modal-background` class is fixed and has a high z-index so it will cover everything else on the screen. The .modal-child is positioned absolutely and centered using the transform, top, and left properties.

## Summary

A modal is just some element that contains some content to be displayed to the user. The user is forced to interact with this content, by either completing a task or consciously choosing to navigate away from it, before they can use the rest of the application. It is usually accompanied with a dimming effect over the rest of the application.

Modals aren't just used for forms and the background doesn't have to be transparent. The logical switch for whether or not the modal is currently open doesn't have to be stored in your redux state but placing it there does flow well with the rest of our app. It makes it easy for any of our components to get in on the fun of closing and opening modals by simply connecting to the store so that they can dispatch some very simple actions.

Hopefully you find this extensible and applicable to many situations and find ways to improve upon it. For example, instead of just storing a string representing a component in your state, you can store the component itself and make the render method of your `Modal` component a lot simpler.
