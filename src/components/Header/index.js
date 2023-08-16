import './index.css'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

const Header = props => {
  const {history} = props
  const onLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <ul className="header-bg">
      <li>
        <Link to="/">
          <img
            className="logo-img"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
            alt="website logo"
          />
        </Link>
      </li>
      <li className="h-j">
        <Link to="/">
          <p className="p">Home</p>
        </Link>
        <Link to="/jobs">
          <p className="p">Jobs</p>
        </Link>
      </li>
      <li>
        <button type="button" onClick={onLogout} className="logout-btn">
          Logout
        </button>
      </li>
    </ul>
  )
}
export default withRouter(Header)
