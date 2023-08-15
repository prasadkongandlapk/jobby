import './index.css'
import {Component} from 'react'
import {AiFillStar} from 'react-icons/ai'
import {HiLocationMarker} from 'react-icons/hi'
import {GiSuitcase} from 'react-icons/gi'
import {Link} from 'react-router-dom'

class JobItem extends Component {
  render() {
    const {jobInfo} = this.props
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
      <Link to={`/jobs/${id}`}>
        <div className="job-item-bg">
          <div className="logo-rating-bg">
            <img
              className="company-logo-img"
              src={companyLogoUrl}
              alt={title}
            />
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
      </Link>
    )
  }
}

export default JobItem
