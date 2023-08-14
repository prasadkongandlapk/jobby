import './index.css'
import {Component} from 'react'
import Header from '../Header'

class Home extends Component {
  onFindJobs = () => {
    const {history} = this.props
    history.replace('/jobs')
  }

  render() {
    return (
      <div className="home-bg">
        <Header />
        <div className="home-card">
          <div>
            <h1 className="home-heading">Find The Job That Fits Your Life</h1>
            <p className="home-description">
              Millions of people are searching for jobs,salary information,
              company reviews. Find the job that fits your ability and potential
            </p>
          </div>
          <button
            onClick={this.onFindJobs}
            type="button"
            className="find-jobs-btn"
          >
            Find Jobs
          </button>
        </div>
      </div>
    )
  }
}

export default Home
