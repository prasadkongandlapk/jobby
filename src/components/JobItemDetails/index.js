import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiFillStar} from 'react-icons/ai'
import {HiLocationMarker} from 'react-icons/hi'
import {GiSuitcase} from 'react-icons/gi'

class JobItemDetails extends Component {
  state = {
    jobInfo: {},
    skills: [],
    life: {},
    similarJobs: [],
    isJobsLoading: true,
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

    const jobData = {
      companyLogoUrl: data.job_details.company_logo_url,
      companyWebsiteUrl: data.job_details.company_website_url,
      employmentType: data.job_details.employment_type,
      id: data.job_details.id,
      jobDescription: data.job_details.job_description,
      location: data.job_details.location,
      package: data.job_details.package_per_annum,
      rating: data.job_details.rating,
    }
    const skills = data.job_details.skills.map(each => ({
      imageUrl: each.image_url,
      companyWebsiteUrl: each.name,
    }))
    const life = data.job_details.life_at_company.map(each => ({
      imageUrl: each.image_url,
      description: each.description,
    }))

    const similarJobs = data.similar_jobs.map(each => ({
      companyLogoUrl: each.company_logo_url,
      employmentType: each.employment_type,
      id: each.id,
      jobDescription: each.job_description,
      location: each.location,
      ration: each.rating,
      title: each.title,
    }))

    this.setState({
      jobInfo: jobData,
      similarJobs,
      skills,
      life,
      isJobsLoading: false,
    })
  }

  render() {
    const {jobInfo} = this.state
    const {
      companyLogoUrl,
      title,
      employmentType,
      id,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
    } = jobInfo

    return (
      <div className="job-item-bg">
        <div className="logo-rating-bg">
          <img className="company-logo-img" src={companyLogoUrl} alt={title} />
          <div className="title-rating-bg">
            <h5 className="title">{title}</h5>
            <div className="rating-bg">
              <AiFillStar height={10} color="yellow" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="rating-bg-bg">
          <div className="rating-bg">
            <div className="rating-bg">
              <HiLocationMarker className="icon" />
              <p>{location}</p>
            </div>

            <div className="rating-bg">
              <GiSuitcase className="icon" />
              <p>{employmentType}</p>
            </div>
          </div>
          <p className="description">{packagePerAnnum}</p>
        </div>
        <hr />
        <p className="description-p">Description</p>
        <p className="description">{jobDescription}</p>
      </div>
    )
  }
}

export default JobItemDetails
