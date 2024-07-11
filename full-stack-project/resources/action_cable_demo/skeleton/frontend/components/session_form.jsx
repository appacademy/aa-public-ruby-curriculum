import React from 'react';
import { connect } from 'react-redux';
import { login, signup } from '../redux/users';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errors: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(field) {
    return e => this.setState({ [field]: e.target.value, errors: [] });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { errors: _, ...credentials } = this.state;

    this.props.submitForm(credentials).then(
      () => this.props.history.push('/rooms'),
      (errors) => {
        this.setState({
          username: '',
          password: '',
          errors
        });
      }
    );
  }

  handleDemo(username) {
    this.props.login({ username, password: '123456' }).then(
      () => this.props.history.push('/rooms')
    );
  }

  render() {
    return (
      <section className='session-page'>
        <h1>{this.props.title}</h1>
        <ul className='errors'>
          {this.state.errors.map(error => (
            <li key={error}>{error}</li>
          ))}
        </ul>
        <form onSubmit={this.handleSubmit}>
          <label>Username
            <input
              type="text"
              value={this.state.username}
              onChange={this.handleChange('username')}
            />
          </label>
          <label>Password
            <input
              type="password"
              value={this.state.password}
              onChange={this.handleChange('password')}
            />
          </label>
          <button className='btn-primary'>Submit</button>
        </form>
        <div className='demo-btns'>
          <button
            className='btn-primary'
            onClick={() => this.handleDemo('garfield')}
          >
            Login as Garfield
          </button>
          <button
            className='btn-primary'
            onClick={() => this.handleDemo('sennacy')}
          >
            Login as Sennacy
          </button>
        </div>
      </section>
    );
  }
}

export const LoginForm = connect(null, {
  submitForm: login,
  login
})(props => <SessionForm {...props} title='Login' />);

export const SignupForm = connect(null, {
  submitForm: signup,
  login
})(props => <SessionForm {...props} title='Sign Up' />);