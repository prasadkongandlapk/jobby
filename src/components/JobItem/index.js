import './index.css'
import {Component} from 'react'

class JobItem extends Component {
  render() {
    const {jobInfo} = this.props
    const {companyLogoUrl, title} = jobInfo

    return (
      <div className="job-item-bg">
        <img src={companyLogoUrl} alt={title} />
      </div>
    )
  }
}

export default JobItem
