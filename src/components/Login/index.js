import './index.css'
import Cookies from 'js-cookie'
import {Component} from 'react'

class Login extends Component {
  state = {username: '', showError: false, password: '', error: ''}

  onSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 10})
    const {history} = this.props

    history.replace('/')
  }

  onError = error => {
    this.setState({error, showError: true})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state

    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSuccess(data.jwt_token)
    } else {
      this.onError(data.error_msg)
    }
    this.setState({username: '', password: ''})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, password, showError, error} = this.state

    return (
      <div className="bg">
        <div className="user-details-bg">
          <img
            className="logo-img"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
            alt="website logo"
          />
          <form onSubmit={this.onSubmitForm}>
            <div className="label-input-bg">
              <label htmlFor="username">USERNAME</label>
              <input
                onChange={this.onChangeUsername}
                id="username"
                type="text"
                placeholder="Username"
                value={username}
              />
            </div>
            <div className="label-input-bg">
              <label htmlFor="password">PASSWORD</label>
              <input
                onChange={this.onChangePassword}
                id="password"
                type="password"
                placeholder="Password"
                value={password}
              />
            </div>
            <button className="add-btn" type="submit">
              Login
            </button>
          </form>
          {showError ? <p className="error">{error}</p> : ''}
        </div>
      </div>
    )
  }
}
export default Login
