import './index.css'
import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiFillStar} from 'react-icons/ai'
import {HiLocationMarker} from 'react-icons/hi'
import {GiSuitcase} from 'react-icons/gi'
import Header from '../Header'

const status = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobItemDetails extends Component {
  state = {
    jobInfo: {},
    skills: [],
    life: {},
    similarJobs: [],
    jobItemStatus: status.loading,
  }

  componentDidMount = () => {
    this.getJobs()
  }

  onClickJobDetails = () => {
    this.getJobs()
  }

  getJobs = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jobUrl = `https://apis.ccbp.in/jobs/${id}`

    const token = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }

    const response = await fetch(jobUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      const jobData = {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        id: data.job_details.id,
        jobDescription: data.job_details.job_description,
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
      }
      const skills = data.job_details.skills.map(each => ({
        imageUrl: each.image_url,
        name: each.name,
      }))

      const life = {
        imgUrl: data.job_details.life_at_company.image_url,
        description: data.job_details.life_at_company.description,
      }

      const similarJobs = data.similar_jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        rating: each.rating,
        title: each.title,
      }))

      this.setState({
        jobInfo: jobData,
        skills,
        life,
        similarJobs,
        jobItemStatus: status.success,
      })
    } else {
      this.setState({jobItemStatus: status.failure})
    }
  }

  jobItemsLoadingView = () => (
    <div data-testid="loader" className="loader">
      <Loader width={50} color="white" type="ThreeDots" />
    </div>
  )

  jobItemFailureView = () => (
    <div className="no-jobs-bg">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png "
        alt="failure view"
      />
      <h1>Oops, Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button
        type="button"
        onClick={this.onClickJobDetails}
        className="retry-btn"
      >
        Retry
      </button>
    </div>
  )

  jobItemView = () => {
    const {jobInfo, similarJobs, life, skills} = this.state
    return (
      <div>
        <div className="job-item-bg">
          <div className="logo-rating-bg">
            <img
              className="company-logo-img"
              src={jobInfo.companyLogoUrl}
              alt="job details company logo"
            />
            <div className="title-rating-bg">
              <h5 className="title">{jobInfo.title}</h5>

              <div className="rating-bg">
                <AiFillStar height={10} color="yellow" />
                <p className="rating">{jobInfo.rating}</p>
              </div>
            </div>
          </div>
          <div className="rating-bg-bg">
            <div className="rating-bg">
              <div className="rating-bg">
                <HiLocationMarker className="icon" />
                <p>{jobInfo.location}</p>
              </div>

              <div className="rating-bg">
                <GiSuitcase className="icon" />
                <p>{jobInfo.employmentType}</p>
              </div>
            </div>
            <p className="description">{jobInfo.packagePerAnnum}</p>
          </div>
          <hr />
          <div className="description-visit-button-bg">
            <h5 className="description-p">Description</h5>
            <Link className="visit" to={jobInfo.companyWebsiteUrl}>
              Visit
            </Link>
          </div>
          <p className="description">{jobInfo.jobDescription}</p>
          <h5>Skills</h5>
          <ul className="skills-bg">
            {skills.map(each => (
              <li className="skill-bg" key={each.name}>
                <img className="skill-img" src={each.imageUrl} alt="name" />
                <p>{each.name}</p>
              </li>
            ))}
          </ul>
          <h5>Life At Company</h5>
          <div className="life-bg">
            <p className="life-description">{life.description}</p>
            <img src={life.imgUrl} alt="life at company" />
          </div>
        </div>

        <h5 className="similar-jobs-heading">Similar Jobs</h5>
        <ul className="similar-jobs-bg">
          {similarJobs.map(each => (
            <li className="similar-job-bg" key={each.id}>
              <div className="logo-rating-bg">
                <img
                  className="company-logo-img"
                  src={each.companyLogoUrl}
                  alt="similar job company logo"
                />
                <div className="title-rating-bg">
                  <h5 className="title">{each.title}</h5>
                  <div className="rating-bg">
                    <AiFillStar height={10} color="yellow" />
                    <p className="rating">{each.rating}</p>
                  </div>
                </div>
              </div>
              <h5 className="description-p">Description</h5>
              <p className="description">{each.jobDescription}</p>
              <div className="rating-bg-bg">
                <div className="rating-bg">
                  <div className="rating-bg">
                    <HiLocationMarker className="icon" />
                    <p>{each.location}</p>
                  </div>

                  <div className="rating-bg">
                    <GiSuitcase className="icon" />
                    <p>{each.employmentType}</p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  renderJobItem = () => {
    const {jobItemStatus} = this.state
    switch (jobItemStatus) {
      case status.loading:
        return this.jobItemsLoadingView()
      case status.failure:
        return this.jobItemFailureView()
      case status.success:
        return this.jobItemView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="job-item-details-bg">
        <Header />
        {this.renderJobItem()}
      </div>
    )
  }
}

export default JobItemDetails
