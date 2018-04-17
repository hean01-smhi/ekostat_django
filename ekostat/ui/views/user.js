import React from 'react';
import ReactDOM from 'react-dom';
import {FormattedMessage} from 'react-intl';
import {Calculator, CalculatorError} from '../calculator';

class UserLogin extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      user: Calculator.getUser(),
      username: '',
      password: '',
      message: ''
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.login();
  };

  handleChange = (event) => {
    const change = {};
    change[event.target.name] = event.target.value;
    this.setState(change);
  };

  handleLogoutClick = (event) => {
    this.logout();
  };

  async logout() {
    const user = await Calculator.setUser(null, null);
    this.setState({ user });
  };

  async login() {
    const {username, password} = this.state;

    this.setState({
      isLoading: true,
      message: 'Logging you in. Please wait...'
    });

    try {
      const user = await Calculator.setUser(username, password);
      this.setState({
        isLoading: false,
        user: user,
        username: '',
        password: '',
        message: ''
      });
    } catch (error) {
      if (!(error instanceof CalculatorError)) {
        throw error;
      }
      this.setState({
        isLoading: true,
        password: '',
        message: error.message
      });
    }
  };

  render() {
    const {isLoading, user, username, password, message} = this.state;
    return (
      <React.Fragment>
        {user != false ? (
          <div className="user-logout">
            <p>
              Logged in as <b>{user.username}</b>.
              <button className="button" onClick={this.handleLogoutClick}>
                <FormattedMessage id="user.button_logout" defaultMessage="Log out?" />
              </button>
            </p>
          </div>
        ) : (
          <div className="user-login">
            <form onSubmit={this.handleSubmit}>
              <div className="user-login-message">
                <p>{message}</p>
              </div>
              <div className="user-login-username">
                <input type="text" name="username" placeholder="Username" value={username} onChange={this.handleChange} />
              </div>
              <div className="user-login-password">
                <input type="password" name="password" placeholder="Password" value={password} onChange={this.handleChange} />
              </div>
              <button className="button">
                <FormattedMessage id="user.button_login" defaultMessage="Log in" />
              </button>
            </form>
          </div>
        )}
      </React.Fragment>
    );
  }

}

export {UserLogin};
