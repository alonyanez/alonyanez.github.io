import React from 'react'
import './workCard.css'

interface WorkCardProps {
  jobTitle: string
  companyName: string
  date: string
  location: string
}

const WorkCard: React.FC<WorkCardProps> = ({
  jobTitle,
  companyName,
  date,
  location
}) => {
  return (
    <div className='work-card'>
      <div className='work-info'>
        <h2>Estudios</h2>
        <div key={1} className='work-item'>
          <h3 className='job-title'>{jobTitle}</h3>
          <p className='company-name'>{companyName}</p>
          <p className='work-date'>{date}</p>
          <p className='work-location'>{location}</p>
        </div>        
      </div>
    </div>
  )
}

export default WorkCard
