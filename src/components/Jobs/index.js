import './index.css'
import {BiSearchAlt2} from 'react-icons/bi'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {Component} from 'react'
import Header from '../Header'
import JobItem from '../JobItem'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const status = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Jobs extends Component {
  state = {
    employTypeId: [],
    salaryId: '',
    profileInfo: {},
    searchInput: '',
    isCheckBoxClicked: '',
    isSearchClicked: false,
    jobs: [],
    apiStatus: status.loading,
    jobStatus: status.loading,
  }

  componentDidMount() {
    this.getProfileData()
    this.getJobs()
  }

  onClickJob = () => {
    this.getJobs()
  }

  onClickProfile = () => {
    this.getProfileData()
  }

  onSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onSearchBtn = () => {
    this.setState({isSearchClicked: true}, this.getJobs)
  }

  getJobs = async () => {
    const {employTypeId, salaryId, searchInput} = this.state
    const token = Cookies.get('jwt_token')

    const jobUrl = `https://apis.ccbp.in/jobs?employment_type=${employTypeId}&minimum_package=${salaryId}&search=${searchInput}`

    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(jobUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      const formattedData = data.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({jobs: formattedData, jobStatus: status.success})
    } else {
      this.setState({jobStatus: status.failure})
    }
  }

  getProfileData = async () => {
    const token = Cookies.get('jwt_token')

    const url = 'https://apis.ccbp.in/profile'

    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const formattedData = {
        name: data.profile_details.name,
        profileImg: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({profileInfo: formattedData, apiStatus: status.success})
    } else {
      this.setState({apiStatus: status.failure})
    }
  }

  onClickCheckBox = event => {
    const {employTypeId} = this.state
    if (employTypeId.includes(event.target.value)) {
      this.setState(prevState => ({
        employTypeId: prevState.employTypeId.filter(
          each => each !== event.target.value,
        ),
      }))
    } else {
      this.setState(prevState => ({
        employTypeId: [...prevState.employTypeId, event.target.value],
      }))
    }
  }

  onClickRadio = event => {
    this.setState({salaryId: event.target.value}, this.getJobs)
  }

  failureView = () => (
    <div className="failure-bg">
      <button type="button" onClick={this.onClickProfile} className="retry-btn">
        Retry
      </button>
    </div>
  )

  loadingView = () => (
    <div data-testid="loader">
      <Loader width={50} color="white" type="ThreeDots" />
    </div>
  )

  profileView = () => {
    const {profileInfo} = this.state
    return (
      <div className="profile-bg-bg">
        <div className="profile-bg">
          <img
            className="profile-size"
            src={profileInfo.profileImg}
            alt="profile"
          />
          <h3 className="profile-name">{profileInfo.name}</h3>
          <p className="short-bio">{profileInfo.shortBio}</p>
        </div>
      </div>
    )
  }

  jobsView = () => {
    const {jobs} = this.state
    return (
      <ul className="">
        {jobs.map(jobItem => (
          <JobItem jobInfo={jobItem} key={jobItem.id} />
        ))}
      </ul>
    )
  }

  renderProfile = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case status.loading:
        return this.loadingView()
      case status.failure:
        return this.failureView()
      case status.success:
        return this.profileView()
      default:
        return null
    }
  }

  jobLoadingView = () => (
    <div data-testid="loader" className="loader-jobs">
      <Loader width={50} color="white" type="ThreeDots" />
    </div>
  )

  jobFailureView = () => (
    <div className="no-jobs-bg">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png "
        alt="failure view"
      />
      <h1>No Jobs Found</h1>
      <h1>Oops, Something Went Wrong</h1>
      <p>We could not find any jobs. Try other filters</p>
      <button type="button" onClick={this.onClickJob} className="retry-btn">
        Retry
      </button>
    </div>
  )

  renderJobs = () => {
    const {jobStatus} = this.state
    switch (jobStatus) {
      case status.loading:
        return this.jobLoadingView()
      case status.failure:
        return this.jobFailureView()
      case status.success:
        return this.jobsView()
      default:
        return null
    }
  }

  render() {
    const {searchInput, employTypeId, salaryId} = this.state
    return (
      <div className="jobs-bg">
        <Header />
        <div className="jobs-card">
          <div className="filters-card">
            {this.renderProfile()}
            <div className="hr">
              <hr />
            </div>

            <h3 className="h5-type-of-employee">Type of Employment</h3>
            <ul className="employee-types-bg">
              {employmentTypesList.map(each => (
                <li key={each.employmentTypeId} className="employee-type-bg">
                  <input
                    name="checkBox"
                    onClick={this.onClickCheckBox}
                    id="check"
                    type="checkbox"
                    value={each.employmentTypeId}
                  />
                  <label value="checkBox" htmlFor="check">
                    {each.label}
                  </label>
                </li>
              ))}
            </ul>
            <h3 className="h5-type-of-employee">Salary Range</h3>
            <ul>
              {salaryRangesList.map(each => (
                <li key={each.salaryRangeId} className="employee-type-bg">
                  <input
                    name="radio"
                    id="radio"
                    type="radio"
                    value={each.salaryRangeId}
                    onClick={this.onClickRadio}
                  />
                  <label value="radio" htmlFor="radio">
                    {each.label}
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="search-bg">
              <input
                onChange={this.onSearchInput}
                className="search-input"
                type="search"
                value={searchInput}
              />
              <button
                type="button"
                data-testid="searchButton"
                onClick={this.onSearchBtn}
                className="search-btn"
              >
                <BiSearchAlt2 className="search-icon" />
              </button>
            </div>
            {this.renderJobs()}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
