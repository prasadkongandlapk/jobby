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

class Jobs extends Component {
  state = {
    employTypeId: '',
    salaryId: '',
    profileInfo: {},
    profileLoader: true,
    searchInput: '',
    isCheckBoxClicked: '',
    isSearchClicked: false,
    jobs: [],
    isJobsLoading: true,
  }

  componentDidMount() {
    this.getProfileData()
    this.getJobs()
  }

  onSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onSearchBtn = () => {
    this.setState({isSearchClicked: true})
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

    this.setState({jobs: formattedData, isJobsLoading: false})
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
    const formattedData = {
      name: data.profile_details.name,
      profileImg: data.profile_details.profile_image_url,
      shortBio: data.profile_details.short_bio,
    }
    this.setState({profileInfo: formattedData, profileLoader: false})
  }

  onClickCheckBox = event => {
    this.setState({employTypeId: event.target.value})
  }

  onClickRadio = event => {
    this.setState({salaryId: event.target.value})
  }

  render() {
    const {
      profileInfo,
      jobs,
      isLoading,
      profileLoader,
      searchInput,
      isJobsLoading,
    } = this.state
    return (
      <div className="jobs-bg">
        <Header />
        <div className="jobs-card">
          <div className="filters-card">
            <div className="profile-bg-bg">
              {profileLoader ? (
                <Loader width={50} color="white" type="ThreeDots" />
              ) : (
                <div className="profile-bg">
                  <img
                    className="profile-size"
                    src={profileInfo.profileImg}
                    alt="profile"
                  />
                  <h3 className="profile-name">{profileInfo.name}</h3>
                  <p className="short-bio">{profileInfo.shortBio}</p>
                </div>
              )}
            </div>
            <div className="hr">
              <hr />
            </div>
            <h5 className="h5-type-of-employee">Type of Employment</h5>
            {employmentTypesList.map(each => (
              <div className="employee-types-bg">
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
              </div>
            ))}
            <h5 className="h5-type-of-employee">Salary Range</h5>
            {salaryRangesList.map(each => (
              <div className="employee-types-bg">
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
              </div>
            ))}
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
                onClick={this.onSearchBtn}
                className="search-btn"
              >
                <BiSearchAlt2 className="search-icon" />
              </button>
            </div>
            <ul className="">
              {isJobsLoading ? (
                <div className="jobs-loader-bg">
                  <Loader color="white" width={50} type="ThreeDots" />
                </div>
              ) : (
                jobs.map(jobItem => (
                  <JobItem jobInfo={jobItem} key={jobItem.id} />
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
