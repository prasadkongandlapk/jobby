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
    <div className="header-bg">
      <img
        className="logo-img"
        src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
        alt="website logo"
      />
      <div className="h-j">
        <Link to="/">
          <p className="p">Home</p>
        </Link>
        <Link to="/jobs">
          <p className="p">Jobs</p>
        </Link>
      </div>
      <button type="button" onClick={onLogout} className="logout-btn">
        Logout
      </button>
    </div>
  )
}
export default withRouter(Header)
